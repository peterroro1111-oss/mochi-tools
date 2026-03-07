import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '加頁碼 PDF — 自動加上頁碼 | Mochi Tools',
  description: '免費線上 PDF 加頁碼工具，三種位置可選，瀏覽器本地處理不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
