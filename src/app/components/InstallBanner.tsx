'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const t = useTranslations('pwa');

  useEffect(() => {
    // Don't show if already dismissed
    if (localStorage.getItem('pwa-dismissed')) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa-dismissed', '1');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl border-2 border-pink-200 shadow-xl p-4 flex items-center gap-3">
        <img src="/favicon-192x192.png" alt="" className="w-10 h-10 rounded-xl" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-700">{t('title')}</p>
          <p className="text-xs text-gray-400">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={handleDismiss} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1">
            {t('dismiss')}
          </button>
          <button onClick={handleInstall} className="btn-mochi text-xs !px-3 !py-1.5 !rounded-xl">
            {t('install')}
          </button>
        </div>
      </div>
    </div>
  );
}
