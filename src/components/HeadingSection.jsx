export default function HeadingSection({ cinematicMode, onFeelPride }) {
  return (
    <div
      className="ui-element heading-container"
      style={{
        position: 'absolute',
        right: '5%',
        top: '42%',
        transform: 'translateY(-50%)',
        textAlign: 'right',
        pointerEvents: 'none',
        maxWidth: '460px',
      }}
      aria-label="मेरा भारत मेरी शान"
    >
      {/* Main heading */}
      <div className="animate-fadeInUp delay-600 opacity-0">
        <h1
          className="font-hindi"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5.8rem)',
            fontWeight: 900,
            color: 'rgba(255, 252, 244, 0.94)',
            letterSpacing: '-0.01em',
            lineHeight: 1.04,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          मेरा भारत
        </h1>
      </div>

      {/* Sub heading */}
      <div className="animate-fadeInUp delay-800 opacity-0">
        <h2
          className="font-hindi"
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 3.8rem)',
            fontWeight: 600,
            color: 'rgba(255, 243, 220, 0.78)',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.65)',
          }}
        >
          मेरी शान
        </h2>
      </div>

      {/* Divider */}
      <div
        className="animate-fadeIn delay-1000 opacity-0 heading-divider"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
          margin: '14px 0 10px',
        }}
      >
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, rgba(255,153,51,0.55), transparent)' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,153,51,0.7)', boxShadow: '0 0 8px rgba(255,153,51,0.5)' }} />
      </div>

      {/* Supporting text */}
      <div className="animate-fadeIn delay-1200 opacity-0">
        <p
          className="font-hindi"
          style={{
            fontSize: 'clamp(0.7rem, 1.4vw, 0.95rem)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.22em',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          एक देश &bull; एक दिल &bull; एक तिरंगा
        </p>
      </div>

      {/* Mobile-only interactive Feel the Pride button */}
      <div 
        className="mobile-only animate-fadeIn delay-1400 opacity-0"
        style={{ 
          marginTop: '16px', 
          display: 'none', // Overridden in index.css for mobile
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={onFeelPride}
          style={{
            background: 'rgba(255, 153, 51, 0.12)',
            border: '1px solid rgba(255, 153, 51, 0.3)',
            borderRadius: '20px',
            padding: '6px 16px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            color: '#FF9933',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(255, 153, 51, 0.15)',
          }}
        >
          Feel the Pride ›
        </button>
      </div>
    </div>
  );
}
