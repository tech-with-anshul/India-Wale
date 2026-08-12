import { useRef, useEffect, useState } from 'react';

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

export default function Hero({ mousePos, isPlaying, cinematicMode, playlistOpen, children }) {
  const bgRef = useRef(null);
  const [litDiyas, setLitDiyas] = useState({ 0: false, 1: false, 2: false, 3: false });

  // Handle background parallax (sky + monuments + river)
  useEffect(() => {
    if (bgRef.current) {
      const maxShift = 8;
      const x = (mousePos.x - 0.5) * -maxShift;
      const y = (mousePos.y - 0.5) * -maxShift;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
    }
  }, [mousePos]);

  // Diyas coordinates on the ghats/riverbank
  const diyas = [
    { bottom: '25%', left: '14%' },
    { bottom: '21%', left: '25%' },
    { bottom: '23%', left: '38%' },
    { bottom: '18%', left: '47%' },
  ];

  const handleDiyaClick = (index) => {
    setLitDiyas(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
      aria-label="Indian Independence Day Experience"
    >
      {/* ── Background image (moves with subtle parallax) ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-5%',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          zIndex: 1,
        }}
      >
        <img
          src="/bharat.png"
          alt="Indian Independence Day — background landscape"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* ── River Wave Reflection Overlay (Responds to playback state) ── */}
      <div
        className={isPlaying ? 'river-ripple-active' : 'river-ripple-slow'}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '32%',
          background: 'linear-gradient(to top, rgba(255, 120, 0, 0.08) 0%, rgba(255, 160, 40, 0.03) 40%, transparent 100%)',
          mixBlendMode: 'color-dodge',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'opacity 1.5s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Interactive Diyas Layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none', // Allow clicks only on individual diyas
        }}
      >
        {diyas.map((diya, index) => {
          const isLit = litDiyas[index];
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                bottom: diya.bottom,
                left: diya.left,
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
              }}
              onClick={() => handleDiyaClick(index)}
              title="Lit the diya"
            >
              {/* Diya shape / flame */}
              <div
                className={isPlaying ? 'diya-pulse-active' : 'diya-pulse-slow'}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isLit ? '#ffd060' : '#ff8800',
                  boxShadow: isLit 
                    ? '0 0 12px #ff8800, 0 0 24px #ff5500' 
                    : '0 0 6px #ff8800',
                  transition: 'all 0.5s ease',
                }}
              />

              {/* Hover glow ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255, 140, 0, 0.3)',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  transform: 'scale(0.8)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  // Light flicker on hover
                  const flame = e.currentTarget.parentElement.firstElementChild;
                  if (flame) flame.style.transform = 'scale(1.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                  e.currentTarget.style.transform = 'scale(0.8)';
                  const flame = e.currentTarget.parentElement.firstElementChild;
                  if (flame) flame.style.transform = 'scale(1)';
                }}
              />

              {/* Lit glow expansion (warm radial glow expanding around the clicked diya) */}
              <div
                style={{
                  position: 'absolute',
                  width: isLit ? '180px' : '0px',
                  height: isLit ? '180px' : '0px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 120, 0, 0.16) 0%, rgba(255, 60, 0, 0.02) 60%, transparent 100%)',
                  pointerEvents: 'none',
                  transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: -1,
                }}
              />
            </div>
          );
        })}
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
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── Playlist Open Darken Overlay (darkens background by ~10%) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.22)',
          opacity: (playlistOpen && !cinematicMode) ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          zIndex: 35, // sits between bg components and content UI
        }}
      />

      {/* ── Vignette ── */}
      <div className="vignette" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }} />

      {/* ── Ambient playing glow ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,153,51,0.06) 0%, transparent 65%)',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 2s ease',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── Grain ── */}
      <div className="grain-overlay" style={{ zIndex: 3 }} />

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
          zIndex: 5,
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
