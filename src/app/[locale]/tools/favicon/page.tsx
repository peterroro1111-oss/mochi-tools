'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import JSZip from 'jszip';

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

export default function FaviconPage() {
  const t = useTranslations('favicon');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      // Generate previews
      const pvs: { size: number; url: string }[] = [];
      for (const size of SIZES) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, size, size);
        pvs.push({ size, url: canvas.toDataURL('image/png') });
      }
      setPreviews(pvs);
    };
    img.src = url;
  }, []);

  const htmlSnippet = `<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

  const downloadAll = useCallback(async () => {
    if (!image) return;
    setProcessing(true);
    const zip = new JSZip();

    for (const size of SIZES) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0, size, size);
      const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
      let name = `favicon-${size}x${size}.png`;
      if (size === 180) name = 'apple-touch-icon.png';
      else if (size === 192) name = 'android-chrome-192x192.png';
      else if (size === 512) name = 'android-chrome-512x512.png';
      zip.file(name, blob);
    }

    // Generate ICO (multi-size: 16, 32, 48)
    const icoBlob = await generateIco(image, [16, 32, 48]);
    zip.file('favicon.ico', icoBlob);
    zip.file('html-snippet.txt', htmlSnippet);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    downloadFile(zipBlob, 'favicons.zip');
    setProcessing(false);
  }, [image]);

  const copySnippet = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center">⭐</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        {!image ? (
          <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <p className="text-gray-500">{t('uploadBtn')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('uploadHint')}</p>
          </div>
        ) : (
          <>
            {/* Preview grid */}
            <p className="text-sm font-medium text-gray-700 mb-3">{t('previewLabel')}</p>
            <div className="flex flex-wrap gap-4 mb-6 items-end">
              {previews.map(p => (
                <div key={p.size} className="text-center">
                  <img src={p.url} alt={`${p.size}x${p.size}`} className="border-2 border-pink-100 rounded-lg mx-auto"
                    style={{ width: Math.max(p.size, 32), height: Math.max(p.size, 32), imageRendering: p.size < 32 ? 'pixelated' : 'auto' }} />
                  <p className="text-[10px] text-gray-400 mt-1">{p.size}×{p.size}</p>
                </div>
              ))}
            </div>

            {/* HTML snippet */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{t('htmlSnippet')}</p>
                <button onClick={copySnippet} className="text-xs text-pink-500 hover:text-pink-700">
                  {copied ? t('copied') : t('copyBtn')}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-xl p-3 text-xs font-mono text-gray-600 overflow-auto">{htmlSnippet}</pre>
            </div>

            <div className="flex gap-3">
              <button onClick={downloadAll} disabled={processing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50">
                {processing ? t('processing') : t('downloadAll')}
              </button>
              <button onClick={() => { setImage(null); setPreviews([]); }}
                className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-500 rounded-xl font-medium hover:bg-pink-50 transition-all">
                {t('resetBtn')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Generate ICO file from image
async function generateIco(img: HTMLImageElement, sizes: number[]): Promise<Blob> {
  const images: ArrayBuffer[] = [];
  for (const size of sizes) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, size, size);
    const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
    images.push(await blob.arrayBuffer());
  }

  // ICO format: header + directory entries + image data
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * sizes.length;

  let totalSize = dataOffset;
  for (const buf of images) totalSize += buf.byteLength;

  const ico = new ArrayBuffer(totalSize);
  const view = new DataView(ico);

  // Header
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type (ICO)
  view.setUint16(4, sizes.length, true); // count

  let offset = dataOffset;
  for (let i = 0; i < sizes.length; i++) {
    const entryOffset = headerSize + i * entrySize;
    view.setUint8(entryOffset, sizes[i] < 256 ? sizes[i] : 0); // width
    view.setUint8(entryOffset + 1, sizes[i] < 256 ? sizes[i] : 0); // height
    view.setUint8(entryOffset + 2, 0); // palette
    view.setUint8(entryOffset + 3, 0); // reserved
    view.setUint16(entryOffset + 4, 1, true); // color planes
    view.setUint16(entryOffset + 6, 32, true); // bits per pixel
    view.setUint32(entryOffset + 8, images[i].byteLength, true); // size
    view.setUint32(entryOffset + 12, offset, true); // offset

    new Uint8Array(ico, offset).set(new Uint8Array(images[i]));
    offset += images[i].byteLength;
  }

  return new Blob([ico], { type: 'image/x-icon' });
}
