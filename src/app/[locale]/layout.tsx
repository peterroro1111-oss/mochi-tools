import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '../components/Navbar';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
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
    <html lang={locale === 'zh' ? 'zh-TW' : 'en'}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="google-site-verification" content="D1bVeAl1EBOMFHroJmgTPVQtiYgu872d8QsaJ25HWCw" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5F05EGCK7T"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5F05EGCK7T');` }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
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
        <img src="/mochi-logo-transparent.png" alt="" className="w-6 h-6 rounded-full" />
        <span>{t('tagline')}</span>
      </div>
      <p className="text-xs text-pink-300 mt-2">{t('madeWith')}</p>
    </footer>
  );
}
