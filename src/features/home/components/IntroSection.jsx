import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './IntroSection.module.css';

export default function IntroSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className={styles.intro} ref={sectionRef}>
      <div className={styles.container}>
        <div
          className={`${styles.textSide} ${styles.section} ${isVisible ? styles.visible : ''}`}
        >
          <span className={styles.sectionLabel}>关于傩面</span>
          <h2 className={styles.title}>什么是傩面</h2>
          <p className={styles.description}>
            傩面具是中国传统傩文化的重要载体，兼具宗教祭祀与戏剧表演功能，通过夸张的造型传递驱邪纳吉的象征意义。傩面具可追溯至先秦时期的巫傩仪式，距今已有三千多年历史。
          </p>
        </div>

        <div
          className={`${styles.imageSide} ${styles.section} ${isVisible ? styles.visible : ''}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src="/-/images/masks/anshun/wujiang.jpg"
              alt="傩面展示"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
