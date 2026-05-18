import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import Card from '@/shared/ui/Card';
import inheritorsData from '../data/inheritorsData';
import styles from './InheritorSection.module.css';

const avatarColors = [
  '#B22222', '#8B4513', '#2F4F4F', '#4A7C59',
  '#6B3FA0', '#C9A96E', '#1A6B5A',
];

/* ========== 详情弹窗 ========== */

function InheritorModal({ inheritor, index, onClose }) {
  const bgColor = avatarColors[index % avatarColors.length];
  const firstChar = inheritor.name.charAt(0);

  // ESC 关闭
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // 点击遮罩关闭
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* 关闭按钮 */}
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="关闭"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 顶部装饰线 */}
        <div className={styles.modalDecorTop} />

        {/* 头像 */}
        <div className={styles.modalAvatar} style={{ backgroundColor: bgColor }}>
          <span className={styles.modalAvatarChar}>{firstChar}</span>
        </div>

        {/* 姓名 */}
        <h3 className={styles.modalName}>{inheritor.name}</h3>

        {/* 称号 */}
        <p className={styles.modalTitleText}>{inheritor.title}</p>

        {/* 标签 */}
        <div className={styles.modalTags}>
          <span className={styles.heritageTag}>{inheritor.heritageLevel}</span>
          <span className={styles.regionTag}>{inheritor.regionName}</span>
          <span className={styles.yearTag}>{inheritor.year}</span>
        </div>

        {/* 分隔线 */}
        <div className={styles.modalDivider} />

        {/* 擅长技艺 */}
        <div className={styles.modalSection}>
          <span className={styles.modalLabel}>擅长技艺</span>
          <p className={styles.modalValue}>{inheritor.specialty}</p>
        </div>

        {/* 主要贡献 */}
        <div className={styles.modalSection}>
          <span className={styles.modalLabel}>主要贡献</span>
          <p className={styles.modalContribution}>{inheritor.contribution}</p>
        </div>

        {/* 底部装饰线 */}
        <div className={styles.modalDecorBottom} />
      </div>
    </div>,
    document.body
  );
}

/* ========== 传承人卡片 ========== */

function InheritorCard({ inheritor, index, onClick }) {
  const bgColor = avatarColors[index % avatarColors.length];
  const firstChar = inheritor.name.charAt(0);

  return (
    <Card
      className={styles.card}
      hoverable={false}
      onClick={onClick}
    >
      <Card.Body>
        {/* 头像 */}
        <div className={styles.avatar} style={{ backgroundColor: bgColor }}>
          <span className={styles.avatarChar}>{firstChar}</span>
        </div>

        {/* 姓名 */}
        <h3 className={styles.name}>{inheritor.name}</h3>

        {/* 称号 */}
        <p className={styles.titleText}>{inheritor.title}</p>

        {/* 标签 */}
        <div className={styles.tags}>
          <span className={styles.heritageTag}>{inheritor.heritageLevel}</span>
          <span className={styles.regionTag}>{inheritor.regionName}</span>
        </div>

        {/* 擅长技艺 */}
        <div className={styles.specialty}>
          <span className={styles.label}>擅长技艺</span>
          <span className={styles.value}>{inheritor.specialty}</span>
        </div>

        {/* 主要贡献 */}
        <div className={styles.contribution}>
          <span className={styles.label}>主要贡献</span>
          <p className={styles.contributionText}>
            {inheritor.contribution.length > 80
              ? inheritor.contribution.slice(0, 80) + '...'
              : inheritor.contribution}
          </p>
          <span className={styles.viewDetail}>点击查看详情</span>
        </div>
      </Card.Body>
    </Card>
  );
}

/* ========== 主组件 ========== */

export default function InheritorSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const [selectedInheritor, setSelectedInheritor] = useState(null);

  const handleCardClick = useCallback((inheritor, index) => {
    setSelectedInheritor({ inheritor, index });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedInheritor(null);
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>薪火相传</h2>
          <p className={styles.subtitle}>守护傩戏的七位传承人</p>
        </div>

        {/* 传承人卡片 */}
        <div className={styles.grid}>
          {inheritorsData.map((inheritor, index) => (
            <div
              key={inheritor.id}
              className={`${styles.gridItem} ${isVisible ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <InheritorCard
                inheritor={inheritor}
                index={index}
                onClick={() => handleCardClick(inheritor, index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedInheritor && (
        <InheritorModal
          inheritor={selectedInheritor.inheritor}
          index={selectedInheritor.index}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
