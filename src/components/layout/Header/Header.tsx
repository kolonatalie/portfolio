import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import { ChevronLeft, CircleIcon } from '@/components/ui/Icons';

import styles from './Header.module.scss';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => setIsOpen(false);

  const lenis = useLenis();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname === '/blog';
  const isLinksPage = location.pathname === '/go';
  const isNowPage = location.pathname === '/now';

  useGSAP(() => {
    if (isBlogPage || isLinksPage) return;

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
          { y: -20, opacity: 0 },
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


  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    closeMenu();

    if (isHomePage) {
      e.preventDefault();
      window.history.pushState(null, '', target);

      const element = document.querySelector(target) as HTMLElement;

      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80 });
      }
    }
  };

  return (
    <header ref={container}>
      <nav className={styles.nav}>
        <div className={styles.navCenter}>

          {isBlogPage && (
            <div className={styles.messengerHeader}>
              <Link to="/" className={styles.backBtn} aria-label="Go to Portfolio"><ChevronLeft className={styles.arrowIcon} /></Link>
              <div className={styles.contactInfo}>
                <span className={styles.name}>Dev Log</span>
                <span className={styles.status}>online</span>
              </div>
              <Link to="/" aria-label="Go to Portfolio"><CircleIcon className={styles.circleIcon} /></Link>
            </div>
          )}

          {isLinksPage && (
            <div className={styles.linksHeader}>
              <Link to="/" aria-label="Go to Portfolio" className={styles.logoLink}>
                <CircleIcon className={styles.circleIcon} />
              </Link>
            </div>
          )}

          {!isBlogPage && !isLinksPage && (
            <>
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
                    <Link
                      to="/#projects"
                      onClick={(e) => handleNavLinkClick(e, '#projects')}
                    >
                      projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#about"
                      onClick={(e) => handleNavLinkClick(e, '#about')}
                    >
                      about
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#contact"
                      onClick={(e) => handleNavLinkClick(e, '#contact')}
                    >
                      contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      onClick={() => {
                        closeMenu();
                        window.scrollTo(0, 0);
                      }}
                    >
                      blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/now"
                      className={isNowPage ? styles.activeLink : ''}
                      onClick={closeMenu}
                    >
                      now
                    </Link>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;