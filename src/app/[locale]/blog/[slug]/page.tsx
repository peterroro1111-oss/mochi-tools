import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { blogPosts, getPostBySlug, getRelatedPosts, categoryLabels } from '../data';
import { BestPdfToolsZh, BestPdfToolsEn } from './best-free-pdf-tools-2026';
import { ImageCompressionGuideZh, ImageCompressionGuideEn } from './image-compression-guide';
import { VideoCompressionToolsZh, VideoCompressionToolsEn } from './free-video-compression-tools';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';
import type { Metadata } from 'next';

const ARTICLE_COMPONENTS: Record<string, { zh: () => JSX.Element; en: () => JSX.Element }> = {
  'best-free-pdf-tools-2026': { zh: BestPdfToolsZh, en: BestPdfToolsEn },
  'image-compression-guide': { zh: ImageCompressionGuideZh, en: ImageCompressionGuideEn },
  'free-video-compression-tools': { zh: VideoCompressionToolsZh, en: VideoCompressionToolsEn },
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const { locale, slug } = params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const isZh = locale === 'zh';
  return {
    title: `${isZh ? post.titleZh : post.titleEn} | Mochi Tools`,
    description: isZh ? post.summaryZh : post.summaryEn,
  };
}

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const components = ARTICLE_COMPONENTS[slug];
  if (!components) notFound();

  const isZh = locale === 'zh';
  const ArticleContent = isZh ? components.zh : components.en;
  const relatedPosts = getRelatedPosts(slug, 3);
  const readingTime = isZh ? post.readingTimeZh : post.readingTimeEn;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isZh ? post.titleZh : post.titleEn,
    description: isZh ? post.summaryZh : post.summaryEn,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Mochi Tools', url: 'https://mochitools.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Mochi Tools',
      url: 'https://mochitools.com',
      logo: { '@type': 'ImageObject', url: 'https://mochitools.com/favicon.ico' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mochitools.com/${locale}/blog/${slug}`,
    },
    wordCount: isZh ? post.readingTimeZh * 500 : post.readingTimeEn * 250,
    inLanguage: locale === 'zh' ? 'zh-TW' : 'en',
  };

  return (
    <div className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-pink-400 hover:text-pink-600 mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isZh ? '返回文章列表' : 'Back to articles'}
        </Link>

        <div className="flex gap-8">
          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-4xl">
            {/* Article Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700 border border-pink-200">
                  {isZh ? categoryLabels[post.category].zh : categoryLabels[post.category].en}
                </span>
                <time className="text-sm text-gray-400">{post.date}</time>
                <span className="text-sm text-gray-400">
                  {isZh ? `${readingTime} 分鐘閱讀` : `${readingTime} min read`}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {isZh ? post.titleZh : post.titleEn}
              </h1>
              <p className="text-gray-500 text-lg">
                {isZh ? post.summaryZh : post.summaryEn}
              </p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-pink-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {isZh ? 'Mochi Tools 團隊' : 'Mochi Tools Team'}
                  </p>
                  <p className="text-xs text-gray-400">mochitools.com</p>
                </div>
              </div>
            </header>

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8 bg-white border-2 border-pink-100 rounded-xl p-4">
              <TableOfContents isZh={isZh} />
            </div>

            {/* Article Body */}
            <div className="blog-content">
              <ArticleContent />
            </div>

            {/* Share Buttons */}
            <div className="mt-10 pt-6 border-t border-pink-100">
              <ShareButtons title={isZh ? post.titleZh : post.titleEn} isZh={isZh} />
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-pink-50 to-pink-100/50 border-2 border-pink-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {isZh ? '試試 Mochi Tools 的免費工具' : 'Try Mochi Tools for Free'}
              </h3>
              <p className="text-gray-500 mb-4">
                {isZh
                  ? '所有工具都在瀏覽器本地處理，檔案不會上傳到伺服器。完全免費、不需要註冊。'
                  : 'All tools process locally in your browser. Files never upload to servers. Completely free, no registration needed.'}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #f8a4b8, #f48fb1)',
                  boxShadow: '0 4px 15px rgba(248, 164, 184, 0.3)',
                }}
              >
                {isZh ? '🍡 前往 Mochi Tools' : '🍡 Go to Mochi Tools'}
              </Link>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 pt-8 border-t border-pink-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isZh ? '推薦閱讀' : 'Related Articles'}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}` as '/blog'}
                      className="blog-card p-4 group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          {related.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-700 mb-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                            {isZh ? related.titleZh : related.titleEn}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {related.date} · {isZh ? `${related.readingTimeZh} 分鐘` : `${related.readingTimeEn} min`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white border-2 border-pink-100 text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isZh ? '返回部落格' : 'Back to Blog'}
              </Link>
            </div>
          </article>

          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <TableOfContents isZh={isZh} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
