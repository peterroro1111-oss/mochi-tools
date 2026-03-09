'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

export default function GifMakerPage() {
  const t = useTranslations('gifMaker');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: 'GIF 動畫可以設定速度嗎？', answer: '可以，可調整每幀延遲時間來控制動畫速度，從快速到慢速都能設定。' },
    { question: '支援多少張圖片合成？', answer: '沒有嚴格限制，但建議控制在 50 張以內，過多圖片會增加處理時間和檔案大小。' },
    { question: 'GIF 可以設定循環嗎？', answer: '可以，支援設定循環次數或無限循環。' },
  ] : [
    { question: 'Can GIF animation speed be adjusted?', answer: 'Yes, you can adjust the delay between frames to control animation speed, from fast to slow.' },
    { question: 'How many images can be combined?', answer: 'No strict limit, but we recommend keeping it under 50 images to manage processing time and file size.' },
    { question: 'Can GIF looping be configured?', answer: 'Yes, supports setting a specific loop count or infinite looping.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/convert/jpg-to-png', icon: '🔄', name: '格式轉換', desc: '圖片格式轉換', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: '影片壓縮', desc: '壓縮 MP4/WebM/MOV', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI 去背', desc: '智慧去除背景', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/convert/jpg-to-png', icon: '🔄', name: 'Format Convert', desc: 'Image format conversion', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: 'Video Compress', desc: 'Compress MP4/WebM/MOV', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI Remove BG', desc: 'Smart background removal', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [delay, setDelay] = useState(500);
  const [loop, setLoop] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [previewFrame, setPreviewFrame] = useState(0);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDroppedFiles = useCallback((files: FileList) => {
    const arr = Array.from(files);
    const imgs = arr.filter(f => f.type.startsWith('image/')).map(f => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setImages(prev => [...prev, ...imgs]);
  }, []);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imgs = files.filter(f => f.type.startsWith('image/')).map(f => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setImages(prev => [...prev, ...imgs]);
  }, []);

  const removeImage = (idx: number) => {
    setImages(prev => { URL.revokeObjectURL(prev[idx].url); return prev.filter((_, i) => i !== idx); });
  };

  // Preview animation
  const startPreview = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);
    let frame = 0;
    animRef.current = setInterval(() => {
      frame = (frame + 1) % images.length;
      setPreviewFrame(frame);
    }, delay);
  }, [images.length, delay]);

  const stopPreview = useCallback(() => {
    if (animRef.current) { clearInterval(animRef.current); animRef.current = null; }
  }, []);

  const createGif = useCallback(async () => {
    if (images.length < 2) return;
    setProcessing(true);
    setError('');
    try {
      // Load all images into canvases to get dimensions
      const loadImg = (url: string): Promise<HTMLImageElement> => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = url;
      });

      const loadedImgs = await Promise.all(images.map(i => loadImg(i.url)));
      const width = Math.max(...loadedImgs.map(i => i.width));
      const height = Math.max(...loadedImgs.map(i => i.height));

      // Use gif-encoder-2 via dynamic import (it uses canvas in node, but we'll use manual approach)
      // Since gif-encoder-2 is node-only, we'll use a pure canvas approach with manual GIF encoding
      // Create GIF using a simple approach with canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;

      // Simple GIF89a encoder
      const frames: ImageData[] = [];
      for (const img of loadedImgs) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, (width - img.width) / 2, (height - img.height) / 2);
        frames.push(ctx.getImageData(0, 0, width, height));
      }

      const gif = encodeGif(width, height, frames, delay / 10, loop);
      const blob = new Blob([gif.buffer as ArrayBuffer], { type: 'image/gif' });
      downloadFile(blob, 'animation.gif');
    } catch {
      setError(t('createError'));
    }
    setProcessing(false);
  }, [images, delay, loop, t]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <FullPageDropZone onFiles={handleDroppedFiles} accept="image/*" />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center">🎞️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        <div
          className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-400 transition-colors mb-4"
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
          <p className="text-gray-500">{t('dropzone')}</p>
          <p className="text-xs text-gray-400 mt-1">{t('dropzoneHint')}</p>
        </div>

        {images.length > 0 && (
          <>
            {/* Thumbnails */}
            <div className="flex flex-wrap gap-2 mb-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img src={img.url} alt="" className={`w-16 h-16 object-cover rounded-lg border-2 ${idx === previewFrame ? 'border-pink-400' : 'border-pink-100'}`} />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('delayLabel')}: {delay}ms</label>
                <input type="range" min={100} max={2000} step={100} value={delay} onChange={(e) => setDelay(+e.target.value)} className="w-full accent-pink-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('loopLabel')}</label>
                <select value={loop} onChange={(e) => setLoop(+e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-pink-100 text-sm">
                  <option value={0}>{t('loopInfinite')}</option>
                  <option value={1}>1</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>

            {/* Preview area */}
            {images.length > 0 && (
              <div className="flex justify-center mb-4">
                <img src={images[previewFrame]?.url} alt="" className="max-h-48 rounded-xl border-2 border-pink-100" />
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={startPreview} className="flex-1 px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all">
                {t('previewBtn')}
              </button>
              <button onClick={stopPreview} className="px-4 py-2 bg-white border-2 border-pink-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all">
                {t('stopBtn')}
              </button>
              <button
                onClick={createGif}
                disabled={processing || images.length < 2}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {processing ? t('creating') : t('createBtn')}
              </button>
            </div>
          </>
        )}

        {error && <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
      </div>

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}

// Minimal GIF89a encoder (browser-compatible)
function encodeGif(width: number, height: number, frames: ImageData[], delay: number, loopCount: number): Uint8Array {
  const buf: number[] = [];
  const write = (s: string) => { for (let i = 0; i < s.length; i++) buf.push(s.charCodeAt(i)); };
  const writeShort = (v: number) => { buf.push(v & 0xff, (v >> 8) & 0xff); };
  const writeByte = (v: number) => buf.push(v & 0xff);

  // Build a global 256-color palette using median cut quantization (simplified)
  // For simplicity, use a fixed web-safe palette
  const palette: number[] = [];
  for (let r = 0; r < 6; r++)
    for (let g = 0; g < 6; g++)
      for (let b = 0; b < 6; b++)
        palette.push(r * 51, g * 51, b * 51);
  // Pad to 256
  while (palette.length < 256 * 3) palette.push(0, 0, 0);

  const findClosest = (r: number, g: number, b: number) => {
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < 216; i++) {
      const dr = palette[i * 3] - r, dg = palette[i * 3 + 1] - g, db = palette[i * 3 + 2] - b;
      const d = dr * dr + dg * dg + db * db;
      if (d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  };

  // Header
  write('GIF89a');
  writeShort(width);
  writeShort(height);
  writeByte(0xf7); // GCT flag, 256 colors
  writeByte(0); // bg color
  writeByte(0); // pixel aspect ratio

  // Global color table
  for (let i = 0; i < 768; i++) writeByte(palette[i]);

  // NETSCAPE2.0 extension for looping
  writeByte(0x21); // Extension
  writeByte(0xff); // Application extension
  writeByte(11); // Block size
  write('NETSCAPE2.0');
  writeByte(3); // Sub-block size
  writeByte(1);
  writeShort(loopCount);
  writeByte(0); // Terminator

  for (const frame of frames) {
    // Graphic Control Extension
    writeByte(0x21);
    writeByte(0xf9);
    writeByte(4);
    writeByte(0); // No transparency
    writeShort(Math.round(delay)); // Delay in centiseconds
    writeByte(0); // Transparent color
    writeByte(0);

    // Image Descriptor
    writeByte(0x2c);
    writeShort(0); // left
    writeShort(0); // top
    writeShort(width);
    writeShort(height);
    writeByte(0); // No local color table

    // LZW encode
    const minCodeSize = 8;
    writeByte(minCodeSize);

    const pixels: number[] = [];
    for (let i = 0; i < frame.data.length; i += 4) {
      pixels.push(findClosest(frame.data[i], frame.data[i + 1], frame.data[i + 2]));
    }

    const encoded = lzwEncode(pixels, minCodeSize);
    // Write sub-blocks
    let offset = 0;
    while (offset < encoded.length) {
      const size = Math.min(255, encoded.length - offset);
      writeByte(size);
      for (let i = 0; i < size; i++) buf.push(encoded[offset + i]);
      offset += size;
    }
    writeByte(0); // Block terminator
  }

  writeByte(0x3b); // Trailer
  return new Uint8Array(buf);
}

function lzwEncode(pixels: number[], minCodeSize: number): number[] {
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;
  const maxCode = 4096;

  const table = new Map<string, number>();
  const initTable = () => {
    table.clear();
    for (let i = 0; i < clearCode; i++) table.set(String(i), i);
    codeSize = minCodeSize + 1;
    nextCode = eoiCode + 1;
  };

  const output: number[] = [];
  let bits = 0;
  let bitCount = 0;

  const writeCode = (code: number) => {
    bits |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      output.push(bits & 0xff);
      bits >>= 8;
      bitCount -= 8;
    }
  };

  initTable();
  writeCode(clearCode);

  let current = String(pixels[0]);
  for (let i = 1; i < pixels.length; i++) {
    const next = current + ',' + pixels[i];
    if (table.has(next)) {
      current = next;
    } else {
      writeCode(table.get(current)!);
      if (nextCode < maxCode) {
        table.set(next, nextCode++);
        if (nextCode > (1 << codeSize) && codeSize < 12) codeSize++;
      } else {
        writeCode(clearCode);
        initTable();
      }
      current = String(pixels[i]);
    }
  }
  writeCode(table.get(current)!);
  writeCode(eoiCode);

  if (bitCount > 0) output.push(bits & 0xff);

  return output;
}
