import { useRef, ReactElement } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Props {
  children: ReactElement;
  className?: string;
  strength?: number;
}

const Magnetic = ({ children, className, strength = 0.3 }: Props) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice || !magneticRef.current) return;

    const el = magneticRef.current;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    let rect = el.getBoundingClientRect();

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
     
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = clientX - centerX;
      const y = clientY - centerY;

      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mouseenter", updateRect);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", updateRect);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: magneticRef });

  return (
    <div
      ref={magneticRef}
      className={className}
      style={{ display: 'inline-block' }}
      data-magnetic
    >
      {children}
    </div>
  );
};

export default Magnetic;