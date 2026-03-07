'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const SIZES = [
  { id: '2inch', label: '2吋 (身分證/駕照)', w: 413, h: 531, desc: '35×45mm' },
  { id: '1inch', label: '1吋', w: 295, h: 354, desc: '25×30mm' },
  { id: 'passport', label: '護照', w: 413, h: 531, desc: '35×45mm' },
  { id: 'visa', label: '美簽 (51×51mm)', w: 600, h: 600, desc: '51×51mm' },
] as const;

const BG_COLORS = [
  { id: 'white', label: '白色', value: '#ffffff' },
  { id: 'blue', label: '藍色', value: '#438edb' },
  { id: 'red', label: '紅色', value: '#d73f3f' },
] as const;

type SizeOption = (typeof SIZES)[number];
type BgOption = (typeof BG_COLORS)[number];

async function removeBg(imgUrl: string, onProgress: (msg: string) => void): Promise<Blob> {
  onProgress('載入去背模型中（首次約需 30-60 秒）...');
  const { removeBackground } = await import('@imgly/background-removal');
  onProgress('正在去除背景...');
  const blob: Blob = await removeBackground(imgUrl, {
    model: 'isnet' as const,
    output: { format: 'image/png' as const, quality: 1 },
    progress: (key: string, current: number, total: number) => {
      if (total > 0) {
        const pct = Math.round((current / total) * 100);
        if (key.includes('fetch')) onProgress(`下載模型: ${pct}%`);
        else if (key.includes('inference')) onProgress(`去背處理中: ${pct}%`);
        else onProgress(`${key}: ${pct}%`);
      }
    },
  });
  return blob;
}

export default function PhotoPage() {
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
      alert('請上傳圖片檔案');
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setStep('processing');
    setError(null);
    try {
      const blob = await removeBg(url, setProgress);
      const blobUrl = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('無法載入去背圖片'));
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
      setError('去背失敗，請嘗試其他照片或檢查網路連線');
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

  // Immediate canvas render (no state, for drag smoothness)
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

  const downloadPhoto = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `證件照_${selectedSize.id}_${bgColor.id}.png`;
    a.click();
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📸 AI 證件照</h1>
      <p className="text-gray-500 mb-8">
        上傳照片，自動去背並生成標準證件照。所有處理在瀏覽器完成，不上傳伺服器。
      </p>

      {step === 'upload' && (
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-emerald-400 rounded-2xl p-12 text-center cursor-pointer transition-all bg-white/80"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <div className="text-4xl mb-3">📷</div>
            <p className="font-medium">點擊上傳照片</p>
            <p className="text-sm text-gray-500 mt-1">建議使用正面免冠照片，效果最佳</p>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="mt-8 text-center py-16">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-300 text-lg">{progress || '處理中...'}</p>
          <p className="text-gray-500 text-sm mt-2">首次使用需下載 AI 模型，請耐心等候</p>
        </div>
      )}

      {step === 'edit' && (
        <div className="space-y-6">
          {/* Size */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">照片尺寸</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2.5 rounded-xl text-sm border transition-all ${
                    selectedSize.id === size.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-gray-300 hover:border-emerald-400 text-gray-500'
                  }`}
                >
                  <div className="font-medium">{size.label}</div>
                  <div className="text-xs opacity-60">{size.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">背景顏色</label>
            <div className="flex gap-3">
              {BG_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setBgColor(color)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                    bgColor.id === color.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full border border-gray-600" style={{ backgroundColor: color.value }} />
                  <span className="text-sm">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              縮放 {Math.round(zoom * 100)}%
            </label>
            <input
              type="range" min="0.5" max="2" step="0.05" value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>縮小</span>
              <span>放大</span>
            </div>
          </div>

          {/* Preview — draggable with CSS transform for smooth touch */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={previewContainerRef}
              className="border border-gray-300 rounded-xl overflow-hidden bg-white p-4 inline-block select-none touch-none"
              style={{ cursor: dragging ? 'grabbing' : 'grab' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="證件照預覽"
                  className="rounded pointer-events-none"
                  draggable={false}
                  style={{
                    width: selectedSize.w > selectedSize.h ? 300 : 200,
                    height: 'auto',
                    aspectRatio: `${selectedSize.w}/${selectedSize.h}`,
                  }}
                />
              )}
            </div>
            <p className="text-xs text-gray-500">
              👆 拖曳照片調整位置 · 輸出：{selectedSize.w} × {selectedSize.h} px（{selectedSize.desc}）
            </p>
            {(offsetX !== 0 || offsetY !== 0) && (
              <button
                onClick={() => { setOffsetX(0); setOffsetY(0); }}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                重置位置
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={downloadPhoto}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-medium transition-all active:scale-95"
            >
              📥 下載證件照
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all active:scale-95"
            >
              🔄 重新上傳
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
