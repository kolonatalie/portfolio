import { useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './TechCloud.module.scss';
import Magnetic from '@/components/common/Magnetic';


const SkillBar = ({ percentage }: { percentage: number }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { width: "0%" },
        {
          width: `${percentage}%`,
          duration: 0.6,
          delay: 0.3,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [percentage]);

  return (
    <div className={styles.barContainer}>
      <div ref={barRef} className={styles.barFill} />
    </div>
  );
};

const skills = [
  { name: 'GSAP', level: 1, stars: 4.75 },
  { name: 'Mobile-First', level: 2, stars: 5 },
  { name: 'React', level: 1, stars: 4.25 },
  { name: 'TypeScript', level: 1, stars: 4 },
  { name: 'JavaScript (ES6+)', level: 2, stars: 4.5 },
  { name: 'Three.js', level: 1, stars: 4 },
  { name: 'Blender 3D', level: 2, stars: 4 },
  { name: 'Clean Code', level: 2, stars: 4.5 },
  { name: 'WebGL', level: 1, stars: 3.5 },
  { name: 'Figma', level: 2, stars: 5 },
  { name: 'AR', level: 1, stars: 5 },
  { name: 'Git / GitHub', level: 2, stars: 4.5 },
];

const TechCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useGSAP(() => {
    const tags = containerRef.current?.querySelectorAll(`.${styles.tag}`);
    if (!tags) return;

    tags.forEach((tag, index) => {
      const isLevel1 = skills[index].level === 1;

      gsap.set(tag, {
        x: 'random(-30, 30)',
        y: 'random(-20, 20)',
      });

      gsap.to(tag, {
        x: '+=random(-20, 20)',
        y: '+=random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 'random(0, 2)'
      });

      if (isLevel1) {
        gsap.to(tag, {
          scale: 1.05,
          duration: 'random(1, 2)',
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 'random(0, 3)',
        });

        gsap.to(tag, {
          borderColor: "var(--clr-accent)",
          duration: 'random(0.5, 1.5)',
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: 'random(0, 1)',
        });
      }
    });
  }, { scope: containerRef });

  const handleToggle = (skillName: string, target: HTMLElement) => {
    if (activeSkill === skillName) {
      setActiveSkill(null);
    } else {
      setActiveSkill(skillName);
      gsap.fromTo(target,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "back.out(1)",
        }
      );
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, skillName: string, target: HTMLElement) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(skillName, target);
    }
  };

  return (
    <div ref={containerRef} className={styles.cloudContainer}>
      {skills.map((skill, i) => (
        <div
          key={i}
          className={clsx(
            styles.tagWrapper,
            activeSkill === skill.name && styles.isActive
          )}
          style={{ zIndex: skill.level === 1 ? 5 : 1 }}
        >
          <Magnetic>
            <div
              role="button" 
              tabIndex={0}
              onClick={(e) => handleToggle(skill.name, e.currentTarget)}
              onKeyDown={(e) => handleKeyDown(e, skill.name, e.currentTarget)}
              aria-expanded={activeSkill === skill.name}
              className={clsx(styles.tag, skill.level === 1 ? styles.tagBold : styles.tagReg)}
            >
              {skill.name}

              {activeSkill === skill.name && (
                <div className={styles.skillDetails}>
                  <SkillBar percentage={skill.stars * 20} />
                </div>
              )}
            </div>
          </Magnetic>
        </div>
      ))}
    </div>
  );
};

export default TechCloud;