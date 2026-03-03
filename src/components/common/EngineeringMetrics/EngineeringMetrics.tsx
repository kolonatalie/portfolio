import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import clsx from 'clsx';

import { PAGESPEED_METRICS } from '@/data/links';
import styles from './EngineeringMetrics.module.scss';

interface Props {
  className?: string;
  variant?: 'compact' | 'full';
}

const EngineeringMetrics = ({ className, variant = 'compact' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = PAGESPEED_METRICS;

  useGSAP(() => {
    metrics.forEach((metric, index) => {
      gsap.fromTo(`.metric-value-${index}`,
        { innerText: 0, },
        {
          innerText: metric.value,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={clsx(styles.metricsWrapper, className, styles[variant])}>
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={metric.label} className={styles.metricItem}>
            <div className={styles.circle}>
              <span className={clsx(`metric-value-${index}`, styles.metricValue)}>0</span>
            </div>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>
      <p className={styles.metricsTitle}>Check full report on <a href='https://pagespeed.web.dev/analysis/https-kolonatalie-vercel-app/ouq4saig4j?form_factor=mobile' target="_blank" rel="noopener noreferrer">PageSpeed</a></p>
    </div>
  );
};

export default EngineeringMetrics;