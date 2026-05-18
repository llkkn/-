import { useMemo } from 'react';
import Tabs from '@/shared/ui/Tabs';
import Card from '@/shared/ui/Card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import maskCategories from '@/features/encyclopedia/data/maskCategories';
import styles from './ClassificationSection.module.css';

const roleIcons = {
  wenchen: '\u6587',
  wujiang: '\u6b66',
  laoweng: '\u7fc1',
  shaofu: '\u5987',
  shenxian: '\u795e',
  choujiao: '\u4e11',
};

const roleColors = {
  wenchen: { bg: '#F5E6D3', accent: '#8B4513', text: '#5D3A1A' },
  wujiang: { bg: '#F5D5D5', accent: '#B22222', text: '#8B1A1A' },
  laoweng: { bg: '#EDE8D5', accent: '#8B7355', text: '#5C4A32' },
  shaofu: { bg: '#F5E0E8', accent: '#C76B8E', text: '#8B3A5C' },
  shenxian: { bg: '#F0E6C8', accent: '#B8860B', text: '#8B6914' },
  choujiao: { bg: '#E8F0E0', accent: '#4A7C59', text: '#2D5038' },
};

export default function ClassificationSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  const tabItems = useMemo(
    () => [
      {
        key: 'byForm',
        label: '按造型分',
        content: <ByFormView />,
      },
      {
        key: 'byRole',
        label: '按角色分',
        content: <ByRoleView />,
      },
    ],
    []
  );

  return (
    <section id="classification" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>分类体系</h2>
        <p className={styles.subtitle}>
          按造型与角色两大维度，解读傩面具的丰富面貌
        </p>

        <div className={styles.tabsWrapper}>
          <Tabs items={tabItems} className={styles.tabs} panelClassName={styles.tabPanel} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 按造型分视图 ---------- */
function ByFormView() {
  return (
    <div className={styles.formGrid}>
      {maskCategories.byForm.map((item) => (
        <Card key={item.id} hoverable className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <div className={styles.formIcon}>
              {item.id === 'zhenglian' ? (
                <svg viewBox="0 0 48 48" width="48" height="48">
                  <ellipse cx="24" cy="24" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="20" r="3" fill="currentColor" />
                  <circle cx="32" cy="20" r="3" fill="currentColor" />
                  <path d="M18 30 Q24 36 30 30" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg viewBox="0 0 48 48" width="48" height="48">
                  <path d="M8 12 Q24 4 40 12 L38 28 Q24 36 10 28 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="20" r="3" fill="currentColor" />
                  <circle cx="32" cy="20" r="3" fill="currentColor" />
                  <path d="M18 28 Q24 32 30 28" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                </svg>
              )}
            </div>
            <h3 className={styles.formName}>{item.name}</h3>
          </div>
          <p className={styles.formDesc}>{item.description}</p>
          <div className={styles.formExamples}>
            <span className={styles.examplesLabel}>代表面具：</span>
            <div className={styles.exampleTags}>
              {item.examples.map((ex) => (
                <span key={ex} className={styles.exampleTag}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- 按角色分视图 ---------- */
function ByRoleView() {
  return (
    <div className={styles.roleGrid}>
      {maskCategories.byRole.map((role) => {
        const colors = roleColors[role.id] || roleColors.wenchen;
        return (
          <Card key={role.id} hoverable className={styles.roleCard}>
            <div
              className={styles.roleCardTop}
              style={{ backgroundColor: colors.bg }}
            >
              <div
                className={styles.roleIcon}
                style={{ color: colors.accent, borderColor: colors.accent }}
              >
                {roleIcons[role.id]}
              </div>
              <h3 className={styles.roleName} style={{ color: colors.text }}>
                {role.name}
              </h3>
            </div>
            <div className={styles.roleCardBody}>
              <p className={styles.roleDesc}>{role.description}</p>

              <div className={styles.colorScheme}>
                <span className={styles.schemeLabel}>配色方案</span>
                <div className={styles.schemeColors}>
                  <span className={styles.schemeTag} style={{ borderColor: colors.accent, color: colors.accent }}>
                    {role.colorScheme.primary}
                  </span>
                  <span className={styles.schemeTag} style={{ borderColor: colors.accent, color: colors.accent }}>
                    {role.colorScheme.secondary}
                  </span>
                  <span className={styles.schemeTag} style={{ borderColor: colors.accent, color: colors.accent }}>
                    {role.colorScheme.accent}
                  </span>
                </div>
              </div>

              <div className={styles.features}>
                <span className={styles.featuresLabel}>代表特征</span>
                <ul className={styles.featureList}>
                  {role.representativeFeatures.map((feat) => (
                    <li key={feat} className={styles.featureItem}>
                      <span className={styles.featureDot} style={{ backgroundColor: colors.accent }} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
