import clsx from 'clsx';
import {
  GitHubIcon,
  LinkedinIcon,
  BlueskyIcon,
  MastodonIcon,
  XIcon,
} from '../Icons';

import styles from './SocialLinks.module.scss';

interface SocialLinksProps extends React.HTMLAttributes<HTMLUListElement> {
  showExtended?: boolean;
  className?: string;
}

const SocialLinks = ({
  showExtended = true,
  className,
  ...props
}: SocialLinksProps) => {
  return (
    <ul className={clsx(styles.socialMedia, className)} {...props}>
      <li>
        <a href="https://github.com/kolonatalie" title="GitHub" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className={styles.socialIcon} />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/kolonatalie/" title="Linkedin" target="_blank"
          rel="noopener noreferrer">
          <LinkedinIcon className={styles.socialIcon} />
        </a>
      </li>
      <li>
        <a href="https://x.com/dev_kolonatalie" title="X" target="_blank" rel="noopener noreferrer">
          <XIcon className={styles.socialIcon} />
        </a>
      </li>

      {showExtended && (
        <>
          <li className={styles.smartphone}>
            <a href="https://bsky.app/profile/kolonatalie.bsky.social" title="Bluesky" target="_blank"
              rel="noopener noreferrer">
              <BlueskyIcon className={styles.socialIcon} />
            </a>
          </li>
          <li className={styles.smartphone}>
            <a href="https://mastodon.social/@kolonatalie" title="Mastodon" target="_blank"
              rel="noopener noreferrer">
              <MastodonIcon className={styles.socialIcon} />
            </a>
          </li>
        </>
      )}
    </ul>
  );
};

export default SocialLinks;