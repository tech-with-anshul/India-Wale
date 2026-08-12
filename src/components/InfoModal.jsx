import { ShieldAlert, X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(5, 3, 2, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.4s ease forwards',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Disclaimer and Spotify Playlists"
    >
      {/* Modal Container (Scrollable internally) */}
      <div
        className="glass scrollbar-hide"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          borderRadius: '24px',
          border: '1px solid rgba(255, 153, 51, 0.15)',
          padding: '28px 24px',
          overflowY: 'auto',
          position: 'relative',
          background: 'rgba(12, 8, 5, 0.65)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)',
            transition: 'all 0.25s ease',
          }}
          aria-label="Close modal"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.background = 'rgba(255, 153, 51, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px', paddingRight: '20px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.24em',
            color: '#FF9933',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
          }}>
            Patriotic Music Center
          </span>
          <h2
            className="font-hindi"
            style={{
              fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: 'rgba(255, 252, 244, 0.94)',
              margin: 0,
            }}
          >
            सांस्कृतिक धुनें &bull; Playlists &amp; Info
          </h2>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '2px', background: '#FF9933' }} />
            <div style={{ width: '20px', height: '2px', background: '#ffffff' }} />
            <div style={{ width: '20px', height: '2px', background: '#138808' }} />
          </div>
        </div>

        {/* Disclaimer / Copyright Notice Card */}
        <div
          style={{
            padding: '18px 20px',
            borderRadius: '14px',
            background: 'rgba(255, 153, 51, 0.04)',
            border: '1px solid rgba(255, 153, 51, 0.18)',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} color="#FF9933" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255, 252, 244, 0.9)' }}>
              Disclaimer Notice
            </span>
          </div>
          <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
            Audio plays through YouTube’s embedded player. Nothing is hosted on this site, and all rights stay with the labels, composers and performers. Song credits are put together from film soundtrack listings.
          </p>
          <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'rgba(255, 153, 51, 0.85)', margin: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
            If you hold rights to anything here and want it taken off, email{' '}
            <a href="mailto:kanshulmussoorie@gmail.com" style={{ color: '#FF9933', fontWeight: 600, textDecoration: 'underline' }}>
              kanshulmussoorie@gmail.com
            </a>{' '}
            and it comes down.
          </p>
        </div>

        {/* Spotify Embed Grid */}
        <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Explore More Spotify Playlists
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
          }}
        >
          {/* Embed 1 */}
          <div className="glass" style={{ padding: '8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '10px', display: 'block' }}
              src="https://open.spotify.com/embed/playlist/45779WRMdodcRa9fgHFDCp?utm_source=generator&si=48309f7c881b4823"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed 1"
            />
          </div>

          {/* Embed 2 */}
          <div className="glass" style={{ padding: '8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '10px', display: 'block' }}
              src="https://open.spotify.com/embed/playlist/1uqUgrh6ZmwPyf5Rqk6KOK?utm_source=generator&si=478f0a38605243ce"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed 2"
            />
          </div>

          {/* Embed 3 */}
          <div className="glass" style={{ padding: '8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '10px', display: 'block' }}
              src="https://open.spotify.com/embed/playlist/2xlM2nuQ7hD29VhXzdfZ2D?utm_source=generator&si=9afe13d3910e42c0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed 3"
            />
          </div>

          {/* Embed 4 */}
          <div className="glass" style={{ padding: '8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '10px', display: 'block' }}
              src="https://open.spotify.com/embed/playlist/4LkippXyHvv5It28bLtTMX?utm_source=generator&si=3dd9e40cb2df4806"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed 4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
