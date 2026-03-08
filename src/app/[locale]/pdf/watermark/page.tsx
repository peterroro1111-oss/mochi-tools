'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { downloadFile } from '@/app/utils/download';

export default function PdfWatermarkPage() {
  const t = useTranslations('pdfWatermark');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#888888');
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<'center' | 'diagonal'>('diagonal');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      setPreviewUrl('');
    }
  }, []);

  const hexToRgb = (hex: string) => {
    const m = hex.replace('#', '').match(/.{2}/g)!;
    return rgb(parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255);
  };

  const applyWatermark = useCallback(async (preview?: boolean) => {
    if (!file || !text) return;
    setProcessing(true);
    setError('');
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const font = await pdfDoc.embedFont('Helvetica' as never);
      const pages = pdfDoc.getPages();
      const colorVal = hexToRgb(color);

      const pagesToProcess = preview ? [pages[0]] : pages;
      for (const page of pagesToProcess) {
        const { width, height } = page.getSize();
        if (position === 'diagonal') {
          // Tile watermark diagonally
          const stepX = 200;
          const stepY = 200;
          for (let x = -100; x < width + 100; x += stepX) {
            for (let y = -100; y < height + 100; y += stepY) {
              page.drawText(text, {
                x, y, size: fontSize, font, color: colorVal,
                opacity, rotate: degrees(rotation),
              });
            }
          }
        } else {
          const textWidth = font.widthOfTextAtSize(text, fontSize);
          page.drawText(text, {
            x: (width - textWidth) / 2,
            y: height / 2,
            size: fontSize, font, color: colorVal,
            opacity, rotate: degrees(rotation),
          });
        }
      }

      const saved = await pdfDoc.save();
      const blob = new Blob([saved.buffer as ArrayBuffer], { type: 'application/pdf' });

      if (preview) {
        setPreviewUrl(URL.createObjectURL(blob));
      } else {
        downloadFile(blob, `watermarked_${file.name}`);
      }
    } catch {
      setError(t('watermarkError'));
    }
    setProcessing(false);
  }, [file, text, fontSize, color, opacity, rotation, position, t]);

  const positions = [
    { key: 'center' as const, label: t('posCenter') },
    { key: 'diagonal' as const, label: t('posDiagonal') },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">💧</span>
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
              <button onClick={() => { setFile(null); setPreviewUrl(''); }} className="text-sm text-pink-500">
                {t('changeFile')}
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('textLabel')}</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('textPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm text-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fontSizeLabel')}: {fontSize}px</label>
                <input type="range" min={12} max={120} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full accent-pink-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('opacityLabel')}: {Math.round(opacity * 100)}%</label>
                <input type="range" min={5} max={100} value={opacity * 100} onChange={(e) => setOpacity(+e.target.value / 100)} className="w-full accent-pink-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('colorLabel')}</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg border-2 border-pink-100 cursor-pointer" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('rotationLabel')}: {rotation}°</label>
                <input type="range" min={-90} max={90} value={rotation} onChange={(e) => setRotation(+e.target.value)} className="w-full accent-pink-400" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('positionLabel')}</label>
              <div className="flex gap-2">
                {positions.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPosition(p.key)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      position === p.key ? 'bg-pink-50 text-pink-500 border-2 border-pink-300' : 'bg-white border-2 border-pink-100 text-gray-500'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => applyWatermark(true)}
                disabled={processing || !text}
                className="flex-1 px-4 py-3 bg-white border-2 border-pink-200 text-pink-500 rounded-xl font-medium hover:bg-pink-50 transition-all disabled:opacity-50"
              >
                {t('previewBtn')}
              </button>
              <button
                onClick={() => applyWatermark(false)}
                disabled={processing || !text}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {processing ? t('processing') : t('downloadBtn')}
              </button>
            </div>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
      </div>

      {previewUrl && (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">{t('previewTitle')}</p>
          <iframe src={previewUrl} className="w-full h-96 rounded-xl border border-gray-100" />
        </div>
      )}
    </div>
  );
}
