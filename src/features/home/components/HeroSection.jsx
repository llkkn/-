import { Link } from 'react-router-dom';
import Button from '@/shared/ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* 背景图片 */}
      <div className={styles.background}>
        <img
          src="/-/images/hero/hero-banner.webp"
          alt="傩面背景"
          loading="eager"
        />
      </div>

      {/* 深色渐变叠加 */}
      <div className={styles.overlay} />

      {/* 中央内容 */}
      <div className={styles.content}>
        <h1 className={styles.title}>傩面</h1>

        <div className={styles.decorLine} />

        <p className={styles.subtitle}>
          中国非物质文化遗产的神秘面容
        </p>

        <div className={styles.actions}>
          <Link to="/encyclopedia">
            <Button variant="secondary" size="lg">
              探索百科
            </Button>
          </Link>
          <Link to="/diy">
            <Button variant="primary" size="lg">
              开始创作
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
