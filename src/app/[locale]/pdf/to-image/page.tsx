'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfjsLib: any;
  }
}

export default function PdfToImagePage() {
  const t = useTranslations('pdfToImage');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [scale, setScale] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      setLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  const convert = async () => {
    if (!file || !loaded) return;
    setProcessing(true);
    setImages([]);
    try {
      const data = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data }).promise;
      const results: string[] = [];

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;
        const dataUrl = canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.92 : undefined);
        results.push(dataUrl);
      }

      setImages(results);
    } catch (err) {
      alert(t('convertError'));
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const downloadAll = async () => {
    for (let i = 0; i < images.length; i++) {
      const resp = await fetch(images[i]);
      const blob = await resp.blob();
      downloadFile(blob, `page_${i + 1}.${format}`);
    }
  };

  const downloadOne = async (img: string, index: number) => {
    const resp = await fetch(img);
    const blob = await resp.blob();
    downloadFile(blob, `page_${index + 1}.${format}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <canvas ref={canvasRef} className="hidden" />

      {!file ? (
        <div
          onClick={() => document.getElementById('file-input')?.click()}
          className="border-2 border-dashed border-pink-200 hover:border-pink-400 rounded-2xl p-12 text-center cursor-pointer bg-white transition-all"
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] || null); setImages([]); }} />
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium">{t('selectFile')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <p className="font-medium">{file.name}</p>
            <button onClick={() => { setFile(null); setImages([]); }} className="text-sm text-gray-500 hover:text-red-500">{t('changeFile')}</button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">{t('formatLabel')}</label>
              <div className="flex gap-2">
                {(['png', 'jpeg'] as const).map(f => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${format === f ? 'bg-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">{t('resolutionLabel')}</label>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => setScale(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${scale === s ? 'bg-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={convert} disabled={processing || !loaded}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]">
            {!loaded ? t('loading') : processing ? t('converting') : t('convertBtn')}
          </button>

          {images.length > 0 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{t('imageCount', { count: images.length })}</p>
                <button onClick={downloadAll} className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl text-sm font-medium transition-all">
                  {t('downloadAll')}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden group cursor-pointer" onClick={() => downloadOne(img, i)}>
                    <img src={img} alt={`Page ${i + 1}`} className="w-full" />
                    <div className="p-2 text-center text-xs text-gray-500 group-hover:text-white transition-colors">
                      {t('pageDownload', { page: i + 1 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
