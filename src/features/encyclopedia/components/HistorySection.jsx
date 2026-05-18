import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './HistorySection.module.css';

const historyData = [
  {
    id: 'origin',
    era: '先秦时期',
    title: '起源',
    content:
      '傩面具的起源可追溯至先秦时期的"方相氏"驱傩仪式。《周礼》记载："方相氏掌蒙熊皮，黄金四目，玄衣朱裳，执戈扬盾，帅百隶而时傩，以索室驱疫。"方相氏作为驱鬼逐疫的神灵化身，佩戴狰狞威猛的面具，率领众人举行盛大的驱傩仪式。这一时期，傩面具主要承担着祭祀和驱疫的实用功能，造型古朴粗犷，充满了原始宗教的神秘力量。',
    image: '/-/images/masks/pingxiang/kaishan.jpg',
  },
  {
    id: 'development',
    era: '汉唐时期',
    title: '发展',
    content:
      '汉代宫廷大傩仪式规模宏大，已成为国家级祭祀活动。《后汉书》记载，汉代宫廷大傩由中黄门率领，一百二十名少年子手持火炬，方相氏与十二兽神共同驱疫。唐代，傩文化进一步发展，与佛教、道教深度融合，傩面具的角色体系日益丰富。唐代宫廷傩仪中，出现了更多装饰华丽、造型精美的面具，傩面具开始从纯粹的祭祀工具向艺术表演载体转变。',
    image: '/-/images/masks/chizhou/guanyu.jpg',
  },
  {
    id: 'peak',
    era: '宋元时期',
    title: '鼎盛',
    content:
      '宋元时期是傩面具艺术的鼎盛阶段。傩面具与戏曲深度融合，角色化面具大量出现，面具的造型更加精细，表情更加丰富。宋代宫廷傩仪中，参与人数多达数百人，面具种类繁多，涵盖了神灵、文臣、武将、老翁、少妇、丑角等各种角色。这一时期，傩面具的雕刻技艺达到了极高的水平，各地开始形成各具特色的地域风格，傩面具从宫廷走向民间，成为广泛流传的民间艺术形式。',
    image: '/-/images/masks/anshun/wujiang.jpg',
  },
  {
    id: 'inheritance',
    era: '明清至今',
    title: '传承',
    content:
      '明清时期，各地傩面具艺术形成了独特的地域流派，如萍乡湘东傩面具、池州傩戏面具、安顺地戏面具、武安傩戏等，各具鲜明的艺术特色。近现代以来，随着社会变迁，傩面具艺术一度面临传承危机。2006年，傩戏（含傩面具）被列入第一批国家级非物质文化遗产名录，各地政府和民间力量积极开展保护和传承工作。如今，傩面具作为中华优秀传统文化的重要组成部分，正焕发出新的生机与活力。',
    image: '/-/images/masks/pingxiang/zhongkui.jpg',
  },
];

export default function HistorySection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section id="history" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>历史渊源</h2>
        <p className={styles.subtitle}>
          从远古祭祀到非遗瑰宝，傩面具承载着数千年的文化记忆
        </p>

        <div className={styles.timeline}>
          {historyData.map((item, index) => (
            <HistoryItem key={item.id} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoryItem({ item, index, isVisible }) {
  const [itemRef, itemVisible] = useScrollAnimation({ threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`${styles.timelineItem} ${isEven ? styles.even : styles.odd} ${itemVisible ? styles.visible : ''}`}
    >
      {/* 时间线节点 */}
      <div className={styles.timelineDot}>
        <span className={styles.era}>{item.era}</span>
      </div>

      {/* 内容卡片 */}
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={item.image} alt={item.title} loading="lazy" />
          <div className={styles.imageOverlay}>
            <span className={styles.cardTitle}>{item.title}</span>
          </div>
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitleText}>{item.title}</h3>
          <p className={styles.cardText}>{item.content}</p>
        </div>
      </div>
    </div>
  );
}
