/**
 * 导出面板（弹窗形式）
 * PNG/JPG导出 + 分享到社区 + 文件名输入
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExportPanel.module.css';

function ExportPanel({
  isOpen = false,
  onClose,
  onExportPNG,
  onExportJPG,
}) {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('我的傩面作品');

  const handleExportPNG = () => {
    onExportPNG?.(fileName);
    onClose?.();
  };

  const handleExportJPG = () => {
    onExportJPG?.(fileName);
    onClose?.();
  };

  const handleShare = () => {
    onClose?.();
    navigate('/community/new');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 标题 */}
        <div className={styles.header}>
          <h3 className={styles.title}>导出作品</h3>
          <p className={styles.subtitle}>选择导出格式，保存你的傩面创作</p>
        </div>

        {/* 文件名 */}
        <div className={styles.field}>
          <label className={styles.label}>文件名</label>
          <input
            type="text"
            className={styles.input}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="输入作品名称"
          />
        </div>

        {/* 导出按钮 */}
        <div className={styles.actions}>
          <button className={`${styles.exportBtn} ${styles.png}`} onClick={handleExportPNG}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <div className={styles.btnInfo}>
              <span className={styles.btnTitle}>导出为 PNG</span>
              <span className={styles.btnDesc}>透明背景，适合打印和编辑</span>
            </div>
          </button>

          <button className={`${styles.exportBtn} ${styles.jpg}`} onClick={handleExportJPG}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <div className={styles.btnInfo}>
              <span className={styles.btnTitle}>导出为 JPG</span>
              <span className={styles.btnDesc}>白色背景，文件更小</span>
            </div>
          </button>

          <button className={`${styles.exportBtn} ${styles.share}`} onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <div className={styles.btnInfo}>
              <span className={styles.btnTitle}>分享到社区</span>
              <span className={styles.btnDesc}>发布作品到傩面社区</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ExportPanel);
