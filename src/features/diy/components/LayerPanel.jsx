/**
 * 图层面板
 * 图层列表 + 可见性切换 + 添加图层
 */
import React from 'react';
import styles from './LayerPanel.module.css';

const eyeOpenIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const eyeClosedIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

function LayerPanel({
  layers = defaultLayers,
  activeLayerId = null,
  onActiveLayerChange,
  onVisibilityToggle,
  onAddLayer,
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h4 className={styles.title}>图层</h4>
        <span className={styles.count}>{layers.length}</span>
      </div>

      <div className={styles.layerList}>
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`${styles.layerItem} ${activeLayerId === layer.id ? styles.active : ''}`}
            onClick={() => onActiveLayerChange?.(layer.id)}
          >
            {/* 缩略图 */}
            <div className={styles.thumbnail}>
              <div
                className={styles.thumbnailContent}
                style={{
                  backgroundColor: layer.color || 'transparent',
                  backgroundImage: layer.color
                    ? 'none'
                    : 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                  backgroundSize: layer.color ? 'auto' : '8px 8px',
                  backgroundPosition: layer.color ? 'auto' : '0 0, 0 4px, 4px -4px, -4px 0px',
                }}
              />
            </div>

            {/* 名称 */}
            <span className={styles.layerName}>{layer.name}</span>

            {/* 可见性切换 */}
            <button
              className={`${styles.eyeBtn} ${!layer.visible ? styles.hidden : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onVisibilityToggle?.(layer.id);
              }}
              title={layer.visible ? '隐藏图层' : '显示图层'}
              aria-label="切换图层可见性"
            >
              {layer.visible !== false ? eyeOpenIcon : eyeClosedIcon}
            </button>
          </div>
        ))}
      </div>

      {/* 添加图层按钮 */}
      <button className={styles.addBtn} onClick={onAddLayer}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>添加图层</span>
      </button>
    </div>
  );
}

const defaultLayers = [
  { id: 'background', name: '背景层', visible: true, color: '#F5F0E8' },
  { id: 'drawing', name: '绘图层', visible: true, color: null },
  { id: 'pattern', name: '图案层', visible: true, color: null },
  { id: 'preview', name: '预览层', visible: true, color: null },
];

export default React.memo(LayerPanel);
