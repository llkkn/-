import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { formatTime } from '../utils/commentHelpers';
import Button from '@/shared/ui/Button';
import CommentSection from './CommentSection';
import styles from './PostDetail.module.css';

const CATEGORY_MAP = {
  discussion: '讨论',
  showcase: '作品分享',
  knowledge: '知识科普',
};

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, likePost, deletePost, getPostById } = usePosts();

  const post = getPostById(postId);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h2 className={styles.notFoundTitle}>帖子不存在</h2>
        <p className={styles.notFoundText}>该帖子可能已被删除或不存在</p>
        <Button variant="primary" onClick={() => navigate('/community')}>
          返回社区
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.slice(0, 100),
          url: window.location.href,
        });
      } catch {
        // 用户取消分享
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
      } catch {
        // 剪贴板不可用
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这篇帖子吗？')) {
      deletePost(post.id);
      navigate('/community');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 返回按钮 */}
        <button className={styles.backBtn} onClick={() => navigate('/community')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回社区
        </button>

        {/* 帖子内容 */}
        <article className={styles.article}>
          {/* 分类标签 */}
          <div className={styles.meta}>
            <span className={styles.categoryTag}>{CATEGORY_MAP[post.category]}</span>
            {post.tags &&
              post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
          </div>

          {/* 标题 */}
          <h1 className={styles.title}>{post.title}</h1>

          {/* 作者信息 */}
          <div className={styles.authorRow}>
            <div className={styles.avatar}>{post.author[0]}</div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author}</span>
              <span className={styles.time}>{formatTime(post.createdAt)}</span>
            </div>
          </div>

          {/* 正文 */}
          <div className={styles.body}>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* 图片 */}
          {post.images && post.images.length > 0 && (
            <div className={styles.images}>
              {post.images.map((img, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img src={img} alt={`${post.title} - 图片${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
          )}

          {/* 互动栏 */}
          <div className={styles.actions}>
            <Button variant="ghost" size="sm" onClick={() => likePost(post.id)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              点赞 {post.likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              分享
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} className={styles.deleteBtn}>
              删除
            </Button>
          </div>
        </article>

        {/* 评论区 */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
