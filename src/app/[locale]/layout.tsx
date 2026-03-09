import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '../components/Navbar';
import ServiceWorkerRegistrar from '../components/ServiceWorkerRegistrar';
import InstallBanner from '../components/InstallBanner';
import ToolTracker from '../components/ToolTracker';

const geist = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8a4b8',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL('https://mochitools.com'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: 'https://mochitools.com',
    },
    alternates: {
      languages: {
        'zh': '/zh',
        'en': '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as 'zh' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-TW' : 'en'} className={geist.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <meta name="google-site-verification" content="D1bVeAl1EBOMFHroJmgTPVQtiYgu872d8QsaJ25HWCw" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5F05EGCK7T"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5F05EGCK7T');` }} />
      </head>
      <body>
        <ServiceWorkerRegistrar />
        <NextIntlClientProvider messages={messages}>
          <ToolTracker />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
          <InstallBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  return (
    <footer className="border-t border-pink-100 py-8 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-[#b89b8a]">
        <img src="/mochi-logo-transparent.png" alt="" className="w-6 h-6 rounded-full" loading="lazy" />
        <span>{t('tagline')}</span>
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <p className="text-xs text-pink-300">{t('madeWith')}</p>
        <span className="text-pink-200">·</span>
        <a
          href="https://ko-fi.com/mochitools"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#b89b8a] hover:text-pink-400 transition-colors"
        >
          {t('sponsor')}
        </a>
      </div>
    </footer>
  );
}
