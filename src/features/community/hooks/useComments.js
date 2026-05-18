import { useCallback } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { generateId } from '../utils/commentHelpers';

/**
 * 评论管理 Hook
 * 每个帖子的评论独立存储在 localStorage 中
 */
export function useComments(postId) {
  const storageKey = `nuo-comments-${postId}`;
  const [comments, setComments] = useLocalStorage(storageKey, []);

  const addComment = useCallback(
    ({ content, author = '匿名用户' }) => {
      const newComment = {
        id: generateId(),
        postId,
        parentId: null,
        replyTo: null,
        content,
        author,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      return newComment;
    },
    [postId, setComments]
  );

  const addReply = useCallback(
    ({ parentId, replyTo, content, author = '匿名用户' }) => {
      const newComment = {
        id: generateId(),
        postId,
        parentId,
        replyTo: replyTo || null,
        content,
        author,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      return newComment;
    },
    [postId, setComments]
  );

  const likeComment = useCallback(
    (commentId) => {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    },
    [setComments]
  );

  /**
   * 递归删除评论及其所有子评论
   */
  const deleteComment = useCallback(
    (commentId) => {
      // 找出所有需要删除的评论ID（包括子评论）
      const idsToDelete = new Set();

      const collectIds = (id) => {
        idsToDelete.add(id);
        comments
          .filter((c) => c.parentId === id)
          .forEach((child) => collectIds(child.id));
      };

      collectIds(commentId);

      setComments((prev) => prev.filter((c) => !idsToDelete.has(c.id)));
    },
    [comments, setComments]
  );

  return { comments, addComment, addReply, likeComment, deleteComment };
}

export default useComments;
