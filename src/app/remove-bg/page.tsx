'use client';

import { useState, useRef } from 'react';

export default function RemoveBgPage() {
  const [step, setStep] = useState<'upload' | 'processing' | 'done'>('upload');
  const [progress, setProgress] = useState('');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);
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
    setResultUrl(null);
    setCompare(false);

    try {
      setProgress('載入去背模型中（首次約需 30-60 秒）...');
      const { removeBackground } = await import('@imgly/background-removal');

      setProgress('正在去除背景...');
      const blob: Blob = await removeBackground(url, {
        model: 'isnet' as const,
        output: { format: 'image/png' as const, quality: 1 },
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            if (key.includes('fetch')) setProgress(`下載模型: ${pct}%`);
            else if (key.includes('inference')) setProgress(`去背處理中: ${pct}%`);
            else setProgress(`${key}: ${pct}%`);
          }
        },
      });

      const blobUrl = URL.createObjectURL(blob);
      setResultUrl(blobUrl);
      setStep('done');
    } catch (err) {
      console.error(err);
      setError('去背失敗，請嘗試其他照片或檢查網路連線');
      setStep('upload');
    } finally {
      setProgress('');
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'removed_bg.png';
    a.click();
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setStep('upload');
    setError(null);
    setCompare(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🎨 AI 去背</h1>
      <p className="text-gray-500 mb-8">
        一鍵移除圖片背景，輸出透明 PNG。所有處理在瀏覽器完成，不上傳伺服器。
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
            <div className="text-4xl mb-3">🖼️</div>
            <p className="font-medium">點擊上傳圖片</p>
            <p className="text-sm text-gray-500 mt-1">支援 JPG、PNG、WebP</p>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="mt-8 text-center py-16">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-300 text-lg">{progress || '處理中...'}</p>
          <p className="text-gray-500 text-sm mt-2">首次使用需下載 AI 模型，請耐心等候</p>
        </div>
      )}

      {step === 'done' && resultUrl && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-center">
            <button
              onClick={() => setCompare(!compare)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all"
            >
              {compare ? '🔙 查看去背結果' : '🔄 對比原圖'}
            </button>
          </div>

          <div className="flex justify-center">
            <div className="border border-gray-300 rounded-xl overflow-hidden bg-white p-4 inline-block">
              <div
                className="rounded"
                style={{
                  backgroundImage: compare
                    ? 'none'
                    : 'repeating-conic-gradient(#303030 0% 25%, #404040 0% 50%)',
                  backgroundSize: '16px 16px',
                }}
              >
                <img
                  src={compare ? originalUrl! : resultUrl}
                  alt={compare ? '原圖' : '去背結果'}
                  className="rounded max-h-[500px] max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={download}
              className="px-6 py-2.5 bg-violet-500 hover:bg-violet-400 rounded-xl font-medium transition-all active:scale-95"
            >
              📥 下載透明 PNG
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all active:scale-95"
            >
              🔄 處理另一張
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
