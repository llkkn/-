import useScrollAnimation from '@/hooks/useScrollAnimation';
import timelineData from '@/features/home/data/timelineData';
import styles from './TimelineSection.module.css';

export default function TimelineSection() {
  return (
    <section className={styles.timeline}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>历史长河</span>
        <h2 className={styles.title}>傩面千年</h2>
      </div>

      <div className={styles.timelineList}>
        {timelineData.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isLeft ? styles.itemLeft : styles.itemRight} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.dot} />

      <div className={styles.content}>
        <div className={styles.year}>{item.year}</div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDescription}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}
