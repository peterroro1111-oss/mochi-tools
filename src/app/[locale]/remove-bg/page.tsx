'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';

export default function RemoveBgPage() {
  const t = useTranslations('removeBg');
  const [step, setStep] = useState<'upload' | 'processing' | 'done'>('upload');
  const [progress, setProgress] = useState('');
  const [progressPct, setProgressPct] = useState(0);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);
  const [modelCached, setModelCached] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const handler = (e: MessageEvent) => {
        if (e.data?.type === 'MODEL_CACHE_STATUS') {
          setModelCached(e.data.cached);
        }
      };
      navigator.serviceWorker.addEventListener('message', handler);
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_MODEL_CACHE' });
      return () => navigator.serviceWorker.removeEventListener('message', handler);
    }
  }, []);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('uploadError'));
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setStep('processing');
    setError(null);
    setResultUrl(null);
    setCompare(false);
    setProgressPct(0);

    try {
      setProgress(t('loadingModel'));
      const { removeBackground } = await import('@imgly/background-removal');
      setProgress(t('removingBg'));
      const blob: Blob = await removeBackground(url, {
        model: 'isnet' as const,
        output: { format: 'image/png' as const, quality: 1 },
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            if (key.includes('fetch')) {
              setProgress(t('downloadingModel', { pct: String(pct) }));
              setProgressPct(pct * 0.5);
            } else if (key.includes('inference')) {
              setProgress(t('processingBg', { pct: String(pct) }));
              setProgressPct(50 + pct * 0.5);
            } else {
              setProgress(`${key}: ${pct}%`);
            }
          }
        },
      });
      setResultUrl(URL.createObjectURL(blob));
      setModelCached(true);
      setStep('done');
    } catch (err) {
      console.error(err);
      setError(t('error'));
      setStep('upload');
    } finally {
      setProgress('');
      setProgressPct(0);
    }
  };

  const download = async () => {
    if (!resultUrl) return;
    const resp = await fetch(resultUrl);
    const blob = await resp.blob();
    downloadFile(blob, 'removed_bg.png');
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setStep('upload');
    setError(null);
    setCompare(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-sm md:text-base text-[#b89b8a]">
          {t('subtitle')}
        </p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700 md:hidden">
        {t('mobileHint')}
      </div>

      {modelCached === true && step === 'upload' && (
        <div className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-700 text-sm text-center">
          {t('cachedReady')}
        </div>
      )}

      {step === 'upload' && (
        <>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-500 text-sm">
              {error}
            </div>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="upload-zone"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <div className="text-5xl mb-4">🖼️</div>
            <p className="font-bold text-gray-700 text-lg">{t('uploadBtn')}</p>
            <p className="text-sm text-[#b89b8a] mt-2">{t('uploadHint')}</p>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="mt-8 text-center py-16 bg-white rounded-3xl border-2 border-pink-100">
          <div className="inline-block mb-4">
            <div className="w-14 h-14 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 text-lg font-medium">{progress || t('processing')}</p>
          {progressPct > 0 && (
            <div className="mx-auto mt-4 w-64 bg-pink-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-pink-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
          <p className="text-sm text-[#b89b8a] mt-2">{t('modelHint')}</p>
        </div>
      )}

      {step === 'done' && resultUrl && (
        <div className="space-y-6 animate-fadeIn">
          {modelCached === true && (
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 text-xs">
                {t('modelCachedBadge')}
              </span>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => setCompare(!compare)}
              className="btn-secondary text-sm"
            >
              {compare ? t('compareResult') : t('compareOriginal')}
            </button>
          </div>

          <div className="flex justify-center">
            <div className="bg-white border-2 border-pink-100 rounded-2xl overflow-hidden p-4 inline-block">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundImage: compare
                    ? 'none'
                    : 'repeating-conic-gradient(#f0f0f0 0% 25%, #fff 0% 50%)',
                  backgroundSize: '16px 16px',
                }}
              >
                <img
                  src={compare ? originalUrl! : resultUrl}
                  alt={compare ? t('altOriginal') : t('altResult')}
                  className="rounded-xl max-h-[400px] md:max-h-[500px] max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={download} className="btn-mochi">
              {t('downloadPng')}
            </button>
            <button onClick={reset} className="btn-secondary">
              {t('processAnother')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
