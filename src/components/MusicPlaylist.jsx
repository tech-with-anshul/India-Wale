import { Music2 } from 'lucide-react';

export default function MusicPlaylist({ songs, currentSong, isOpen, onSelectSong }) {
  return (
    <div
      id="playlist-panel"
      className={`playlist-panel glass ${isOpen ? 'open' : 'closed'}`}
      style={{
        position: 'absolute',
        right: '24px',
        bottom: '28px',
        width: 'min(310px, calc(100vw - 56px))',
        borderRadius: '16px',
        padding: '14px 12px',
        maxHeight: '380px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 55,
      }}
      role="region"
      aria-label="Song playlist"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        marginBottom: '10px', paddingBottom: '9px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <Music2 size={13} color="rgba(255,153,51,0.85)" />
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.18em', color: 'rgba(255,153,51,0.85)', textTransform: 'uppercase',
        }}>
          Desh Bhakti
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter',sans-serif" }}>
          {songs.length} songs
        </span>
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
              onClick={() => onSelectSong(song)}
              role="option"
              aria-selected={isActive}
              aria-label={`${song.title} by ${song.artist}`}
            >
              {/* Number / active eq */}
              <div style={{ width: '24px', flexShrink: 0, textAlign: 'center' }}>
                {isActive ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '14px', justifyContent: 'center' }}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="eq-bar" style={{ background: '#FF9933', width: '2px' }} />
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter',sans-serif" }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '12px', fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  fontFamily: "'Inter',sans-serif",
                }}>
                  {song.title}
                </p>
                <p style={{
                  fontSize: '10px',
                  color: isActive ? 'rgba(255,153,51,0.75)' : 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  fontFamily: "'Inter',sans-serif", marginTop: '1px',
                }}>
                  {song.artist}
                </p>
              </div>

              {/* Year */}
              <span style={{ flexShrink: 0, fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter',sans-serif" }}>
                {song.year}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
