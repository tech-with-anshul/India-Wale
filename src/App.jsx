import { useState, useRef, useEffect, useCallback } from 'react';
import { Aperture, Info } from 'lucide-react';
import { songs } from './data/songs';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import HeadingSection from './components/HeadingSection';
import MusicPlayer from './components/MusicPlayer';
import MusicPlaylist from './components/MusicPlaylist';
import InfoModal from './components/InfoModal';

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

export default function App() {
  // ── Core state ─────────────────────────────────
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]     = useState(0);
  const [duration, setDuration]     = useState(0);
  const [volume, setVolume]         = useState(0.8);
  const [shuffle, setShuffle]       = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  // ── Experience state ───────────────────────────
  const [cinematicMode, setCinematicMode] = useState(false);
  const [infoOpen, setInfoOpen]           = useState(false);
  const [mousePos, setMousePos]           = useState({ x: 0.5, y: 0.5 });
  const [quoteIndex, setQuoteIndex]       = useState(0);

  const audioRef = useRef(null);

  const handleNextQuote = useCallback(() => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  }, []);

  // ── Load song when currentSong changes ─────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentSong.audio;
    audio.volume = volume;
    audio.load();
    setProgress(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  // ── Sync volume ─────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Audio events ────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate     = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded          = () => handleNext();
    const onError          = () => setIsPlaying(false);
    audio.addEventListener('timeupdate',     onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended',          onEnded);
    audio.addEventListener('error',          onError);
    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended',          onEnded);
      audio.removeEventListener('error',          onError);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, shuffle]);

  // ── Mouse parallax ──────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Playback controls ───────────────────────────
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    setCurrentSong((prev) => {
      if (shuffle) {
        let idx;
        do { idx = Math.floor(Math.random() * songs.length); }
        while (songs.length > 1 && songs[idx].id === prev.id);
        return songs[idx];
      }
      const i = songs.findIndex((s) => s.id === prev.id);
      return songs[(i + 1) % songs.length];
    });
    setIsPlaying(true);
  }, [shuffle]);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setCurrentSong((prev) => {
      const i = songs.findIndex((s) => s.id === prev.id);
      return songs[(i - 1 + songs.length) % songs.length];
    });
    setIsPlaying(true);
  }, []);

  const handleSeek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setProgress(time);
  }, []);

  const handleVolumeChange = useCallback((val) => setVolume(val), []);

  const handleSongSelect = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setPlaylistOpen(false);
  }, []);

  // ── Keyboard shortcuts ──────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); handlePlayPause(); }
      if (e.code === 'ArrowRight' && e.altKey) handleNext();
      if (e.code === 'ArrowLeft'  && e.altKey) handlePrev();
      if (e.code === 'KeyC' && e.altKey) setCinematicMode((m) => !m);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePlayPause, handleNext, handlePrev]);

  return (
    <div style={{ width: '100%', height: '100dvh', overflow: 'hidden', position: 'relative' }}>
      <audio ref={audioRef} preload="metadata" />

      <Hero mousePos={mousePos} isPlaying={isPlaying} cinematicMode={cinematicMode} playlistOpen={playlistOpen}>

        {/* Navigation with interactive buttons */}
        <Navigation 
          cinematicMode={cinematicMode} 
          onBharatClick={handleNextQuote}
          onCinematicToggle={() => setCinematicMode(m => !m)}
          onInfoOpen={() => setInfoOpen(true)}
        />

        {/* Hindi heading — right-center, dims when playlist is open to protect title */}
        <div 
          className={`ui-element ${cinematicMode ? 'cinematic' : ''}`}
          style={{ 
            opacity: playlistOpen ? 0.38 : 1, 
            transition: 'opacity 0.6s ease' 
          }}
        >
          <HeadingSection 
            cinematicMode={cinematicMode} 
            onFeelPride={() => document.getElementById('vande-mataram-btn')?.click()}
          />
        </div>

        {/* "Feel the Pride" — clickable, triggers same tricolor wave as Navigation (desktop only) */}
        <div
          className={`animate-fadeIn delay-1600 opacity-0 ui-element hidden md:block ${cinematicMode ? 'cinematic' : ''}`}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '28px',
          }}
        >
          <button
            id="feel-pride-btn"
            onClick={() => {
              // Trigger vande wave via ref on Navigation
              document.getElementById('vande-mataram-btn')?.click();
            }}
            aria-label="Feel the Pride — click for tricolor celebration"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-english)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.32)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,153,51,0.65)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.32)'; }}
            >
              Feel the Pride ›
            </span>
          </button>
        </div>

        {/* Cinematic mode toggle — bottom right (desktop only) */}
        <div
          className="animate-fadeIn delay-1600 opacity-0 hidden md:block"
          style={{
            position: 'absolute',
            bottom: '28px',
            right: cinematicMode ? '50%' : '28px',
            transform: cinematicMode ? 'translateX(50%)' : 'none',
            zIndex: 70,
            transition: 'right 0.9s ease, transform 0.9s ease',
          }}
        >
          <button
            id="cinematic-mode-btn"
            className={`cinematic-btn ${cinematicMode ? 'active' : ''}`}
            onClick={() => setCinematicMode((m) => !m)}
            aria-label={cinematicMode ? 'Exit cinematic mode' : 'Enter cinematic mode'}
            title={cinematicMode ? 'Exit cinematic mode (Alt+C)' : 'Cinematic mode (Alt+C)'}
          >
            <Aperture size={16} />
          </button>
        </div>

        {/* Info & Playlists toggle button — bottom right (desktop only, hidden in cinematic mode) */}
        <div
          className="animate-fadeIn delay-1600 opacity-0 hidden md:block"
          style={{
            position: 'absolute',
            bottom: '28px',
            right: cinematicMode ? '50%' : '72px',
            transform: cinematicMode ? 'translateX(50%)' : 'none',
            zIndex: 70,
            transition: 'right 0.9s ease, transform 0.9s ease',
            display: cinematicMode ? 'none' : 'block'
          }}
        >
          <button
            id="info-mode-btn"
            className="cinematic-btn"
            onClick={() => setInfoOpen(true)}
            aria-label="Open Info & Spotify playlists"
            title="Info & Playlists"
          >
            <Info size={16} />
          </button>
        </div>

        {/* Playlist — slides in from right */}
        <MusicPlaylist
          songs={songs}
          currentSong={currentSong}
          isOpen={playlistOpen && !cinematicMode}
          progress={progress}
          duration={duration}
          onSelectSong={handleSongSelect}
          onClose={() => setPlaylistOpen(false)}
        />

        {/* Music player */}
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          shuffle={shuffle}
          playlistOpen={playlistOpen}
          cinematicMode={cinematicMode}
          quote={QUOTES[quoteIndex]}
          onNextQuote={handleNextQuote}
          onPlayPause={handlePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onShuffleToggle={() => setShuffle((s) => !s)}
          onPlaylistToggle={() => setPlaylistOpen((o) => !o)}
        />
      </Hero>

      {/* Info, Playlists & Copyright Notice Overlay Modal */}
      <InfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}
