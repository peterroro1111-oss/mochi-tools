import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '圖片格式轉換 - 免費線上轉檔 | Mochi Tools 🍡',
  description: '免費線上圖片格式轉換工具，支援 PNG、JPG、WebP 互轉。瀏覽器本地處理，檔案不上傳伺服器，安全又快速。',
};

export default function ConvertLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
