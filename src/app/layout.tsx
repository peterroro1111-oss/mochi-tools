import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Mochi Tools — 免費線上工具 🍡',
  description: '免費 PDF 工具、AI 去背、AI 證件照，全部線上搞定，不上傳伺服器',
  openGraph: {
    title: 'Mochi Tools — 免費線上工具 🍡',
    description: '免費 PDF 工具、AI 去背、AI 證件照，全部線上搞定',
    url: 'https://mochitools.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="google-site-verification" content="D1bVeAl1EBOMFHroJmgTPVQtiYgu872d8QsaJ25HWCw" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5F05EGCK7T"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5F05EGCK7T');` }} />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-pink-100 py-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#b89b8a]">
              <img src="/mochi-logo-transparent.png" alt="" className="w-6 h-6 rounded-full" />
              <span>Mochi Tools · 免費、安全、不上傳伺服器</span>
            </div>
            <p className="text-xs text-pink-300 mt-2">用愛做的小工具 🍡</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
