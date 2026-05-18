import { useState, useMemo, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import MaskGrid from './components/MaskGrid';
import MaskDetailModal from './components/MaskDetailModal';
import galleryItems from './data/galleryItems';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMask, setSelectedMask] = useState(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      // 流派筛选
      if (regionFilter !== 'all' && item.region !== regionFilter) {
        return false;
      }
      // 角色筛选
      if (roleFilter !== 'all' && item.roleCategory !== roleFilter) {
        return false;
      }
      // 搜索筛选
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.regionName.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [regionFilter, roleFilter, searchQuery]);

  const handleMaskClick = useCallback((mask) => {
    setSelectedMask(mask);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMask(null);
  }, []);

  return (
    <div className={styles.page}>
      {/* 页面头部 */}
      <header className={styles.header}>
        <h1 className={styles.title}>傩面展览馆</h1>
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>
        <p className={styles.subtitle}>探索千年傩面艺术的瑰宝</p>
      </header>

      {/* 筛选工具栏 */}
      <FilterBar
        regionFilter={regionFilter}
        onRegionChange={setRegionFilter}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 傩面网格 */}
      <MaskGrid items={filteredItems} onMaskClick={handleMaskClick} />

      {/* 详情弹窗 */}
      <MaskDetailModal
        mask={selectedMask}
        isOpen={!!selectedMask}
        onClose={handleCloseModal}
      />
    </div>
  );
}
