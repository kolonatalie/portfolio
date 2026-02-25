import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { ArrowDown } from '../../ui/Icons';
import Button from '../../ui/Button/Button';
import NowPlaying from '@/components/ui/NowPlaying/NowPlaying';

import styles from './Home.module.scss';
import Magnetic from '@/components/common/Magnetic';


const Home = () => {
  const container = useRef<HTMLDivElement>(null);

  const animatedHeadline = useMemo(() => {
    const text = "turning creativity into clean, functional code";
    return text.split(" ").map((word, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split("").map((char, j) => (
          <span key={j} className="char" style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
        <span className="char">&nbsp;</span>
      </span>
    ));
  }, []);

  useGSAP(() => {
    if (!container.current) return;

    const q = gsap.utils.selector(container);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.8 }
    });

    tl.from(q('.word'), {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
    })
      .from(q(`.${styles.heroText} h1`), {
        y: 40,
        opacity: 0,
      }, "-=0.8")

      .from(q(`.${styles.bio}`), {
        y: 5,
        opacity: 0,
        duration: 0.8,
        clearProps: "all",
      }, "-=0.4")

      .from(q('ul li'), {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8
      }, "-=0.6")

      .from(q(`.${styles.cta}`), {
        opacity: 0,
      }, "-=0.9")

      .from(q(`.${styles.arrowDown}`), {
        opacity: 0,
        y: -20,
        duration: 1,
      }, "-=0.5");

  }, { scope: container });

  return (
    <section ref={container} className={styles.home}>
      <div className={styles.homeWrapper}>
        <div className={styles.heroText}>
          <p className={styles.headliner}>{animatedHeadline}</p>
          <h1>Natalie — Creative Developer & Front-End Engineer</h1>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.bio}>
            <p>
              Blending years of AR and design expertise with modern frontend engineering.
              I build high-end digital experiences where motion meets performance,
              and every interaction feels intentional.
              <br />
              Currently focused on <a className={styles.textLink} href="#projects">interactive 3D</a> and
              <a className={styles.textLink} href="#contact"> accessible web applications.</a>
            </p>
          </div>
          <div>
            <ul className={styles.social}>
              <li>
                code: <a href="https://github.com/kolonatalie" target="_blank" rel="noopener noreferrer">curated creative repos
                </a>
              </li>
              <li>writing: <Link to="/blog">
                tech blog on motion</Link>
              </li>

              <NowPlaying />

            </ul>
            <Magnetic>
              <Button
                variant="secondary"
                href="#contact"
                className={styles.cta}
              >
                Let’s collaborate
              </Button>
            </Magnetic>
          </div>
        </div>
        <div className={styles.arrowDown}>
          <a href="#projects">
            <ArrowDown className={styles.arrowDownStyle} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;