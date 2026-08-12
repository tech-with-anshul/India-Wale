import { useState, useRef, useCallback, useMemo } from 'react';
import {
  Play, Pause, SkipBack, SkipForward,
  Shuffle, ListMusic, Volume2, VolumeX,
} from 'lucide-react';

// ── Decorative waveform — 30 elegant bars ────────────────
const WAVEFORM_HEIGHTS = Array.from(
  { length: 30 },
  () => Math.random() * 0.72 + 0.08
);

function WaveformBar({ height, isPlayed }) {
  return (
    <div
      className="waveform-bar"
      style={{
        height: `${height * 18}px`,
        background: isPlayed
          ? `rgba(255, 153, 51, ${0.38 + height * 0.28})`
          : `rgba(255, 255, 255, ${0.04 + height * 0.05})`,
      }}
    />
  );
}

// ── Equalizer ─────────────────────────────────────
function Equalizer({ isPlaying }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '18px' }} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`eq-bar ${!isPlaying ? 'paused' : ''}`} />
      ))}
    </div>
  );
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// ── Mini Player (cinematic mode) ─────────────────
function MiniPlayer({ song, isPlaying, onPlayPause }) {
  return (
    <div
      className={`mini-player glass`}
      style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
      }}
    >
      {/* Album art */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden',
        flexShrink: 0, background: 'linear-gradient(135deg, #FF9933 0%, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%)',
        border: '1px solid rgba(255,153,51,0.3)',
      }}>
        <img src={song.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>

      {/* Title */}
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {song.title}
      </span>

      {/* Play button */}
      <button
        onClick={onPlayPause}
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF9933, #E67E00)',
          border: 'none', cursor: 'pointer', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: '1px' }} />}
      </button>
    </div>
  );
}

// ── Main Player ───────────────────────────────────
export default function MusicPlayer({
  currentSong,
  isPlaying,
  progress,
  duration,
  volume,
  shuffle,
  playlistOpen,
  cinematicMode,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onShuffleToggle,
  onPlaylistToggle,
}) {
  const [showVolume, setShowVolume] = useState(false);
  const progressRef = useRef(null);
  const volumeAreaRef = useRef(null);

  const handleProgressClick = useCallback((e) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * duration);
  }, [duration, onSeek]);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  // If cinematic mode, show mini player
  if (cinematicMode) {
    return <MiniPlayer song={currentSong} isPlaying={isPlaying} onPlayPause={onPlayPause} />;
  }

  return (
    <div
      className="animate-slideUp delay-1400 opacity-0"
      style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(480px, calc(100vw - 28px))',
        zIndex: 60,
      }}
    >
      <div
        id="music-player"
        className={`glass ${isPlaying ? 'glow-playing' : ''}`}
        style={{
          borderRadius: '18px',
          padding: '14px 16px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        role="region"
        aria-label="Music Player"
      >
        {/* ── Top: artwork + song info + eq ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Album art */}
          <div style={{
            width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden',
            flexShrink: 0, border: '1.5px solid rgba(255,153,51,0.25)',
            boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
            background: 'linear-gradient(135deg, #FF9933 0%, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%)',
          }}>
            <img
              src={currentSong.cover}
              alt={`Album art for ${currentSong.title}`}
              className={isPlaying ? 'artwork-playing' : ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Song info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
              {isPlaying && <Equalizer isPlaying={isPlaying} />}
              <p style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '13px',
                color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {currentSong.title}
              </p>
            </div>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {currentSong.artist}
              <span style={{ margin: '0 6px', color: 'rgba(255,255,255,0.25)' }}>&bull;</span>
              <span style={{ color: 'rgba(255,153,51,0.65)', fontSize: '10px' }}>
                {currentSong.category}
              </span>
            </p>
          </div>
        </div>

        {/* ── Waveform + Progress ── */}
        <div>
          <div
            ref={progressRef}
            className="progress-wrapper"
            onClick={handleProgressClick}
            role="slider"
            aria-label="Seek position"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={progress || 0}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') onSeek(Math.min(duration, progress + 5));
              if (e.key === 'ArrowLeft') onSeek(Math.max(0, progress - 5));
            }}
          >
            {/* Decorative waveform — 30 elegant bars */}
            <div className="waveform-container" style={{ position: 'absolute', inset: 0, alignItems: 'center', gap: '3px' }}>
              {WAVEFORM_HEIGHTS.map((h, i) => {
                const pos = i / WAVEFORM_HEIGHTS.length;
                return (
                  <WaveformBar
                    key={i}
                    height={h}
                    isPlayed={pos < progressPercent / 100}
                  />
                );
              })}
            </div>
            {/* Invisible click target + progress line */}
            <div className="progress-track" style={{ width: '100%' }}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif" }}>
              {formatTime(progress)}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif" }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* ── Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Left: shuffle + volume (with floating popup) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              id="shuffle-btn"
              className={`ctrl-btn ${shuffle ? 'active' : ''}`}
              onClick={onShuffleToggle}
              aria-label={`Shuffle ${shuffle ? 'on' : 'off'}`}
            >
              <Shuffle size={15} />
            </button>

            {/* Volume area */}
            <div
              ref={volumeAreaRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              {/* Floating volume popup */}
              {showVolume && (
                <div className="volume-popup">
                  {volume === 0 ? <VolumeX size={12} color="rgba(255,255,255,0.5)" /> : <Volume2 size={12} color="rgba(255,255,255,0.5)" />}
                  <input
                    type="range"
                    className="volume-slider"
                    min="0" max="1" step="0.02"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    aria-label="Volume"
                  />
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif", minWidth: '24px' }}>
                    {Math.round(volume * 100)}
                  </span>
                </div>
              )}
              <button
                id="volume-btn"
                className="ctrl-btn"
                aria-label="Volume"
                title="Volume"
              >
                {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </div>

          {/* Center: prev / play-pause / next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button id="prev-btn" className="ctrl-btn" onClick={onPrev} aria-label="Previous song">
              <SkipBack size={18} />
            </button>

            <button
              id="play-pause-btn"
              className="play-btn"
              onClick={onPlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
            </button>

            <button id="next-btn" className="ctrl-btn" onClick={onNext} aria-label="Next song">
              <SkipForward size={18} />
            </button>
          </div>

          {/* Right: playlist */}
          <div>
            <button
              id="playlist-toggle-btn"
              className={`ctrl-btn ${playlistOpen ? 'active' : ''}`}
              onClick={onPlaylistToggle}
              aria-label={`${playlistOpen ? 'Close' : 'Open'} playlist`}
            >
              <ListMusic size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
