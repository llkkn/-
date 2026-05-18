import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './CTASection.module.css';

export default function CTASection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className={styles.cta} ref={ref}>
      <div
        className={`${styles.content} ${styles.section} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.decorLine} />
        <h2 className={styles.title}>亲手创作你的傩面</h2>
        <p className={styles.subtitle}>
          使用在线DIY工具，体验传统傩面艺术的魅力
        </p>
        <Link to="/diy" className={styles.ctaButton}>
          进入DIY工作台
        </Link>
      </div>
    </section>
  );
}
