import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from './hooks/usePosts';
import Button from '@/shared/ui/Button';
import PostCard from './components/PostCard';
import styles from './Community.module.css';

const SORT_OPTIONS = [
  { value: 'latest', label: '最新' },
  { value: 'hot', label: '最热' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'discussion', label: '讨论' },
  { value: 'showcase', label: '作品分享' },
  { value: 'knowledge', label: '知识科普' },
];

export default function Community() {
  const { posts } = usePosts();
  const [sortBy, setSortBy] = useState('latest');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // 分类筛选
    if (categoryFilter !== 'all') {
      result = result.filter((post) => post.category === categoryFilter);
    }

    // 排序
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'hot') {
      result.sort((a, b) => b.likes - a.likes || new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [posts, sortBy, categoryFilter]);

  return (
    <div className={styles.container}>
      {/* 页面标题 */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>傩面社区</h1>
          <p className={styles.subtitle}>分享傩面文化，交流非遗心得</p>
        </div>
        <Link to="/community/new" className={styles.newPostLink}>
          <Button variant="primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            发布新帖
          </Button>
        </Link>
      </div>

      {/* 操作栏 */}
      <div className={styles.toolbar}>
        <div className={styles.sortGroup}>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`${styles.sortBtn} ${sortBy === opt.value ? styles.sortActive : ''}`}
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className={styles.categoryGroup}>
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`${styles.categoryBtn} ${categoryFilter === opt.value ? styles.categoryActive : ''}`}
              onClick={() => setCategoryFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 帖子列表 */}
      {filteredPosts.length > 0 ? (
        <div className={styles.postGrid}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>暂无帖子</h3>
          <p className={styles.emptyText}>
            {categoryFilter !== 'all'
              ? '该分类下还没有帖子，快来发布第一篇吧'
              : '社区还没有帖子，快来发布第一篇吧'}
          </p>
          <Link to="/community/new">
            <Button variant="primary">发布新帖</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
