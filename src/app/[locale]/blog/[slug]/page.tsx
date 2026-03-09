import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { blogPosts, getPostBySlug } from '../data';
import { BestPdfToolsZh, BestPdfToolsEn } from './best-free-pdf-tools-2026';
import { ImageCompressionGuideZh, ImageCompressionGuideEn } from './image-compression-guide';
import { VideoCompressionToolsZh, VideoCompressionToolsEn } from './free-video-compression-tools';
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
  const t = await getTranslations('blog');
  const ArticleContent = isZh ? components.zh : components.en;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isZh ? post.titleZh : post.titleEn,
    description: isZh ? post.summaryZh : post.summaryEn,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Mochi Tools' },
    publisher: { '@type': 'Organization', name: 'Mochi Tools', url: 'https://mochitools.com' },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 mb-6 transition-colors"
      >
        ← {t('backToList')}
      </Link>

      <article className="prose prose-gray max-w-none">
        <div className="mb-8">
          <time className="text-sm text-gray-400">{post.date}</time>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-4">
            {isZh ? post.titleZh : post.titleEn}
          </h1>
        </div>

        <div className="blog-content space-y-4 text-gray-700 leading-relaxed">
          <ArticleContent />
        </div>
      </article>
    </div>
  );
}
