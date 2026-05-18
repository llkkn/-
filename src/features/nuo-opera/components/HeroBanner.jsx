import { Link } from 'react-router-dom';
import Button from '@/shared/ui/Button';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {/* 背景图片 */}
      <div className={styles.background}>
        <img
          src="/images/hero/hero-banner.webp"
          alt="傩戏背景"
          loading="eager"
        />
      </div>

      {/* 深色渐变叠加 */}
      <div className={styles.overlay} />

      {/* 中央内容 */}
      <div className={styles.content}>
        <h1 className={styles.title}>傩戏</h1>

        <div className={styles.decorLine} />

        <p className={styles.subtitle}>面具之下的千年活态戏曲</p>

        <p className={styles.intro}>
          傩戏是中国最古老的戏曲形式之一，起源于先秦驱傩仪式，融祭祀、歌舞、戏剧于一体，被誉为&ldquo;中国戏曲的活化石&rdquo;。
        </p>

        <div className={styles.actions}>
          <Button variant="secondary" size="lg" onClick={() => scrollToSection('genre-section')}>
            探索剧种
          </Button>
          <Link to="#repertoire-section" onClick={(e) => { e.preventDefault(); scrollToSection('repertoire-section'); }}>
            <Button variant="primary" size="lg">
              了解剧目
            </Button>
          </Link>
        </div>

        {/* 视频展示区域 */}
        <div className={styles.videoSection}>
          <h3 className={styles.videoTitle}>傩戏实况</h3>
          <div className={styles.videoWrapper}>
            <iframe
              src="//player.bilibili.com/player.html?bvid=BV1EZwjzvE7s&page=1&high_quality=1"
              scrolling="no"
              border="0"
              frameBorder="no"
              framespacing="0"
              allowFullScreen="true"
              className={styles.videoIframe}
              title="贵州安顺地戏 - 傩戏实况"
            />
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
