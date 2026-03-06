import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'YU Tools — 免費線上工具',
  description: '免費 PDF 工具、AI 去背、AI 證件照，全部線上搞定',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="dark">
      <body>
        <div className="min-h-screen flex flex-col">
          <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🛠️ YU Tools
              </Link>
              <div className="flex items-center gap-1">
                <Link href="/pdf" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                  📄 PDF 工具
                </Link>
                <Link href="/remove-bg" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                  🎨 AI 去背
                </Link>
                <Link href="/photo" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                  📸 證件照
                </Link>
              </div>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-gray-800/50 py-6 text-center text-xs text-gray-600">
            YU Tools · 免費線上工具
          </footer>
        </div>
      </body>
    </html>
  );
}
