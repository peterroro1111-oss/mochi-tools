'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function JsonFormatterPage() {
  const t = useTranslations('jsonFormatter');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [tabSize, setTabSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, tabSize));
      setError('');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      const match = msg.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1]);
        const line = input.substring(0, pos).split('\n').length;
        setError(t('errorAtLine', { line }));
      } else {
        setError(t('invalidJson'));
      }
    }
  }, [input, tabSize, t]);

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch {
      setError(t('invalidJson'));
    }
  }, [input, t]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [input]);

  // Simple syntax highlighting
  const highlighted = input.replace(
    /("(?:\\.|[^"\\])*")\s*:/g, '<span class="text-pink-500">$1</span>:'
  ).replace(
    /:\s*("(?:\\.|[^"\\])*")/g, ': <span class="text-emerald-600">$1</span>'
  ).replace(
    /:\s*(\d+\.?\d*)/g, ': <span class="text-blue-500">$1</span>'
  ).replace(
    /:\s*(true|false|null)/g, ': <span class="text-amber-500">$1</span>'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">{ }</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        {/* Tab size + buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label className="text-sm font-medium text-gray-700">{t('tabSize')}:</label>
          <select
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border-2 border-pink-100 text-sm focus:border-pink-400 focus:outline-none"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
          <div className="flex-1" />
          <button onClick={format} className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
            {t('formatBtn')}
          </button>
          <button onClick={minify} className="px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all">
            {t('minifyBtn')}
          </button>
          <button onClick={copy} className="px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all">
            {copied ? t('copied') : t('copyBtn')}
          </button>
        </div>

        {/* Textarea with line numbers */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder={t('placeholder')}
            className="w-full h-80 px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700 resize-y"
            spellCheck={false}
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
        )}

        {/* Highlighted preview */}
        {input && !error && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">{t('preview')}</p>
            <pre
              className="bg-gray-50 rounded-xl p-4 text-sm font-mono overflow-auto max-h-60 border border-gray-100"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
