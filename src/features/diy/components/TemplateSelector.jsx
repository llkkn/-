/**
 * 模板选择器 - 顶部横向滚动模板缩略图列表
 */
import React from 'react';
import styles from './TemplateSelector.module.css';
import templates from '@/features/diy/data/templates';

function TemplateSelector({
  selectedTemplateId = null,
  onSelect,
}) {
  return (
    <div className={styles.selector}>
      <div className={styles.scrollContainer}>
        {/* 空白画布选项 */}
        <button
          className={`${styles.templateCard} ${!selectedTemplateId ? styles.active : ''}`}
          onClick={() => onSelect?.(null)}
          title="空白画布"
        >
          <div className={styles.thumbnail}>
            <svg
              width="48"
              height="64"
              viewBox="0 0 48 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="46"
                height="62"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
              />
              <line x1="24" y1="20" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span className={styles.name}>空白画布</span>
        </button>

        {/* 模板列表 */}
        {templates.map((template) => (
          <button
            key={template.id}
            className={`${styles.templateCard} ${selectedTemplateId === template.id ? styles.active : ''}`}
            onClick={() => onSelect?.(template.id)}
            title={template.description}
          >
            <div className={styles.thumbnail}>
              <img
                src={template.imageUrl}
                alt={template.name}
                loading="lazy"
              />
            </div>
            <span className={styles.name}>{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TemplateSelector);
