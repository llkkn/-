import useScrollAnimation from '@/hooks/useScrollAnimation';
import styles from './OverviewSection.module.css';

export default function OverviewSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* 标题区 */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.decorLine} />
          <h2 className={styles.title}>什么是傩戏</h2>
          <p className={styles.subtitle}>中国戏曲的活化石</p>
        </div>

        {/* 左右布局 */}
        <div className={styles.layout}>
          {/* 左侧文字 */}
          <div className={`${styles.text} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.paragraph}>
              <h3 className={styles.paragraphTitle}>定义与起源</h3>
              <p>
                傩戏是从远古傩祭仪式中蜕变出来的戏曲形式，距今已有三千多年历史。先秦时期&ldquo;方相氏&rdquo;率百隶驱傩的仪式，是傩戏的最早源头。&ldquo;傩&rdquo;字本义为&ldquo;行有节度&rdquo;，后引申为驱逐疫鬼的祭祀活动，是中华文明中最古老的宗教仪式之一。
              </p>
            </div>

            <div className={styles.paragraph}>
              <h3 className={styles.paragraphTitle}>发展演变</h3>
              <p>
                汉代宫廷大傩规模宏大，&ldquo;方相氏与十二兽舞&rdquo;成为固定仪制。唐宋时期，傩祭逐渐从纯粹的祭祀仪式向戏曲表演转变，出现了&ldquo;傩戏&rdquo;这一独立的艺术形式。宋元时期，傩戏吸收了成熟的戏曲元素，形成了较为完整的戏曲体制，在民间广泛流传。
              </p>
            </div>

            <div className={styles.paragraph}>
              <h3 className={styles.paragraphTitle}>表演特点</h3>
              <p>
                傩戏表演多戴面具，角色行当分生、旦、净、丑。演出与宗教仪式紧密结合，具有驱邪纳吉、祈福还愿的功能。不同地区的傩戏各具特色：池州傩戏古朴典雅、安顺地戏豪迈奔放、武安傩戏粗犷恢宏、辰州傩戏神秘浪漫，共同构成了丰富多彩的傩戏文化图谱。
              </p>
            </div>

            <div className={styles.paragraph}>
              <h3 className={styles.paragraphTitle}>当代传承</h3>
              <p>
                2006年起，池州傩戏、武安傩戏、安顺地戏等多个傩戏剧种被列入国家级非物质文化遗产名录。如今，傩戏不仅是中国戏曲研究的重要活态资料，更是中华优秀传统文化的重要组成部分，吸引着越来越多的学者和爱好者关注。
              </p>
            </div>
          </div>

          {/* 右侧图片 */}
          <div className={`${styles.image} ${imageVisible ? styles.visible : ''}`} ref={imageRef}>
            <div className={styles.imageFrame}>
              <img
                src="/images/masks/anshun/wujiang.jpg"
                alt="傩戏面具"
                loading="lazy"
              />
              <div className={styles.imageCaption}>
                <span className={styles.captionIcon}>&#x2694;</span>
                安顺地戏武将面具
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
