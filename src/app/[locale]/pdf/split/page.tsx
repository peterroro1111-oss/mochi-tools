'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';

export default function SplitPdfPage() {
  const t = useTranslations('pdfSplit');
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
  const [range, setRange] = useState('');
  const [splitting, setSplitting] = useState(false);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(data);
      setFile({ name: f.name, data, pages: pdf.getPageCount() });
      setRange(`1-${pdf.getPageCount()}`);
    } catch {
      alert(t('readError'));
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setSplitting(true);
    try {
      const sourcePdf = await PDFDocument.load(file.data);
      const totalPages = sourcePdf.getPageCount();

      // Parse range: "1-3,5,7-9"
      const indices: number[] = [];
      for (const part of range.split(',')) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(Number);
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            indices.push(i - 1);
          }
        } else {
          const num = parseInt(trimmed);
          if (num >= 1 && num <= totalPages) indices.push(num - 1);
        }
      }

      if (indices.length === 0) {
        alert(t('rangeError'));
        setSplitting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(sourcePdf, indices);
      pages.forEach(page => newPdf.addPage(page));

      const bytes = await newPdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      downloadFile(blob, `split_${file.name}`);
    } catch {
      alert(t('splitError'));
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      {!file ? (
        <div
          onClick={() => document.getElementById('file-input')?.click()}
          className="border-2 border-dashed border-pink-200 hover:border-pink-400 rounded-2xl p-12 text-center cursor-pointer bg-white transition-all"
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium">{t('selectFile')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{t('totalPages', { count: file.pages })}</p>
            </div>
            <button onClick={() => setFile(null)} className="text-sm text-gray-500 hover:text-red-500">{t('changeFile')}</button>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">{t('rangeLabel')}</label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              placeholder={t('rangePlaceholder')}
            />
          </div>

          <button
            onClick={splitPdf}
            disabled={splitting || !range.trim()}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {splitting ? t('splitting') : t('splitBtn')}
          </button>
        </div>
      )}
    </div>
  );
}
