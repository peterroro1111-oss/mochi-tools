import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Panda Tools — 免費線上工具 🐼',
  description: '免費 PDF 工具、AI 去背、AI 證件照，全部線上搞定，不上傳伺服器',
  openGraph: {
    title: 'Panda Tools — 免費線上工具 🐼',
    description: '免費 PDF 工具、AI 去背、AI 證件照，全部線上搞定',
    url: 'https://panda-tools.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="bg-[#faf9f6] text-gray-800">
        <div className="min-h-screen flex flex-col">
          <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-800 hover:opacity-80 transition-all">
                <img src="/panda-logo.png" alt="🐼" className="w-8 h-8" />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Panda Tools
                </span>
              </Link>
              <div className="flex items-center gap-1">
                <Link href="/pdf" className="px-3 py-2 text-sm text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  📄 PDF
                </Link>
                <Link href="/remove-bg" className="px-3 py-2 text-sm text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  🎨 去背
                </Link>
                <Link href="/photo" className="px-3 py-2 text-sm text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  📸 證件照
                </Link>
              </div>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
            <img src="/panda-logo.webp" alt="" className="w-5 h-5 inline-block -mt-0.5 rounded-full" /> Panda Tools · 免費、安全、不上傳伺服器
          </footer>
        </div>
      </body>
    </html>
  );
}
