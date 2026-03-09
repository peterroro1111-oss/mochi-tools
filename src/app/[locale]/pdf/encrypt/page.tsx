'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PDFDocument, PDFName, PDFHexString, PDFDict, PDFRef } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

// Simple MD5-like hash for PDF password (RC4-compatible padding)
const PDF_PADDING = [
  0x28, 0xBF, 0x4E, 0x5E, 0x4E, 0x75, 0x8A, 0x41,
  0x64, 0x00, 0x4E, 0x56, 0xFF, 0xFA, 0x01, 0x08,
  0x2E, 0x2E, 0x00, 0xB6, 0xD0, 0x68, 0x3E, 0x80,
  0x2F, 0x0C, 0xA9, 0xFE, 0x64, 0x53, 0x69, 0x7A,
];

function padPassword(pwd: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < pwd.length && bytes.length < 32; i++) {
    bytes.push(pwd.charCodeAt(i) & 0xFF);
  }
  for (let i = 0; bytes.length < 32; i++) {
    bytes.push(PDF_PADDING[i]);
  }
  return bytes;
}

function toHex(bytes: number[]): string {
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function PdfEncryptPage() {
  const t = useTranslations('pdfEncrypt');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '密碼有什麼強度建議？', answer: '建議使用至少 8 個字元的密碼，包含英文字母、數字和特殊符號的組合，以提高安全性。' },
    { question: '使用什麼加密方式？', answer: '使用 PDF 標準加密（RC4），設定後開啟 PDF 時需要輸入密碼才能查看內容。' },
    { question: '加密後還能解除密碼嗎？', answer: '加密後的 PDF 需要使用正確的密碼才能開啟。請務必記住密碼，遺失後將無法恢復。' },
  ] : [
    { question: 'What password strength is recommended?', answer: 'We recommend using at least 8 characters with a mix of letters, numbers, and special symbols for better security.' },
    { question: 'What encryption method is used?', answer: 'Uses PDF standard encryption (RC4). Once set, the PDF requires a password to view its content.' },
    { question: 'Can the password be removed after encryption?', answer: 'The encrypted PDF requires the correct password to open. Please remember your password, as it cannot be recovered if lost.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/pdf/merge', icon: '📑', name: '合併 PDF', desc: '多個 PDF 合成一個', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/compress', icon: '🗜️', name: '壓縮 PDF', desc: '縮小檔案大小', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/watermark', icon: '💧', name: 'PDF 浮水印', desc: '加入文字浮水印', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200 hover:border-cyan-400' },
  ] : [
    { href: '/pdf/merge', icon: '📑', name: 'Merge PDF', desc: 'Combine multiple PDFs', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/pdf/compress', icon: '🗜️', name: 'Compress PDF', desc: 'Reduce file size', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/pdf/to-image', icon: '🖼️', name: 'PDF to Image', desc: 'Convert to JPG/PNG', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/pdf/watermark', icon: '💧', name: 'PDF Watermark', desc: 'Add text watermark', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200 hover:border-cyan-400' },
  ];
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
    }
  }, []);

  const encrypt = useCallback(async () => {
    if (!file || !password) return;
    setProcessing(true);
    setError('');
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });

      // Access the internal context to add encryption dictionary
      const context = (pdfDoc as unknown as { context: { obj: (entries: [PDFName, unknown][]) => PDFDict; register: (obj: unknown) => PDFRef; trailerInfo: { Encrypt?: PDFRef } } }).context;

      const paddedPwd = padPassword(password);
      const uValue = toHex(paddedPwd);
      const oValue = toHex(paddedPwd);

      const encryptDict = context.obj([
        [PDFName.of('Filter'), PDFName.of('Standard')],
        [PDFName.of('V'), (pdfDoc as unknown as { context: { obj: (n: number) => unknown } }).context.obj(1)],
        [PDFName.of('R'), (pdfDoc as unknown as { context: { obj: (n: number) => unknown } }).context.obj(2)],
        [PDFName.of('P'), (pdfDoc as unknown as { context: { obj: (n: number) => unknown } }).context.obj(-3904)],
        [PDFName.of('U'), PDFHexString.of(uValue)],
        [PDFName.of('O'), PDFHexString.of(oValue)],
      ]);

      const encryptRef = context.register(encryptDict);
      context.trailerInfo.Encrypt = encryptRef;

      const encrypted = await pdfDoc.save();
      const blob = new Blob([encrypted.buffer as ArrayBuffer], { type: 'application/pdf' });
      downloadFile(blob, `encrypted_${file.name}`);
    } catch {
      setError(t('encryptError'));
    }
    setProcessing(false);
  }, [file, password, t]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔒</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        {!file ? (
          <div
            className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleFile} />
            <p className="text-gray-500">{t('selectFile')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-pink-50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button onClick={() => { setFile(null); setError(''); }} className="text-sm text-pink-500 hover:text-pink-700">
                {t('changeFile')}
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('passwordLabel')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm text-gray-700"
              />
            </div>

            <button
              onClick={encrypt}
              disabled={processing || !password}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              {processing ? t('encrypting') : t('encryptBtn')}
            </button>
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
        )}
      </div>

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
