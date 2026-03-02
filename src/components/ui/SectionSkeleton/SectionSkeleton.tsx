import styles from './SectionSkeleton.module.scss';

const SectionSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.shimmer} />
      <div className={styles.container}>
        <div className={styles.titleLine} />
        <div className={styles.contentBlock} />
      </div>
    </div>
  );
};

export default SectionSkeleton;