import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '圖片工具 - 壓縮、轉檔 | Mochi Tools 🍡',
  description: '免費線上圖片工具：圖片壓縮、格式轉換（PNG、JPG、WebP）。瀏覽器本地處理，檔案不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
