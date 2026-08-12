import { useRef, useEffect } from 'react';

const heroImage = '/bharat.png';
const PARTICLE_COUNT = 26;

function createParticles() {
  const colors = ['#FF9933', '#ffffff', '#138808'];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    color: colors[i % 3],
    size: Math.random() * 4.5 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 14,
    duration: Math.random() * 16 + 12,
    opacity: Math.random() * 0.4 + 0.2,
  }));
}

const particles = createParticles();

export default function Hero({ mousePos, isPlaying, cinematicMode, children }) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;
    const maxShift = 14;
    const x = (mousePos.x - 0.5) * -maxShift;
    const y = (mousePos.y - 0.5) * -maxShift;
    bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
  }, [mousePos]);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
      aria-label="Indian Independence Day Experience"
    >
      {/* ── Background image (moves with parallax) ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-5%',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      >
        <img
          src={heroImage}
          alt="Indian Independence Day — tricolor flag against a golden sunset sky"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* ── Cinematic dark gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.04) 28%,
            rgba(0,0,0,0.06) 52%,
            rgba(0,0,0,0.65) 82%,
            rgba(0,0,0,0.82) 100%
          )`,
          transition: 'opacity 1.2s ease',
          opacity: cinematicMode ? 0.6 : 1,
        }}
      />

      {/* ── Vignette ── */}
      <div className="vignette" style={{ position: 'absolute', inset: 0 }} />

      {/* ── Ambient playing glow ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,153,51,0.06) 0%, transparent 65%)',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Grain ── */}
      <div className="grain-overlay" />

      {/* ── Cinematic light sweep (subtle warm pass across sky every ~10s) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '38%',
          height: '65%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,210,140,0.052) 50%, transparent 100%)',
          animation: 'lightSweep 10s ease-in-out infinite',
          animationDelay: '4s',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── Tricolor floating particles ── */}
      <div
        style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
          transition: 'opacity 1.5s ease',
          opacity: cinematicMode ? 0.4 : 1,
        }}
        aria-hidden="true"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: isPlaying ? p.opacity * 1.5 : p.opacity,
              animationDuration: `${isPlaying ? p.duration * 0.85 : p.duration}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}66`,
              transition: 'opacity 1.5s ease',
            }}
          />
        ))}
      </div>

      {/* ── Children (UI — stays stable, doesn't move with parallax) ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
