'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface ConvertedFile {
  name: string;
  originalSize: number;
  blob: Blob;
  url: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function HeicToJpgPage() {
  const t = useTranslations('heicToJpg');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState(0.85);
  const [converting, setConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    const heicFiles = Array.from(fileList).filter((f) => {
      const name = f.name.toLowerCase();
      const type = f.type.toLowerCase();
      return name.endsWith('.heic') || name.endsWith('.heif') || type === 'image/heic' || type === 'image/heif' || type === '';
    });
    if (heicFiles.length > 0) {
      setFiles((prev) => [...prev, ...heicFiles]);
      setResults([]);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const convert = async () => {
    if (files.length === 0) return;
    setConverting(true);
    setError('');
    try {
      const heic2any = (await import('heic2any')).default;
      const converted: ConvertedFile[] = [];
      for (const file of files) {
        const blob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality,
        });
        const resultBlob = Array.isArray(blob) ? blob[0] : blob;
        converted.push({
          name: file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          originalSize: file.size,
          blob: resultBlob,
          url: URL.createObjectURL(resultBlob),
        });
      }
      setResults(converted);
    } catch {
      setError(t('convertError'));
    }
    setConverting(false);
  };

  const downloadOne = (r: ConvertedFile) => {
    const a = document.createElement('a');
    a.href = r.url;
    a.download = r.name;
    a.click();
  };

  const downloadAll = async () => {
    if (results.length === 0) return;
    if (results.length === 1) { downloadOne(results[0]); return; }
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const r of results) {
      zip.file(r.name, r.blob);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = 'heic-to-jpg.zip';
    a.click();
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center">📱</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Mobile hint */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700 md:hidden">
        {t('mobileHint')}
      </div>

      {/* Quality slider */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {t('qualityLabel')}: {Math.round(quality * 100)}%
        </label>
        <input
          type="range"
          min={50}
          max={100}
          step={5}
          value={quality * 100}
          onChange={(e) => setQuality(Number(e.target.value) / 100)}
          className="w-full accent-pink-400"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>50%</span>
          <span>100%</span>
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
        <div className="text-4xl mb-3">📁</div>
        <p className="text-gray-600 font-medium mb-1">{t('dropzone')}</p>
        <p className="text-sm text-gray-400">{t('dropzoneHint')}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".heic,.heif,image/heic,image/heif,image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* File list & actions */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border-2 border-pink-100 p-4">
            <p className="text-sm text-gray-500 mb-3">{t('fileCount', { count: files.length })}</p>
            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-pink-50/50">
                  <span className="text-lg">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
                  </div>
                  {results[i] && (
                    <button
                      onClick={() => downloadOne(results[i])}
                      className="px-3 py-1.5 text-sm bg-pink-50 text-pink-500 rounded-xl hover:bg-pink-100 transition-colors"
                    >
                      📥
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</div>
          )}

          <div className="flex gap-3 justify-center">
            {results.length === 0 ? (
              <button
                onClick={convert}
                disabled={converting}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {converting ? t('converting') : t('convertBtn')}
              </button>
            ) : (
              <button
                onClick={downloadAll}
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                {results.length > 1 ? t('downloadAll') : t('downloadBtn')}
              </button>
            )}
            <button
              onClick={clearAll}
              className="px-6 py-3 border-2 border-pink-200 text-pink-400 rounded-xl font-medium hover:bg-pink-50 transition-all"
            >
              {t('clearAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
