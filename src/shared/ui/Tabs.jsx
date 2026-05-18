import { useState } from 'react';
import styles from './Tabs.module.css';

export default function Tabs({
  items = [],
  defaultIndex = 0,
  onChange,
  className = '',
  panelClassName = '',
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    onChange?.(index, items[index]);
  };

  return (
    <div className={className}>
      {/* 标签栏 */}
      <div className={styles.tabsList} role="tablist">
        {items.map((item, index) => (
          <button
            key={item.key ?? index}
            role="tab"
            aria-selected={activeIndex === index}
            className={`${styles.tab} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 面板内容 */}
      {items[activeIndex]?.content && (
        <div
          className={`${styles.tabPanel} ${panelClassName}`}
          role="tabpanel"
          key={activeIndex}
        >
          {items[activeIndex].content}
        </div>
      )}
    </div>
  );
}
