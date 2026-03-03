import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { HeartIcon, ThumbsUpIcon } from '@/components/ui/Icons';

import styles from './Reactions.module.scss';

interface ReactionsProps {
  postId: string;
}

const REACTION_TYPES = [
  { id: 'heart', icon: <HeartIcon /> },
  { id: 'thumbsUp', icon: <ThumbsUpIcon /> },
];

const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const playBounce = contextSafe((id: string) => {
  
  gsap.fromTo(`.emoji-${id}`,
    { scale: 1 }, 
    { 
      scale: 1.5, 
      duration: 0.3, 
      ease: "back.out(1.2)",
      yoyo: true, 
      repeat: 1,
      overwrite: 'auto', 
    }
  );
});

  useEffect(() => {
    let isMounted = true;
    const saved = localStorage.getItem(`reaction-${postId}`);
    const initialCounts: Record<string, number> = {};

    REACTION_TYPES.forEach(reaction => {
      const count = localStorage.getItem(`count-${postId}-${reaction.id}`);
      initialCounts[reaction.id] = count 
      ? Number.parseInt(count, 10) 
      : Math.floor(Math.random() * 50);
    });

    setTimeout(() => {
      if (isMounted) {
        setUserReaction(saved);
        setCounts(initialCounts);
      }
    }, 0);
    return () => { isMounted = false; };
  }, [postId]);

  const handleReaction = (reactionId: string) => {
    playBounce(reactionId);
    const isRemoving = userReaction === reactionId;
    const newReaction = isRemoving ? null : reactionId;

    setCounts(prev => {
      const next = { ...prev };
    
      if (userReaction && next[userReaction]) {
        next[userReaction] = Math.max(0, next[userReaction] - 1);
        localStorage.setItem(`count-${postId}-${userReaction}`, next[userReaction].toString());
      }
    
      if (newReaction) {
        next[newReaction] = (next[newReaction] || 0) + 1;
        localStorage.setItem(`count-${postId}-${newReaction}`, next[newReaction].toString());
      }
      return next;
    });

    setUserReaction(newReaction);
    if (newReaction) {
      localStorage.setItem(`reaction-${postId}`, newReaction);
    } else {
      localStorage.removeItem(`reaction-${postId}`);
    }
  };

  return (
    <div className={styles.reactions} ref={containerRef}>
      {REACTION_TYPES.map(({ id, icon }) => (
        <button
          key={id}
          className={`${styles.reactionBtn} ${userReaction === id ? styles.active : ''}`}
          onClick={() => handleReaction(id)}
          aria-label={`React with ${id}`}
        >
          <span className={`${styles.emoji} emoji-${id}`}>{icon}</span>
          {(counts[id] || 0) > 0 && (
          <span className={styles.count}>{counts[id]}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
