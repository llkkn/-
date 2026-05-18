import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './CTASection.module.css';

const links = [
  {
    to: '/encyclopedia',
    label: '傩面百科',
    desc: '深入了解傩面具的分类、历史与工艺',
    icon: '\u{1F4D6}',
  },
  {
    to: '/gallery',
    label: '展览馆',
    desc: '欣赏各地傩面具精品，感受艺术之美',
    icon: '\u{1F5BC}',
  },
  {
    to: '/diy',
    label: 'DIY工作台',
    desc: '亲手创作属于你的傩面作品',
    icon: '\u{1F3A8}',
  },
];

export default function CTASection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className={styles.cta} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>探索更多傩面文化</h2>
          <p className={styles.subtitle}>
            从百科知识到艺术创作，全方位体验傩面非遗的魅力
          </p>

          <div className={styles.linkCards}>
            {links.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className={styles.linkCard}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkDesc}>{link.desc}</span>
                <span className={styles.linkArrow}>&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
