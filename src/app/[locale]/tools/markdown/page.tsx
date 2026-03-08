'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

const defaultMd = `# Hello Mochi 🍡

This is a **Markdown** preview tool.

## Features
- ~~Strikethrough~~
- **Bold** and *italic*
- [Links](https://example.com)

| Name | Value |
|------|-------|
| Mochi | 🍡 |

\`\`\`js
console.log("Hello!");
\`\`\`
`;

export default function MarkdownPreviewPage() {
  const t = useTranslations('markdownPreview');
  const [md, setMd] = useState(defaultMd);
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    try {
      return marked.parse(md) as string;
    } catch {
      return '';
    }
  }, [md]);

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [html]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center">📝</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="flex justify-end mb-3">
        <button
          onClick={copyHtml}
          className="px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all"
        >
          {copied ? t('copied') : t('copyHtml')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-4">
          <p className="text-sm font-medium text-gray-500 mb-2">{t('editor')}</p>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="w-full h-[500px] px-3 py-2 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-4">
          <p className="text-sm font-medium text-gray-500 mb-2">{t('previewLabel')}</p>
          <div
            className="prose prose-sm max-w-none h-[500px] overflow-auto px-3 py-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
