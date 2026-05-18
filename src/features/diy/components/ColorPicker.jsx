/**
 * 颜色选择器面板
 * 预设颜色分组 + 自定义颜色 + 最近使用颜色
 */
import React, { useState } from 'react';
import styles from './ColorPicker.module.css';
import presetColors from '@/features/diy/data/presetColors';

const MAX_RECENT = 8;

function ColorPicker({
  currentColor = '#C41E1E',
  onColorChange,
  recentColors = [],
  onRecentColorsChange,
}) {
  const [customColor, setCustomColor] = useState(currentColor);

  const handlePresetClick = (color) => {
    onColorChange?.(color);
    setCustomColor(color);
    addRecentColor(color);
  };

  const handleCustomChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    onColorChange?.(color);
    addRecentColor(color);
  };

  const addRecentColor = (color) => {
    if (!color) return;
    const updated = [color, ...recentColors.filter((c) => c !== color)].slice(0, MAX_RECENT);
    onRecentColorsChange?.(updated);
  };

  return (
    <div className={styles.panel}>
      {/* 当前颜色预览 */}
      <div className={styles.currentPreview}>
        <div
          className={styles.previewSwatch}
          style={{ backgroundColor: currentColor }}
        />
        <div className={styles.previewInfo}>
          <span className={styles.previewLabel}>当前颜色</span>
          <span className={styles.previewValue}>{currentColor.toUpperCase()}</span>
        </div>
      </div>

      {/* 传统色板 */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>传统色板</h4>
        <div className={styles.colorGrid}>
          {presetColors.traditional.map((item) => (
            <button
              key={item.color}
              className={`${styles.colorSwatch} ${currentColor === item.color ? styles.active : ''}`}
              style={{ backgroundColor: item.color }}
              onClick={() => handlePresetClick(item.color)}
              title={`${item.name} - ${item.description}`}
              aria-label={`${item.name} ${item.color}`}
            />
          ))}
        </div>
      </div>

      {/* 皮肤色板 */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>皮肤色板</h4>
        <div className={styles.colorGrid}>
          {presetColors.skinTone.map((item) => (
            <button
              key={item.color}
              className={`${styles.colorSwatch} ${currentColor === item.color ? styles.active : ''}`}
              style={{ backgroundColor: item.color }}
              onClick={() => handlePresetClick(item.color)}
              title={`${item.name} - ${item.description}`}
              aria-label={`${item.name} ${item.color}`}
            />
          ))}
        </div>
      </div>

      {/* 装饰色板 */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>装饰色板</h4>
        <div className={styles.colorGrid}>
          {presetColors.decorative.map((item) => (
            <button
              key={item.color}
              className={`${styles.colorSwatch} ${currentColor === item.color ? styles.active : ''}`}
              style={{ backgroundColor: item.color }}
              onClick={() => handlePresetClick(item.color)}
              title={`${item.name} - ${item.description}`}
              aria-label={`${item.name} ${item.color}`}
            />
          ))}
        </div>
      </div>

      {/* 自定义颜色 */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>自定义颜色</h4>
        <div className={styles.customRow}>
          <input
            type="color"
            className={styles.colorInput}
            value={customColor}
            onChange={handleCustomChange}
          />
          <input
            type="text"
            className={styles.hexInput}
            value={customColor.toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setCustomColor(val);
                if (val.length === 7) {
                  onColorChange?.(val);
                  addRecentColor(val);
                }
              }
            }}
            maxLength={7}
          />
        </div>
      </div>

      {/* 最近使用颜色 */}
      {recentColors.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>最近使用</h4>
          <div className={styles.colorGrid}>
            {recentColors.map((color) => (
              <button
                key={color}
                className={`${styles.colorSwatch} ${currentColor === color ? styles.active : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetClick(color)}
                title={color}
                aria-label={`${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(ColorPicker);
