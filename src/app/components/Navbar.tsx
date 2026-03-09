'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navbar');
  const locale = useLocale();
  const router = useRouter();

  const links = [
    { href: '/pdf' as const, label: t('pdf') },
    { href: '/image' as const, label: t('image') },
    { href: '/video' as const, label: t('video') },
    { href: '/remove-bg' as const, label: t('removeBg') },
    { href: '/photo' as const, label: t('photo') },
    { href: '/tools' as const, label: t('tools') },
    { href: '/blog' as const, label: t('blog') },
  ];

  const switchLocale = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-pink-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <Image src="/mochi-logo-transparent.png" alt="Mochi" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            Mochi Tools
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname.startsWith(link.href)
                  ? 'bg-pink-50 text-pink-500'
                  : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="ml-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
            title={locale === 'zh' ? 'English' : '中文'}
          >
            🌐 {locale === 'zh' ? 'EN' : '中文'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-1">
          {/* Mobile language switcher */}
          <button
            onClick={switchLocale}
            className="p-2 rounded-xl text-sm font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors"
            title={locale === 'zh' ? 'English' : '中文'}
          >
            🌐
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-pink-50 transition-colors"
            aria-label={t('menu')}
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-pink-400 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-pink-400 rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-pink-400 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-pink-50 bg-white animate-fadeIn">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname.startsWith(link.href)
                    ? 'bg-pink-50 text-pink-500'
                    : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
