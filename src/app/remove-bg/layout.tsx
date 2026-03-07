import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'AI 去背 — 一鍵移除圖片背景 | Mochi Tools',
  description: '免費線上 AI 去背工具，一鍵移除圖片背景輸出透明 PNG，瀏覽器本地處理不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
