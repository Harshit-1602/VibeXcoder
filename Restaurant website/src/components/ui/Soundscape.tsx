'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

export function Soundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Warm, ambient café jazz track (Mixkit royalty free)
    const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-warm-nights-1090.mp3');
    audio.loop = true;
    audio.volume = 0.15; // Soft background volume
    audioRef.current = audio;

    // Handle standard browser page visibility rules (pause when tab hidden)
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Auto-dismiss tooltip after 6s
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);

    // Show tooltip initially
    setShowTooltip(true);

    return () => {
      audio.pause();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      showToast('Soundscape muted', 'info');
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
          showToast('Playing ÉLAN Dining Soundscape', 'success');
        })
        .catch((err) => {
          console.warn('Playback blocked by browser autoplay policy:', err);
          showToast('Click again to enable audio play', 'info');
        });
    }
  }, [isPlaying, showToast]);

  return (
    <div className="fixed bottom-[6rem] right-[2rem] z-40">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#121218] border border-[#d4a853]/25 px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap text-[8px] uppercase tracking-[0.2em] text-[#f0ece4] pointer-events-none"
          >
            Ambient Soundscape
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleSound}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-[44px] h-[44px] rounded-full bg-[#121218]/90 border border-[#d4a853]/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#d4a853]/15 hover:border-[#d4a853]/40 shadow-lg text-[#d4a853] hover:shadow-[0_0_15px_rgba(212,168,83,0.25)] relative overflow-hidden"
        aria-label="Toggle Soundscape"
      >
        <div className={`soundscape-wave ${isPlaying ? 'playing' : ''}`}>
          <span className="soundscape-bar" style={{ backgroundColor: 'currentColor' }} />
          <span className="soundscape-bar" style={{ backgroundColor: 'currentColor' }} />
          <span className="soundscape-bar" style={{ backgroundColor: 'currentColor' }} />
          <span className="soundscape-bar" style={{ backgroundColor: 'currentColor' }} />
        </div>

        {/* Diagonal slash when muted */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute w-6 h-[1.5px] bg-[#8a8694] rotate-45 origin-center"
              style={{ top: 'calc(50% - 0.75px)', left: 'calc(50% - 12px)' }}
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
