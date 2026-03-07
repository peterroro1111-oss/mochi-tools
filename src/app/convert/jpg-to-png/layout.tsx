import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'JPG 轉 PNG - 免費線上轉檔 | Mochi Tools 🍡',
  description: '免費將 JPG/JPEG 圖片轉換為 PNG 格式，保留透明度。瀏覽器本地處理，不上傳伺服器，快速安全。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
