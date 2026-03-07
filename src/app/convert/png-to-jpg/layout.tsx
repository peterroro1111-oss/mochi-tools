import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'PNG 轉 JPG - 免費線上轉檔 | Mochi Tools 🍡',
  description: '免費將 PNG 圖片轉換為 JPG 格式。瀏覽器本地處理，不上傳伺服器，快速安全。支援批次轉換、高品質輸出。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
