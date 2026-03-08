'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function CharacterCountPage() {
  const t = useTranslations('charCount');
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?。！？]+/g) || []).length || (text.trim() ? 1 : 0) : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const lines = text ? text.split('\n').length : 0;
    // CJK characters
    const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef]/g) || []).length;
    // Reading time (200 wpm for English, 400 cpm for CJK)
    const readingMinutes = Math.max(1, Math.ceil((words - cjk + cjk) / 200));

    return { chars, charsNoSpaces, words, sentences, paragraphs, lines, cjk, readingMinutes };
  }, [text]);

  const statItems = [
    { label: t('characters'), value: stats.chars },
    { label: t('charsNoSpaces'), value: stats.charsNoSpaces },
    { label: t('words'), value: stats.words },
    { label: t('sentences'), value: stats.sentences },
    { label: t('paragraphs'), value: stats.paragraphs },
    { label: t('lines'), value: stats.lines },
    { label: t('cjk'), value: stats.cjk },
    { label: t('readingTime'), value: t('minutes', { count: stats.readingMinutes }) },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔤</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statItems.map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border-2 border-pink-100 p-4 text-center">
            <p className="text-2xl font-bold text-pink-500">{item.value}</p>
            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full h-64 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm text-gray-700 resize-y"
        />
      </div>
    </div>
  );
}
