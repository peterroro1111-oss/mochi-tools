import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '旋轉 PDF — 旋轉頁面方向 | Mochi Tools',
  description: '免費線上旋轉 PDF 工具，支援 90/180/270 度旋轉，瀏覽器本地處理不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
