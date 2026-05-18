import Modal from '@/shared/ui/Modal';
import styles from './MaskDetailModal.module.css';

/* 角色类别映射 */
const ROLE_CATEGORY_MAP = {
  wenchen: '文臣',
  wujiang: '武将',
  laoweng: '老翁',
  shaofu: '少妇',
  shenxian: '神仙',
  choujiao: '丑角',
};

/* 造型类型映射 */
const FORM_TYPE_MAP = {
  zhenglian: '正脸',
  banlian: '半脸',
};

export default function MaskDetailModal({ mask, isOpen, onClose }) {
  if (!mask) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={styles.modalContent}
      showCloseButton={true}
    >
      <div className={styles.layout}>
        {/* 左侧大图 */}
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={mask.imageUrl}
            alt={mask.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className={styles.imagePlaceholder} style={{ display: 'none' }}>
            {mask.name.charAt(0)}
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className={styles.infoSection}>
          {/* 名称 */}
          <h2 className={styles.maskName}>{mask.name}</h2>

          {/* 流派标签 + 角色标签 */}
          <div className={styles.tagRow}>
            <span className={`${styles.badge} ${styles.badgeRegion}`}>
              {mask.regionName}
            </span>
            <span className={`${styles.badge} ${styles.badgeRole}`}>
              {ROLE_CATEGORY_MAP[mask.roleCategory] || mask.roleCategory}
            </span>
          </div>

          {/* 基本信息表格 */}
          <div className={styles.infoTable}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>材质</span>
              <span className={styles.infoValue}>{mask.material}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>尺寸</span>
              <span className={styles.infoValue}>{mask.dimensions}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>年代</span>
              <span className={styles.infoValue}>{mask.period}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>造型</span>
              <span className={styles.infoValue}>
                {FORM_TYPE_MAP[mask.formType] || mask.formType}
              </span>
            </div>
          </div>

          <div className={styles.separator} />

          {/* 描述文字 */}
          <p className={styles.description}>{mask.description}</p>

          {/* 文化背景说明 */}
          {mask.culturalNote && (
            <div className={styles.culturalNote}>
              <div className={styles.culturalNoteTitle}>文化背景</div>
              <p className={styles.culturalNoteText}>{mask.culturalNote}</p>
            </div>
          )}

          {/* 标签列表 */}
          {mask.tags && mask.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <div className={styles.tagsTitle}>标签</div>
              <div className={styles.tagsList}>
                {mask.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
