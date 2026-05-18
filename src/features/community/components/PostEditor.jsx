import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import Button from '@/shared/ui/Button';
import styles from './PostEditor.module.css';

const CATEGORIES = [
  { value: 'discussion', label: '讨论' },
  { value: 'showcase', label: '作品分享' },
  { value: 'knowledge', label: '知识科普' },
];

export default function PostEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPost } = usePosts();

  // 从DIY工作台传入的图片
  const passedImages = location.state?.images || [];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('discussion');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [images, setImages] = useState(passedImages);
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = '请输入标题';
    if (!content.trim()) newErrors.content = '请输入正文';
    if (!author.trim()) newErrors.author = '请输入昵称';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const tags = tagsInput
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost = addPost({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      images,
      author: author.trim() || '匿名用户',
    });

    navigate(`/community/post/${newPost.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        {/* 页头 */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate('/community')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            返回
          </button>
          <h1 className={styles.pageTitle}>发布新帖</h1>
        </div>

        {/* 昵称 */}
        <div className={styles.field}>
          <label className={styles.label}>昵称</label>
          <input
            type="text"
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="输入你的昵称"
            maxLength={20}
          />
          {errors.author && <span className={styles.error}>{errors.author}</span>}
        </div>

        {/* 标题 */}
        <div className={styles.field}>
          <label className={styles.label}>标题</label>
          <input
            type="text"
            className={`${styles.input} ${styles.titleInput}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="给帖子起个标题"
            maxLength={80}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        {/* 分类 */}
        <div className={styles.field}>
          <label className={styles.label}>分类</label>
          <div className={styles.categoryGroup}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`${styles.categoryBtn} ${category === cat.value ? styles.categoryActive : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 正文 */}
        <div className={styles.field}>
          <label className={styles.label}>正文</label>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的想法、作品或知识..."
            rows={8}
          />
          {errors.content && <span className={styles.error}>{errors.content}</span>}
        </div>

        {/* 标签 */}
        <div className={styles.field}>
          <label className={styles.label}>
            标签 <span className={styles.labelHint}>（用逗号分隔）</span>
          </label>
          <input
            type="text"
            className={styles.input}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="例如：贵州地戏, 非遗传承, 制作工艺"
          />
        </div>

        {/* 图片上传 */}
        <div className={styles.field}>
          <label className={styles.label}>图片</label>
          <div className={styles.imageArea}>
            {images.map((img, index) => (
              <div key={index} className={styles.imageItem}>
                <img src={img} alt="" className={styles.imagePreview} />
                <button
                  className={styles.imageRemove}
                  onClick={() => removeImage(index)}
                >
                  x
                </button>
              </div>
            ))}
            {images.length < 9 && (
              <label className={styles.imageUploadBtn}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>上传图片</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => navigate('/community')}>
            取消
          </Button>
          <Button variant="primary" size="lg" onClick={handleSubmit}>
            发布帖子
          </Button>
        </div>
      </div>
    </div>
  );
}
