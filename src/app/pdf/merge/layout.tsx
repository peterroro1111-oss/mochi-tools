import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '合併 PDF — 多個 PDF 合成一個 | Mochi Tools',
  description: '免費線上合併 PDF 工具，將多個 PDF 檔案合成一個，拖曳排序，瀏覽器本地處理不上傳伺服器。',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
