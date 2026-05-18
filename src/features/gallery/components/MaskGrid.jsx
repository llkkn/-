import { useEffect, useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './MaskGrid.module.css';

/* ---------- MaskCard 内联组件 ---------- */
function MaskCard({ mask, onClick, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`${styles.card} animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onClick(mask)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(mask);
        }
      }}
      aria-label={`查看${mask.name}详情`}
    >
      {/* 图片区域 */}
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={mask.imageUrl}
          alt={mask.name}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className={styles.imagePlaceholder} style={{ display: 'none' }}>
          {mask.name.charAt(0)}
        </div>
      </div>

      {/* 信息区域 */}
      <div className={styles.info}>
        <h3 className={styles.name}>{mask.name}</h3>
        <span className={styles.badge}>{mask.regionName}</span>
      </div>
    </div>
  );
}

/* ---------- MaskGrid 主组件 ---------- */
export default function MaskGrid({ items, onMaskClick }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>&#127912;</div>
        <p className={styles.emptyText}>没有找到匹配的傩面</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((mask, index) => (
        <MaskCard
          key={mask.id}
          mask={mask}
          onClick={onMaskClick}
          index={index}
        />
      ))}
    </div>
  );
}
