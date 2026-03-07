import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '拆分 PDF — 擷取指定頁面 | Mochi Tools',
  description: '免費線上拆分 PDF 工具，指定頁碼範圍擷取頁面，瀏覽器本地處理不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
