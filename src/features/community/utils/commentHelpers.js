/**
 * 生成唯一ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

/**
 * 格式化时间为友好格式
 * @param {string} dateString - ISO 时间字符串
 * @returns {string} 格式化后的时间文本
 */
export function formatTime(dateString) {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 30) return `${days}天前`;

  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (year === new Date().getFullYear()) {
    return `${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
}

/**
 * 将扁平评论数组构建为嵌套树结构
 * @param {Array} comments - 扁平评论数组
 * @returns {Array} 嵌套树结构的评论数组（仅顶级评论）
 */
export function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  // 先创建所有节点的映射
  comments.forEach((comment) => {
    map[comment.id] = { ...comment, children: [] };
  });

  // 构建树
  comments.forEach((comment) => {
    if (comment.parentId && map[comment.parentId]) {
      map[comment.parentId].children.push(map[comment.id]);
    } else {
      roots.push(map[comment.id]);
    }
  });

  // 按时间排序：顶级评论按时间倒序，子评论按时间正序
  roots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  roots.forEach((root) => sortChildren(root));

  return roots;
}

/**
 * 递归排序子评论（按时间正序）
 */
function sortChildren(node) {
  if (node.children && node.children.length > 0) {
    node.children.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    node.children.forEach(sortChildren);
  }
}
