'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';

const SIZES = [
  { id: '2inch', w: 413, h: 531, desc: '35×45mm' },
  { id: '1inch', w: 295, h: 354, desc: '25×30mm' },
  { id: 'passport', w: 413, h: 531, desc: '35×45mm' },
  { id: 'visa', w: 600, h: 600, desc: '51×51mm' },
] as const;

const BG_COLORS = [
  { id: 'white', value: '#ffffff' },
  { id: 'blue', value: '#438edb' },
  { id: 'red', value: '#d73f3f' },
] as const;

type SizeOption = (typeof SIZES)[number];
type BgOption = (typeof BG_COLORS)[number];

export default function PhotoPage() {
  const t = useTranslations('photo');
  const [step, setStep] = useState<'upload' | 'processing' | 'edit'>('upload');
  const [progress, setProgress] = useState('');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [removedBgImg, setRemovedBgImg] = useState<HTMLImageElement | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[0]);
  const [bgColor, setBgColor] = useState<BgOption>(BG_COLORS[0]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const rafId = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('uploadError'));
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setStep('processing');
    setError(null);
    try {
      setProgress(t('loadingModel'));
      const { removeBackground } = await import('@imgly/background-removal');
      setProgress(t('removingBg'));
      const blob: Blob = await removeBackground(url, {
        model: 'isnet' as const,
        output: { format: 'image/png' as const, quality: 1 },
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            if (key.includes('fetch')) setProgress(t('downloadingModel', { pct: String(pct) }));
            else if (key.includes('inference')) setProgress(t('processingBg', { pct: String(pct) }));
            else setProgress(`${key}: ${pct}%`);
          }
        },
      });
      const blobUrl = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = blobUrl;
      });
      setRemovedBgImg(img);
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      setStep('edit');
      setProgress('');
    } catch (err) {
      console.error(err);
      setError(t('error'));
      setStep('upload');
      setProgress('');
    }
  };

  const renderPhoto = useCallback(() => {
    if (!removedBgImg || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const { w, h } = selectedSize;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, w, h);
    const img = removedBgImg;
    const targetRatio = w / h;
    const imgRatio = img.width / img.height;
    let drawW: number, drawH: number;
    if (imgRatio > targetRatio) {
      drawH = h * zoom;
      drawW = drawH * imgRatio;
    } else {
      drawW = w * zoom;
      drawH = drawW / imgRatio;
    }
    const drawX = (w - drawW) / 2 + offsetX * w;
    const drawY = (h - drawH) / 2 + offsetY * h;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    setPreviewUrl(canvas.toDataURL('image/png'));
  }, [removedBgImg, selectedSize, bgColor, zoom, offsetX, offsetY]);

  useEffect(() => {
    renderPhoto();
  }, [renderPhoto]);

  const renderImmediate = useCallback((ox: number, oy: number) => {
    if (!removedBgImg || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const { w, h } = selectedSize;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, w, h);
    const img = removedBgImg;
    const targetRatio = w / h;
    const imgRatio = img.width / img.height;
    let drawW: number, drawH: number;
    if (imgRatio > targetRatio) {
      drawH = h * zoom;
      drawW = drawH * imgRatio;
    } else {
      drawW = w * zoom;
      drawH = drawW / imgRatio;
    }
    const drawX = (w - drawW) / 2 + ox * w;
    const drawY = (h - drawH) / 2 + oy * h;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    setPreviewUrl(canvas.toDataURL('image/png'));
  }, [removedBgImg, selectedSize, bgColor, zoom]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offsetX, oy: offsetY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !previewContainerRef.current) return;
    e.preventDefault();
    const rect = previewContainerRef.current.getBoundingClientRect();
    const newOx = dragStart.current.ox + (e.clientX - dragStart.current.x) / rect.width;
    const newOy = dragStart.current.oy + (e.clientY - dragStart.current.y) / rect.height;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => renderImmediate(newOx, newOy));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging || !previewContainerRef.current) return;
    setDragging(false);
    const rect = previewContainerRef.current.getBoundingClientRect();
    const dx = (e.clientX - dragStart.current.x) / rect.width;
    const dy = (e.clientY - dragStart.current.y) / rect.height;
    setOffsetX(dragStart.current.ox + dx);
    setOffsetY(dragStart.current.oy + dy);
  };

  const downloadPhoto = async () => {
    if (!previewUrl) return;
    const resp = await fetch(previewUrl);
    const blob = await resp.blob();
    downloadFile(blob, `photo_${selectedSize.id}_${bgColor.id}.png`);
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    setRemovedBgImg(null);
    setPreviewUrl(null);
    setStep('upload');
    setError(null);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-sm md:text-base text-[#b89b8a]">
          {t('subtitle')}
        </p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700 md:hidden">
        {t('mobileHint')}
      </div>

      {step === 'upload' && (
        <>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-500 text-sm">
              {error}
            </div>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="upload-zone"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <div className="text-5xl mb-4">📷</div>
            <p className="font-bold text-gray-700 text-lg">{t('uploadBtn')}</p>
            <p className="text-sm text-[#b89b8a] mt-2">{t('uploadHint')}</p>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="mt-8 text-center py-16 bg-white rounded-3xl border-2 border-pink-100">
          <div className="inline-block mb-4">
            <div className="w-14 h-14 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 text-lg font-medium">{progress || t('processing')}</p>
          <p className="text-sm text-[#b89b8a] mt-2">{t('modelHint')}</p>
        </div>
      )}

      {step === 'edit' && (
        <div className="space-y-6">
          {/* Size */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-3 block">{t('sizeLabel')}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`select-btn ${selectedSize.id === size.id ? 'active' : ''}`}
                >
                  <div className="font-bold">{t(`sizes.${size.id}`)}</div>
                  <div className="text-xs opacity-60">{size.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-3 block">{t('bgLabel')}</label>
            <div className="flex gap-3">
              {BG_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setBgColor(color)}
                  className={`select-btn flex items-center gap-2 ${bgColor.id === color.id ? 'active' : ''}`}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2"
                    style={{ backgroundColor: color.value, borderColor: color.value === '#ffffff' ? '#e0e0e0' : color.value }}
                  />
                  <span>{t(`bgColors.${color.id}`)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-3 block">
              {t('zoomLabel', { percent: Math.round(zoom * 100) })}
            </label>
            <input
              type="range" min="0.5" max="2" step="0.05" value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-pink-400"
            />
            <div className="flex justify-between text-xs text-[#b89b8a] mt-1">
              <span>{t('zoomOut')}</span>
              <span>{t('zoomIn')}</span>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={previewContainerRef}
              className="bg-white border-2 border-pink-100 rounded-2xl overflow-hidden p-4 inline-block select-none touch-none"
              style={{ cursor: dragging ? 'grabbing' : 'grab' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={t('previewAlt')}
                  className="rounded-xl pointer-events-none"
                  draggable={false}
                  style={{
                    width: selectedSize.w > selectedSize.h ? 280 : 200,
                    maxWidth: '70vw',
                    height: 'auto',
                    aspectRatio: `${selectedSize.w}/${selectedSize.h}`,
                  }}
                />
              )}
            </div>
            <p className="text-xs text-[#b89b8a]">
              {t('previewHint', { w: selectedSize.w, h: selectedSize.h, desc: selectedSize.desc })}
            </p>
            {(offsetX !== 0 || offsetY !== 0) && (
              <button
                onClick={() => { setOffsetX(0); setOffsetY(0); }}
                className="text-xs text-pink-400 hover:text-pink-500 transition-colors"
              >
                {t('resetPosition')}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={downloadPhoto} className="btn-mochi">
              {t('downloadBtn')}
            </button>
            <button onClick={reset} className="btn-secondary">
              {t('reupload')}
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
