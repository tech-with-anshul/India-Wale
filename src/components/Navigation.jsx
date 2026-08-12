import { useRef, useState, useCallback, useEffect } from 'react';
import { Aperture, Info, RotateCw, X } from 'lucide-react';

const QUOTES = [
  '"स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा।"\n— बाल गंगाधर तिलक',
  '"तुम मुझे खून दो, मैं तुम्हें आज़ादी दूँगा!"\n— नेताजी सुभाष चंद्र बोस',
  '"सारे जहाँ से अच्छा हिन्दोस्ताँ हमारा।"\n— अल्लामा इक़बाल',
  '"इंकलाब जिंदाबाद!"\n— भगत सिंह',
  '"सत्यमेव जयते।"\n— मदन मोहन मालवीय',
  '"दुश्मन की गोलियों का हम सामना करेंगे, आज़ाद ही रहे हैं, आज़ाद ही रहेंगे!"\n— चन्द्रशेखर आज़ाद',
  '"सरफरोशी की तमन्ना अब हमारे दिल में है, देखना है ज़ोर कितना बाज़ू-ए-कातिल में है।"\n— राम प्रसाद बिस्मिल',
  '"सत्य और अहिंसा मेरा ईश्वर है।"\n— महात्मा गांधी',
  '"जय जवान, जय किसान!"\n— लाल बहादुर शास्त्री',
  '"करो या मरो।"\n— महात्मा गांधी',
  '"आराम हराम है।"\n— जवाहरलाल नेहरू',
  '"सच्चा राष्ट्रवाद दूसरों को दबाना नहीं, बल्कि सबकी स्वतंत्रता की रक्षा करना है।"\n— नेताजी सुभाष चंद्र बोस'
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

// ── Navigation Component ──────────────────────────
export default function Navigation({ cinematicMode, onBharatClick, onVandeClick, onCinematicToggle, onInfoOpen }) {
  const [waveActive, setWaveActive] = useState(false);
  const waveTimeout = useRef(null);

  const handleBharat = useCallback(() => {
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
            <span>भारत के नाम</span>
          </button>
        </div>

        {/* Right — वंदे मातरम् & Aperture (for mobile) */}
        <div className="animate-slideInRight delay-400 opacity-0" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            id="vande-mataram-btn"
            className="pill-btn font-hindi"
            onClick={handleVande}
            aria-label="वंदे मातरम् — click for tricolor celebration"
          >
            <span>वंदे मातरम्</span>
          </button>

          {/* Mobile-only cinematic button */}
          <button
            className="cinematic-btn inline-flex md:hidden"
            onClick={onCinematicToggle}
            aria-label={cinematicMode ? 'Exit cinematic mode' : 'Enter cinematic mode'}
            title={cinematicMode ? 'Exit cinematic mode (Alt+C)' : 'Cinematic mode (Alt+C)'}
          >
            <Aperture size={15} />
          </button>

          {/* Mobile-only info button */}
          <button
            className="cinematic-btn inline-flex md:hidden"
            onClick={onInfoOpen}
            aria-label="Open Info & Playlists"
            title="Info & Playlists"
          >
            <Info size={15} />
          </button>
        </div>
      </nav>
    </>
  );
}
