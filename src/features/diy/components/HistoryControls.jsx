/**
 * 历史控制栏 - 底部状态栏
 * 撤销/重做/清空/导出按钮 + 当前状态显示
 */
import React from 'react';
import styles from './HistoryControls.module.css';

function HistoryControls({
  canUndo = false,
  canRedo = false,
  currentTool = 'brush',
  brushSize = 5,
  onUndo,
  onRedo,
  onClear,
  onExport,
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <button
          className={styles.btn}
          onClick={onUndo}
          disabled={!canUndo}
          title="撤销 (Ctrl+Z)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span className={styles.btnLabel}>撤销</span>
          <kbd className={styles.kbd}>Ctrl+Z</kbd>
        </button>

        <button
          className={styles.btn}
          onClick={onRedo}
          disabled={!canRedo}
          title="重做 (Ctrl+Shift+Z)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
          </svg>
          <span className={styles.btnLabel}>重做</span>
          <kbd className={styles.kbd}>Ctrl+Shift+Z</kbd>
        </button>

        <div className={styles.divider} />

        <button
          className={`${styles.btn} ${styles.danger}`}
          onClick={onClear}
          title="清空画布"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span className={styles.btnLabel}>清空</span>
        </button>
      </div>

      <div className={styles.center}>
        <span className={styles.statusItem}>
          <span className={styles.statusDot} />
          {getToolName(currentTool)}
        </span>
        <span className={styles.statusSeparator}>|</span>
        <span className={styles.statusItem}>
          画笔大小: {brushSize}px
        </span>
      </div>

      <div className={styles.right}>
        <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={onExport}
          title="导出作品"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className={styles.btnLabel}>导出</span>
        </button>
      </div>
    </div>
  );
}

function getToolName(tool) {
  const names = {
    brush: '画笔',
    eraser: '橡皮擦',
    fill: '填充',
    text: '文字',
    stamp: '图案印章',
    move: '选择移动',
  };
  return names[tool] || tool;
}

export default React.memo(HistoryControls);
