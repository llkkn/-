/**
 * 工具栏 - 左侧竖向工具按钮列表
 * 移动端变为水平工具栏
 */
import React from 'react';
import styles from './ToolBar.module.css';

const tools = [
  {
    id: 'brush',
    name: '画笔',
    description: '自由绘制线条，支持压感和毛笔效果',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: 'eraser',
    name: '橡皮擦',
    description: '擦除画布上的内容，支持调节大小',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L14.8 1.4c.8-.8 2-.8 2.8 0l5 5c.8.8.8 2 0 2.8L11 20" />
        <path d="M6 11l7 7" />
      </svg>
    ),
  },
  {
    id: 'line',
    name: '直线',
    description: '按住拖拽绘制直线，适合绘制面具对称线条和装饰边框',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="19" x2="19" y2="5" />
      </svg>
    ),
  },
  {
    id: 'rect',
    name: '矩形',
    description: '按住拖拽绘制矩形，适合绘制面具框架和色块区域',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: 'circle',
    name: '圆形',
    description: '按住拖拽绘制圆形/椭圆，适合绘制面具眼睛和额镜装饰',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: 'fill',
    name: '填充',
    description: '点击封闭区域进行颜色填充，适合面具大面积上色',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l1-1h3l9-9" />
        <path d="M3 21v-3l9-9" />
        <path d="M14.5 5.5l4 4" />
        <path d="M18 2l4 4" />
        <path d="M22 16c0 2-2 4-2 4s-2-2-2-4 2-4 2-4 2 2 2 4z" />
      </svg>
    ),
  },
  {
    id: 'stamp',
    name: '图案印章',
    description: '点击放置傩面文化纹样，可在右侧面板选择纹样和大小',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'move',
    name: '选择移动',
    description: '选择并移动画布上的元素',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 9l-3 3 3 3" />
        <path d="M9 5l3-3 3 3" />
        <path d="M15 19l-3 3-3-3" />
        <path d="M19 9l3 3-3 3" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
];

function ToolBar({
  activeTool = 'brush',
  onToolChange,
}) {
  return (
    <div className={styles.toolbar}>
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`${styles.toolBtn} ${activeTool === tool.id ? styles.active : ''}`}
          onClick={() => onToolChange?.(tool.id)}
          title={tool.name}
          data-tooltip={tool.name}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}

export { tools };
export default React.memo(ToolBar);
