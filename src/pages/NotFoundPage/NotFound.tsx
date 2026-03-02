import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Button from '@/components/ui/Button/Button';
import Magnetic from '@/components/common/Magnetic';

import styles from './NotFound.module.scss';


const NotFound: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to(codeRef.current, {
      x: 'random(-2, 2)',
      y: 'random(-2, 2)',
      rotation: 'random(-1, 1)',
      duration: 0.1,
      repeat: -1,
      repeatRefresh: true,
      ease: "none",
    });

    gsap.to(codeRef.current, {
      opacity: 0.6,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "steps(3)",
      delay: 1
    });
  }, { scope: container });

  return (
    <main className={styles.notFound} ref={container}>
      <section className={styles.content}>
        <h1
          className={styles.errorCode}
          ref={codeRef}
          aria-label="Error 404"
        >
          404
        </h1>
        <h2>Lost in cyberspace?</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Magnetic className={styles.backBtn} strength={0.2}>
          <Button
            variant="primary"
            to="/"
          >
            Back to Safety
          </Button>
        </Magnetic>
      </section>
    </main>
  );
};

export default NotFound;