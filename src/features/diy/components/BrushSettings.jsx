/**
 * 画笔设置面板
 * 画笔大小、透明度、画笔类型
 */
import React from 'react';
import styles from './BrushSettings.module.css';

function BrushSettings({
  brushSize = 5,
  onBrushSizeChange,
  opacity = 100,
  onOpacityChange,
  brushType = 'normal',
  onBrushTypeChange,
}) {
  return (
    <div className={styles.panel}>
      {/* 画笔大小 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <label className={styles.label}>画笔大小</label>
          <span className={styles.value}>{brushSize}px</span>
        </div>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min="1"
            max="50"
            value={brushSize}
            style={{ '--progress': `${((brushSize - 1) / (50 - 1)) * 100}%` }}
            onChange={(e) => onBrushSizeChange?.(Number(e.target.value))}
          />
        </div>
        {/* 实时预览 */}
        <div className={styles.preview}>
          <div
            className={styles.previewDot}
            style={{
              width: Math.min(brushSize, 50),
              height: Math.min(brushSize, 50),
              opacity: opacity / 100,
            }}
          />
        </div>
      </div>

      {/* 透明度 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <label className={styles.label}>透明度</label>
          <span className={styles.value}>{opacity}%</span>
        </div>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min="0"
            max="100"
            value={opacity}
            style={{ '--progress': `${((opacity - 0) / (100 - 0)) * 100}%` }}
            onChange={(e) => onOpacityChange?.(Number(e.target.value))}
          />
        </div>
      </div>

      {/* 画笔类型 */}
      <div className={styles.section}>
        <label className={styles.label}>画笔类型</label>
        <div className={styles.typeList}>
          <button
            className={`${styles.typeBtn} ${brushType === 'normal' ? styles.active : ''}`}
            onClick={() => onBrushTypeChange?.('normal')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="20" x2="20" y2="4" />
              <circle cx="4" cy="20" r="1.5" fill="currentColor" />
            </svg>
            <span>普通画笔</span>
          </button>
          <button
            className={`${styles.typeBtn} ${brushType === 'calligraphy' ? styles.active : ''}`}
            onClick={() => onBrushTypeChange?.('calligraphy')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2l-6 18-2-6-6-2L18 2z" />
            </svg>
            <span>毛笔效果</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BrushSettings);
