import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.scss';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const isInitialMove = useRef(true);

  useEffect(() => {
    const isTouch = globalThis.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = dotRef.current;

    const xDot = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const xOutline = gsap.quickTo(outlineRef.current, "x", { duration: 0.5, ease: "back.out(1.4)" });
    const yOutline = gsap.quickTo(outlineRef.current, "y", { duration: 0.5, ease: "back.out(1.4)" });


    const moveCursor = (e: MouseEvent) => {
      if (isInitialMove.current) {
        gsap.set([dotRef.current, outlineRef.current], { opacity: 1 });
        isInitialMove.current = false;
      }

      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-magnetic]');

      if (isInteractive) {
        gsap.to(dotRef.current, {
          scale: 1.7,
          backgroundColor: 'var(--clr-accent)',
          duration: 0.3,
          overwrite: 'auto'
        });
        gsap.to(outlineRef.current, {
          scale: 0.5,
          duration: 0.5,
          overwrite: 'auto'
        });
      } else {
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: 'var(--clr-secondary)',
          duration: 0.3,
          overwrite: 'auto'
        });
        gsap.to(outlineRef.current, {
          scale: 1,
          duration: 0.3,
          overwrite: 'auto'
        });
      }
    };

    globalThis.addEventListener("mousemove", moveCursor);

    return () => {
      globalThis.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursor} />
      <div ref={outlineRef} className={styles.cursorOutline} />
    </>
  );
};

export default CustomCursor;