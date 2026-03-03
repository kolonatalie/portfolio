import EngineeringMetrics from '@/components/common/EngineeringMetrics/EngineeringMetrics';

import styles from './ProductionStandards.module.scss';


const ProductionStandards = () => {
  return (
    <section className={styles.standards}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className={styles.title}>portfolio scores</h3>
          <p className={styles.description}>
            Quality is not an accident. It's the result of intelligent effort.
          </p>
        </div>

        <EngineeringMetrics variant="full" className={styles.customMetrics} />

        <div className={styles.badges}>
          <span className={styles.badge}>SonarCloud Grade A</span>
          <span className={styles.badge}>TypeScript Strict</span>
          <span className={styles.badge}>WCAG 2.1 Compliant</span>
        </div>
      </div>
    </section>
  );
};

export default ProductionStandards;