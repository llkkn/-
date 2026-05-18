import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import TimelineSection from './components/TimelineSection';
import CategoryPreview from './components/CategoryPreview';
import CTASection from './components/CTASection';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.home}>
      <HeroSection />
      <IntroSection />
      <TimelineSection />
      <CategoryPreview />
      <CTASection />
    </main>
  );
}
