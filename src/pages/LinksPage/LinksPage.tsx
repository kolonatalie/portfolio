import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Button from '@/components/ui/Button/Button';
import avatar from '@/assets/images/kolonatalie-main-photo400.webp';
import { BIO_LINKS, PAGESPEED_METRICS } from '@/data/links';
import SEO from '@/components/common/SEO';

import styles from './LinksPage.module.scss';


const LinksPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);

  const links = BIO_LINKS;
  const metrics = PAGESPEED_METRICS;

  useGSAP(() => {
    const tlRings = gsap.timeline({
      repeat: -1,
      defaults: { ease: "sine.inOut", duration: 3 }
    });

    tlRings.fromTo(ringInnerRef.current,
      { z: -30, scale: 0.8, opacity: 0.2 },
      {
        z: 100,
        scale: 1.3,
        opacity: 0.5,
        yoyo: true,
        repeat: 1
      }
    );

    tlRings.fromTo(ringOuterRef.current,
      { z: 50, scale: 1.2, opacity: 0.5 },
      {
        z: -50,
        scale: 0.9,
        opacity: 0.05,
        yoyo: true,
        repeat: 1
      },
      "-=3"
    );

    gsap.to(avatarRef.current, {
      rotateY: 15,
      repeat: -1,
      yoyo: true,
      duration: 'random(4, 5)',
      ease: "sine.inOut"
    });

    const tlLinks = gsap.timeline({
      delay: 0.2,
      defaults: { ease: "sine.inOut", duration: 1 }
    });

    tlLinks.fromTo(`.${styles.linkItem}`,
      { y: 50, scale: 0 },
      {
        y: 0,
        scale: 1,
        duration: 0.2,
        stagger: 0.2,
        ease: "power2.inOut",
      }
    );

    tlLinks.to(`.${styles.linkItem}`,
      {
        duration: 1.2,
        opacity: 1,
      },
      "-=0.5"
    );

    tlLinks.fromTo(`.${styles.metrics}`,
      { y: 50, opacity: 0,},
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.inOut",
      },
      "-=0.75"
    );

    metrics.forEach((metric, index) => {
      gsap.to(`.metric-value-${index}`, {
        duration: 2,
        innerText: metric.value,
        snap: { innerText: 1 },
        ease: "power1.out",
        delay: 1.5,
        scrollTrigger: {
          trigger: `.${styles.metricsWrapper}`,
          start: "top 95%",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <main className={styles.container} ref={containerRef}>
      <SEO title="Links" path="/go" />
      <section className={styles.profile}>
        <div className={styles.avatar} ref={avatarRef}>
          <div className={styles.ringInner} ref={ringInnerRef} />
          <div className={styles.ringOuter} ref={ringOuterRef} />
          <img src={avatar} alt="koloNatalie" loading="eager"/>
        </div>
        <h1 className={styles.name}> koloNatalie</h1>
        <p className={styles.bio}><span>Creative Developer & Front-End Engineer</span><br /> React + GSAP + Three.js | Building high-performance web apps</p>
      </section>

      <section className={styles.linksList}>
        {links.map(link => (
          <Button
            key={link.url}
            variant='primary'
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
          >
            {link.title}
          </Button>
        ))}
      </section>

      <section className={styles.metrics}>
        <div className={styles.metricsWrapper}>
          <div className={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <div key={metric.label} className={styles.metricItem}>
                <span className={`metric-value-${index} ${styles.metricValue}`}>0</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
          <p className={styles.metricsTitle}>My portfolio on <a href='https://pagespeed.web.dev/analysis/https-kolonatalie-vercel-app/ouq4saig4j?form_factor=mobile' target="_blank" rel="noopener noreferrer">PageSpeed</a></p>
        </div>
        <Button
          variant='outline'
          href='https://www.linkedin.com/in/kolonatalie/'
          target="_blank"
          rel="noopener noreferrer"
          className={styles.metricsCTA}
        >
          Hire me
        </Button>
      </section>
    </main>
  );
};
export default LinksPage;