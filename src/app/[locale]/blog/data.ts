export interface BlogPost {
  slug: string;
  date: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  icon: string;
  category: 'pdf' | 'image' | 'video' | 'tutorial';
  readingTimeZh: number;
  readingTimeEn: number;
  featured?: boolean;
}

export const CATEGORIES = ['all', 'pdf', 'image', 'video', 'tutorial'] as const;
export type Category = (typeof CATEGORIES)[number];

export const categoryLabels: Record<Category, { zh: string; en: string }> = {
  all: { zh: '全部', en: 'All' },
  pdf: { zh: 'PDF', en: 'PDF' },
  image: { zh: '圖片', en: 'Image' },
  video: { zh: '影片', en: 'Video' },
  tutorial: { zh: '教學', en: 'Tutorial' },
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-free-pdf-tools-2026',
    date: '2026-03-01',
    icon: '📄',
    category: 'pdf',
    readingTimeZh: 10,
    readingTimeEn: 8,
    featured: true,
    titleZh: '2026 最好用的 10 個免費 PDF 線上工具',
    titleEn: '10 Best Free Online PDF Tools in 2026',
    summaryZh:
      '免費 PDF 合併、拆分、壓縮、加密、轉圖片... 完整教學與工具比較，不用下載軟體，瀏覽器就能搞定。',
    summaryEn:
      'Free PDF merge, split, compress, encrypt, convert to image... Complete guide with tool comparisons. No software download needed.',
  },
  {
    slug: 'image-compression-guide',
    date: '2026-02-20',
    icon: '🖼️',
    category: 'image',
    readingTimeZh: 12,
    readingTimeEn: 10,
    titleZh: '圖片壓縮完全指南：不損畫質也能大幅縮小檔案',
    titleEn: 'Complete Guide to Image Compression: Reduce File Size Without Losing Quality',
    summaryZh:
      '深入了解有損與無損壓縮原理、JPEG/PNG/WebP/AVIF 格式比較，學會針對不同用途選擇最佳壓縮策略。',
    summaryEn:
      'Deep dive into lossy vs lossless compression, JPEG/PNG/WebP/AVIF format comparison, and best compression strategies for different use cases.',
  },
  {
    slug: 'free-video-compression-tools',
    date: '2026-02-10',
    icon: '🎬',
    category: 'video',
    readingTimeZh: 8,
    readingTimeEn: 7,
    titleZh: '免費影片壓縮工具推薦：不用上傳、瀏覽器直接處理',
    titleEn: 'Best Free Video Compression Tools: No Upload Needed, Process Directly in Browser',
    summaryZh:
      '影片編碼基礎知識、各平台影片規格建議、瀏覽器端 vs 伺服器端比較，以及免費壓縮工具完整教學。',
    summaryEn:
      'Video codec basics, platform-specific specs, browser vs server comparison, and complete free compression tool tutorial.',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.category === current.category ? -1 : b.category === current.category ? 1 : 0))
    .slice(0, limit);
}
