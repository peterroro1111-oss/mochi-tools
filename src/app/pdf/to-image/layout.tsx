import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'PDF 轉圖片 — 轉成 JPG/PNG | Mochi Tools',
  description: '免費線上 PDF 轉圖片工具，支援 PNG/JPG 格式，可調解析度，瀏覽器本地處理。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
