import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(container.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 5, ease: 'power2.out' }
    );
  }, { scope: container });

  return (
    <div ref={container} className="page-wrapper">
      {children}
    </div>
  );
};

export default PageTransition;