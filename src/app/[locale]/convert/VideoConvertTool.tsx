'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useFFmpeg } from '@/app/hooks/useFFmpeg';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

interface VideoConvertToolProps {
  fromLabel: string;
  toLabel: string;
  fromAccept: string;
  outputMime: string;
  outputExt: string;
  ffmpegArgs: string[];
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function VideoConvertTool({
  fromLabel, toLabel, fromAccept, outputMime, outputExt, ffmpegArgs,
}: VideoConvertToolProps) {
  const t = useTranslations('videoConvertTool');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '影片轉檔會損失畫質嗎？', answer: '轉檔過程會重新編碼影片，可能會有極小的畫質變化，但一般情況下幾乎看不出差異。' },
    { question: '支援多大的影片檔案？', answer: '由於在瀏覽器中處理，建議影片大小在 200MB 以內，過大的檔案可能導致記憶體不足。' },
    { question: '轉檔需要多長時間？', answer: '取決於影片大小和您的電腦性能，一般幾十秒到幾分鐘不等。電腦端處理速度比手機快很多。' },
  ] : [
    { question: 'Will video conversion reduce quality?', answer: 'Video conversion involves re-encoding which may cause minimal quality changes, but the difference is generally imperceptible.' },
    { question: 'What is the maximum file size supported?', answer: 'Since processing is done in the browser, we recommend videos under 200MB. Larger files may cause memory issues.' },
    { question: 'How long does conversion take?', answer: 'It depends on the video size and your device performance. Typically a few seconds to a few minutes. Desktop processing is much faster than mobile.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/video/compress', icon: '🗜️', name: '影片壓縮', desc: '縮小影片檔案大小', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/convert', icon: '🔄', name: '格式轉換', desc: '圖片格式互轉', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/image/gif', icon: '🎞️', name: 'GIF 製作', desc: '圖片合成 GIF', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/video/compress', icon: '🗜️', name: 'Video Compress', desc: 'Reduce video file size', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/convert', icon: '🔄', name: 'Format Convert', desc: 'Image format conversion', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/image/gif', icon: '🎞️', name: 'GIF Maker', desc: 'Create GIF from images', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const { ffmpegRef, loaded, loading, progress, loadFFmpeg, setProgress } = useFFmpeg();
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (f) handleFile(f);
  };

  const convert = async () => {
    if (!file || !ffmpegRef.current) return;
    setConverting(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputExt = file.name.match(/\.[^.]+$/)?.[0] || '.mp4';
      const inputName = 'input' + inputExt;
      const outputName = 'output.' + outputExt;

      const data = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(inputName, data);

      await ffmpeg.exec(['-i', inputName, ...ffmpegArgs, outputName]);

      const result = await ffmpeg.readFile(outputName) as Uint8Array;
      const blob = new Blob([new Uint8Array(result)], { type: outputMime });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      console.error(err);
      alert(t('convertError'));
    }
    setConverting(false);
  };

  const download = () => {
    if (!resultUrl || !file) return;
    fetch(resultUrl).then(r => r.blob()).then(blob => {
      const baseName = file.name.replace(/\.[^.]+$/, '');
      downloadFile(blob, `${baseName}.${outputExt}`);
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔄</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t('title', { from: fromLabel, to: toLabel })}
        </h1>
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
          <p className="text-gray-600 font-medium mb-2">{t('dropzone', { format: fromLabel })}</p>
          <p className="text-sm text-gray-400">{t('dropzoneHint')}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={fromAccept}
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
                  <p className="text-sm text-gray-400">{t('convertedSize')}</p>
                  <p className="font-medium text-emerald-500">{formatSize(resultSize)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          {converting && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{t('converting')}</span>
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
                onClick={convert}
                disabled={converting || !loaded}
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
