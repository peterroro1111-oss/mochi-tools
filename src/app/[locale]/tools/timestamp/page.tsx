'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function TimestampPage() {
  const t = useTranslations('timestamp');
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState('');
  const [tsResult, setTsResult] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateResult, setDateResult] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsToDate = useCallback(() => {
    const val = parseInt(tsInput);
    if (isNaN(val)) return;
    const ms = unit === 's' ? val * 1000 : val;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setTsResult(t('invalidTs')); return; }
    setTsResult(d.toLocaleString() + ` (${Intl.DateTimeFormat().resolvedOptions().timeZone})`);
  }, [tsInput, unit, t]);

  const dateToTs = useCallback(() => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) { setDateResult(t('invalidDate')); return; }
    const ts = unit === 's' ? Math.floor(d.getTime() / 1000) : d.getTime();
    setDateResult(String(ts));
  }, [dateInput, unit, t]);

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center">⏱️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Current timestamp */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6 text-center">
        <p className="text-sm text-gray-500 mb-2">{t('currentTs')}</p>
        <p className="text-3xl font-mono font-bold text-pink-500 cursor-pointer" onClick={() => copyValue(String(now))}>
          {now}
        </p>
        <p className="text-sm text-gray-400 mt-2">{new Date(now * 1000).toLocaleString()}</p>
        <p className="text-xs text-gray-400 mt-1">{t('clickToCopy')}</p>
      </div>

      {/* Unit selector */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setUnit('s')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            unit === 's' ? 'bg-pink-50 text-pink-500 border-2 border-pink-300' : 'bg-white border-2 border-pink-100 text-gray-500'
          }`}
        >
          {t('seconds')}
        </button>
        <button
          onClick={() => setUnit('ms')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            unit === 'ms' ? 'bg-pink-50 text-pink-500 border-2 border-pink-300' : 'bg-white border-2 border-pink-100 text-gray-500'
          }`}
        >
          {t('milliseconds')}
        </button>
      </div>

      {/* Timestamp to Date */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-4">
        <h2 className="text-sm font-bold text-gray-700 mb-3">{t('tsToDate')}</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder={t('tsPlaceholder')}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700"
          />
          <button onClick={tsToDate} className="px-5 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
            {t('convertBtn')}
          </button>
        </div>
        {tsResult && (
          <p className="mt-3 text-sm text-gray-700 bg-pink-50 px-4 py-2 rounded-xl font-mono">{tsResult}</p>
        )}
      </div>

      {/* Date to Timestamp */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-3">{t('dateToTs')}</h2>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm text-gray-700"
          />
          <button onClick={dateToTs} className="px-5 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
            {t('convertBtn')}
          </button>
        </div>
        {dateResult && (
          <p className="mt-3 text-sm text-gray-700 bg-pink-50 px-4 py-2 rounded-xl font-mono cursor-pointer" onClick={() => copyValue(dateResult)}>
            {dateResult}
          </p>
        )}
      </div>
    </div>
  );
}
