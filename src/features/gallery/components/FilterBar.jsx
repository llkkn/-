import { useCallback } from 'react';
import styles from './FilterBar.module.css';

const REGIONS = [
  { value: 'all', label: '全部' },
  { value: 'pingxiang', label: '萍乡湘东' },
  { value: 'chizhou', label: '池州' },
  { value: 'anshun', label: '安顺' },
  { value: 'wuan', label: '武安' },
  { value: 'luxi', label: '泸溪' },
];

const ROLES = [
  { value: 'all', label: '全部' },
  { value: 'wenchen', label: '文臣' },
  { value: 'wujiang', label: '武将' },
  { value: 'laoweng', label: '老翁' },
  { value: 'shaofu', label: '少妇' },
  { value: 'shenxian', label: '神仙' },
  { value: 'choujiao', label: '丑角' },
];

/* 搜索图标 SVG */
function SearchIcon() {
  return (
    <svg
      className={styles.searchIcon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function FilterBar({
  regionFilter,
  onRegionChange,
  roleFilter,
  onRoleChange,
  searchQuery,
  onSearchChange,
}) {
  const handleSearch = useCallback(
    (e) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  return (
    <div className={styles.filterBar}>
      {/* 筛选行：流派 + 角色 + 搜索 */}
      <div className={styles.filterRow}>
        {/* 流派筛选 */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>流派</span>
          <div className={`${styles.tagGroup} ${styles.tagGroupScrollable}`}>
            {REGIONS.map((region) => (
              <button
                key={region.value}
                className={`${styles.tag} ${
                  regionFilter === region.value ? styles.tagActive : ''
                }`}
                onClick={() => onRegionChange(region.value)}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* 角色筛选 */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>角色</span>
          <div className={`${styles.tagGroup} ${styles.tagGroupScrollable}`}>
            {ROLES.map((role) => (
              <button
                key={role.value}
                className={`${styles.tag} ${
                  roleFilter === role.value ? styles.tagActive : ''
                }`}
                onClick={() => onRoleChange(role.value)}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* 搜索框 */}
        <div className={`${styles.filterGroup} ${styles.searchGroup}`}>
          <span className={styles.filterLabel}>搜索</span>
          <div className={styles.searchWrapper}>
            <SearchIcon />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="按傩面名称搜索..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
