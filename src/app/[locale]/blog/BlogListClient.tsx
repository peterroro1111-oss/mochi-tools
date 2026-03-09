'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { blogPosts, CATEGORIES, categoryLabels, type Category } from './data';

export default function BlogListClient({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category;
      if (!search.trim()) return matchesCategory;
      const q = search.toLowerCase();
      const title = (isZh ? post.titleZh : post.titleEn).toLowerCase();
      const summary = (isZh ? post.summaryZh : post.summaryEn).toLowerCase();
      return matchesCategory && (title.includes(q) || summary.includes(q));
    });
  }, [search, category, isZh]);

  const featured = blogPosts.find((p) => p.featured);
  const showFeatured = !search.trim() && category === 'all' && featured;

  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4">
          {isZh ? '部落格' : 'Blog'}
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {isZh
            ? '實用教學、工具推薦、技巧分享 — 幫你更高效地處理檔案'
            : 'Tutorials, tool recommendations, and tips to help you work more efficiently'}
        </p>
        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isZh ? '搜尋文章...' : 'Search articles...'}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              category === cat
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                : 'bg-[#161b22] text-gray-400 border border-[#30363d] hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {isZh ? categoryLabels[cat].zh : categoryLabels[cat].en}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}` as '/blog'}
          className="block blog-card p-0 overflow-hidden mb-8 group"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-500/20 text-pink-400 border border-pink-500/30">
                {isZh ? '精選文章' : 'Featured'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#0d1117] text-gray-400 border border-[#30363d]">
                {isZh
                  ? categoryLabels[featured.category].zh
                  : categoryLabels[featured.category].en}
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl md:text-5xl shrink-0 group-hover:scale-110 transition-transform">
                {featured.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 group-hover:text-pink-400 transition-colors">
                  {isZh ? featured.titleZh : featured.titleEn}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {isZh ? featured.summaryZh : featured.summaryEn}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time>{featured.date}</time>
                  <span>
                    {isZh
                      ? `${featured.readingTimeZh} 分鐘閱讀`
                      : `${featured.readingTimeEn} min read`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered
          .filter((p) => !(showFeatured && p.slug === featured?.slug))
          .map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}` as '/blog'}
              className="blog-card p-5 md:p-6 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0d1117] text-gray-400 border border-[#30363d]">
                  {isZh ? categoryLabels[post.category].zh : categoryLabels[post.category].en}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {post.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-gray-100 mb-2 group-hover:text-pink-400 transition-colors">
                    {isZh ? post.titleZh : post.titleEn}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {isZh ? post.summaryZh : post.summaryEn}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <time>{post.date}</time>
                    <span>
                      {isZh
                        ? `${post.readingTimeZh} 分鐘閱讀`
                        : `${post.readingTimeEn} min read`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>{isZh ? '找不到符合的文章' : 'No matching articles found'}</p>
        </div>
      )}
    </>
  );
}
