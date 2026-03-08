'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdfPage() {
  const t = useTranslations('pdfCompress');
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ size: number; url: string } | null>(null);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    setFile({ name: f.name, data, size: f.size });
    setResult(null);
  };

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
    } catch {
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
              <a href={result.url} download={`compressed_${file.name}`}
                className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-medium transition-all">
                {t('downloadBtn')}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
