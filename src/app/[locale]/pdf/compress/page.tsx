'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import { captureToolError } from '@/app/utils/sentry';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

export default function CompressPdfPage() {
  const t = useTranslations('pdfCompress');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '壓縮後 PDF 品質會下降嗎？', answer: '壓縮主要是移除冗餘資料和優化檔案結構，不會對文字或向量圖形重新壓縮，品質幾乎不受影響。' },
    { question: '支援哪些功能的 PDF 壓縮？', answer: '支援包含文字、圖片、表格等各種內容的 PDF 檔案壓縮，適用於掃描文件和數位文件。' },
    { question: '壓縮過程安全嗎？', answer: '完全安全，所有處理都在您的瀏覽器本地完成，檔案不會上傳到任何伺服器，保護您的隱私。' },
  ] : [
    { question: 'Will compression reduce PDF quality?', answer: 'Compression mainly removes redundant data and optimizes file structure. It does not re-compress text or vector graphics, so quality is barely affected.' },
    { question: 'What types of PDFs can be compressed?', answer: 'Supports PDFs with text, images, tables, and various content types. Works for both scanned and digital documents.' },
    { question: 'Is the compression process safe?', answer: 'Completely safe. All processing is done locally in your browser. Files are never uploaded to any server, protecting your privacy.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/pdf/merge', icon: '📑', name: '合併 PDF', desc: '多個 PDF 合成一個', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/split', icon: '✂️', name: '分割 PDF', desc: '擷取特定頁面', gradient: 'from-purple-50 to-violet-50', border: 'border-purple-200 hover:border-purple-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF 加密', desc: '設定密碼保護', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/pdf/merge', icon: '📑', name: 'Merge PDF', desc: 'Combine multiple PDFs', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/split', icon: '✂️', name: 'Split PDF', desc: 'Extract specific pages', gradient: 'from-purple-50 to-violet-50', border: 'border-purple-200 hover:border-purple-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF to Image', desc: 'Convert to JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF Encrypt', desc: 'Set password protection', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ size: number; url: string } | null>(null);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    setFile({ name: f.name, data, size: f.size });
    setResult(null);
  };

  const handleDroppedFiles = useCallback((files: FileList) => {
    if (files[0]) loadFile(files[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      // Load and re-save — pdf-lib drops unused objects and optimizes structure
      const pdf = await PDFDocument.load(file.data);
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult({ size: bytes.length, url });
    } catch (err) {
      captureToolError('pdfCompress', err);
      alert(t('compressError'));
    } finally {
      setProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const reduction = file && result ? Math.max(0, ((file.size - result.size) / file.size * 100)) : 0;

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
              <p className="text-sm text-gray-500">{t('originalSize', { size: formatSize(file.size) })}</p>
            </div>
            <button onClick={() => { setFile(null); setResult(null); }} className="text-sm text-gray-500 hover:text-red-500">{t('changeFile')}</button>
          </div>

          {!result ? (
            <button onClick={compress} disabled={processing}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]">
              {processing ? t('compressing') : t('compressBtn')}
            </button>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fadeIn">
              <div className="text-4xl mb-3">{reduction > 5 ? '✅' : 'ℹ️'}</div>
              <p className="text-lg font-bold mb-1">
                {reduction > 5 ? t('reduced', { percent: reduction.toFixed(1) }) : t('alreadySmall')}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {formatSize(file.size)} → {formatSize(result.size)}
              </p>
              <button onClick={async () => {
                  const resp = await fetch(result.url);
                  const blob = await resp.blob();
                  downloadFile(blob, `compressed_${file.name}`);
                }}
                className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-medium transition-all">
                {t('downloadBtn')}
              </button>
            </div>
          )}
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
