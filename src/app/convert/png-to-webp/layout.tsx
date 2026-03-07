import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'PNG 轉 WebP - 免費線上轉檔 | Mochi Tools 🍡',
  description: '免費將 PNG 圖片轉換為 WebP 格式，大幅縮小檔案大小。瀏覽器本地處理，不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
