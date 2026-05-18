import { useCallback } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { generateId } from '../utils/commentHelpers';

const STORAGE_KEY = 'nuo-community-posts';

const SAMPLE_POSTS = [
  {
    id: 'sample-1',
    title: '贵州地戏面具的制作工艺探秘',
    content:
      '最近有幸去了一趟贵州安顺，亲眼见证了地戏面具的制作过程。老艺人用白杨木雕刻，每一刀都蕴含着对传统技艺的敬畏。面具上色用的是天然矿物颜料，朱砂红、石青蓝、石绿……这些颜色历经百年依然鲜艳。大家有没有了解过不同地区傩面制作工艺的异同？欢迎交流！',
    category: 'knowledge',
    tags: ['贵州地戏', '制作工艺', '非遗传承'],
    images: [],
    author: '傩面匠人',
    likes: 24,
    commentCount: 5,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-2',
    title: '分享我的第一幅傩面彩绘作品',
    content:
      '学习傩面彩绘已经半年了，终于完成了自己的第一幅作品！以池州傩的"关公"为原型，在宣纸上用国画技法绘制。虽然线条还不够老辣，但整个过程让我对这门艺术有了更深的理解。请各位前辈多多指教！',
    category: 'showcase',
    tags: ['彩绘', '关公', '池州傩'],
    images: [],
    author: '绘面学徒',
    likes: 38,
    commentCount: 8,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-3',
    title: '傩面在现代设计中的应用可能性',
    content:
      '作为一个平面设计师，我一直觉得傩面的视觉元素非常具有现代感。夸张的造型、强烈的色彩对比、神秘的符号系统……这些都是绝佳的设计素材。最近在做一个品牌视觉项目时，尝试将傩面元素融入logo设计，效果出乎意料地好。大家觉得传统傩面文化应该如何与现代设计结合？',
    category: 'discussion',
    tags: ['现代设计', '品牌视觉', '创新'],
    images: [],
    author: '设计行者',
    likes: 15,
    commentCount: 3,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export function usePosts() {
  const [posts, setPosts] = useLocalStorage(STORAGE_KEY, SAMPLE_POSTS);

  const addPost = useCallback(
    ({ title, content, category, tags = [], images = [], author = '匿名用户' }) => {
      const newPost = {
        id: generateId(),
        title,
        content,
        category,
        tags,
        images,
        author,
        likes: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    },
    [setPosts]
  );

  const likePost = useCallback(
    (postId) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    },
    [setPosts]
  );

  const deletePost = useCallback(
    (postId) => {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    },
    [setPosts]
  );

  const getPostById = useCallback(
    (postId) => {
      return posts.find((post) => post.id === postId) || null;
    },
    [posts]
  );

  return { posts, addPost, likePost, deletePost, getPostById };
}

export default usePosts;
