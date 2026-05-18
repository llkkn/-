/**
 * Canvas画布工作区
 * 多层Canvas叠加 + 缩放控件 + 棋盘格背景
 *
 * 修复：直接在此组件内部绑定pointer事件，通过props回调通知父组件。
 * 这样避免了forwardRef + useImperativeHandle的时序问题。
 */
import { useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './CanvasWorkspace.module.css';
import patterns from '@/features/diy/data/patterns';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

/** 将 hex 颜色 + alpha 转为 {r, g, b, a} */
function hexToRgba(hex, alpha = 255) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b, a: alpha };
}

const CanvasWorkspace = forwardRef(function CanvasWorkspace(
  {
    zoom = 1,
    onZoomChange,
    tool = 'brush',
    brushSize = 5,
    brushColor = '#C41E1E',
    brushType = 'normal',
    opacity = 1,
    onDrawEnd,
    selectedPatternId = null,
    patternSize = 40,
    patternColor = '#C9A96E',
  },
  ref
) {
  const containerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const patternCanvasRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // 缓存drawCanvas的2d context
  const drawCtxRef = useRef(null);
  const previewCtxRef = useRef(null);

  // DPR ref
  const dprRef = useRef(window.devicePixelRatio || 1);

  // 光标位置ref
  const cursorRef = useRef(null);
  const cursorVisibleRef = useRef(false);

  // setTimeout timer ref（防止内存泄漏）
  const drawEndTimerRef = useRef(null);

  // 图案图片缓存（避免重复加载）
  const patternImageCache = useRef({});

  // 绘图状态（使用ref避免重渲染）
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const lastMidPointRef = useRef(null);
  const lastTimeRef = useRef(0);
  const lastLineWidthRef = useRef(0);
  const hasPressureRef = useRef(false);

  // 当前工具/画笔设置（使用ref，避免事件处理器重建）
  const toolRef = useRef(tool);
  const brushSizeRef = useRef(brushSize);
  const brushColorRef = useRef(brushColor);
  const brushTypeRef = useRef(brushType);
  const opacityRef = useRef(opacity);
  const onDrawEndRef = useRef(onDrawEnd);
  const selectedPatternIdRef = useRef(selectedPatternId);
  const patternSizeRef = useRef(patternSize);
  const patternColorRef = useRef(patternColor);

  // 形状工具起点
  const shapeStartRef = useRef(null);

  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { brushSizeRef.current = brushSize; }, [brushSize]);
  useEffect(() => { brushColorRef.current = brushColor; }, [brushColor]);
  useEffect(() => { brushTypeRef.current = brushType; }, [brushType]);
  useEffect(() => { opacityRef.current = opacity; }, [opacity]);
  useEffect(() => { onDrawEndRef.current = onDrawEnd; }, [onDrawEnd]);
  useEffect(() => { selectedPatternIdRef.current = selectedPatternId; }, [selectedPatternId]);
  useEffect(() => { patternSizeRef.current = patternSize; }, [patternSize]);
  useEffect(() => { patternColorRef.current = patternColor; }, [patternColor]);

  // 暴露canvas引用给父组件（用于导出等）
  useImperativeHandle(ref, () => ({
    drawCanvasRef,
    bgCanvasRef,
    patternCanvasRef,
    previewCanvasRef,
    getDrawCanvas: () => drawCanvasRef.current,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  }));

  // DPR高DPI支持 + 初始化drawCtxRef
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    // 设置所有canvas的DPR
    const canvases = [
      bgCanvasRef.current,
      drawCanvasRef.current,
      patternCanvasRef.current,
      previewCanvasRef.current,
    ];

    canvases.forEach((canvas) => {
      if (!canvas) return;
      canvas.width = CANVAS_WIDTH * dpr;
      canvas.height = CANVAS_HEIGHT * dpr;
      // CSS尺寸通过className已经设为100%，无需额外设置
    });

    // 缓存drawCanvas的context并设置缩放
    const drawCanvas = drawCanvasRef.current;
    if (drawCanvas) {
      const ctx = drawCanvas.getContext('2d');
      ctx.scale(dpr, dpr);
      drawCtxRef.current = ctx;
    }

    // 初始化previewCanvas的context并设置DPR缩放
    const previewCanvas = previewCanvasRef.current;
    if (previewCanvas) {
      const previewCtx = previewCanvas.getContext('2d');
      previewCtx.scale(dpr, dpr);
      previewCtxRef.current = previewCtx;
    }

    // 初始化patternCanvas的context并设置DPR缩放
    const patternCanvas = patternCanvasRef.current;
    if (patternCanvas) {
      const patternCtx = patternCanvas.getContext('2d');
      patternCtx.scale(dpr, dpr);
    }

    // 绘制棋盘格背景（在DPR缩放后的context上绘制）
    const bgCanvas = bgCanvasRef.current;
    if (bgCanvas) {
      const bgCtx = bgCanvas.getContext('2d');
      bgCtx.scale(dpr, dpr);
      const size = 12;
      const cols = Math.ceil(CANVAS_WIDTH / size);
      const rows = Math.ceil(CANVAS_HEIGHT / size);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          bgCtx.fillStyle = (row + col) % 2 === 0 ? '#FFFFFF' : '#F0EDE6';
          bgCtx.fillRect(col * size, row * size, size, size);
        }
      }
    }

    return () => {
      drawCtxRef.current = null;
    };
  }, []);

  // 组件卸载时清理timer
  useEffect(() => {
    return () => {
      if (drawEndTimerRef.current != null) {
        clearTimeout(drawEndTimerRef.current);
        drawEndTimerRef.current = null;
      }
    };
  }, []);

  // ==================== 绘图核心逻辑 ====================

  const getCanvasPoint = useCallback((e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    // CSS尺寸与逻辑坐标一致，因为ctx.scale(dpr, dpr)已经处理了DPR
    return {
      x: (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width),
      y: (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height),
    };
  }, []);

  const handlePointerDown = useCallback((e) => {
    const ctx = drawCtxRef.current;
    if (!ctx) return;

    e.preventDefault();
    const canvas = drawCanvasRef.current;
    if (canvas) canvas.setPointerCapture(e.pointerId);

    const point = getCanvasPoint(e);
    const currentTool = toolRef.current;
    const currentBrushSize = brushSizeRef.current;
    const currentBrushColor = brushColorRef.current;
    const currentOpacity = opacityRef.current;

    // 检测压感支持
    const pressure = e.pressure;
    const isPressureDevice = pressure > 0 && pressure < 1;
    hasPressureRef.current = isPressureDevice;

    isDrawingRef.current = true;
    lastPointRef.current = point;
    lastMidPointRef.current = point;
    lastTimeRef.current = performance.now();

    // 计算初始线宽
    let lineWidth = currentBrushSize;
    if (isPressureDevice) {
      lineWidth = currentBrushSize * pressure;
    }
    lineWidth = Math.max(1, lineWidth);
    lastLineWidthRef.current = lineWidth;

    ctx.save();
    ctx.globalAlpha = currentOpacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(point.x, point.y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
    } else if (currentTool === 'stamp') {
      // 图案印章：使用预渲染的PNG图片绘制到 patternCanvas
      const patternId = selectedPatternIdRef.current;
      if (patternId) {
        const pattern = patterns.find(p => p.id === patternId);
        if (pattern && pattern.image) {
          const pCanvas = patternCanvasRef.current;
          if (pCanvas) {
            const pCtx = pCanvas.getContext('2d');
            const size = patternSizeRef.current;

            // 从缓存获取或创建图片
            let img = patternImageCache.current[pattern.image];
            if (img) {
              // 图片已缓存，直接绘制
              pCtx.save();
              pCtx.globalAlpha = currentOpacity;
              pCtx.drawImage(img, point.x - size / 2, point.y - size / 2, size, size);
              pCtx.restore();
            } else {
              // 首次加载图片
              img = new Image();
              img.onload = () => {
                patternImageCache.current[pattern.image] = img;
                const pCtx2 = patternCanvasRef.current?.getContext('2d');
                if (pCtx2) {
                  pCtx2.save();
                  pCtx2.globalAlpha = currentOpacity;
                  pCtx2.drawImage(img, point.x - size / 2, point.y - size / 2, size, size);
                  pCtx2.restore();
                }
              };
              img.src = pattern.image;
            }
          }
        }
      }
      // stamp不需要设置isDrawing为true（不支持拖拽连续绘制）
      isDrawingRef.current = false;
      // 直接通知父组件保存历史快照
      if (onDrawEndRef.current) {
        const timerId = setTimeout(() => onDrawEndRef.current(), 100);
        drawEndTimerRef.current = timerId;
      }
      return;
    } else if (currentTool === 'fill') {
      // 填充工具：使用 flood fill 算法填充封闭区域
      // 从所有可见层合并读取像素（识别图案边界），填充结果写入 drawCanvas
      const dpr = dprRef.current;
      const canvas = drawCanvasRef.current;
      if (canvas) {
        const fCtx = canvas.getContext('2d');
        const px = Math.round(point.x * dpr);
        const py = Math.round(point.y * dpr);
        const w = canvas.width;
        const h = canvas.height;
        if (px >= 0 && px < w && py >= 0 && py < h) {
          // 创建临时 canvas 合并所有可见层，用于读取像素边界
          const tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = w;
          tmpCanvas.height = h;
          const tmpCtx = tmpCanvas.getContext('2d');
          // 按层级顺序合并：bg → draw → pattern
          if (bgCanvasRef.current) tmpCtx.drawImage(bgCanvasRef.current, 0, 0);
          if (drawCanvasRef.current) tmpCtx.drawImage(drawCanvasRef.current, 0, 0);
          if (patternCanvasRef.current) tmpCtx.drawImage(patternCanvasRef.current, 0, 0);

          const mergedData = tmpCtx.getImageData(0, 0, w, h).data;
          const drawImageData = fCtx.getImageData(0, 0, w, h);
          const drawData = drawImageData.data;

          // 解析填充颜色
          const fillColor = hexToRgba(currentBrushColor, Math.round(currentOpacity * 255));
          const startIdx = (py * w + px) * 4;
          const startR = mergedData[startIdx], startG = mergedData[startIdx + 1], startB = mergedData[startIdx + 2], startA = mergedData[startIdx + 3];

          // 如果起始颜色和填充颜色相同，跳过
          if (startR === fillColor.r && startG === fillColor.g && startB === fillColor.b && startA === fillColor.a) {
            isDrawingRef.current = false;
            return;
          }

          const tolerance = 16;
          const maxDist = tolerance * 3 + 20; // 更大边界检测范围，抗锯齿更强
          const blendStart = maxDist * 0.35; // 35%以内完全填充，65%区间渐变混合，抗锯齿更柔和
          const stack = [[px, py]];
          const visited = new Uint8Array(w * h);

          // 计算像素与起始颜色的欧几里得距离
          function colorDistance(idx) {
            const dr = mergedData[idx] - startR;
            const dg = mergedData[idx + 1] - startG;
            const db = mergedData[idx + 2] - startB;
            const da = mergedData[idx + 3] - startA;
            return Math.sqrt(dr * dr + dg * dg + db * db + da * da);
          }

          // 收集所有需要填充的像素及其混合权重
          const fillPixels = [];

          while (stack.length > 0) {
            const [cx, cy] = stack.pop();
            const ci = cy * w + cx;
            if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
            if (visited[ci]) continue;

            const pi = ci * 4;
            const dist = colorDistance(pi);
            if (dist > maxDist) continue;

            visited[ci] = 1;
            // 内部像素完全填充，边缘像素渐变混合以消除锯齿
            const alpha = dist < blendStart ? 1 : 1 - (dist - blendStart) / (maxDist - blendStart);
            fillPixels.push({ pi, alpha });

            stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
          }

          // 写入填充像素（边缘抗锯齿混合）
          for (const { pi, alpha } of fillPixels) {
            if (alpha >= 0.98) {
              // 内部像素：直接写入
              drawData[pi] = fillColor.r;
              drawData[pi + 1] = fillColor.g;
              drawData[pi + 2] = fillColor.b;
              drawData[pi + 3] = fillColor.a;
            } else {
              // 边缘像素：与现有颜色混合
              const a = Math.round(fillColor.a * alpha);
              const inv = 1 - alpha;
              drawData[pi] = Math.round(drawData[pi] * inv + fillColor.r * alpha);
              drawData[pi + 1] = Math.round(drawData[pi + 1] * inv + fillColor.g * alpha);
              drawData[pi + 2] = Math.round(drawData[pi + 2] * inv + fillColor.b * alpha);
              drawData[pi + 3] = Math.min(255, Math.round(drawData[pi + 3] * inv + a));
            }
          }

          fCtx.putImageData(drawImageData, 0, 0);
        }
      }
      isDrawingRef.current = false;
      if (onDrawEndRef.current) {
        const timerId = setTimeout(() => onDrawEndRef.current(), 100);
        drawEndTimerRef.current = timerId;
      }
      return;
    } else if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
      // 形状工具：记录起点，在 preview 层实时预览
      shapeStartRef.current = point;
      isDrawingRef.current = true;
      return;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.arc(point.x, point.y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = currentBrushColor;
      ctx.fill();
    }
    ctx.restore();
  }, [getCanvasPoint]);

  const handlePointerMove = useCallback((e) => {
    // 更新光标位置（通过DOM直接操作，避免重渲染）
    const cursorEl = cursorRef.current;
    if (cursorEl) {
      const container = cursorEl.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        cursorEl.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      cursorEl.style.display = 'block';
      cursorVisibleRef.current = true;
    }

    if (!isDrawingRef.current) return;
    // 印章工具不支持拖拽连续绘制
    if (toolRef.current === 'stamp') return;

    // 形状工具：在 preview 层实时预览
    const currentTool = toolRef.current;
    if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
      const startPt = shapeStartRef.current;
      if (!startPt) return;
      const previewCtx = previewCtxRef.current;
      if (!previewCtx) return;
      const currentPoint = getCanvasPoint(e);
      // 清除 preview 层
      previewCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      previewCtx.save();
      previewCtx.globalAlpha = opacityRef.current;
      previewCtx.strokeStyle = brushColorRef.current;
      previewCtx.lineWidth = brushSizeRef.current;
      previewCtx.lineCap = 'round';
      previewCtx.lineJoin = 'round';

      if (currentTool === 'line') {
        previewCtx.beginPath();
        previewCtx.moveTo(startPt.x, startPt.y);
        previewCtx.lineTo(currentPoint.x, currentPoint.y);
        previewCtx.stroke();
      } else if (currentTool === 'rect') {
        const x = Math.min(startPt.x, currentPoint.x);
        const y = Math.min(startPt.y, currentPoint.y);
        const w = Math.abs(currentPoint.x - startPt.x);
        const h = Math.abs(currentPoint.y - startPt.y);
        previewCtx.strokeRect(x, y, w, h);
      } else if (currentTool === 'circle') {
        const cx = (startPt.x + currentPoint.x) / 2;
        const cy = (startPt.y + currentPoint.y) / 2;
        const rx = Math.abs(currentPoint.x - startPt.x) / 2;
        const ry = Math.abs(currentPoint.y - startPt.y) / 2;
        previewCtx.beginPath();
        previewCtx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
        previewCtx.stroke();
      }
      previewCtx.restore();
      return;
    }

    const ctx = drawCtxRef.current;
    if (!ctx) return;

    e.preventDefault();

    const currentPoint = getCanvasPoint(e);
    const lastPoint = lastPointRef.current;
    if (!lastPoint) return;

    const dx = currentPoint.x - lastPoint.x;
    const dy = currentPoint.y - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 1) return;

    const now = performance.now();
    const deltaTime = now - lastTimeRef.current;
    const currentBrushSize = brushSizeRef.current;
    const currentBrushColor = brushColorRef.current;
    const currentOpacity = opacityRef.current;
    const currentBrushType = brushTypeRef.current;

    // 计算线宽
    let lineWidth = currentBrushSize;

    // 压感设备：线宽 = baseWidth * pressure
    if (hasPressureRef.current) {
      const pressure = e.pressure;
      lineWidth = currentBrushSize * pressure;
      lineWidth = Math.max(1, lineWidth);
    } else if (currentTool !== 'eraser' && deltaTime > 0) {
      // 非压感设备：毛笔效果（速度越快线越细）
      const speed = distance / deltaTime;
      const minSpeed = 0.1;
      const maxSpeed = 3.0;

      // 根据brushType调整敏感度
      let minWidth;
      if (currentBrushType === 'calligraphy') {
        // 毛笔模式：更明显的粗细变化
        minWidth = Math.max(1, currentBrushSize * 0.05);
      } else {
        // 普通模式：较温和的效果
        minWidth = Math.max(1, currentBrushSize * 0.15);
      }

      const clampedSpeed = Math.min(Math.max(speed, minSpeed), maxSpeed);
      const speedFactor = (clampedSpeed - minSpeed) / (maxSpeed - minSpeed);
      const targetWidth = currentBrushSize - (currentBrushSize - minWidth) * speedFactor;

      // 根据brushType调整平滑度
      let smoothing;
      if (currentBrushType === 'calligraphy') {
        smoothing = 0.2; // 毛笔：更快响应速度变化
      } else {
        smoothing = 0.3; // 普通：更平滑
      }

      lineWidth = lastLineWidthRef.current * smoothing + targetWidth * (1 - smoothing);
      lineWidth = Math.max(1, lineWidth);
    }

    lastLineWidthRef.current = lineWidth;
    lastTimeRef.current = now;

    const midPoint = {
      x: (lastPoint.x + currentPoint.x) / 2,
      y: (lastPoint.y + currentPoint.y) / 2,
    };

    ctx.save();
    ctx.globalAlpha = currentOpacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentBrushColor;
    }

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(lastMidPointRef.current.x, lastMidPointRef.current.y);
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
    ctx.stroke();
    ctx.restore();

    lastPointRef.current = currentPoint;
    lastMidPointRef.current = midPoint;
  }, [getCanvasPoint]);

  const handlePointerUp = useCallback((e) => {
    // 隐藏光标
    const cursorEl = cursorRef.current;
    if (cursorEl) {
      cursorEl.style.display = 'none';
      cursorVisibleRef.current = false;
    }

    // 形状工具：将 preview 层内容绘制到 draw 层
    const currentTool = toolRef.current;
    if ((currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') && shapeStartRef.current) {
      const previewCanvas = previewCanvasRef.current;
      const drawCanvas = drawCanvasRef.current;
      if (previewCanvas && drawCanvas) {
        const drawCtx = drawCtxRef.current;
        if (drawCtx) {
          drawCtx.drawImage(previewCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
        // 清除 preview 层
        const previewCtx = previewCtxRef.current;
        if (previewCtx) {
          previewCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
      }
      shapeStartRef.current = null;
      isDrawingRef.current = false;
      // 通知父组件保存历史快照
      if (onDrawEndRef.current) {
        drawEndTimerRef.current = setTimeout(() => {
          drawEndTimerRef.current = null;
          onDrawEndRef.current?.();
        }, 10);
      }
      return;
    }

    if (!isDrawingRef.current) return;

    const canvas = drawCanvasRef.current;
    if (canvas && e?.pointerId != null) {
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
    }

    // 绘制最后一段线条
    const ctx = drawCtxRef.current;
    if (ctx && lastPointRef.current && lastMidPointRef.current) {
      const currentTool = toolRef.current;
      const currentBrushColor = brushColorRef.current;
      const currentOpacity = opacityRef.current;

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (currentTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentBrushColor;
      }
      ctx.lineWidth = lastLineWidthRef.current;
      ctx.beginPath();
      ctx.moveTo(lastMidPointRef.current.x, lastMidPointRef.current.y);
      ctx.lineTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.stroke();
      ctx.restore();
    }

    isDrawingRef.current = false;
    lastPointRef.current = null;
    lastMidPointRef.current = null;
    lastTimeRef.current = 0;
    hasPressureRef.current = false;

    // 通知父组件绘制结束（使用ref存储timerId防止内存泄漏）
    if (onDrawEndRef.current) {
      drawEndTimerRef.current = setTimeout(() => {
        drawEndTimerRef.current = null;
        onDrawEndRef.current?.();
      }, 10);
    }
  }, []);

  // ==================== 绑定事件（组件挂载时绑定一次） ====================

  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  // ==================== 缩放控件 ====================

  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(3, Math.max(0.25, zoom + delta));
      onZoomChange?.(Math.round(newZoom * 100) / 100);
    }
  }, [zoom, onZoomChange]);

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(3, zoom + 0.1);
    onZoomChange?.(Math.round(newZoom * 100) / 100);
  }, [zoom, onZoomChange]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(0.25, zoom - 0.1);
    onZoomChange?.(Math.round(newZoom * 100) / 100);
  }, [zoom, onZoomChange]);

  const handleZoomReset = useCallback(() => {
    onZoomChange?.(1);
  }, [onZoomChange]);

  // ==================== 光标预览计算 ====================

  const cursorSize = brushSize * zoom;
  const isEraser = tool === 'eraser';

  return (
    <div className={styles.workspace} ref={containerRef} onWheel={handleWheel}>
      <div
        className={styles.canvasContainer}
        style={{
          width: CANVAS_WIDTH * zoom,
          height: CANVAS_HEIGHT * zoom,
        }}
      >
        {/* 背景层 - 棋盘格 */}
        <canvas
          ref={bgCanvasRef}
          className={styles.canvas}
          style={{ zIndex: 1, pointerEvents: 'none' }}
        />

        {/* 绘图层 - 事件直接绑定在此Canvas上 */}
        <canvas
          ref={drawCanvasRef}
          className={styles.canvas}
          style={{ zIndex: 2, touchAction: 'none', cursor: 'none' }}
        />

        {/* 图案层 */}
        <canvas
          ref={patternCanvasRef}
          className={styles.canvas}
          style={{ zIndex: 3, pointerEvents: 'none' }}
        />

        {/* 预览层 */}
        <canvas
          ref={previewCanvasRef}
          className={styles.canvas}
          style={{ zIndex: 4, pointerEvents: 'none' }}
        />

        {/* 画笔光标预览 */}
        <div
          ref={cursorRef}
          className={styles.brushCursor}
          style={{
            width: cursorSize,
            height: cursorSize,
            borderColor: isEraser ? '#999' : brushColor,
            borderStyle: isEraser ? 'dashed' : 'solid',
            display: 'none',
          }}
        />
      </div>

      {/* 缩放控件 */}
      <div className={styles.zoomControls}>
        <button className={styles.zoomBtn} onClick={handleZoomOut} title="缩小" disabled={zoom <= 0.25}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
        <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
        <button className={styles.zoomBtn} onClick={handleZoomIn} title="放大" disabled={zoom >= 3}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
        <button className={styles.zoomBtn} onClick={handleZoomReset} title="重置缩放">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default CanvasWorkspace;
export { CANVAS_WIDTH, CANVAS_HEIGHT };
