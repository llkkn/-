import Card from '@/shared/ui/Card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import materials from '@/features/encyclopedia/data/materials';
import styles from './MaterialSection.module.css';

const craftSteps = [
  {
    id: 'select',
    name: '选材',
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 12 L20 20 L26 24" strokeLinecap="round" />
        <path d="M8 8 L14 14" strokeLinecap="round" />
      </svg>
    ),
    description:
      '根据面具用途和角色需求选择合适的木材。优质木材需纹理通直、无裂纹、无虫蛀，树龄三十年以上的老木为佳。选材是傩面具制作的第一步，也是决定面具品质的关键环节。',
  },
  {
    id: 'carve',
    name: '雕刻',
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 30 L18 22 L28 12 L32 8 L34 10 L24 20 L16 28 Z" />
        <path d="M10 30 L8 32 L12 28" />
        <line x1="18" y1="22" x2="24" y2="20" strokeLinecap="round" />
      </svg>
    ),
    description:
      '根据设计图纸进行粗雕和细雕。先以大刀阔斧勾勒出面部轮廓和五官位置，再以精细刻刀逐步雕琢眉眼口鼻等细节。雕刻过程需要匠人对角色性格有深刻理解，做到形神兼备。',
  },
  {
    id: 'paint',
    name: '彩绘',
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 32 Q8 28 12 24 L24 12 Q26 10 28 12 Q30 14 28 16 L16 28 Q12 32 8 32 Z" />
        <circle cx="30" cy="10" r="3" />
        <circle cx="26" cy="14" r="2" />
      </svg>
    ),
    description:
      '以矿物颜料和植物颜料对面具进行彩绘。不同角色有特定的色彩规范：武将以朱红、墨黑为主，文臣以朱红、肉色为主，神仙以金色、朱红为主。彩绘讲究色彩纯正、层次分明、过渡自然。',
  },
  {
    id: 'lacquer',
    name: '上漆',
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="10" width="24" height="20" rx="3" />
        <path d="M14 16 L26 16" strokeLinecap="round" />
        <path d="M14 20 L22 20" strokeLinecap="round" />
        <path d="M14 24 L20 24" strokeLinecap="round" />
        <path d="M20 6 L20 10" strokeLinecap="round" />
        <path d="M16 7 L16 10" strokeLinecap="round" />
        <path d="M24 7 L24 10" strokeLinecap="round" />
      </svg>
    ),
    description:
      '最后涂刷生漆或桐油以保护面具表面。上漆不仅能增强面具的耐久性和防水防潮性能，还能使色彩更加鲜亮持久。传统生漆需要多次涂刷，每次干燥后再涂下一层，最终形成温润光泽的漆面。',
  },
];

const materialIcons = {
  zhangmu: (
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 8 L32 52" strokeLinecap="round" />
      <path d="M32 16 L22 24" strokeLinecap="round" />
      <path d="M32 24 L42 32" strokeLinecap="round" />
      <path d="M32 32 L22 40" strokeLinecap="round" />
      <path d="M32 40 L38 46" strokeLinecap="round" />
      <ellipse cx="32" cy="56" rx="10" ry="4" />
      <path d="M22 56 Q22 52 32 52 Q42 52 42 56" />
    </svg>
  ),
  dingxiangmu: (
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="20" r="6" />
      <path d="M28 26 L24 52" strokeLinecap="round" />
      <path d="M36 26 L40 52" strokeLinecap="round" />
      <path d="M32 26 L32 52" strokeLinecap="round" />
      <path d="M24 36 L40 36" strokeLinecap="round" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <path d="M26 16 Q32 10 38 16" strokeLinecap="round" />
    </svg>
  ),
  baiyangmu: (
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 8 L32 48" strokeLinecap="round" />
      <path d="M32 14 L20 28" strokeLinecap="round" />
      <path d="M32 22 L44 34" strokeLinecap="round" />
      <path d="M32 30 L18 42" strokeLinecap="round" />
      <path d="M32 38 L42 46" strokeLinecap="round" />
      <ellipse cx="32" cy="52" rx="12" ry="4" />
    </svg>
  ),
};

const materialColors = {
  zhangmu: { accent: '#8B6914', bg: '#F5ECD5', light: '#FAF5E8' },
  dingxiangmu: { accent: '#6B3A2A', bg: '#F0E0D5', light: '#FAF0E8' },
  baiyangmu: { accent: '#5D7A3E', bg: '#EDF0E5', light: '#F5F8F0' },
};

export default function MaterialSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section id="material" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>材质与工艺</h2>
        <p className={styles.subtitle}>
          匠心独运，精雕细琢 -- 探秘傩面具的材质选择与制作工艺
        </p>

        {/* 材质卡片 */}
        <div className={styles.materialGrid}>
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>

        {/* 工艺流程 */}
        <div className={styles.craftSection}>
          <h3 className={styles.craftTitle}>制作工艺流程</h3>
          <p className={styles.craftDesc}>
            一件傩面具的诞生，需经历选材、雕刻、彩绘、上漆四大工序，每一步都凝聚着匠人的心血与智慧。
          </p>
          <div className={styles.craftSteps}>
            {craftSteps.map((step, index) => (
              <CraftStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialCard({ material }) {
  const colors = materialColors[material.id] || materialColors.zhangmu;

  return (
    <Card hoverable className={styles.materialCard}>
      <div className={styles.cardTop} style={{ backgroundColor: colors.light }}>
        <div className={styles.materialIcon} style={{ color: colors.accent }}>
          {materialIcons[material.id]}
        </div>
        <h3 className={styles.materialName} style={{ color: colors.accent }}>
          {material.name}
        </h3>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.materialDesc}>{material.description}</p>

        <div className={styles.features}>
          <span className={styles.featuresLabel}>主要特性</span>
          <ul className={styles.featureList}>
            {material.features.map((feat) => (
              <li key={feat} className={styles.featureItem}>
                <span className={styles.featureDot} style={{ backgroundColor: colors.accent }} />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.usage}>
          <span className={styles.usageLabel}>适用范围</span>
          <p className={styles.usageText}>{material.usage}</p>
        </div>
      </div>
    </Card>
  );
}

function CraftStep({ step, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`${styles.step} ${isVisible ? styles.stepVisible : ''}`}
    >
      <div className={styles.stepNumber}>{index + 1}</div>
      <div className={styles.stepIcon}>{step.icon}</div>
      <h4 className={styles.stepName}>{step.name}</h4>
      <p className={styles.stepDesc}>{step.description}</p>
      {index < craftSteps.length - 1 && <div className={styles.stepArrow} />}
    </div>
  );
}
