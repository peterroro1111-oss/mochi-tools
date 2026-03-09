'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

interface PdfFile {
  name: string;
  data: ArrayBuffer;
  pages: number;
}

export default function MergePdfPage() {
  const t = useTranslations('pdfMerge');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '合併 PDF 有檔案大小限制嗎？', answer: '沒有限制，但由於在瀏覽器中處理，建議單個檔案不超過 100MB，以確保順暢運作。' },
    { question: '合併後的 PDF 品質會改變嗎？', answer: '不會，合併只是將多個 PDF 頁面組合在一起，不會對內容進行重新壓縮或修改。' },
    { question: '可以調整合併順序嗎？', answer: '可以，上傳檔案後可以使用上移/下移按鈕調整順序，最終按照排列順序合併。' },
  ] : [
    { question: 'Is there a file size limit for merging PDFs?', answer: 'No limit, but since processing is done in the browser, we recommend individual files under 100MB for smooth operation.' },
    { question: 'Will the merged PDF quality change?', answer: 'No, merging simply combines pages from multiple PDFs without re-compressing or modifying the content.' },
    { question: 'Can I adjust the merge order?', answer: 'Yes, after uploading files you can use the move up/down buttons to adjust the order.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/pdf/split', icon: '✂️', name: '分割 PDF', desc: '擷取特定頁面', gradient: 'from-purple-50 to-violet-50', border: 'border-purple-200 hover:border-purple-400' },
    { href: '/pdf/compress', icon: '🗜️', name: '壓縮 PDF', desc: '縮小檔案大小', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF 加密', desc: '設定密碼保護', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/pdf/split', icon: '✂️', name: 'Split PDF', desc: 'Extract specific pages', gradient: 'from-purple-50 to-violet-50', border: 'border-purple-200 hover:border-purple-400' },
    { href: '/pdf/compress', icon: '🗜️', name: 'Compress PDF', desc: 'Reduce file size', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF to Image', desc: 'Convert to JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/encrypt', icon: '🔒', name: 'PDF Encrypt', desc: 'Set password protection', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = async (fileList: FileList) => {
    const newFiles: PdfFile[] = [];
    for (const file of Array.from(fileList)) {
      if (file.type !== 'application/pdf') continue;
      const data = await file.arrayBuffer();
      try {
        const pdf = await PDFDocument.load(data);
        newFiles.push({ name: file.name, data, pages: pdf.getPageCount() });
      } catch {
        alert(`${file.name} - ${t('readError')}`);
      }
    }
    setFiles(prev => [...prev, ...newFiles]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    setFiles(prev => {
      const arr = [...prev];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return arr;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const pdf = await PDFDocument.load(file.data);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      downloadFile(blob, 'merged.pdf');
    } catch {
      alert(t('mergeError'));
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
          ${isDragging ? 'border-blue-400 bg-blue-400/10' : 'border-pink-200 hover:border-pink-400 bg-white'}`}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="text-4xl mb-3">📄</div>
        <p className="font-medium">{t('dropzone')}</p>
        <p className="text-sm text-gray-500 mt-1">{t('dropzoneHint')}</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-gray-500 text-sm w-6 text-center">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{`${file.pages} ${t('pages')}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveFile(i, -1)} className="p-1.5 text-gray-500 hover:text-white rounded transition-colors" title={t('moveUp')}>▲</button>
                <button onClick={() => moveFile(i, 1)} className="p-1.5 text-gray-500 hover:text-white rounded transition-colors" title={t('moveDown')}>▼</button>
                <button onClick={() => removeFile(i)} className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors" title={t('remove')}>✕</button>
              </div>
            </div>
          ))}

          <div className="pt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">{t('fileCount', { count: files.length, pages: files.reduce((s, f) => s + f.pages, 0) })}</p>
            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || merging}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white disabled:bg-gray-300 disabled:text-gray-500 rounded-xl font-medium transition-all active:scale-95"
            >
              {merging ? t('merging') : t('mergeBtn')}
            </button>
          </div>
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
