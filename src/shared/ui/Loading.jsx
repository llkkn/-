import styles from './Loading.module.css';

export default function Loading({
  type = 'ink',
  size = 'md',
  text = '加载中...',
  fullscreen = false,
  className = '',
}) {
  const classNames = [
    styles.wrapper,
    styles[size],
    fullscreen ? styles.fullscreen : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {type === 'ink' && (
        <div className={styles.inkSpinner}>
          <div className={styles.inkDot} />
          <div className={styles.inkDot} />
          <div className={styles.inkDot} />
        </div>
      )}

      {type === 'stamp' && (
        <div className={styles.stampSpinner}>
          <div className={styles.stampRing} />
          <div className={styles.stampInner}>傩</div>
        </div>
      )}

      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}
