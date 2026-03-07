import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '圖片壓縮 - 免費線上壓縮工具 | Mochi Tools 🍡',
  description: '免費線上圖片壓縮工具，支援 JPG、PNG、WebP。可調整壓縮品質，批次壓縮多張圖片。瀏覽器本地處理，不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
