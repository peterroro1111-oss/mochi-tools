'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';

export default function RemoveBgPage() {
  const t = useTranslations('removeBg');
  const [step, setStep] = useState<'upload' | 'processing' | 'done'>('upload');
  const [progress, setProgress] = useState('');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      setProgress(t('loadingModel'));
      const { removeBackground } = await import('@imgly/background-removal');
      setProgress(t('removingBg'));
      // Use lighter model on mobile for better compatibility
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const modelName = isMobile ? 'isnet_fp16' : 'isnet';
      const blob: Blob = await removeBackground(url, {
        model: modelName as 'isnet',
        output: { format: 'image/png' as const, quality: 1 },
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            if (key.includes('fetch')) setProgress(t('downloadingModel', { pct: String(pct) }));
            else if (key.includes('inference')) setProgress(t('processingBg', { pct: String(pct) }));
            else setProgress(`${key}: ${pct}%`);
          }
        },
      });
      setResultUrl(URL.createObjectURL(blob));
      setStep('done');
    } catch (err) {
      console.error(err);
      setError(t('error'));
      setStep('upload');
    } finally {
      setProgress('');
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
          <p className="text-sm text-[#b89b8a] mt-2">{t('modelHint')}</p>
        </div>
      )}

      {step === 'done' && resultUrl && (
        <div className="space-y-6 animate-fadeIn">
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
