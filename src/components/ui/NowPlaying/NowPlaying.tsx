import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import styles from './NowPlaying.module.scss';

const NowPlaying = () => {
  const [track, setTrack] = useState<{ name: string; artist: string; url: string } | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTrack = async () => {
      const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
      const USER = import.meta.env.VITE_LASTFM_USER;
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json`;

      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        const latestTrack = data.recenttracks.track[0];

        if (latestTrack?.['@attr']?.nowplaying === 'true') {
          const newTrack = {
            name: latestTrack.name,
            artist: latestTrack.artist['#text'],
            url: latestTrack.url
          };
          setTrack(prev => (prev?.name === newTrack.name && prev?.artist === newTrack.artist) ? prev : newTrack);
        } else {
          setTrack(null);
        }
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          console.error("Last.fm error", e);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchTrack();
    }, 2000);

    const interval = setInterval(fetchTrack, 30000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  useGSAP(() => {
    if (track && dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1.5,
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "sine.inOut",
        overwrite: "auto"
      });
    }
  }, [track]);

  const content = track
    ? `${track.artist} - ${track.name}`
    : "* Chill Vibes Playlist";

  const link = track?.url || "https://www.last.fm/user/kolonatalie/playlists/14361203";

  return (
    <li className={styles.nowPlaying}>
      <span className={styles.statusLabel}>
        {track && <span ref={dotRef} className={styles.pulseDot} />}
        playing now:
      </span>
      <span className={styles.running}>
        <span>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <span> {content} </span>
            <span> {content} </span>
          </a>
        </span>
      </span>
    </li>
  );
};

export default NowPlaying;