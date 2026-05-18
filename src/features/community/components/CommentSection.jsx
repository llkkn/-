import { useComments } from '../hooks/useComments';
import { buildCommentTree } from '../utils/commentHelpers';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import styles from './CommentSection.module.css';

export default function CommentSection({ postId }) {
  const { comments, addComment, addReply, likeComment, deleteComment } =
    useComments(postId);

  const commentTree = buildCommentTree(comments);

  const handleTopComment = (content) => {
    addComment({ content });
  };

  const handleReply = (parentId, replyTo, content) => {
    addReply({ parentId, replyTo, content });
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>评论</h3>
        <span className={styles.count}>{comments.length}条评论</span>
      </div>

      <div className={styles.inputWrapper}>
        <CommentInput onSubmit={handleTopComment} placeholder="写下你的评论..." />
      </div>

      {commentTree.length > 0 ? (
        <div className={styles.commentList}>
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              children={comment.children}
              depth={0}
              onLike={likeComment}
              onReply={handleReply}
              onDelete={deleteComment}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className={styles.emptyText}>暂无评论，来说两句吧</p>
        </div>
      )}
    </div>
  );
}
