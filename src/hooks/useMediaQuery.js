import { useState, useEffect } from 'react';

/**
 * 响应式断点检测
 * @param {string} query - 媒体查询字符串，如 '(min-width: 768px)'
 * @returns {boolean} 是否匹配当前媒体查询
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // 初始设置
    setMatches(mediaQuery.matches);

    // 监听变化
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/* 预设断点 hooks */
export function useIsMobile() {
  return useMediaQuery('(max-width: 576px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 577px) and (max-width: 768px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 769px)');
}

export function useIsLargeDesktop() {
  return useMediaQuery('(min-width: 1200px)');
}

export default useMediaQuery;
