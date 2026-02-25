import { useCallback, useEffect, useRef } from 'react';

export const useSound = (url: string, volume = 0.2) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<number>(0);

  const play = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayedRef.current < 150) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    }
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // empty
     });
    lastPlayedRef.current = now;
  }, [url, volume]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return play;
};