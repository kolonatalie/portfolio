import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import postsData from '@/data/posts.json';
import { IPost } from '@/types/blog';
import MessageItem from '@/components/blog/MessageItem/MessageItem';
import Magnetic from '@/components/common/Magnetic';
import Button from '@/components/ui/Button/Button';
import { CameraVideoIcon, CardTextIcon, ImageIcon, RadarIcon } from '@/components/ui/Icons';
import SetSeo from '@/components/common/SetSeo';

import styles from './BlogPage.module.scss';


type ContentType = 'all' | 'image' | 'video' | 'text';

const BlogPage: React.FC = () => {
  const [posts] = useState<IPost[]>(postsData as IPost[]);
  const [visibleCount, setVisibleCount] = useState(5);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<ContentType>('all');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeType === 'all' || post.type === activeType;
      
      return matchesSearch && matchesType;
    });
  }, [posts, searchQuery, activeType]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && visibleCount < filteredPosts.length) {
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 3, filteredPosts.length));
      }, 0);
    }
  }, [inView, filteredPosts.length, visibleCount]); 

 
  useEffect(() => {
    const hash = globalThis.location.hash;

    if (hash?.startsWith('#post-')) {
      const targetId = hash.replace('#post-', '');
      const postIndex = posts.findIndex(p => p.id === targetId);
      
      if (postIndex !== -1) {
        setTimeout(() => {
      setVisibleCount(prev => Math.max(prev, postIndex + 1));
    }, 0);
        
        setTimeout(() => {
          const el = document.getElementById(`post-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [posts, visibleCount]); 

  useGSAP(() => {
    if (filteredPosts.length === 0) {
      gsap.fromTo(`.${styles.emptyState}`, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, { dependencies: [filteredPosts.length] });

  return (
    <main className={styles.container}>
      <SetSeo title="Blog" path="/blog" />
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Search tech posts..." 
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.typeGroup}>
            <button 
              onClick={() => setActiveType('all')} 
              className={activeType === 'all' ? styles.active : ''}
              aria-label="all posts"
            >
              o
            </button>
            <button 
              onClick={() => setActiveType('text')} 
              className={activeType === 'text' ? styles.active : ''}
              aria-label="text posts"
            >
              <CardTextIcon />
            </button>
            <button 
              onClick={() => setActiveType('image')} 
              className={activeType === 'image' ? styles.active : ''}
              aria-label="image posts"
            >
              <ImageIcon />
            </button>
            <button 
              onClick={() => setActiveType('video')} 
              className={activeType === 'video' ? styles.active : ''}
              aria-label="video posts"
            >
              <CameraVideoIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.feed}>
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, visibleCount).map((post, index) => (
              <MessageItem key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.icon}><RadarIcon className={styles.radarIcon}/></div>
              <p className={styles.message}>No messages found</p>
              <p className={styles.subMessage}>Try adjusting your frequency or search query...</p>
              <Magnetic>
                <Button
                  variant="secondary"
                  onClick={() => { setSearchQuery(''); setActiveType('all'); }}
                  className={styles.resetBtn}
                >
                  Reset Frequency
                </Button>
              </Magnetic>
            </div>
          )}
          {filteredPosts.length > 0 && visibleCount < filteredPosts.length && (
            <div ref={ref} className={styles.loader}>
              {<span>Loading more messages...</span>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default BlogPage;
