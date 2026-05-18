/**
 * DIY傩面工作台 - 主页面
 * 整合所有子组件：模板选择器、工具栏、画布、设置面板、历史控制
 *
 * 修复：集成 useDrawing Hook，将绘图状态和事件正确绑定到 Canvas 元素
 * 新增：新手教程引导功能
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import TemplateSelector from './components/TemplateSelector';
import ToolBar, { tools } from './components/ToolBar';
import CanvasWorkspace from './components/CanvasWorkspace';
import ColorPicker from './components/ColorPicker';
import BrushSettings from './components/BrushSettings';
import PatternPanel from './components/PatternPanel';
import LayerPanel from './components/LayerPanel';
import HistoryControls from './components/HistoryControls';
import ExportPanel from './components/ExportPanel';
import styles from './DIYStudio.module.css';

// ==================== 新手教程数据 ====================
const TUTORIAL_STEPS = [
  {
    title: '选择模板',
    description: '从顶部模板栏选择一个傩面模板，或使用空白画布开始自由创作。',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: '选择工具',
    description: '从左侧工具栏选择画笔、橡皮擦、填充等工具，开始你的创作之旅。',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: '开始创作',
    description: '在画布上绘制，使用右侧面板调整颜色和画笔大小，尽情发挥你的创意。',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <path d="M17.5 10.5l-2-2" />
        <path d="M20 13l-7 7-3 1 1-3 7-7" />
        <path d="M7 20H4a1 1 0 0 1-1-1v-3" />
      </svg>
    ),
  },
  {
    title: '保存分享',
    description: '点击底部导出按钮保存你的作品，或分享到社区让更多人欣赏你的傩面创作。',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const TUTORIAL_STORAGE_KEY = 'nuo-diy-tutorial-done';
const MAX_HISTORY = 30;

export default function DIYStudio() {
  const isMobile = useIsMobile();

  // ---------- Canvas ref（通过 forwardRef 从 CanvasWorkspace 获取） ----------
  const canvasWorkspaceRef = useRef(null);

  // ---------- 模板 ----------
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  // ---------- 工具 ----------
  const [activeTool, setActiveTool] = useState('brush');

  // ---------- 画笔 ----------
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [brushType, setBrushType] = useState('normal');

  // ---------- 颜色 ----------
  const [currentColor, setCurrentColor] = useState('#C41E1E');
  const [recentColors, setRecentColors] = useState([]);

  // ---------- 图案 ----------
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [patternSize, setPatternSize] = useState(40);
  const [patternColor, setPatternColor] = useState('#C9A96E');

  // ---------- 图层 ----------
  const [layers, setLayers] = useState([
    { id: 'background', name: '背景层', visible: true, color: '#F5F0E8' },
    { id: 'drawing', name: '绘图层', visible: true, color: null },
    { id: 'pattern', name: '图案层', visible: true, color: null },
    { id: 'preview', name: '预览层', visible: true, color: null },
  ]);
  const [activeLayerId, setActiveLayerId] = useState('drawing');

  // ---------- 缩放 ----------
  const [zoom, setZoom] = useState(1);

  // ---------- 导出弹窗 ----------
  const [showExport, setShowExport] = useState(false);

  // ---------- 设置面板标签 ----------
  const [activeSettingsTab, setActiveSettingsTab] = useState('color');

  // ---------- 工具提示 ----------
  const [toolTip, setToolTip] = useState(null);
  const toolTipTimerRef = useRef(null);

  // ---------- 右侧面板可见性（移动端） ----------
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // ---------- 新手教程 ----------
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem(TUTORIAL_STORAGE_KEY);
  });
  const [tutorialStep, setTutorialStep] = useState(0);

  /** 获取绘图Canvas的辅助函数 */
  const getDrawCanvas = useCallback(() => {
    return canvasWorkspaceRef.current?.getDrawCanvas?.() || canvasWorkspaceRef.current?.drawCanvasRef?.current;
  }, [canvasWorkspaceRef]);

  const getBgCanvas = useCallback(() => {
    return canvasWorkspaceRef.current?.bgCanvasRef?.current;
  }, [canvasWorkspaceRef]);

  // ---------- 历史记录 ----------
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const saveSnapshotRef = useRef(null);

  /** 保存当前 Canvas 快照到历史（使用 ImageData 替代 dataURL 以减少内存占用） */
  const saveSnapshot = useCallback(() => {
    const canvas = canvasWorkspaceRef.current?.getDrawCanvas?.() || canvasWorkspaceRef.current?.drawCanvasRef?.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // 截断当前位置之后的历史
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(imageData);
      // 限制最大历史步数
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current = historyRef.current.slice(-MAX_HISTORY);
      }
      historyIndexRef.current = historyRef.current.length - 1;
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(false);
    } catch (error) {
      console.error('保存快照失败:', error);
    }
  }, [canvasWorkspaceRef]);

  // 保持 saveSnapshotRef 引用最新
  useEffect(() => {
    saveSnapshotRef.current = saveSnapshot;
  }, [saveSnapshot]);

  /** 从 ImageData 恢复 Canvas（同步操作，无需创建 Image 对象） */
  const restoreSnapshot = useCallback((imageData) => {
    const canvas = getDrawCanvas();
    if (!canvas) throw new Error('Canvas不存在');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('无法获取上下文');
    ctx.putImageData(imageData, 0, 0);
  }, [getDrawCanvas]);

  // ---------- Canvas 挂载后保存初始快照 ----------
  useEffect(() => {
    const canvas = getDrawCanvas();
    if (canvas && historyRef.current.length === 0) {
      const timer = setTimeout(() => {
        saveSnapshot();
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDrawCanvas, saveSnapshot]);

  // ---------- 事件处理 ----------
  const handleUndo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    const newIndex = historyIndexRef.current - 1;
    const snapshot = historyRef.current[newIndex];
    if (!snapshot) return;
    try {
      restoreSnapshot(snapshot);
      historyIndexRef.current = newIndex;
      setCanUndo(newIndex > 0);
      setCanRedo(true);
    } catch (error) {
      console.error('撤销失败:', error);
    }
  }, [restoreSnapshot]);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    const newIndex = historyIndexRef.current + 1;
    const snapshot = historyRef.current[newIndex];
    if (!snapshot) return;
    try {
      restoreSnapshot(snapshot);
      historyIndexRef.current = newIndex;
      setCanUndo(true);
      setCanRedo(newIndex < historyRef.current.length - 1);
    } catch (error) {
      console.error('重做失败:', error);
    }
  }, [restoreSnapshot]);

  // ---------- Timer refs（用于清理 setTimeout，防止内存泄漏） ----------
  const timerRefs = useRef([]);

  const handleClear = useCallback(() => {
    if (!window.confirm('确定要清空画布吗？此操作不可撤销。')) return;
    const canvas = getDrawCanvas();
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    const timerId = setTimeout(() => saveSnapshotRef.current?.(), 50);
    timerRefs.current.push(timerId);
  }, [getDrawCanvas]);

  const handleExport = useCallback(() => {
    setShowExport(true);
  }, []);

  /** 创建合并所有可见图层的临时 Canvas */
  const createMergedCanvas = useCallback(() => {
    const workspace = canvasWorkspaceRef.current;
    if (!workspace) return null;
    const bgCanvas = workspace.bgCanvasRef?.current;
    const drawCanvas = workspace.getDrawCanvas?.() || workspace.drawCanvasRef?.current;
    const patternCanvas = workspace.patternCanvasRef?.current;
    if (!drawCanvas) return null;

    const mergedCanvas = document.createElement('canvas');
    mergedCanvas.width = drawCanvas.width;
    mergedCanvas.height = drawCanvas.height;
    const mergedCtx = mergedCanvas.getContext('2d');
    if (!mergedCtx) return null;

    // 按图层顺序绘制：背景层 → 绘图层 → 图案层
    if (bgCanvas) mergedCtx.drawImage(bgCanvas, 0, 0);
    mergedCtx.drawImage(drawCanvas, 0, 0);
    if (patternCanvas) mergedCtx.drawImage(patternCanvas, 0, 0);

    return mergedCanvas;
  }, [canvasWorkspaceRef]);

  const handleExportPNG = useCallback((fileName) => {
    const mergedCanvas = createMergedCanvas();
    if (!mergedCanvas) return;
    try {
      const link = document.createElement('a');
      link.download = fileName || 'nuo-mask.png';
      link.href = mergedCanvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('导出PNG失败:', error);
    }
  }, [createMergedCanvas]);

  const handleExportJPG = useCallback((fileName) => {
    const mergedCanvas = createMergedCanvas();
    if (!mergedCanvas) return;
    try {
      const link = document.createElement('a');
      link.download = fileName || 'nuo-mask.jpg';
      link.href = mergedCanvas.toDataURL('image/jpeg', 0.92);
      link.click();
    } catch (error) {
      console.error('导出JPG失败:', error);
    }
  }, [createMergedCanvas]);

  const handleToolChange = useCallback((toolId) => {
    setActiveTool(toolId);
    if (toolId === 'stamp') {
      setActiveSettingsTab('pattern');
    }
    // 显示工具功能介绍提示
    const toolData = tools.find(t => t.id === toolId);
    if (toolData?.description) {
      // 清除之前的定时器
      if (toolTipTimerRef.current) clearTimeout(toolTipTimerRef.current);
      setToolTip({ name: toolData.name, description: toolData.description });
      toolTipTimerRef.current = setTimeout(() => {
        setToolTip(null);
        toolTipTimerRef.current = null;
      }, 2500);
    }
  }, []);

  // ---------- 模板加载（带取消机制） ----------
  useEffect(() => {
    if (selectedTemplateId) {
      const bgCanvas = getBgCanvas();
      if (bgCanvas) {
        const currentTemplateId = selectedTemplateId;
        const imagePath = `/diy-templates/${selectedTemplateId}.png`;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // 检查模板ID是否仍然匹配，不匹配则跳过（防止竞态条件）
          if (currentTemplateId !== selectedTemplateId) return;
          const ctx = bgCanvas.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
          const canvasRatio = bgCanvas.width / bgCanvas.height;
          const imgRatio = img.width / img.height;
          let dw, dh, dx, dy;
          if (imgRatio > canvasRatio) {
            dw = bgCanvas.width; dh = bgCanvas.width / imgRatio; dx = 0; dy = (bgCanvas.height - dh) / 2;
          } else {
            dh = bgCanvas.height; dw = bgCanvas.height * imgRatio; dx = (bgCanvas.width - dw) / 2; dy = 0;
          }
          ctx.drawImage(img, dx, dy, dw, dh);
        };
        img.onerror = () => console.error(`加载模板失败: ${imagePath}`);
        img.src = imagePath;
        // cleanup：取消正在进行的图片加载
        return () => { img.src = ''; };
      }
    }
  }, [selectedTemplateId, getBgCanvas]);

  const handleVisibilityToggle = useCallback((layerId) => {
    setLayers((prev) =>
      prev.map((l) =>
        l.id === layerId ? { ...l, visible: !l.visible } : l
      )
    );
  }, []);

  const handleAddLayer = useCallback(() => {
    const id = `layer-${Date.now()}`;
    setLayers((prev) => [
      { id, name: `图层 ${prev.length + 1}`, visible: true, color: null },
      ...prev,
    ]);
    setActiveLayerId(id);
  }, []);

  // ---------- 新手教程处理 ----------
  const handleTutorialNext = useCallback(() => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep((prev) => prev + 1);
    } else {
      setShowTutorial(false);
      localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    }
  }, [tutorialStep]);

  const handleTutorialSkip = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  }, []);

  const handleTutorialPrev = useCallback(() => {
    if (tutorialStep > 0) {
      setTutorialStep((prev) => prev - 1);
    }
  }, [tutorialStep]);

  const handleReopenTutorial = useCallback(() => {
    setTutorialStep(0);
    setShowTutorial(true);
  }, []);

  // ---------- 组件卸载时清理所有定时器 ----------
  useEffect(() => {
    return () => {
      timerRefs.current.forEach((timerId) => clearTimeout(timerId));
      timerRefs.current = [];
      if (toolTipTimerRef.current) clearTimeout(toolTipTimerRef.current);
    };
  }, []);

  // ---------- 键盘快捷键（Ctrl+Z 撤销，Ctrl+Shift+Z / Ctrl+Y 重做） ----------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // ESC 关闭教程
  useEffect(() => {
    if (!showTutorial) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleTutorialSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleTutorialNext();
      } else if (e.key === 'ArrowLeft') {
        handleTutorialPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTutorial, handleTutorialSkip, handleTutorialNext, handleTutorialPrev]);

  // ---------- 设置面板标签配置 ----------
  const settingsTabs = [
    { id: 'color', label: '颜色' },
    { id: 'brush', label: '画笔' },
    { id: 'pattern', label: '图案' },
    { id: 'layer', label: '图层' },
  ];

  // ---------- 渲染设置面板内容 ----------
  const renderSettingsContent = () => {
    switch (activeSettingsTab) {
      case 'color':
        return (
          <ColorPicker
            currentColor={currentColor}
            onColorChange={setCurrentColor}
            recentColors={recentColors}
            onRecentColorsChange={setRecentColors}
          />
        );
      case 'brush':
        return (
          <BrushSettings
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            opacity={opacity}
            onOpacityChange={setOpacity}
            brushType={brushType}
            onBrushTypeChange={setBrushType}
          />
        );
      case 'pattern':
        return (
          <PatternPanel
            selectedPatternId={selectedPatternId}
            onPatternSelect={setSelectedPatternId}
            patternSize={patternSize}
            onPatternSizeChange={setPatternSize}
            patternColor={patternColor}
            onPatternColorChange={setPatternColor}
          />
        );
      case 'layer':
        return (
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            onActiveLayerChange={setActiveLayerId}
            onVisibilityToggle={handleVisibilityToggle}
            onAddLayer={handleAddLayer}
          />
        );
      default:
        return null;
    }
  };

  const currentTutorialStep = TUTORIAL_STEPS[tutorialStep];
  const isLastStep = tutorialStep === TUTORIAL_STEPS.length - 1;
  const isFirstStep = tutorialStep === 0;

  return (
    <div className={styles.studio}>
      {/* 顶部标题栏 */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>DIY傩面工作台</h1>
          <p className={styles.description}>
            选择模板开始创作，使用左侧工具栏绘制你的专属傩面具
          </p>
        </div>
        {!isMobile && (
          <div className={styles.headerRight}>
            <button
              className={styles.headerBtn}
              onClick={handleReopenTutorial}
              title="查看教程"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              教程
            </button>
            <button
              className={styles.headerBtn}
              onClick={() => setShowExport(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              导出
            </button>
          </div>
        )}
      </header>

      {/* 模板选择器 */}
      <TemplateSelector
        selectedTemplateId={selectedTemplateId}
        onSelect={setSelectedTemplateId}
      />

      {/* 主工作区 */}
      <div className={styles.workspace}>
        {/* 工具栏 */}
        <ToolBar activeTool={activeTool} onToolChange={handleToolChange} />

        {/* 工具功能介绍提示 */}
        {toolTip && (
          <div className={styles.toolTip} key={toolTip.name}>
            <span className={styles.toolTipName}>{toolTip.name}</span>
            <span className={styles.toolTipDesc}>{toolTip.description}</span>
          </div>
        )}

        {/* 画布区域 - 绘图事件直接在CanvasWorkspace内部处理 */}
        <CanvasWorkspace
          ref={canvasWorkspaceRef}
          zoom={zoom}
          onZoomChange={setZoom}
          tool={activeTool}
          brushSize={brushSize}
          brushColor={currentColor}
          opacity={opacity / 100}
          onDrawEnd={() => {
            const timerId = setTimeout(() => saveSnapshotRef.current?.(), 50);
            timerRefs.current.push(timerId);
          }}
          selectedPatternId={selectedPatternId}
          patternSize={patternSize}
          patternColor={patternColor}
        />

        {/* 右侧设置面板（桌面端） */}
        {!isMobile && (
          <aside className={styles.settingsPanel}>
            <div className={styles.tabBar}>
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeSettingsTab === tab.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveSettingsTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {renderSettingsContent()}
            </div>
          </aside>
        )}
      </div>

      {/* 底部状态栏 */}
      <HistoryControls
        canUndo={canUndo}
        canRedo={canRedo}
        currentTool={activeTool}
        brushSize={brushSize}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onExport={handleExport}
      />

      {/* 移动端设置面板抽屉 */}
      {isMobile && showMobileDrawer && (
        <div className={styles.drawerOverlay} onClick={() => setShowMobileDrawer(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>设置面板</span>
              <button
                className={styles.drawerClose}
                onClick={() => setShowMobileDrawer(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.tabBar}>
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeSettingsTab === tab.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveSettingsTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      )}

      {/* 移动端浮动设置按钮 */}
      {isMobile && !showMobileDrawer && (
        <button
          className={styles.fab}
          onClick={() => setShowMobileDrawer(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      )}

      {/* 导出弹窗 */}
      <ExportPanel
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        onExportPNG={handleExportPNG}
        onExportJPG={handleExportJPG}
      />

      {/* ========== 新手教程弹窗 ========== */}
      {showTutorial && currentTutorialStep && (
        <div className={styles.tutorialOverlay} onClick={handleTutorialSkip}>
          <div
            className={styles.tutorialCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`新手教程 - 第${tutorialStep + 1}步`}
          >
            {/* 顶部装饰线 */}
            <div className={styles.tutorialDecorLine} />

            {/* 步骤指示器 */}
            <div className={styles.tutorialSteps}>
              {TUTORIAL_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.tutorialDot} ${
                    index === tutorialStep ? styles.tutorialDotActive : ''
                  } ${
                    index < tutorialStep ? styles.tutorialDotDone : ''
                  }`}
                />
              ))}
            </div>

            {/* 图标 */}
            <div className={styles.tutorialIcon}>
              {currentTutorialStep.icon}
            </div>

            {/* 步骤标题 */}
            <h2 className={styles.tutorialTitle}>
              <span className={styles.tutorialStepNum}>
                {tutorialStep + 1}
              </span>
              {currentTutorialStep.title}
            </h2>

            {/* 步骤描述 */}
            <p className={styles.tutorialDesc}>
              {currentTutorialStep.description}
            </p>

            {/* 操作按钮 */}
            <div className={styles.tutorialActions}>
              <button
                className={styles.tutorialSkip}
                onClick={handleTutorialSkip}
              >
                跳过教程
              </button>
              <div className={styles.tutorialNav}>
                {!isFirstStep && (
                  <button
                    className={styles.tutorialPrev}
                    onClick={handleTutorialPrev}
                  >
                    上一步
                  </button>
                )}
                <button
                  className={styles.tutorialNext}
                  onClick={handleTutorialNext}
                >
                  {isLastStep ? '开始创作' : '下一步'}
                </button>
              </div>
            </div>

            {/* 底部装饰线 */}
            <div className={styles.tutorialDecorLine} />
          </div>
        </div>
      )}
    </div>
  );
}
