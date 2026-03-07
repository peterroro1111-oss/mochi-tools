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
      setResultUrl(URL.createObjectURL(blob));
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
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">🎨 AI 去背</h1>
        <p className="text-sm md:text-base text-[#b89b8a]">
          一鍵移除圖片背景，輸出透明 PNG。所有處理在瀏覽器完成 🔒
        </p>
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
            <div className="text-5xl mb-4">🖼️</div>
            <p className="font-bold text-gray-700 text-lg">點擊上傳圖片</p>
            <p className="text-sm text-[#b89b8a] mt-2">支援 JPG、PNG、WebP</p>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="mt-8 text-center py-16 bg-white rounded-3xl border-2 border-pink-100">
          <div className="inline-block mb-4">
            <div className="w-14 h-14 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 text-lg font-medium">{progress || '處理中...'}</p>
          <p className="text-sm text-[#b89b8a] mt-2">首次使用需下載 AI 模型，請耐心等候 🍡</p>
        </div>
      )}

      {step === 'done' && resultUrl && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-center">
            <button
              onClick={() => setCompare(!compare)}
              className="btn-secondary text-sm"
            >
              {compare ? '🔙 查看去背結果' : '🔄 對比原圖'}
            </button>
          </div>

          <div className="flex justify-center">
            <div className="bg-white border-2 border-pink-100 rounded-2xl overflow-hidden p-4 inline-block">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundImage: compare
                    ? 'none'
                    : 'repeating-conic-gradient(#f0f0f0 0% 25%, #fff 0% 50%)',
                  backgroundSize: '16px 16px',
                }}
              >
                <img
                  src={compare ? originalUrl! : resultUrl}
                  alt={compare ? '原圖' : '去背結果'}
                  className="rounded-xl max-h-[400px] md:max-h-[500px] max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={download} className="btn-mochi">
              📥 下載透明 PNG
            </button>
            <button onClick={reset} className="btn-secondary">
              🔄 處理另一張
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
