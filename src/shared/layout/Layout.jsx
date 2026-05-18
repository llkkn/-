import Header from './Header';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
