import { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import { CircleIcon, EnvelopeIcon } from '@/components/ui/Icons';
import Button from '@/components/ui/Button/Button';
import Magnetic from '@/components/common/Magnetic';
import mainPhoto from '@/assets/images/kolonatalie-main-photo400.webp';
import TechCloud from '../TechCloud/TechCloud';
import popSound from '@/assets/sounds/bubble-pop.mp3';

import styles from './About.module.scss';
import { useSound } from '@/hooks/useSound';


const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  useScrollReveal(aboutRef);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const playPopSound = useSound(popSound, 0.3);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {
          word.split("").map((char, j) => (
            <span key={j} className="char" style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))
        }
        <span className="char">&nbsp;</span>
      </span >
    ));
  };

  const renderedTitle = useMemo(() => (
    <>
      <h2 className={styles.nameTitle}>{splitText("hey, i’m natalie,")}</h2>
      <h2 className={styles.jobTitle}>{splitText("creative developer")}</h2>
    </>
  ), []);

  useGSAP(() => {
    if (isBubbleOpen) {
      gsap.fromTo(bubbleRef.current,
        {
          scale: 0,
          x: -60,
          y: -50,
          opacity: 0,
          transformOrigin: 'top right'
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          display: 'block',
          delay: 0.25,
          overwrite: 'auto',
        }
      );
    } else {
      gsap.to(bubbleRef.current, {
        scale: 0,
        x: -60,
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        display: 'none',
        overwrite: 'auto'
      });
    }
  }, [isBubbleOpen]);

  const toggleBubble = () => {
    if (!isBubbleOpen) {
      playPopSound();
    }
    setIsBubbleOpen(!isBubbleOpen);
  };

  return (
    <section
      ref={aboutRef}
      className={styles.about}
      id="about"
    >
      <p className={styles.accent}>— about me</p>
      <div className={styles.story}>
        <div className="revealItem" data-animation="text-reveal">
          {renderedTitle}
          <p className={styles.subtitle}>focused on creative frontend</p>
        </div>
        <div className={clsx(styles.storyImg, "revealItem")} data-animation="fade">
          <img src={mainPhoto} alt="kolonatalie front-end developer" />
          <div className={styles.bubble}>
            <Magnetic className={styles.bubbleTrigger} strength={0.2}>
              <button
                onClick={toggleBubble}
                aria-label="Read a message"
              >
                <span>{isBubbleOpen ? <CircleIcon /> : <EnvelopeIcon className={styles.chatIcon} />}</span>
              </button>
            </Magnetic>
            <div className={styles.speechBubble} ref={bubbleRef} style={{ display: 'none' }}>
              <p>I'm currently <strong>open to new roles</strong> and creative collaborations. <br /><a href="#contact" className={styles.textLink}>Let's build something iconic!</a></p>
              <button className={styles.closeBubble} onClick={() => setIsBubbleOpen(false)}>×</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(styles.storyBio, "revealItem")}
        data-animation="fade"
        data-stagger="true"
      >
        <p>
          I'm bridging the gap between high-end visual design and disciplined frontend engineering.
          With over 6 years of experience crafting AR effects and immersive digital experiences, I build interfaces with high-performance interactions that drive engagement.
          <br /><br />
          My focus is on creative technology: leveraging <strong>GSAP, Three.js, and WebGL</strong> to create "wow" effects,
          while maintaining a rock-solid foundation in <strong>React, TypeScript</strong>, and Semantic HTML.
          I ensure that complex animations never compromise <strong>SEO, accessibility, or page speed</strong>.
          <br /><br />
          I bring the same level of obsessive detail to every production-ready applications as I did to the portfolio you see today. Whether it's a micro-interaction or a large-scale application, my goal is to deliver clean, scalable code that feels as good as it looks.
        </p>
        <p className={styles.quote}>
          For me, the web is a canvas for storytelling through code, where performance and creativity exist in perfect balance.
        </p>
        <SocialLinks
          showExtended={true}
          className={clsx(styles.socialMedia, "revealItem")}
          data-animation="fade"
          data-stagger="true"
        />
      </div>
      <h2 className={clsx(styles.techStack, "revealItem")} data-animation="fade">tech stack</h2>
      <p className={styles.techSubtitle}>Click a skill to view proficiency</p>
      <div className={styles.skills}>
        <TechCloud />
      </div>
      <Magnetic className={styles.ctaBtn} strength={0.2}>
        <Button
          variant="primary"
          href="#contact"
        >
          Let’s work together
        </Button>
      </Magnetic>
    </section>
  );
};

export default About;