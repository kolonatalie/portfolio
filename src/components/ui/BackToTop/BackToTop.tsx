import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

import { ChevronUpIcon } from '../Icons';

import styles from './BackToTop.module.scss';


const BackToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    gsap.set(buttonRef.current, { autoAlpha: 0, y: 50 });

    ScrollTrigger.create({
      start: 500, 
      onUpdate: (self) => {
        const shouldShow = self.scroll() > 500;

        gsap.to(buttonRef.current, {
          autoAlpha: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 50,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  }, []);

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      y: -20,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    lenis?.scrollTo(0, { duration: 1.5 });
  };

  return (
    <button
      ref={buttonRef}
      className={styles.btn}
      title="Go to top"
      onClick={handleClick}
      aria-label="Back to top"
      data-magnetic
    >
      <ChevronUpIcon className={styles.chevronUpIcon} />
    </button>
  );
};

export default BackToTop;