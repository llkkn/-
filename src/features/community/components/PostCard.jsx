import { useNavigate } from 'react-router-dom';
import { formatTime } from '../utils/commentHelpers';
import styles from './PostCard.module.css';

const CATEGORY_MAP = {
  discussion: { label: '讨论', className: 'discussion' },
  showcase: { label: '作品分享', className: 'showcase' },
  knowledge: { label: '知识科普', className: 'knowledge' },
};

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const category = CATEGORY_MAP[post.category] || CATEGORY_MAP.discussion;

  const handleClick = () => {
    navigate(`/community/post/${post.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      {/* 作者信息 */}
      <div className={styles.authorRow}>
        <div className={styles.avatar}>{post.author[0]}</div>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{post.author}</span>
          <span className={styles.time}>{formatTime(post.createdAt)}</span>
        </div>
      </div>

      {/* 标题 */}
      <h3 className={styles.title}>{post.title}</h3>

      {/* 内容摘要 */}
      <p className={styles.summary}>{post.content}</p>

      {/* 附图缩略图 */}
      {post.images && post.images.length > 0 && (
        <div className={styles.images}>
          {post.images.slice(0, 3).map((img, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img src={img} alt="" className={styles.image} />
              {index === 2 && post.images.length > 3 && (
                <div className={styles.imageOverlay}>
                  +{post.images.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 底部信息 */}
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {post.likes}
          </span>
          <span className={styles.stat}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {post.commentCount}
          </span>
        </div>
        <span className={`${styles.categoryTag} ${styles[category.className]}`}>
          {category.label}
        </span>
      </div>
    </div>
  );
}
