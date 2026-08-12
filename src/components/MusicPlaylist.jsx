import { Music2, X } from 'lucide-react';

export default function MusicPlaylist({ songs, currentSong, isOpen, progress, duration, onSelectSong, onClose }) {
  const activePercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      id="playlist-panel"
      className={`playlist-panel glass ${isOpen ? 'open' : 'closed'}`}
      style={{}}
      role="region"
      aria-label="Song playlist"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        marginBottom: '8px', paddingBottom: '7px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        width: '100%'
      }}>
        <Music2 size={12} color="rgba(255,153,51,0.85)" />
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: '9.5px', fontWeight: 700,
          letterSpacing: '0.18em', color: 'rgba(255,153,51,0.85)', textTransform: 'uppercase',
          flex: 1
        }}>
          Desh Bhakti &bull; {songs.length} Songs
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', padding: '2px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', borderRadius: '50%'
          }}
          aria-label="Close playlist"
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
        >
          <X size={13} />
        </button>
      </div>

      {/* Song list */}
      <div className="playlist-scroll" style={{ overflowY: 'auto', flex: 1 }} role="listbox">
        {songs.map((song, index) => {
          const isActive = song.id === currentSong.id;
          return (
            <button
              key={song.id}
              id={`song-item-${song.id}`}
              className={`song-item ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                textAlign: 'left',
                padding: isActive ? '8px 10px' : '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                boxShadow: isActive ? 'inset 0 1px 0 rgba(255,153,51,0.08)' : 'none',
              }}
              onClick={() => onSelectSong(song)}
              role="option"
              aria-selected={isActive}
              aria-label={`${song.title} by ${song.artist}`}
            >
              {/* Row 1: Title + EQ/Year */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 500,
                  color: isActive ? 'rgba(255,153,51,0.7)' : 'rgba(255,255,255,0.18)',
                  fontFamily: "'Inter',sans-serif",
                  minWidth: '16px'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span style={{
                  fontSize: '11.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  fontFamily: "'Inter',sans-serif",
                }}>
                  {song.title}
                </span>

                {isActive ? (
                  /* Mini animated Equalizer */
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px', flexShrink: 0 }}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="eq-bar"
                        style={{
                          background: '#FF9933',
                          width: '1.8px',
                          animationDuration: i === 1 ? '0.7s' : i === 2 ? '0.5s' : '0.9s'
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span style={{
                    flexShrink: 0,
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.18)',
                    fontFamily: "'Inter',sans-serif"
                  }}>
                    {song.year}
                  </span>
                )}
              </div>

              {/* Row 2: Artist */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '24px' }}>
                <span style={{
                  fontSize: '10px',
                  color: isActive ? 'rgba(255,153,51,0.65)' : 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  fontFamily: "'Inter',sans-serif",
                }}>
                  {song.artist}
                </span>
              </div>

              {/* Row 3: Tiny Active Progress Bar */}
              {isActive && (
                <div style={{ width: '100%', paddingLeft: '24px', marginTop: '4px' }}>
                  <div style={{
                    height: '2px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF9933, #FFB347)',
                      width: `${activePercent}%`,
                      transition: 'width 0.25s linear'
                    }} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
