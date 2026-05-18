import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './ConnectionSection.module.css';

export default function ConnectionSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [leftRef, leftVisible] = useScrollAnimation({ threshold: 0.15 });
  const [rightRef, rightVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>傩面与傩戏</h2>
          <p className={styles.subtitle}>面具与表演的千年共生</p>
        </div>

        {/* 对比布局 */}
        <div className={styles.compare}>
          {/* 左侧：傩面 */}
          <div
            className={`${styles.panel} ${styles.panelLeft} ${leftVisible ? styles.visible : ''}`}
            ref={leftRef}
          >
            <div className={styles.panelIcon}>&#x1F3AD;</div>
            <h3 className={styles.panelTitle}>傩面</h3>
            <div className={styles.panelDecorLine} />
            <p className={styles.panelText}>
              面具是傩戏的灵魂，角色身份的象征。在傩戏表演中，面具不仅仅是化妆工具，更是神灵的化身和沟通人神的媒介。每一副傩面具都承载着特定的文化内涵和宗教意义，从庄严的神灵到诙谐的小鬼，面具的造型、色彩和表情都经过精心设计。
            </p>
            <p className={styles.panelText}>
              演员佩戴面具后，便从凡人转变为面具所代表的神灵或角色，表演具有了神圣的仪式意义。面具的雕刻技艺本身就是一门精湛的非物质文化遗产，代代相传，凝聚着匠人的心血与智慧。
            </p>
            <Link to="/encyclopedia" className={styles.panelLink}>
              探索傩面百科 &rarr;
            </Link>
          </div>

          {/* 中间连接 */}
          <div className={`${styles.connector} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.connectorLine} />
            <div className={styles.connectorCircle}>
              <span className={styles.connectorText}>共生</span>
            </div>
            <div className={styles.connectorArrows}>
              <span className={styles.arrow}>&#x27F1;</span>
            </div>
          </div>

          {/* 右侧：傩戏 */}
          <div
            className={`${styles.panel} ${styles.panelRight} ${rightVisible ? styles.visible : ''}`}
            ref={rightRef}
          >
            <div className={styles.panelIcon}>&#x1F3AD;</div>
            <h3 className={styles.panelTitle}>傩戏</h3>
            <div className={styles.panelDecorLine} />
            <p className={styles.panelText}>
              傩戏是傩面的舞台，赋予面具生命力。没有傩戏表演，面具只是静止的艺术品；没有面具，傩戏便失去了最核心的视觉符号和精神载体。傩戏通过唱、念、做、打的表演形式，让面具中的神灵和角色鲜活起来，在舞台上演绎千年传承的故事。
            </p>
            <p className={styles.panelText}>
              从祭祀仪式到戏曲表演，傩戏的发展历程也是面具艺术不断丰富和演变的历程。每一场傩戏演出，都是面具与表演者共同完成的一次神圣仪式，是人与神、传统与当下的对话。
            </p>
            <Link to="/gallery" className={styles.panelLink}>
              参观展览馆 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
