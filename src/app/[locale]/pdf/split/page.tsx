'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import { captureToolError } from '@/app/utils/sentry';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

export default function SplitPdfPage() {
  const t = useTranslations('pdfSplit');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: 'PDF 分割有哪些選項？', answer: '您可以指定頁面範圍來擷取特定頁面，例如只擷取第 1-3 頁，或選擇多個不連續的頁面。' },
    { question: '頁面範圍格式怎麼填寫？', answer: '使用逗號分隔不同的頁面或範圍，例如「1-3,5,7-9」表示擷取第 1 到 3 頁、第 5 頁和第 7 到 9 頁。' },
    { question: '分割後的 PDF 格式會改變嗎？', answer: '不會，分割後輸出的仍然是標準 PDF 格式，內容品質與原檔完全一致。' },
  ] : [
    { question: 'What splitting options are available?', answer: 'You can specify page ranges to extract specific pages, such as only pages 1-3, or select multiple non-consecutive pages.' },
    { question: 'How do I format the page range?', answer: 'Use commas to separate different pages or ranges, e.g., "1-3,5,7-9" extracts pages 1 to 3, page 5, and pages 7 to 9.' },
    { question: 'Will the output format change after splitting?', answer: 'No, the output is still a standard PDF file with content quality identical to the original.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/pdf/merge', icon: '📑', name: '合併 PDF', desc: '多個 PDF 合成一個', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/compress', icon: '🗜️', name: '壓縮 PDF', desc: '縮小檔案大小', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF 加密', desc: '設定密碼保護', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/pdf/merge', icon: '📑', name: 'Merge PDF', desc: 'Combine multiple PDFs', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/compress', icon: '🗜️', name: 'Compress PDF', desc: 'Reduce file size', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF to Image', desc: 'Convert to JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF Encrypt', desc: 'Set password protection', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
  const [range, setRange] = useState('');
  const [splitting, setSplitting] = useState(false);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(data);
      setFile({ name: f.name, data, pages: pdf.getPageCount() });
      setRange(`1-${pdf.getPageCount()}`);
    } catch (err) {
      captureToolError('pdfSplit', err);
      alert(t('readError'));
    }
  };

  const handleDroppedFiles = useCallback((files: FileList) => {
    if (files[0]) loadFile(files[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } catch (err) {
      captureToolError('pdfSplit', err);
      alert(t('splitError'));
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <FullPageDropZone onFiles={handleDroppedFiles} accept=".pdf" disabled={!!file} />
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

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
