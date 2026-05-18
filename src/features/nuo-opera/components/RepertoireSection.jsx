import { useState, useMemo } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import Tabs from '@/shared/ui/Tabs';
import repertoireData from '../data/repertoireData';
import styles from './RepertoireSection.module.css';

const regionTabs = [
  { key: 'all', label: '全部' },
  { key: 'chizhou', label: '安徽' },
  { key: 'anshun', label: '贵州' },
  { key: 'wuan', label: '河北' },
  { key: 'yuanling', label: '湖南' },
  { key: 'enshi', label: '湖北' },
  { key: 'guansuo', label: '云南' },
  { key: 'multi', label: '多地' },
];

function StarRating({ count }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`${styles.star} ${i < count ? styles.starFilled : ''}`}
        >
          &#x2605;
        </span>
      ))}
    </span>
  );
}

function RepertoireCard({ item, isExpanded, onToggle }) {
  return (
    <div className={styles.card} onClick={onToggle}>
      <div className={styles.cardLeft}>
        <StarRating count={item.significance} />
      </div>

      <div className={styles.cardMiddle}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{item.name}</h3>
          <div className={styles.tags}>
            <span className={styles.regionTag}>{item.regionName}</span>
            <span className={styles.genreTag}>{item.genre}</span>
          </div>
        </div>
        <p className={styles.cardDesc}>
          {isExpanded ? item.description : item.description.slice(0, 80) + '...'}
        </p>
      </div>

      <div className={styles.cardRight}>
        <span className={styles.culturalLabel}>文化意义</span>
        <p className={styles.culturalNote}>
          {isExpanded
            ? item.culturalNote
            : item.culturalNote.slice(0, 40) + '...'}
        </p>
      </div>

      <div className={styles.expandHint}>
        {isExpanded ? '收起' : '展开'}
      </div>
    </div>
  );
}

export default function RepertoireSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredData = useMemo(() => {
    if (activeTab === 'all') return repertoireData;
    return repertoireData.filter((item) => item.region === activeTab);
  }, [activeTab]);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const tabItems = regionTabs.map((tab) => ({
    key: tab.key,
    label: tab.label,
    content: null,
  }));

  return (
    <section className={styles.section} id="repertoire-section" ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>经典代表剧目</h2>
          <p className={styles.subtitle}>十二出经典傩戏剧目，承载千年文化记忆</p>
        </div>

        {/* 标签页 */}
        <div className={`${styles.tabsWrapper} ${isVisible ? styles.visible : ''}`}>
          <Tabs
            items={tabItems}
            defaultIndex={0}
            onChange={(_, item) => setActiveTab(item.key)}
          />
        </div>

        {/* 剧目列表 */}
        <div className={styles.list}>
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.cardWrapper} ${isVisible ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <RepertoireCard
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className={styles.empty}>该地区暂无收录剧目</div>
        )}
      </div>
    </section>
  );
}
