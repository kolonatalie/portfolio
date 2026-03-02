import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { NOW_DATA } from '@/data/nowData';
import styles from './NowPage.module.scss';


const NowPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from('h1, .lastUpdated', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });

    tl.from(`.${styles.nowItem}`, {
      x: -30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      clearProps: "all"
    }, "-=0.5");

    gsap.fromTo(`.${styles.timelineLine}`,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.content}`,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 0.5,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <main className={styles.nowContainer} ref={containerRef}>
      <section className={styles.header}>
        <h1 className={styles.title}>What I'm doing now</h1>
        <p className={styles.lastUpdated}>Last updated: March 2026</p>
      </section>

      <div className={styles.content}>
        <div className={styles.timelineLine} />
        {NOW_DATA.map((item, index) => (
          <section key={index} className={styles.nowItem}>
            <div className={styles.dot} />
            <p className={styles.category}>{item.category}</p>
            <p className={`${styles.text} ${item.lang === 'ua' ? styles.uaText : ''}`}>
              {item.content}
            </p>
          </section>
        ))}
      </div>

      <section className={styles.footer}>
        <p>Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">Derek Sivers</a></p>
      </section>
    </main>
  );
};

export default NowPage;