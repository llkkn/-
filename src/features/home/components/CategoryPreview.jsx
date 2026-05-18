import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import maskCategories from '@/features/encyclopedia/data/maskCategories';
import styles from './CategoryPreview.module.css';

/* 角色色彩映射 */
const roleColorMap = {
  wenchen: ['#C23B22', '#C9A96E', '#F5F0E8'],
  wujiang: ['#C23B22', '#1A1A1A', '#C9A96E'],
  laoweng: ['#DEB887', '#8B6914', '#FFFFFF'],
  shaofu: ['#FFB6C1', '#FFFFFF', '#DCC494'],
  shenxian: ['#C9A96E', '#C23B22', '#1A1A1A'],
  choujiao: ['#4A7C59', '#D44444', '#F0C040'],
};

export default function CategoryPreview() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className={styles.categoryPreview} ref={sectionRef}>
      <div
        className={`${styles.header} ${styles.section} ${isVisible ? styles.visible : ''}`}
      >
        <span className={styles.sectionLabel}>角色分类</span>
        <h2 className={styles.title}>傩面角色</h2>
      </div>

      <div className={styles.grid}>
        {maskCategories.byRole.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>

      <div
        className={`${styles.footer} ${styles.section} ${isVisible ? styles.visible : ''}`}
      >
        <Link to="/encyclopedia" className={styles.viewAll}>
          查看全部
          <span className={styles.arrow}>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const colors = roleColorMap[category.id] || ['#C9A96E', '#C23B22', '#1A1A1A'];

  return (
    <div
      ref={ref}
      className={`${styles.card} ${styles.section} ${isVisible ? styles.visible : ''}`}
      style={{
        '--card-accent': colors[0],
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className={styles.colorHint}>
        {colors.map((color, i) => (
          <span
            key={i}
            className={styles.colorDot}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <h3 className={styles.cardName}>{category.name}</h3>
      <p className={styles.cardDescription}>{category.description}</p>
    </div>
  );
}
