'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

interface OriginalFile {
  file: File;
  previewUrl: string;
}

interface CompressedResult {
  name: string;
  originalSize: number;
  compressedSize: number;
  compressedUrl: string;
  previewUrl: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatPercent(original: number, compressed: number) {
  if (original === 0) return '0%';
  const saved = ((1 - compressed / original) * 100).toFixed(0);
  return `${saved}%`;
}

function compressOne(file: File, q: number): Promise<CompressedResult> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      // Try WebP (best ratio), then JPEG, pick smallest
      const attempts: Promise<Blob | null>[] = ['image/webp', 'image/jpeg'].map(
        (type) =>
          new Promise((res) => {
            canvas.toBlob((b) => res(b), type, q / 100);
          })
      );

      Promise.all(attempts).then((blobs) => {
        const valid = blobs.filter((b): b is Blob => b !== null && b.size < file.size);
        if (valid.length === 0) {
          // Can't compress smaller, use original
          resolve({
            name: file.name,
            originalSize: file.size,
            compressedSize: file.size,
            compressedUrl: url,
            previewUrl: url,
          });
          return;
        }
        const best = valid.sort((a, b) => a.size - b.size)[0];
        resolve({
          name: file.name,
          originalSize: file.size,
          compressedSize: best.size,
          compressedUrl: URL.createObjectURL(best),
          previewUrl: url,
        });
      });
    };
    img.src = url;
  });
}

const PRESETS = [
  { key: 'light', value: 85 },
  { key: 'recommended', value: 65 },
  { key: 'maximum', value: 40 },
];

export default function CompressPage() {
  const t = useTranslations('imageCompress');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '圖片壓縮會損失畫質嗎？', answer: '輕度壓縮幾乎不影響畫質，推薦模式在畫質和大小之間取得最佳平衡。' },
    { question: '支援哪些圖片格式？', answer: '支援 JPG、PNG、WebP 格式，可以批次壓縮多張圖片。' },
    { question: '壓縮後的圖片會保留 EXIF 資訊嗎？', answer: '壓縮過程中 EXIF 資訊會被移除，這也有助於保護隱私。' },
  ] : [
    { question: 'Does image compression reduce quality?', answer: 'Light compression barely affects quality. Recommended mode provides the best balance between quality and size.' },
    { question: 'What image formats are supported?', answer: 'Supports JPG, PNG, and WebP formats with batch compression.' },
    { question: 'Is EXIF data preserved after compression?', answer: 'EXIF data is removed during compression, which also helps protect privacy.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/convert/jpg-to-png', icon: '🔄', name: '格式轉換', desc: '圖片格式轉換', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: '影片壓縮', desc: '壓縮 MP4/WebM/MOV', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI 去背', desc: '智慧去除背景', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  ] : [
    { href: '/convert/jpg-to-png', icon: '🔄', name: 'Format Convert', desc: 'Image format conversion', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: 'Video Compress', desc: 'Compress MP4/WebM/MOV', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI Remove BG', desc: 'Smart background removal', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  ];
  const [originals, setOriginals] = useState<OriginalFile[]>([]);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [quality, setQuality] = useState(65);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-compress all originals when quality changes or new files added
  const recompress = useCallback(async (files: OriginalFile[], q: number) => {
    if (files.length === 0) { setResults([]); return; }
    setProcessing(true);
    const compressed = await Promise.all(files.map((o) => compressOne(o.file, q)));
    setResults(compressed);
    setProcessing(false);
  }, []);

  // When quality changes, recompress existing files
  useEffect(() => {
    if (originals.length > 0) {
      recompress(originals, quality);
    }
  }, [quality, originals, recompress]);

  const handleDroppedFiles = useCallback((files: FileList) => {
    handleFiles(files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    const newOriginals = imageFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setOriginals((prev) => [...prev, ...newOriginals]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const downloadOne = async (r: CompressedResult) => {
    const resp = await fetch(r.compressedUrl);
    const blob = await resp.blob();
    const baseName = r.name.replace(/\.[^.]+$/, '');
    downloadFile(blob, `${baseName}_compressed.${r.name.split('.').pop()}`);
  };

  const downloadAll = async () => {
    if (results.length === 0) return;
    if (results.length === 1) { downloadOne(results[0]); return; }
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const r of results) {
      const resp = await fetch(r.compressedUrl);
      const blob = await resp.blob();
      const baseName = r.name.replace(/\.[^.]+$/, '');
      zip.file(`${baseName}_compressed.${r.name.split('.').pop()}`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    downloadFile(zipBlob, 'compressed_images.zip');
  };

  const clearAll = () => {
    setOriginals([]);
    setResults([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalOriginal = results.reduce((s, r) => s + r.originalSize, 0);
  const totalCompressed = results.reduce((s, r) => s + r.compressedSize, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <FullPageDropZone onFiles={handleDroppedFiles} accept="image/jpeg,image/png,image/webp" />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center">🗜️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Quality presets */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">{t('qualityLabel')}</p>
        <div className="grid grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setQuality(preset.value)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                quality === preset.value
                  ? 'border-pink-400 bg-pink-50'
                  : 'border-pink-100 hover:border-pink-300'
              }`}
            >
              <div className="text-xl mb-1">{preset.key === 'light' ? '🌟' : preset.key === 'recommended' ? '👍' : '🗜️'}</div>
              <p className="text-sm font-medium text-gray-700">{t(`presets.${preset.key}.label`)}</p>
              <p className="text-xs text-gray-400">{t(`presets.${preset.key}.desc`)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 mb-6 ${
          dragOver
            ? 'border-pink-400 bg-pink-50 scale-[1.02]'
            : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-3">{processing ? '⏳' : '📁'}</div>
        <p className="text-gray-600 font-medium mb-1">
          {processing ? t('dropzoneProcessing') : t('dropzone')}
        </p>
        <p className="text-sm text-gray-400">{t('dropzoneHint')}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 p-5 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('imageCount', { count: results.length })}</p>
                <p className="text-sm text-gray-500">
                  {formatSize(totalOriginal)} → {formatSize(totalCompressed)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-500">-{formatPercent(totalOriginal, totalCompressed)}</p>
                <p className="text-xs text-gray-400">{t('spaceSaved')}</p>
              </div>
            </div>
          </div>

          {/* Image list */}
          <div className="space-y-3 mb-6">
            {results.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-pink-50 p-4 flex items-center gap-4">
                <img src={r.previewUrl} alt="" className="w-12 h-12 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{r.name}</p>
                  <p className="text-xs text-gray-400">
                    {formatSize(r.originalSize)} → {formatSize(r.compressedSize)}
                    <span className="text-emerald-500 ml-2">-{formatPercent(r.originalSize, r.compressedSize)}</span>
                  </p>
                </div>
                <button
                  onClick={() => downloadOne(r)}
                  className="px-3 py-1.5 text-sm bg-pink-50 text-pink-500 rounded-xl hover:bg-pink-100 transition-colors"
                >
                  📥
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={downloadAll}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {results.length > 1 ? t('downloadAll') : t('download')}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 border-2 border-pink-200 text-pink-400 rounded-xl font-medium hover:bg-pink-50 transition-all"
            >
              {t('clearAll')}
            </button>
          </div>
        </>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
