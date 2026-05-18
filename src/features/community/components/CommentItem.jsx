import { useState } from 'react';
import { formatTime } from '../utils/commentHelpers';
import CommentInput from './CommentInput';
import styles from './CommentItem.module.css';

const MAX_DEPTH = 4;

export default function CommentItem({
  comment,
  children = [],
  depth = 0,
  onLike,
  onReply,
  onDelete,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = (content) => {
    onReply(comment.id, comment.author, content);
    setShowReplyInput(false);
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
  };

  return (
    <div className={styles.comment} style={{ marginLeft: depth > 0 ? 0 : 0 }}>
      {/* 子评论缩进 */}
      {depth > 0 && <div className={styles.indentLine} />}

      <div className={styles.commentInner}>
        <div className={styles.avatar}>{comment.author[0]}</div>
        <div className={styles.commentBody}>
          <div className={styles.commentHeader}>
            <span className={styles.author}>{comment.author}</span>
            <span className={styles.time}>{formatTime(comment.createdAt)}</span>
          </div>

          {/* 回复目标提示 */}
          {comment.replyTo && (
            <div className={styles.replyTarget}>
              回复 <span className={styles.replyName}>@{comment.replyTo}</span>
            </div>
          )}

          <div className={styles.content}>{comment.content}</div>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => onLike(comment.id)}
            >
              <svg
                className={styles.actionIcon}
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>

            {depth < MAX_DEPTH && (
              <button
                className={styles.actionBtn}
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <svg
                  className={styles.actionIcon}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                回复
              </button>
            )}

            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={() => onDelete(comment.id)}
            >
              删除
            </button>
          </div>

          {/* 回复输入框 */}
          {showReplyInput && (
            <div className={styles.replyInputWrapper}>
              <CommentInput
                replyTo={comment.author}
                onSubmit={handleReply}
                onCancel={handleCancelReply}
                placeholder={`回复 @${comment.author}...`}
              />
            </div>
          )}
        </div>
      </div>

      {/* 递归渲染子评论 */}
      {children && children.length > 0 && (
        <div className={styles.children}>
          {children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              children={child.children || []}
              depth={depth + 1}
              onLike={onLike}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
