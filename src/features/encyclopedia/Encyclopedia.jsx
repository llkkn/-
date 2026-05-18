import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistorySection from './components/HistorySection';
import ClassificationSection from './components/ClassificationSection';
import RegionalSection from './components/RegionalSection';
import MaterialSection from './components/MaterialSection';
import styles from './Encyclopedia.module.css';

const navItems = [
  { key: 'history', label: '历史渊源', id: 'history' },
  { key: 'classification', label: '分类体系', id: 'classification' },
  { key: 'regional', label: '地域流派', id: 'regional' },
  { key: 'material', label: '材质工艺', id: 'material' },
];

export default function Encyclopedia() {
  const { section } = useParams();
  const [activeTab, setActiveTab] = useState('history');
  const isScrolling = useRef(false);

  // URL section 参数自动滚动
  useEffect(() => {
    if (section && navItems.some((item) => item.key === section)) {
      setActiveTab(section);
      // 延迟执行以确保 DOM 已渲染
      const timer = setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const offset = 80; // 导航栏高度补偿
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [section]);

  // 滚动监听，更新活跃标签
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const offset = 120;
      let current = 'history';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = item.key;
          }
        }
      }

      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击标签平滑滚动
  const handleTabClick = (key) => {
    const el = document.getElementById(key);
    if (!el) return;

    isScrolling.current = true;
    setActiveTab(key);

    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    // 滚动结束后恢复监听
    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  };

  return (
    <div className={styles.page}>
      {/* 页面头部 */}
      <header className={styles.header}>
        <div className={styles.headerDecor}>
          <span className={styles.decorLine} />
          <span className={styles.decorDiamond} />
          <span className={styles.decorLine} />
        </div>
        <h1 className={styles.pageTitle}>傩面百科</h1>
        <p className={styles.pageDesc}>
          探寻千年傩文化，解读面具背后的历史、艺术与匠心
        </p>
        <div className={styles.headerDecor}>
          <span className={styles.decorLine} />
          <span className={styles.decorDiamond} />
          <span className={styles.decorLine} />
        </div>
      </header>

      {/* 粘性导航 */}
      <nav className={styles.stickyNav}>
        <div className={styles.navInner}>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`${styles.navBtn} ${activeTab === item.key ? styles.navActive : ''}`}
              onClick={() => handleTabClick(item.key)}
            >
              {item.label}
              {activeTab === item.key && <span className={styles.navIndicator} />}
            </button>
          ))}
        </div>
      </nav>

      {/* 内容区域 */}
      <main className={styles.content}>
        <HistorySection />
        <ClassificationSection />
        <RegionalSection />
        <MaterialSection />
      </main>
    </div>
  );
}
