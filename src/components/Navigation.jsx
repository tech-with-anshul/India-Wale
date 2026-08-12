import { useRef, useState, useCallback, useEffect } from 'react';

const QUOTES = [
  '"जहाँ विविधता है, वहीं भारत है।"',
  '"सत्यमेव जयते।"',
  '"एकता में शक्ति है।"',
  '"भारत माता की जय।"',
  '"देश के लिए मर मिटना, यही है असली ज़िंदगी।"',
];

// ── Tricolor horizontal wave ──────────────────────
function TricolorWave({ active }) {
  if (!active) return null;

  const waveParticles = [];
  const saffronBand = [5, 12, 18, 24, 30, 36, 42];
  const whiteBand   = [47, 52, 57, 62, 67, 72, 77];
  const greenBand   = [82, 87, 90, 93, 96, 98, 99];

  const addBand = (yValues, color, delayBase) => {
    yValues.forEach((y, i) => {
      const size = Math.random() * 8 + 4;
      waveParticles.push({
        id: `${color}-${i}`,
        color,
        y: y + (Math.random() - 0.5) * 4,
        size,
        delay: delayBase + i * 0.06 + Math.random() * 0.15,
        duration: Math.random() * 0.8 + 1.6,
      });
    });
  };

  addBand(saffronBand, '#FF9933', 0);
  addBand(whiteBand,   '#f5f0e8', 0.1);
  addBand(greenBand,   '#138808', 0.2);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 140 }} aria-hidden="true">
      {waveParticles.map((p) => (
        <div
          key={p.id}
          className="wave-particle"
          style={{
            top: `${p.y}%`,
            left: '-60px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}99`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Quote overlay ────────────────────────────────
function QuoteOverlay({ quote, onDone }) {
  useEffect(() => {
    if (!quote) return;
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [quote, onDone]);

  if (!quote) return null;

  return (
    <div className="quote-overlay" aria-live="polite">
      <div className="quote-bg" />
      <div className="quote-text">
        <p
          className="font-hindi"
          style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 2.4rem)',
            fontWeight: 600,
            color: 'rgba(255, 252, 244, 0.96)',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            lineHeight: 1.5,
            maxWidth: '640px',
            padding: '0 24px',
          }}
        >
          {quote}
        </p>
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '6px' }}>
          <div style={{ width: '28px', height: '3px', borderRadius: '2px', background: '#FF9933' }} />
          <div style={{ width: '28px', height: '3px', borderRadius: '2px', background: '#f5f0e8' }} />
          <div style={{ width: '28px', height: '3px', borderRadius: '2px', background: '#138808' }} />
        </div>
      </div>
    </div>
  );
}

export default function Navigation({ cinematicMode, onBharatClick, onVandeClick }) {
  const [quote, setQuote] = useState(null);
  const [waveActive, setWaveActive] = useState(false);
  const quoteIndex = useRef(0);
  const waveTimeout = useRef(null);

  const handleBharat = useCallback(() => {
    const text = QUOTES[quoteIndex.current % QUOTES.length];
    quoteIndex.current += 1;
    setQuote(text);
    if (onBharatClick) onBharatClick();
  }, [onBharatClick]);

  const handleVande = useCallback(() => {
    setWaveActive(false);
    // micro delay to remount and re-trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWaveActive(true));
    });
    clearTimeout(waveTimeout.current);
    waveTimeout.current = setTimeout(() => setWaveActive(false), 2800);
    if (onVandeClick) onVandeClick();
  }, [onVandeClick]);

  return (
    <>
      <QuoteOverlay quote={quote} onDone={() => setQuote(null)} />
      <TricolorWave active={waveActive} />

      <nav
        className={`ui-element ${cinematicMode ? 'cinematic' : ''}`}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          padding: '22px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
        }}
        aria-label="Primary navigation"
      >
        {/* Left pill — भारत के नाम */}
        <div className="animate-slideInLeft delay-400 opacity-0">
          <button
            id="india-pill"
            className="pill-btn font-hindi"
            onClick={handleBharat}
            aria-label="भारत के नाम — click for a patriotic quote"
          >
            <span role="img" aria-label="Indian flag">🇮🇳</span>
            <span>भारत के नाम</span>
          </button>
        </div>

        {/* Right — वंदे मातरम् */}
        <div className="animate-slideInRight delay-400 opacity-0">
          <button
            id="vande-mataram-btn"
            className="pill-btn font-hindi"
            onClick={handleVande}
            aria-label="वंदे मातरम् — click for tricolor celebration"
          >
            <span>वंदे मातरम्</span>
          </button>
        </div>
      </nav>
    </>
  );
}
