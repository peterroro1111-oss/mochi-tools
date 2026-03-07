import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'WebP 轉 PNG - 免費線上轉檔 | Mochi Tools 🍡',
  description: '免費將 WebP 圖片轉換為 PNG 格式。瀏覽器本地處理，不上傳伺服器，支援透明背景保留。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
