'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import { downloadFile } from '@/app/utils/download';

interface ConvertToolProps {
  fromFormat: string;
  toFormat: string;
  fromLabel: string;
  toLabel: string;
  mimeType: string;
  extension: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ConvertTool({ fromFormat, toFormat, fromLabel, toLabel, mimeType, extension }: ConvertToolProps) {
  const t = useTranslations('convertTool');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '圖片轉檔會損失畫質嗎？', answer: '轉為 JPG 時會有輕微壓縮，但品質設定為 92%，肉眼幾乎無法察覺差異。PNG 和 WebP 轉換保持原始畫質。' },
    { question: '支援批次轉換嗎？', answer: '目前支援單張轉換，轉換完成後可以重新選擇檔案繼續轉換。' },
    { question: '轉換後的檔案大小會改變嗎？', answer: '會，不同格式的壓縮方式不同。WebP 通常最小，PNG 保留最多細節但檔案較大。' },
  ] : [
    { question: 'Does image conversion reduce quality?', answer: 'Converting to JPG involves slight compression at 92% quality, nearly imperceptible. PNG and WebP conversions maintain original quality.' },
    { question: 'Is batch conversion supported?', answer: 'Currently supports single file conversion. After completion, you can select another file to convert.' },
    { question: 'Will the file size change after conversion?', answer: 'Yes, different formats use different compression. WebP is typically smallest, PNG preserves most detail but creates larger files.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/video/compress', icon: '🗜️', name: '影片壓縮', desc: '縮小影片檔案大小', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
    { href: '/remove-bg', icon: '✂️', name: '去背工具', desc: '移除圖片背景', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/image/resize', icon: '📐', name: '圖片調整大小', desc: '調整圖片尺寸', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/video/compress', icon: '🗜️', name: 'Video Compress', desc: 'Reduce video file size', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
    { href: '/remove-bg', icon: '✂️', name: 'Remove Background', desc: 'Remove image background', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/image/resize', icon: '📐', name: 'Image Resize', desc: 'Resize image dimensions', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [converting, setConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptTypes = fromFormat === 'jpg' ? '.jpg,.jpeg' : `.${fromFormat}`;

  const handleFile = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setResultSize(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  };

  const convert = async () => {
    if (!file || !previewUrl) return;
    setConverting(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;

      // For JPG output, fill white background (no transparency)
      if (toFormat === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          setResultUrl(URL.createObjectURL(blob));
          setResultSize(blob.size);
        }
        setConverting(false);
      }, mimeType, 0.92);
    };
    img.src = previewUrl;
  };

  const download = async () => {
    if (!resultUrl || !file) return;
    const resp = await fetch(resultUrl);
    const blob = await resp.blob();
    const baseName = file.name.replace(/\.[^.]+$/, '');
    downloadFile(blob, `${baseName}.${extension}`);
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setResultSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔄</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t('title', { from: fromLabel, to: toLabel })}
        </h1>
        <p className="text-[#b89b8a]">
          {t('subtitle')}
        </p>
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? 'border-pink-400 bg-pink-50 scale-[1.02]'
              : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="text-5xl mb-4">📁</div>
          <p className="text-gray-600 font-medium mb-2">{t('dropzone', { format: fromLabel })}</p>
          <p className="text-sm text-gray-400">{t('dropzoneHint')}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptTypes}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-3xl border-2 border-pink-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-sm text-gray-400">{formatSize(file.size)}</p>
              </div>
              {resultSize > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">{t('afterConvert')}</p>
                  <p className="font-medium text-emerald-500">{formatSize(resultSize)}</p>
                </div>
              )}
            </div>
            {previewUrl && (
              <img src={previewUrl} alt={t('preview')} className="max-h-64 mx-auto rounded-xl" />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {!resultUrl ? (
              <button
                onClick={convert}
                disabled={converting}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {converting ? t('converting') : t('convertBtn', { format: toLabel })}
              </button>
            ) : (
              <button
                onClick={download}
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                {t('downloadBtn', { format: toLabel })}
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-3 border-2 border-pink-200 text-pink-400 rounded-xl font-medium hover:bg-pink-50 transition-all"
            >
              {t('reset')}
            </button>
          </div>
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
