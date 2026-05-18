import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/layout/Layout';
import ScrollToTop from '@/shared/layout/ScrollToTop';
import Loading from '@/shared/ui/Loading';

/* ---------- 懒加载页面组件 ---------- */
const Home = lazy(() => import('@/features/home/Home'));
const Encyclopedia = lazy(() => import('@/pages/Wiki'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const DIYStudio = lazy(() => import('@/features/diy/DIYStudio'));
const Community = lazy(() => import('@/features/community/Community'));
const PostDetail = lazy(() => import('@/features/community/components/PostDetail'));
const PostEditor = lazy(() => import('@/features/community/components/PostEditor'));
const About = lazy(() => import('@/features/about/About'));
const NuoOpera = lazy(() => import('@/features/nuo-opera/NuoOpera'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loading type="stamp" text="加载中..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="/encyclopedia/:section" element={<Encyclopedia />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/diy" element={<DIYStudio />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/post/:postId" element={<PostDetail />} />
            <Route path="/community/new" element={<PostEditor />} />
            <Route path="/about" element={<About />} />
            <Route path="/nuo-opera" element={<NuoOpera />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

/* 简易404页面（内联，无需单独文件） */
function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
      fontFamily: 'var(--font-display)', color: 'var(--color-ink-black)'
    }}>
      <div style={{ fontSize: '6rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</div>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>页面未找到</p>
      <a href="/" style={{
        padding: '0.75rem 2rem', background: 'var(--color-primary)',
        color: '#fff', borderRadius: 'var(--radius-md)', textDecoration: 'none',
        fontWeight: 500
      }}>返回首页</a>
    </div>
  );
}
