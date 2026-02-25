import { useRef } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PROJECTS_DATA } from '@/data/projects';
import Button from '@/components/ui/Button/Button';
import Magnetic from '@/components/common/Magnetic';
import { ArrowIcon } from '@/components/ui/Icons';

import styles from './Projects.module.scss';
import { useSound } from '@/hooks/useSound';
import hoverSound from '@/assets/sounds/whoosh.mp3';
import { useLenis } from 'lenis/react';


const Projects = () => {
  const projectsRef = useRef<HTMLElement>(null);
  useScrollReveal(projectsRef);
  const lenis = useLenis();
  const playHoverSound = useSound(hoverSound, 0.15);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(`.${styles.img} img`).forEach(img => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.projectCard}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listeners: { card: HTMLElement; move: any; leave: any; enter: any }[] = [];

    cards.forEach(card => {
      let rect = card.getBoundingClientRect();

      const handleMouseEnter = () => {
        rect = card.getBoundingClientRect();
      };

      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      listeners.push({ card, enter: handleMouseEnter, move: handleMouseMove, leave: handleMouseLeave });
    });

    return () => {
      listeners.forEach(({ card, enter, move, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };

  }, { scope: projectsRef });

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link === "/" || link === import.meta.env.BASE_URL) {
      e.preventDefault();
      lenis?.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <section
      className={styles.projects}
      id="projects"
      ref={projectsRef}
    >
      <p className={clsx("revealItem", styles.accent)} data-animation="fade">— projects</p>
      <h2 className="revealItem" data-animation="fade">selected projects</h2>
      <p className={clsx("revealItem", styles.subtitle)} data-animation="fade">A mix of creative motion and engineering logic</p>

      <div
        className={styles.projectsGrid}
      >
        {PROJECTS_DATA.map((project) => (
          <a
            key={project.id}
            onMouseEnter={playHoverSound}
            href={project.link}
            onClick={(e) => handleProjectClick(e, project.link)}
            className={styles.projectLink}
            target={project.target}
            title={project.title}
          >
            <article className={styles.projectCard}>
              <div className={styles.arrowWrapper}><ArrowIcon /></div>
              <div className={styles.imageOverlay}>
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
                <div className={styles.tags}>
                  {project.tags?.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.img}>
                <img
                  src={project.img}
                  alt={project.alt}
                  width="400"
                  height="500"
                  loading="lazy"
                />
              </div>
            </article>
          </a>
        ))}
      </div>

      <div
        className={clsx("revealItem", styles.projectsCta)}
        data-animation="fade"
        data-stagger="true"
      >
        <h4>like what you see?</h4>
        <div className={styles.btnGroup}>
          <Magnetic>
            <Button
              variant="secondary"
              href="https://github.com/kolonatalie"
              target="_blank"
              title="gitHub"
              className={styles.ctaBtn}
            >
              See more on GitHub
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              variant="primary"
              href="#contact"
              className={styles.ctaBtnSecondary}
            >
              Start a project
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Projects;