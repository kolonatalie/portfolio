import { useRef } from 'react';
import clsx from 'clsx';

import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import BackToTop from '@/components/ui/BackToTop/BackToTop';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import styles from './Footer.module.scss';



const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useScrollReveal(footerRef);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <p
        className={clsx("revealItem", styles.subtitle)}
        data-animation="fade"
      >
        That's all, folks!
      </p>
      <p
        className={clsx("revealItem", styles.accent)}
        data-animation="fade"
      >
        Any questions left? <a className={styles.textLink} href="#contact">Let's Connect</a>
      </p>

      <SocialLinks
        showExtended={true}
        className={clsx(styles.socialMedia, styles.footerMedia, "revealItem")}
        data-animation="fade"
        data-stagger="true"
      />

      <p className={styles.footerCredits}>
        © { new Date().getFullYear()} Built with love by <a href="https://github.com/kolonatalie" title="kolonatalie on GitHub" target="_blank"
          className={styles.textLink}>kolonatalie</a>
      </p>

      <BackToTop />
    </footer>
  );
};

export default Footer;