import HeroBanner from './components/HeroBanner';
import OverviewSection from './components/OverviewSection';
import GenreSection from './components/GenreSection';
import RepertoireSection from './components/RepertoireSection';
import PerformanceSection from './components/PerformanceSection';
import InheritorSection from './components/InheritorSection';
import ConnectionSection from './components/ConnectionSection';
import CTASection from './components/CTASection';
import styles from './NuoOpera.module.css';

export default function NuoOpera() {
  return (
    <main className={styles.page}>
      <HeroBanner />
      <OverviewSection />
      <GenreSection />
      <RepertoireSection />
      <PerformanceSection />
      <InheritorSection />
      <ConnectionSection />
      <CTASection />
    </main>
  );
}
