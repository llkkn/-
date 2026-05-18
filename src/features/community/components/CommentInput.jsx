import { useState, useRef, useEffect } from 'react';
import Button from '@/shared/ui/Button';
import styles from './CommentInput.module.css';

export default function CommentInput({
  onSubmit,
  replyTo = null,
  onCancel,
  placeholder = '写下你的评论...',
}) {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (replyTo && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyTo]);

  // 自动扩展高度
  const handleChange = (e) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setContent('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.wrapper}>
      {replyTo && (
        <div className={styles.replyHint}>
          回复 <span className={styles.replyName}>@{replyTo}</span>
          {onCancel && (
            <button className={styles.cancelBtn} onClick={onCancel}>
              取消
            </button>
          )}
        </div>
      )}
      <div className={styles.inputRow}>
        <div className={styles.avatar}>
          {(replyTo ? '我' : '我')[0]}
        </div>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={replyTo ? `回复 @${replyTo}...` : placeholder}
          rows={1}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim()}
          className={styles.sendBtn}
        >
          发送
        </Button>
      </div>
    </div>
  );
}
