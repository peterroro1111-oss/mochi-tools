import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'AI 證件照 — 自動生成標準證件照 | Mochi Tools',
  description: '免費線上 AI 證件照工具，上傳照片自動去背生成標準證件照，支援多種尺寸和背景色。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
