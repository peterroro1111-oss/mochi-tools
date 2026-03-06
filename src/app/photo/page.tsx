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

  // Dynamically import from CDN to avoid webpack bundling issues
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @next/next/no-assign-module-variable
  // @ts-expect-error CDN dynamic import
  const bgModule = await import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/index.mjs');

  onProgress('正在去除背景...');
  const blob: Blob = await bgModule.removeBackground(imgUrl, {
    publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/',
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

function renderPhoto(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  size: SizeOption,
  bg: BgOption
): string {
  const ctx = canvas.getContext('2d')!;
  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;

  // Fill background
  ctx.fillStyle = bg.value;
  ctx.fillRect(0, 0, w, h);

  // Smart crop: keep head (upper-center)
  const imgW = img.width;
  const imgH = img.height;
  const targetRatio = w / h;
  const imgRatio = imgW / imgH;

  let sx: number, sy: number, sw: number, sh: number;

  if (imgRatio > targetRatio) {
    // Image wider than target — crop sides, center horizontally
    sh = imgH;
    sw = imgH * targetRatio;
    sx = (imgW - sw) / 2;
    sy = 0;
  } else {
    // Image taller than target — crop bottom, keep top (head)
    sw = imgW;
    sh = imgW / targetRatio;
    sx = 0;
    sy = 0;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  return canvas.toDataURL('image/png');
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setStep('edit');
      setProgress('');
    } catch (err) {
      console.error(err);
      setError('去背失敗，請嘗試其他照片或檢查網路連線');
      setStep('upload');
      setProgress('');
    }
  };

  // Re-render preview when size/bg/image changes
  const updatePreview = useCallback(() => {
    if (!removedBgImg || !canvasRef.current) return;
    const url = renderPhoto(canvasRef.current, removedBgImg, selectedSize, bgColor);
    setPreviewUrl(url);
  }, [removedBgImg, selectedSize, bgColor]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

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
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📸 AI 證件照</h1>
      <p className="text-gray-400 mb-8">
        上傳照片，自動去背並生成標準證件照。所有處理在瀏覽器完成，不上傳伺服器。
      </p>

      {/* Upload */}
      {step === 'upload' && (
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-2xl p-12 text-center cursor-pointer transition-all bg-gray-900/50"
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

      {/* Processing */}
      {step === 'processing' && (
        <div className="mt-8 text-center py-16">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-300 text-lg">{progress || '處理中...'}</p>
          <p className="text-gray-500 text-sm mt-2">首次使用需下載 AI 模型，請耐心等候</p>
        </div>
      )}

      {/* Edit */}
      {step === 'edit' && (
        <div className="space-y-6">
          {/* Size Selection */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">照片尺寸</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2.5 rounded-xl text-sm border transition-all ${
                    selectedSize.id === size.id
                      ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                      : 'border-gray-700 hover:border-gray-500 text-gray-400'
                  }`}
                >
                  <div className="font-medium">{size.label}</div>
                  <div className="text-xs opacity-60">{size.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">背景顏色</label>
            <div className="flex gap-3">
              {BG_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setBgColor(color)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                    bgColor.id === color.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-gray-600"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-sm">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center gap-4">
            <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900 p-4 inline-block">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="證件照預覽"
                  className="rounded"
                  style={{
                    width: selectedSize.w > selectedSize.h ? 300 : 200,
                    height: 'auto',
                    aspectRatio: `${selectedSize.w}/${selectedSize.h}`,
                  }}
                />
              )}
            </div>
            <p className="text-xs text-gray-500">
              輸出尺寸：{selectedSize.w} × {selectedSize.h} px（{selectedSize.desc}，300 DPI）
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={downloadPhoto}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-all active:scale-95"
            >
              📥 下載證件照
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-all active:scale-95"
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
