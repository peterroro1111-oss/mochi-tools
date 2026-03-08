'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

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

  const download = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    const baseName = file.name.replace(/\.[^.]+$/, '');
    a.download = `${baseName}.${extension}`;
    a.click();
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
    </div>
  );
}
