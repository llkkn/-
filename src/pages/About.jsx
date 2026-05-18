import styles from './Placeholder.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>关于</h1>
        <p className={styles.desc}>页面建设中，敬请期待...</p>
      </div>
    </div>
  );
}
