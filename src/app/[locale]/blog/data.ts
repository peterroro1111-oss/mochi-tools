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
  {
    slug: 'heic-to-jpg-guide',
    date: '2026-03-05',
    icon: '📱',
    category: 'image',
    readingTimeZh: 8,
    readingTimeEn: 7,
    titleZh: 'iPhone HEIC 照片轉 JPG 完整教學：4 種方法一次學會',
    titleEn: 'Complete Guide to Converting HEIC to JPG: 4 Methods Explained',
    summaryZh:
      'HEIC 是什麼？為什麼 iPhone 照片打不開？完整教學教你用線上工具、iPhone 設定、Mac 和 Windows 輕鬆轉檔。',
    summaryEn:
      'What is HEIC? Why can\'t you open iPhone photos? Learn 4 easy methods to convert HEIC to JPG using online tools, iPhone settings, Mac, and Windows.',
  },
  {
    slug: 'pdf-password-protection-guide',
    date: '2026-03-06',
    icon: '🔒',
    category: 'pdf',
    readingTimeZh: 9,
    readingTimeEn: 8,
    titleZh: 'PDF 加密教學：如何為 PDF 設定密碼保護',
    titleEn: 'PDF Encryption Guide: How to Password Protect Your PDF Files',
    summaryZh:
      '完整 PDF 加密教學，了解使用者密碼與擁有者密碼的差異、加密強度比較，以及免費線上加密工具推薦。',
    summaryEn:
      'Complete PDF encryption tutorial covering user vs owner passwords, encryption strength comparison, and free online encryption tools.',
  },
  {
    slug: 'ai-background-removal-guide',
    date: '2026-03-07',
    icon: '✂️',
    category: 'image',
    readingTimeZh: 8,
    readingTimeEn: 7,
    titleZh: 'AI 去背教學：免費一鍵去除圖片背景',
    titleEn: 'AI Background Removal Guide: Remove Image Backgrounds for Free',
    summaryZh:
      'AI 去背原理解析、去背工具比較、詳細操作教學，讓你輕鬆做出專業級透明背景圖片。',
    summaryEn:
      'Learn how AI background removal works, compare popular tools, and follow step-by-step tutorials to create professional transparent images.',
  },
  {
    slug: 'free-id-photo-maker-guide',
    date: '2026-03-08',
    icon: '📸',
    category: 'tutorial',
    readingTimeZh: 10,
    readingTimeEn: 8,
    titleZh: '免費線上證件照製作教學：在家就能搞定',
    titleEn: 'Free Online ID Photo Maker: Create Passport & ID Photos at Home',
    summaryZh:
      '各種證件照尺寸規格整理、自拍技巧、線上製作教學，不用出門也能做出合格的證件照。',
    summaryEn:
      'ID photo size specs, selfie tips, and online tool tutorial. Create compliant passport and ID photos from home.',
  },
  {
    slug: 'qr-code-generator-guide',
    date: '2026-03-09',
    icon: '📲',
    category: 'tutorial',
    readingTimeZh: 8,
    readingTimeEn: 7,
    titleZh: 'QR Code 怎麼做？免費 QR Code 產生器完整教學',
    titleEn: 'How to Create QR Codes: Complete Free QR Code Generator Guide',
    summaryZh:
      'QR Code 類型介紹、製作教學、外觀自訂、最佳實踐，從網址到 WiFi 分享一次搞定。',
    summaryEn:
      'QR code types, creation tutorial, customization tips, and best practices. From URLs to WiFi sharing, all covered.',
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
