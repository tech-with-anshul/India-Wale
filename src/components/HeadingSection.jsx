export default function HeadingSection({ cinematicMode }) {
  return (
    <div
      className="ui-element"
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
            color: 'rgba(255, 243, 220, 0.42)',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textShadow: '0 1px 14px rgba(0,0,0,0.3)',
          }}
        >
          मेरी शान
        </h2>
      </div>

      {/* Divider */}
      <div
        className="animate-fadeIn delay-1000 opacity-0"
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
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.22em',
          }}
        >
          एक देश &bull; एक दिल &bull; एक तिरंगा
        </p>
      </div>
    </div>
  );
}
