'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useFFmpeg } from '@/app/hooks/useFFmpeg';
import { downloadFile } from '@/app/utils/download';
import { captureToolError } from '@/app/utils/sentry';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

type Preset = 'light' | 'recommended' | 'maximum';

const CRF_MAP: Record<Preset, number> = {
  light: 28,
  recommended: 35,
  maximum: 42,
};

export default function VideoCompressPage() {
  const t = useTranslations('videoCompress');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '影片壓縮會損失畫質嗎？', answer: '輕度壓縮幾乎不影響畫質，推薦模式在畫質和檔案大小之間取得平衡，最小檔案模式會明顯降低畫質但大幅縮小檔案。' },
    { question: '支援哪些影片格式？', answer: '支援 MP4、WebM、MOV 格式，壓縮後輸出為 MP4 格式。' },
    { question: '影片會上傳到伺服器嗎？', answer: '不會，所有影片處理都在您的瀏覽器本地完成，檔案不會離開您的電腦，完全保護隱私。' },
  ] : [
    { question: 'Will video compression reduce quality?', answer: 'Light compression barely affects quality. Recommended mode balances quality and file size. Maximum compression significantly reduces quality but greatly shrinks the file.' },
    { question: 'What video formats are supported?', answer: 'Supports MP4, WebM, and MOV formats. Output is in MP4 format.' },
    { question: 'Are videos uploaded to a server?', answer: 'No, all video processing is done locally in your browser. Files never leave your computer, ensuring complete privacy.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/convert/mp4-to-webm', icon: '🔄', name: 'MP4 轉 WebM', desc: '影片格式轉換', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/convert/mp4-to-gif', icon: '🎞️', name: 'MP4 轉 GIF', desc: '影片轉動圖', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/convert/mov-to-mp4', icon: '📱', name: 'MOV 轉 MP4', desc: 'iPhone 影片轉檔', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/convert/mp4-to-webm', icon: '🔄', name: 'MP4 to WebM', desc: 'Video format conversion', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/convert/mp4-to-gif', icon: '🎞️', name: 'MP4 to GIF', desc: 'Video to animated GIF', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/convert/mov-to-mp4', icon: '📱', name: 'MOV to MP4', desc: 'iPhone video convert', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const { ffmpegRef, loaded, loading, progress, loadFFmpeg, setProgress } = useFFmpeg();
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>('recommended');
  const [compressing, setCompressing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDroppedFiles = useCallback((files: FileList) => {
    const f = files[0];
    if (f) handleFile(f);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFile = async (f: File) => {
    setFile(f);
    setResultUrl(null);
    setResultSize(0);
    if (!loaded) await loadFFmpeg();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('video/')) handleFile(f);
  };

  const compress = async () => {
    if (!file || !ffmpegRef.current) return;
    setCompressing(true);
    setProgress(0);
    
    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = 'input' + getExtension(file.name);
      const outputName = 'output.mp4';
      
      const data = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, data);
      
      const crf = CRF_MAP[preset];
      await ffmpeg.exec([
        '-i', inputName,
        '-c:v', 'libx264',
        '-crf', crf.toString(),
        '-preset', 'fast',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        outputName,
      ]);
      
      const result = await ffmpeg.readFile(outputName) as Uint8Array;
      const blob = new Blob([new Uint8Array(result)], { type: 'video/mp4' });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      captureToolError('videoCompress', err);
      alert(t('compressError'));
    }
    setCompressing(false);
  };

  const download = () => {
    if (!resultUrl || !file) return;
    fetch(resultUrl).then(r => r.blob()).then(blob => {
      const baseName = file.name.replace(/\.[^.]+$/, '');
      downloadFile(blob, `${baseName}-compressed.mp4`);
    });
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setResultSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <FullPageDropZone onFiles={handleDroppedFiles} accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov" disabled={!!file} />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-violet-100 w-16 h-16 rounded-2xl flex items-center justify-center">🗜️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Mobile hint */}
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-400">{t('mobileHint')}</p>
      </div>

      {/* FFmpeg loading */}
      {loading && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-xl text-violet-600 text-sm">
            <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            {t('loadingFFmpeg')}
          </div>
          <p className="text-xs text-gray-400 mt-2">{t('loadingHint')}</p>
        </div>
      )}

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dragOver ? 'border-pink-400 bg-pink-50 scale-[1.02]' : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="text-5xl mb-4">🎬</div>
          <p className="text-gray-600 font-medium mb-2">{t('dropzone')}</p>
          <p className="text-sm text-gray-400">{t('dropzoneHint')}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* File info */}
          <div className="bg-white rounded-3xl border-2 border-pink-100 p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-sm text-gray-400">{t('originalSize')}: {formatSize(file.size)}</p>
              </div>
              {resultSize > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">{t('compressedSize')}</p>
                  <p className="font-medium text-emerald-500">{formatSize(resultSize)}</p>
                  <p className="text-xs text-emerald-400">
                    {t('reduced', { percent: ((1 - resultSize / file.size) * 100).toFixed(0) })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Presets */}
          {!resultUrl && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">{t('levelLabel')}</label>
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'recommended', 'maximum'] as Preset[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreset(p)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all ${
                      preset === p
                        ? 'border-pink-400 bg-pink-50'
                        : 'border-pink-100 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">{t(`presets.${p}.label`)}</div>
                    <div className="text-xs text-gray-400 mt-1">{t(`presets.${p}.desc`)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Progress */}
          {compressing && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{t('compressing')}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-pink-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-pink-400 to-rose-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {!resultUrl ? (
              <button
                onClick={compress}
                disabled={compressing || !loaded}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {compressing ? t('compressing') : t('compressBtn')}
              </button>
            ) : (
              <button
                onClick={download}
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                {t('downloadBtn')}
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

function getExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/);
  return match ? match[0] : '.mp4';
}
