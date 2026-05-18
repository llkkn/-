import { useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import Card from '@/shared/ui/Card';
import operaGenresData from '../data/operaGenresData';
import GenreDetailModal from './GenreDetailModal';
import styles from './GenreSection.module.css';

export default function GenreSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (genre) => {
    setSelectedGenre(genre);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGenre(null);
  };

  return (
    <section className={styles.section} id="genre-section" ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>各地傩戏剧种</h2>
          <p className={styles.subtitle}>八种代表性傩戏，各具地方特色</p>
        </div>

        {/* 剧种卡片网格 */}
        <div className={styles.grid}>
          {operaGenresData.map((genre, index) => (
            <div
              key={genre.id}
              className={`${styles.cardWrapper} ${isVisible ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Card
                clickable
                onClick={() => handleCardClick(genre)}
                className={styles.genreCard}
              >
                <Card.Body className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.genreName}>{genre.name}</h3>
                    <span className={styles.heritageTag}>{genre.heritageLevel}</span>
                  </div>

                  <p className={styles.region}>{genre.region}</p>

                  <p className={styles.description}>
                    {genre.description}
                  </p>

                  <div className={styles.works}>
                    {genre.representativeWorks.slice(0, 3).map((work, idx) => (
                      <span key={idx} className={styles.workTag}>{work}</span>
                    ))}
                    {genre.representativeWorks.length > 3 && (
                      <span className={styles.workMore}>
                        +{genre.representativeWorks.length - 3}
                      </span>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      <GenreDetailModal
        genre={selectedGenre}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
