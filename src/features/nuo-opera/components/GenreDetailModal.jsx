import Modal from '@/shared/ui/Modal';
import styles from './GenreDetailModal.module.css';

export default function GenreDetailModal({ genre, isOpen, onClose }) {
  if (!genre) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={styles.modalContent}
    >
      <Modal.Header className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{genre.name}</h2>
          <span className={styles.region}>{genre.region}</span>
        </div>
        <span className={styles.heritageTag}>{genre.heritageLevel}</span>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        {/* 简介 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>简介</h3>
          <p className={styles.description}>{genre.description}</p>
        </div>

        {/* 表演风格 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>表演风格</h3>
          <p className={styles.description}>{genre.performanceStyle}</p>
        </div>

        {/* 特色 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>艺术特色</h3>
          <ul className={styles.featureList}>
            {genre.features.map((feature, idx) => (
              <li key={idx} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* 乐器 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>伴奏乐器</h3>
          <div className={styles.tagGroup}>
            {genre.musicalInstruments.map((inst, idx) => (
              <span key={idx} className={styles.tag}>{inst}</span>
            ))}
          </div>
        </div>

        {/* 代表剧目 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>代表剧目</h3>
          <div className={styles.tagGroup}>
            {genre.representativeWorks.map((work, idx) => (
              <span key={idx} className={`${styles.tag} ${styles.tagGold}`}>{work}</span>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
