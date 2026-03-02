import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const timer = setTimeout(() => {
          lenis.scrollTo(element, {
            offset: -80,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          });
        }, 50);
        return () => clearTimeout(timer);
      }
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    return undefined;
  }, [hash, lenis, pathname]);

  return null;
};

export default ScrollToHash;