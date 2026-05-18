import styles from './Placeholder.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.desc}>页面未找到</p>
      </div>
    </div>
  );
}
