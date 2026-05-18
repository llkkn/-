import { useState } from 'react';
import Card from '@/shared/ui/Card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import regionalStyles from '@/features/encyclopedia/data/regionalStyles';
import styles from './RegionalSection.module.css';

const regionImages = {
  pingxiang: '/images/masks/pingxiang/zhongkui.jpg',
  chizhou: '/images/masks/chizhou/baogong.jpg',
  anshun: '/images/masks/anshun/wenjiang.jpg',
  wuan: '/images/masks/wuan/kailu.jpg',
  luxi: '/images/masks/luxi/kaishan-luxi.jpg',
};

const regionColors = {
  pingxiang: { accent: '#B22222', light: '#FFF0F0' },
  chizhou: { accent: '#5B7FA5', light: '#F0F5FA' },
  anshun: { accent: '#2E7D32', light: '#F0F8F0' },
  wuan: { accent: '#8B4513', light: '#F5EDE5' },
  luxi: { accent: '#6A1B9A', light: '#F5F0FA' },
};

export default function RegionalSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section id="regional" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>地域流派</h2>
        <p className={styles.subtitle}>
          大江南北，各具风韵 -- 五大傩面具地域流派巡礼
        </p>

        <div className={styles.cardList}>
          {regionalStyles.map((region) => (
            <RegionalCard key={region.id} region={region} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegionalCard({ region }) {
  const [expanded, setExpanded] = useState(false);
  const colors = regionColors[region.id] || regionColors.pingxiang;
  const image = regionImages[region.id];

  return (
    <Card hoverable={false} className={styles.card}>
      {/* 头部区域 */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.regionName} style={{ color: colors.accent }}>
            {region.name}
          </h3>
          <div className={styles.meta}>
            <span className={styles.region}>{region.region}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.heritage}>{region.heritageLevel}</span>
          </div>
        </div>
        {image && (
          <div className={styles.cardImage}>
            <img src={image} alt={region.name} loading="lazy" />
          </div>
        )}
      </div>

      {/* 简介 */}
      <p className={styles.description}>{region.description}</p>

      {/* 特色列表 */}
      <div className={styles.features}>
        <ul className={styles.featureList}>
          {region.features.slice(0, 3).map((feat) => (
            <li key={feat} className={styles.featureItem}>
              <span className={styles.featureDot} style={{ backgroundColor: colors.accent }} />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* 展开按钮 */}
      <button
        className={styles.expandBtn}
        onClick={() => setExpanded(!expanded)}
        style={{ color: colors.accent }}
      >
        <span>{expanded ? '收起详情' : '展开详情'}</span>
        <svg
          className={`${styles.expandIcon} ${expanded ? styles.expanded : ''}`}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* 展开内容 */}
      <div className={`${styles.expandContent} ${expanded ? styles.show : ''}`}>
        {/* 完整特色列表 */}
        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>艺术特色</h4>
          <ul className={styles.detailList}>
            {region.features.map((feat) => (
              <li key={feat} className={styles.detailItem}>
                <span className={styles.detailDot} style={{ backgroundColor: colors.accent }} />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* 历史 */}
        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>历史沿革</h4>
          <p className={styles.detailText}>{region.history}</p>
        </div>

        {/* 代表面具 */}
        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>代表面具</h4>
          <div className={styles.maskList}>
            {region.representativeMasks.map((mask) => (
              <div key={mask.name} className={styles.maskItem}>
                <span className={styles.maskName} style={{ color: colors.accent }}>
                  {mask.name}
                </span>
                <span className={styles.maskDesc}>{mask.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
