export interface BlogPost {
  slug: string;
  date: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  icon: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-free-pdf-tools-2026',
    date: '2026-03-01',
    icon: '📄',
    titleZh: '2026 最好用的 10 個免費 PDF 線上工具',
    titleEn: '10 Best Free Online PDF Tools in 2026',
    summaryZh: '免費 PDF 合併、拆分、壓縮、加密、轉圖片... 不用下載軟體，瀏覽器就能搞定。',
    summaryEn: 'Free PDF merge, split, compress, encrypt, convert to image... No software download needed, all in your browser.',
  },
  {
    slug: 'image-compression-guide',
    date: '2026-02-20',
    icon: '🖼️',
    titleZh: '圖片壓縮完全指南：不損畫質也能大幅縮小檔案',
    titleEn: 'Complete Guide to Image Compression: Reduce File Size Without Losing Quality',
    summaryZh: '了解 JPG、PNG、WebP 壓縮原理，學會用免費工具把圖片縮到最小、畫質不打折。',
    summaryEn: 'Understand JPG, PNG, WebP compression principles and learn to minimize image size while keeping quality.',
  },
  {
    slug: 'free-video-compression-tools',
    date: '2026-02-10',
    icon: '🎬',
    titleZh: '免費影片壓縮工具推薦：不用上傳、瀏覽器直接處理',
    titleEn: 'Best Free Video Compression Tools: No Upload Needed, Process Directly in Browser',
    summaryZh: '大檔案影片傳不出去？用這些免費工具直接在瀏覽器壓縮影片，不用上傳到伺服器。',
    summaryEn: "Can't send large video files? Use these free tools to compress videos directly in your browser without uploading.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
