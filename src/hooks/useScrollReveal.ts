import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollReveal = (scopeRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    if (!scopeRef.current) return;

    const targets = gsap.utils.toArray<HTMLElement>('.revealItem', scopeRef.current);

    targets.forEach((el) => {
      const effect = el.dataset.animation as 'fade' | 'motion' | 'text-reveal' | undefined;
      const isStagger = el.dataset.stagger === 'true';

      const animations = {
        fade: {
          opacity: 0,
          y: 50,
          filter: 'blur(3px)',
        },
        motion: {
          opacity: 0,
          scale: 0,
          filter: 'blur(10px)',
        },
        'text-reveal': { 
          opacity: 0, 
          y: 40, 
          x: 50,
          rotateX: 90,
          filter: 'blur(3px)',
        },
      };

      const startValues = animations[effect || 'fade'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let animationTarget: any = el;
      
      if (effect === 'text-reveal') {
        animationTarget = gsap.utils.toArray(el.querySelectorAll('.char'));
      } else if (isStagger) {
        animationTarget = gsap.utils.toArray(el.children);
      }

      gsap.from(animationTarget, {
        ...startValues,
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
          // markers: true
        },
        duration: effect === 'motion' ? 1.7 : 1,
        stagger: isStagger || effect === 'text-reveal' ? 0.03 : 0,
        ease: effect === 'text-reveal' ? "back.out(1.7)" : "expo.out",
        clearProps: 'all',
      });
    });
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, { scope: scopeRef, dependencies: [] });
};