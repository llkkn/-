/**
 * 图案装饰面板
 * 纹样网格展示 + 大小/颜色设置
 */
import React from 'react';
import styles from './PatternPanel.module.css';
import patterns from '@/features/diy/data/patterns';

function PatternPanel({
  selectedPatternId = null,
  onPatternSelect,
  patternSize = 40,
  onPatternSizeChange,
  patternColor = '#C9A96E',
  onPatternColorChange,
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>选择纹样</h4>
        <div className={styles.patternGrid}>
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              className={`${styles.patternCard} ${selectedPatternId === pattern.id ? styles.active : ''}`}
              onClick={() => onPatternSelect?.(pattern.id)}
              title={pattern.description}
            >
              <div className={styles.patternSvg}>
                <img
                  src={pattern.image}
                  alt={pattern.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: selectedPatternId === pattern.id ? 1 : 0.5,
                    filter: selectedPatternId === pattern.id ? 'none' : 'grayscale(100%)',
                  }}
                />
              </div>
              <span className={styles.patternName}>{pattern.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 纹样大小 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <label className={styles.label}>纹样大小</label>
          <span className={styles.value}>{patternSize}px</span>
        </div>
        <input
          type="range"
          className={styles.slider}
          min="10"
          max="120"
          value={patternSize}
          style={{ '--progress': `${((patternSize - 10) / (120 - 10)) * 100}%` }}
          onChange={(e) => onPatternSizeChange?.(Number(e.target.value))}
        />
      </div>

      {/* 纹样颜色 */}
      <div className={styles.section}>
        <label className={styles.label}>纹样颜色</label>
        <div className={styles.colorRow}>
          <input
            type="color"
            className={styles.colorInput}
            value={patternColor}
            onChange={(e) => onPatternColorChange?.(e.target.value)}
          />
          <span className={styles.colorValue}>{patternColor.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PatternPanel);
