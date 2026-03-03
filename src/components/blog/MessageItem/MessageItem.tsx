import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import MarkdownRenderer from '../../ui/MarkdownRenderer';
import Reactions from '../Reactions/Reactions';
import { IPost } from '@/types/blog';
import { EyeIcon, SendIcon } from '@/components/ui/Icons';

import styles from './MessageItem.module.scss';


const MessageItem: React.FC<{ post: IPost; index: number }> = ({ post, index }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayViews, setDisplayViews] = useState<string>('');

  const bubbleRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const base = post.views;
    const min = base - 2 > 0 ? base - 2 : 0.5;
    const max = base + 2;
    const randomValue = (Math.random() * (max - min) + min).toFixed(1);

    setTimeout(() => {
      if (isMounted) setDisplayViews(`${randomValue}K`);
    }, 0);

    setTimeout(() => {
      if (isMounted) setIsLoading(true);
    }, 0);

    fetch(post.file)
      .then(res => res.text())
      .then(text => {
        if (isMounted) {
          setContent(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [post.file, post.views]);

  useGSAP(() => {
    gsap.from(bubbleRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.8,
      delay: (index % 5) * 0.1,
      ease: 'back.out(1.5)',
    });
  }, { scope: bubbleRef });

  useGSAP(() => {
    if (!contentWrapperRef.current) return;
    gsap.to(contentWrapperRef.current, {
      height: isExpanded ? 'auto' : '100px',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, { dependencies: [isExpanded], scope: bubbleRef });

  useGSAP(() => {
    if (globalThis.location.hash === `#post-${post.id}`) {
      const tl = gsap.timeline();
      tl.to(bubbleRef.current, {
        backgroundColor: 'var(--clr-primary)',
        duration: 0.5,
      })
        .to(bubbleRef.current, {
          backgroundColor: '',
          duration: 1.5,
          clearProps: 'backgroundColor'
        }, '+=1');
    }
  }, { dependencies: [post.id], scope: bubbleRef });

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${globalThis.location.origin}/blog#post-${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url: shareUrl });
      } catch (err) { console.error(err); }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleExpand();
    }
  };

  return (
    <article
      id={`post-${post.id}`}
      className={`${styles.message} ${isExpanded ? styles.expanded : ''} ${styles[post.type || 'text']}`}
    >
      <div
        className={styles.bubble}
        ref={bubbleRef}
        onClick={handleExpand}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <div className={styles.metaInfo}>
          <span className={styles.date}>{post.date}</span>
        </div>
        <div className={styles.topSection}>
          <div className={styles.header}>
            <h3 className={styles.title}>{post.title}</h3>
          </div>
          {post.previewImage && (
            <div className={styles.previewContainer}>
              <img src={post.previewImage} alt={post.title} className={styles.previewImage} />
            </div>
          )}
        </div>

        <div className={styles.contentWrapper} ref={contentWrapperRef}>
          {isLoading ? (
            <div className={styles.skeleton}>Typing...</div>
          ) : (
            <>
              <MarkdownRenderer content={content} />
              {!isExpanded && <div className={styles.gradientOverlay} />}
            </>
          )}

          {!isExpanded && !isLoading && (
            <div className={styles.showMore}>
              <span>Read full post..</span>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <Reactions postId={post.id} />
            <button
              onClick={handleShare}
              className={styles.shareBtn}
              aria-label="Share post">
              <SendIcon />
            </button>
          </div>
          <p className={styles.views}><EyeIcon /><span>{displayViews}</span></p>
        </div>
      </div>
    </article>
  );
};
export default MessageItem;