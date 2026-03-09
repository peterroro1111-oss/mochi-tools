import type { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '部落格 — Mochi Tools 🍡' : 'Blog — Mochi Tools 🍡',
    description: isZh
      ? '免費線上工具使用教學、圖片壓縮指南、PDF 工具推薦等實用文章。'
      : 'Tutorials on free online tools, image compression guides, PDF tool recommendations and more.',
  };
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="blog-page">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <BlogListClient locale={locale} />
      </div>
    </div>
  );
}
