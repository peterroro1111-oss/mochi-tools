import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { blogPosts } from './data';
import type { Metadata } from 'next';

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
  const t = await getTranslations('blog');
  const isZh = locale === 'zh';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📝</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}` as '/blog'}
            className="block bg-white rounded-2xl border-2 border-pink-100 hover:border-pink-300 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{post.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
                  {isZh ? post.titleZh : post.titleEn}
                </h2>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {isZh ? post.summaryZh : post.summaryEn}
                </p>
                <time className="text-xs text-gray-400">{post.date}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
