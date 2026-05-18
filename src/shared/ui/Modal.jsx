import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  contentClassName = '',
  ...props
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose?.();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={className}>
      {/* 遮罩层 */}
      <div
        className={styles.overlay}
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* 模态内容 */}
      <div className={`${styles.content} ${contentClassName}`} role="dialog" aria-modal="true" {...props}>
        {showCloseButton && (
          <button className={styles.closeButton} onClick={onClose} aria-label="关闭">
            &times;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader({ children, className = '', ...props }) {
  return (
    <div className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  );
};

Modal.Body = function ModalBody({ children, className = '', ...props }) {
  return (
    <div className={`${styles.body} ${className}`} {...props}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({ children, className = '', ...props }) {
  return (
    <div className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  );
};
