import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import { CircleIcon } from '@/components/ui/Icons';

import styles from './Header.module.scss';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => setIsOpen(false);

  useGSAP(() => {
    const q = gsap.utils.selector(container);
    const navItems = [q('ul li'), q(`.${styles.smartphone}`)];

    const tl = gsap.timeline({
      paused: true, 
      defaults: { ease: 'power2.out', duration: 0.4 }
    });

    if (isOpen) {
      tl.to(menuRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.out',
        opacity: 1,
        pointerEvents: 'all',
        force3D: true,
      })
        .fromTo(navItems,
          {
            y: -20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: { amount: 0.4, from: "start" },
            duration: 0.4,
            ease: 'back.out(1.7)'
          }, "-=0.3"
        )
        .play();
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.4,
        ease: 'power2.in',
        opacity: 0,
        pointerEvents: 'none',
        overwrite: true,
      });
    }
  }, { scope: container, dependencies: [isOpen] });

  return (
    <header ref={container}>
      <nav>
        <div className={styles.navCenter}>
          <div className={styles.navHeader}>
            <Link
              to="/"
              aria-label="Go to Portfolio Homepage"
              onClick={() => window.scrollTo(0, 0)}
            >
              <CircleIcon className={styles.circleIcon} />
            </Link>
            <button
              className={`${styles.navToggle} ${isOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="open main menu"
              aria-expanded={isOpen}
            >
              <div className={styles.dotsMenu}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </button>
          </div>
          <div
            ref={menuRef}
            className={styles.links}
          >
            <ul className={styles.navlinks}>
              <li>
                <a href="#projects" onClick={closeMenu}>projects</a>
              </li>
              <li>
                <a href="#about" onClick={closeMenu}>about</a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>contact</a>
              </li>
              <li>
                <a href="blog/" target="_blank" onClick={closeMenu}>blog</a>
              </li>
            </ul>
            <SocialLinks
              showExtended={true}
            />
            <div className={styles.smartphone}>
              <p>
                <a href="https://github.com/kolonatalie/portfolio" title="GitHub repo" target="_blank" rel="noopener noreferrer"><code>.sourceCode()</code></a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;