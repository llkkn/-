import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const quickLinks = [
  { path: '/wiki', label: '傩面百科' },
  { path: '/gallery', label: '展览馆' },
  { path: '/diy', label: 'DIY工作台' },
  { path: '/community', label: '社区交流' },
  { path: '/about', label: '关于我们' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* 金色装饰分割线 */}
      <div className={styles.divider} />

      <div className={styles.content}>
        {/* 三栏布局 */}
        <div className={styles.grid}>
          {/* 网站信息 */}
          <div className={styles.siteInfo}>
            <div className={styles.siteName}>傩面</div>
            <p className={styles.siteDesc}>
              致力于中国傩面具非物质文化遗产的数字化保护与传播，
              让更多人了解和感受傩文化的独特魅力。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className={styles.columnTitle}>快速链接</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.linkItem}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className={styles.columnTitle}>联系方式</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>@</span>
                <span>contact@nuomask.cn</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>#</span>
                <span>微信公众号：傩面文化</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>~</span>
                <span>微博：@傩面非遗</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 版权信息 */}
      <div className={styles.copyright}>
        &copy; {currentYear} 傩面 — 中国非物质文化遗产. All rights reserved.
      </div>
    </footer>
  );
}
