'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function Base64Page() {
  const t = useTranslations('base64');
  const [plain, setPlain] = useState('');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const encode = useCallback(() => {
    try {
      const result = btoa(unescape(encodeURIComponent(plain)));
      setEncoded(result);
      setError('');
    } catch {
      setError(t('encodeError'));
    }
  }, [plain, t]);

  const decode = useCallback(() => {
    try {
      const result = decodeURIComponent(escape(atob(encoded)));
      setPlain(result);
      setError('');
    } catch {
      setError(t('decodeError'));
    }
  }, [encoded, t]);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || result;
      setEncoded(base64);
      setPlain(`[${t('fileLoaded')}: ${file.name}]`);
      setError('');
    };
    reader.readAsDataURL(file);
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-violet-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔐</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Plain text */}
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
          <label className="text-sm font-medium text-gray-700 mb-2 block">{t('plainLabel')}</label>
          <textarea
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            placeholder={t('plainPlaceholder')}
            className="w-full h-48 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700 resize-y"
          />
          <button onClick={encode} className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
            {t('encodeBtn')} →
          </button>
        </div>

        {/* Base64 */}
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
          <label className="text-sm font-medium text-gray-700 mb-2 block">{t('base64Label')}</label>
          <textarea
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            placeholder={t('base64Placeholder')}
            className="w-full h-48 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700 resize-y"
          />
          <button onClick={decode} className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
            ← {t('decodeBtn')}
          </button>
        </div>
      </div>

      {/* File drop zone */}
      <div
        className={`mt-4 bg-white rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
          dragOver ? 'border-pink-400 bg-pink-50' : 'border-pink-200 hover:border-pink-400'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        <p className="text-gray-500 text-sm">{t('dropFile')}</p>
        <p className="text-gray-400 text-xs mt-1">{t('dropFileHint')}</p>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl text-center">{error}</p>
      )}
    </div>
  );
}
