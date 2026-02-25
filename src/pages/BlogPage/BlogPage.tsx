import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import styles from './BlogPage.module.scss';

const BlogPage: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <main>
      <div ref={container} className={styles.blog}>
        <h2>Blog is coming soon.</h2>
        <p>I just can't make the final layout decision yet.</p>
      </div>
    </main>
  );
};
export default BlogPage;