import { useEffect, useRef, useState } from 'react';

/**
 * 使用 IntersectionObserver 实现滚动触发动画
 * @param {Object} options - IntersectionObserver 配置
 * @param {number} options.threshold - 可见比例阈值，默认 0.1
 * @param {string} options.rootMargin - 根元素边距，默认 '0px 0px -50px 0px'
 * @param {boolean} options.triggerOnce - 是否只触发一次，默认 true
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export default useScrollAnimation;
