'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

export default function PageNumbersPage() {
  const t = useTranslations('pdfPageNumbers');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '頁碼可以放在哪些位置？', answer: '支援底部置中、底部靠右和頂部置中三種位置，可依據您的文件排版需求選擇。' },
    { question: '可以自訂起始頁碼嗎？', answer: '目前頁碼從第 1 頁開始自動編號，格式為「頁碼 / 總頁數」，簡潔直觀。' },
    { question: '頁碼使用什麼字體？', answer: '使用 Helvetica 標準字體，大小為 10pt，顏色為灰色，確保與各種文件風格搭配協調。' },
  ] : [
    { question: 'Where can page numbers be positioned?', answer: 'Supports bottom-center, bottom-right, and top-center positions. Choose based on your document layout needs.' },
    { question: 'Can I customize the starting page number?', answer: 'Currently, page numbers start from page 1 automatically in the format "page / total pages", keeping it clean and intuitive.' },
    { question: 'What font is used for page numbers?', answer: 'Uses Helvetica standard font at 10pt size in gray color, ensuring it blends well with various document styles.' },
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
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center'>('bottom-center');
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

  const addPageNumbers = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(file.data);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const total = pages.length;

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = `${i + 1} / ${total}`;
        const textWidth = font.widthOfTextAtSize(text, 10);

        let x = 0, y = 0;
        if (position === 'bottom-center') { x = (width - textWidth) / 2; y = 20; }
        else if (position === 'bottom-right') { x = width - textWidth - 30; y = 20; }
        else if (position === 'top-center') { x = (width - textWidth) / 2; y = height - 30; }

        page.drawText(text, { x, y, size: 10, font, color: rgb(0.4, 0.4, 0.4) });
      });

      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      downloadFile(blob, `numbered_${file.name}`);
    } catch {
      alert(t('addError'));
    } finally {
      setProcessing(false);
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
            <label className="block text-sm text-gray-500 mb-2">{t('positionLabel')}</label>
            <div className="flex gap-3">
              {([['bottom-center', t('bottomCenter')], ['bottom-right', t('bottomRight')], ['top-center', t('topCenter')]] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setPosition(val as 'bottom-center' | 'bottom-right' | 'top-center')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    position === val ? 'bg-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addPageNumbers}
            disabled={processing}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {processing ? t('processing') : t('addBtn')}
          </button>
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
