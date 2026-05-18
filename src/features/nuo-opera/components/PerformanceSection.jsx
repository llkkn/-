import { useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import Card from '@/shared/ui/Card';
import performanceData from '../data/performanceData';
import styles from './PerformanceSection.module.css';

/* ========== SVG 图标 ========== */

function RolesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 15c1.5 1.5 4.5 1.5 6 0" />
      <path d="M4 12c-1-3 0-6 2-8M20 12c1-3 0-6-2-8" />
    </svg>
  );
}

function FootworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18c1-2 3-3 5-3s4 1 5 3" />
      <path d="M10 15V9" />
      <path d="M7 12l3-3 3 3" />
      <path d="M15 18c1-2 3-3 5-3" />
      <path d="M21 18c-1-2-3-3-5-3" />
      <circle cx="10" cy="7" r="2" />
      <circle cx="17" cy="7" r="2" />
    </svg>
  );
}

function MasksIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 4 5 3 9c-.5 2.5 0 5 1.5 7 .8 1 2 1.8 3.5 2.2V22h8v-3.8c1.5-.4 2.7-1.2 3.5-2.2 1.5-2 2-4.5 1.5-7C20 5 16 2 12 2z" />
      <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <path d="M10 14h4" />
      <path d="M12 2v2M8 3l1 1.5M16 3l-1 1.5" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="8" cy="18" rx="4" ry="2.5" />
      <path d="M12 18V6l8-2v12" />
      <ellipse cx="20" cy="16" rx="4" ry="2.5" />
      <path d="M12 6c-1-2-3-3-4-3" />
    </svg>
  );
}

function DanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v5" />
      <path d="M8 8l4 3 4-3" />
      <path d="M9 11l-3 4h3l2 6h2l2-6h3l-3-4" />
      <path d="M15 11l3 4" />
    </svg>
  );
}

function RitualIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M9 4l3 2 3-2" />
      <path d="M8 8h8" />
      <path d="M6 8c0 4 2 7 6 9 4-2 6-5 6-9" />
      <path d="M12 17v5" />
      <path d="M9 19l3 3 3-3" />
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const sectionIcons = {
  roles: RolesIcon,
  footwork: FootworkIcon,
  masks: MasksIcon,
  music: MusicIcon,
  dance: DanceIcon,
  ritual: RitualIcon,
};

/* ========== 可展开卡片包装器 ========== */

function ExpandableCard({ iconKey, title, summary, children }) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = sectionIcons[iconKey];

  return (
    <Card className={styles.card} hoverable={false}>
      <Card.Body>
        <div
          className={styles.cardHeader}
          onClick={() => setExpanded(!expanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        >
          <div className={styles.cardIcon}>
            <IconComponent />
          </div>
          <div className={styles.cardHeaderContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardSummary}>{summary}</p>
          </div>
          <span className={`${styles.expandArrow} ${expanded ? styles.expandArrowOpen : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        <div className={`${styles.expandContent} ${expanded ? styles.expandContentOpen : ''}`}>
          {children}
        </div>
      </Card.Body>
    </Card>
  );
}

/* ========== 各卡片组件 ========== */

function RolesCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="roles" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <div className={styles.roleList}>
        {data.categories.map((cat) => (
          <div key={cat.id} className={styles.roleItem}>
            <span className={styles.roleName}>{cat.name}</span>
            <div className={styles.roleSubTypes}>
              {cat.subTypes.map((sub, idx) => (
                <span key={idx} className={styles.subTypeTag}>{sub}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

function FootworkCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="footwork" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <div className={styles.footworkList}>
        {data.types.map((type) => (
          <div key={type.id} className={styles.footworkItem}>
            <span className={styles.footworkName}>{type.name}</span>
            <span className={styles.footworkUsage}>{type.usage}</span>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

function MasksCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="masks" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <div className={styles.maskTypes}>
        {data.types.map((type) => (
          <div key={type.id} className={styles.maskType}>
            <span className={styles.maskTypeName}>{type.name}</span>
            <p className={styles.maskTypeDesc}>{type.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.rituals}>
        <h4 className={styles.ritualTitle}>佩戴仪式</h4>
        {data.rituals.map((ritual, idx) => (
          <div key={idx} className={styles.ritualItem}>
            <span className={styles.ritualDot} />
            <span>{ritual}</span>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

function MusicCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="music" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <h4 className={styles.subTitle}>打击乐器</h4>
      <div className={styles.instrumentList}>
        {data.percussion.map((inst) => (
          <div key={inst.id} className={styles.instrumentItem}>
            <span className={styles.instName}>{inst.name}</span>
            <p className={styles.instDesc}>{inst.description}</p>
          </div>
        ))}
      </div>
      <h4 className={styles.subTitle}>唱腔特点</h4>
      <div className={styles.vocalList}>
        {data.vocalStyles.map((vocal) => (
          <div key={vocal.id} className={styles.vocalItem}>
            <span className={styles.vocalName}>{vocal.name}</span>
            <p className={styles.vocalDesc}>{vocal.description}</p>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

function DanceCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="dance" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <div className={styles.danceList}>
        {data.types.map((type) => (
          <div key={type.id} className={styles.danceItem}>
            <span className={styles.danceName}>{type.name}</span>
            <div className={styles.danceChars}>
              {type.characteristics.map((ch, idx) => (
                <span key={idx} className={styles.danceChar}>{ch}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

function RitualCard({ data }) {
  const summary = data.description.length > 60
    ? data.description.slice(0, 60) + '...'
    : data.description;

  return (
    <ExpandableCard iconKey="ritual" title={data.title} summary={summary}>
      <p className={styles.cardDesc}>{data.description}</p>
      <div className={styles.ritualFlow}>
        {data.stages.map((stage) => (
          <div key={stage.id} className={styles.stageItem}>
            <div className={styles.stageOrder}>{stage.order}</div>
            <div className={styles.stageContent}>
              <span className={styles.stageName}>{stage.name}</span>
              <p className={styles.stageDesc}>{stage.description}</p>
              <div className={styles.stageElements}>
                {stage.keyElements.map((el, idx) => (
                  <span key={idx} className={styles.stageElement}>{el}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ExpandableCard>
  );
}

const cardComponents = {
  roles: RolesCard,
  footwork: FootworkCard,
  masks: MasksCard,
  music: MusicCard,
  dance: DanceCard,
  ritual: RitualCard,
};

export default function PerformanceSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 });

  const sections = [
    { key: 'roles', data: performanceData.roles },
    { key: 'footwork', data: performanceData.footwork },
    { key: 'masks', data: performanceData.masks },
    { key: 'music', data: performanceData.music },
    { key: 'dance', data: performanceData.dance },
    { key: 'ritual', data: performanceData.ritual },
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>表演艺术</h2>
          <p className={styles.subtitle}>六大维度，解读傩戏表演体系</p>
        </div>

        {/* 网格 */}
        <div className={styles.grid}>
          {sections.map((section, index) => {
            const CardComponent = cardComponents[section.key];
            return (
              <div
                key={section.key}
                className={`${styles.gridItem} ${isVisible ? styles.visible : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardComponent data={section.data} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
