'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import JSZip from 'jszip';

interface ImageItem {
  file: File;
  url: string;
  width: number;
  height: number;
}

export default function ImageResizePage() {
  const t = useTranslations('imageResize');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const aspectRatio = useRef(4 / 3);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    for (const file of files) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setImages(prev => {
          if (prev.length === 0) {
            aspectRatio.current = img.width / img.height;
            setTargetWidth(img.width);
            setTargetHeight(img.height);
          }
          return [...prev, { file, url, width: img.width, height: img.height }];
        });
      };
      img.src = url;
    }
  }, []);

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockAspect) setTargetHeight(Math.round(w / aspectRatio.current));
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockAspect) setTargetWidth(Math.round(h * aspectRatio.current));
  };

  const resizeImage = (img: HTMLImageElement, w: number, h: number, q: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(blob => resolve(blob!), 'image/jpeg', q / 100);
    });
  };

  const processAll = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);

    const loadImg = (url: string): Promise<HTMLImageElement> => new Promise(res => {
      const img = new Image();
      img.onload = () => res(img);
      img.src = url;
    });

    const getSize = (orig: ImageItem) => {
      if (unit === '%') {
        return { w: Math.round(orig.width * targetWidth / 100), h: Math.round(orig.height * targetHeight / 100) };
      }
      return { w: targetWidth, h: targetHeight };
    };

    if (images.length === 1) {
      const img = await loadImg(images[0].url);
      const { w, h } = getSize(images[0]);
      const blob = await resizeImage(img, w, h, quality);
      downloadFile(blob, `resized_${images[0].file.name.replace(/\.[^.]+$/, '.jpg')}`);
    } else {
      const zip = new JSZip();
      for (const item of images) {
        const img = await loadImg(item.url);
        const { w, h } = getSize(item);
        const blob = await resizeImage(img, w, h, quality);
        zip.file(`resized_${item.file.name.replace(/\.[^.]+$/, '.jpg')}`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadFile(zipBlob, 'resized_images.zip');
    }
    setProcessing(false);
  }, [images, targetWidth, targetHeight, unit, quality]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center">📐</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-400 transition-colors"
          onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
          <p className="text-gray-500">{t('dropzone')}</p>
          <p className="text-xs text-gray-400 mt-1">{t('dropzoneHint')}</p>
        </div>

        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img.url} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-pink-100" />
                <span className="text-[10px] text-gray-400 block text-center">{img.width}×{img.height}</span>
              </div>
            ))}
            <p className="w-full text-xs text-gray-400 mt-1">{t('fileCount', { count: images.length })}</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
          {/* Unit toggle */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => setUnit('px')} className={`px-3 py-1.5 rounded-lg text-sm ${unit === 'px' ? 'bg-pink-50 text-pink-500 border border-pink-300' : 'border border-pink-100 text-gray-500'}`}>px</button>
            <button onClick={() => setUnit('%')} className={`px-3 py-1.5 rounded-lg text-sm ${unit === '%' ? 'bg-pink-50 text-pink-500 border border-pink-300' : 'border border-pink-100 text-gray-500'}`}>%</button>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('widthLabel')} ({unit})</label>
              <input type="number" value={targetWidth} onChange={(e) => handleWidthChange(+e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('heightLabel')} ({unit})</label>
              <input type="number" value={targetHeight} onChange={(e) => handleHeightChange(+e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-sm" />
            </div>
          </div>

          {/* Lock aspect ratio */}
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} className="accent-pink-400 w-4 h-4" />
            <span className="text-sm text-gray-700">{t('lockAspect')}</span>
          </label>

          {/* Quality */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('qualityLabel')}: {quality}%</label>
            <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full accent-pink-400" />
          </div>

          {/* Process button */}
          <button
            onClick={processAll}
            disabled={processing}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {processing ? t('processing') : images.length > 1 ? t('downloadZip') : t('downloadBtn')}
          </button>
        </div>
      )}
    </div>
  );
}
