export default function About() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ink-black)', marginBottom: '1rem' }}>
        关于傩面
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
        本网站致力于中国傩面非物质文化遗产的数字化保护与传播，
        通过知识展示、互动创作和社区交流，让更多人了解和喜爱这一古老的艺术形式。
      </p>
    </div>
  );
}
