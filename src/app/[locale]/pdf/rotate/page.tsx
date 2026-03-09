'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument, degrees } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

export default function RotatePdfPage() {
  const t = useTranslations('pdfRotate');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '可以旋轉多少度？', answer: '支援 90 度、180 度和 270 度三種旋轉角度，可以根據需要選擇合適的方向。' },
    { question: '可以一次旋轉所有頁面嗎？', answer: '可以，工具會將 PDF 中的所有頁面統一旋轉指定的角度，方便批次處理。' },
    { question: '旋轉後 PDF 品質會改變嗎？', answer: '不會，旋轉只是修改頁面的顯示方向，不會對內容進行重新壓縮或修改，品質完全不受影響。' },
  ] : [
    { question: 'What rotation angles are supported?', answer: 'Supports 90, 180, and 270 degree rotations. Choose the angle that suits your needs.' },
    { question: 'Can I rotate all pages at once?', answer: 'Yes, the tool rotates all pages in the PDF by the specified angle, making batch processing easy.' },
    { question: 'Will rotation affect PDF quality?', answer: 'No, rotation only changes the display orientation of pages without re-compressing or modifying content. Quality remains unchanged.' },
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
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(data);
      setFile({ name: f.name, data, pages: pdf.getPageCount() });
    } catch {
      alert(t('readError'));
    }
  };

  const handleDroppedFiles = useCallback((files: FileList) => {
    if (files[0]) loadFile(files[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rotatePdf = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(file.data);
      pdf.getPages().forEach(page => {
        page.setRotation(degrees(page.getRotation().angle + rotation));
      });
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      downloadFile(blob, `rotated_${file.name}`);
    } catch {
      alert(t('rotateError'));
    } finally {
      setProcessing(false);
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

          <div className="flex gap-3">
            {[90, 180, 270].map(deg => (
              <button
                key={deg}
                onClick={() => setRotation(deg)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  rotation === deg ? 'bg-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                ↻ {deg}°
              </button>
            ))}
          </div>

          <button
            onClick={rotatePdf}
            disabled={processing}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {processing ? t('rotating') : t('rotateBtn')}
          </button>
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
