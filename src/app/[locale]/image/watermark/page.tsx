'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import FullPageDropZone from '@/app/components/FullPageDropZone';

type Position = 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'tiled';

const GRID_POSITIONS: Position[] = ['topLeft', 'topCenter', 'topRight', 'centerLeft', 'center', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight'];

export default function WatermarkPage() {
  const t = useTranslations('watermark');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '浮水印可以調整透明度嗎？', answer: '可以，支援 0-100% 透明度調整，建議設定 30-50% 以達到最佳效果。' },
    { question: '支援哪些浮水印位置？', answer: '支援 9 個固定位置（四角、四邊中點、正中）及平鋪模式，共 10 種選擇。' },
    { question: '可以同時下載 PNG 和 JPG 嗎？', answer: '可以分別下載 PNG 和 JPG 格式，PNG 保留透明度，JPG 檔案更小。' },
  ] : [
    { question: 'Can watermark transparency be adjusted?', answer: 'Yes, supports 0-100% transparency. We recommend 30-50% for best results.' },
    { question: 'What watermark positions are available?', answer: 'Supports 9 fixed positions (corners, edge midpoints, center) plus a tiled mode, 10 options total.' },
    { question: 'Can I download both PNG and JPG?', answer: 'Yes, you can download in both PNG and JPG formats. PNG preserves transparency, JPG has smaller file size.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/convert/jpg-to-png', icon: '🔄', name: '格式轉換', desc: '圖片格式轉換', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: '影片壓縮', desc: '壓縮 MP4/WebM/MOV', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI 去背', desc: '智慧去除背景', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ] : [
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
    { href: '/convert/jpg-to-png', icon: '🔄', name: 'Format Convert', desc: 'Image format conversion', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/video/compress', icon: '🎬', name: 'Video Compress', desc: 'Compress MP4/WebM/MOV', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { href: '/remove-bg', icon: '✂️', name: 'AI Remove BG', desc: 'Smart background removal', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  ];
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [text, setText] = useState('Mochi Tools');
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState<Position>('bottomRight');
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDroppedFiles = useCallback((files: FileList) => {
    const f = files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) return;
    setImageFile(f);
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const drawWatermark = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(image, 0, 0);

    // Parse color to rgb
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textBaseline = 'middle';

    if (!text) return;

    if (position === 'tiled') {
      ctx.textAlign = 'center';
      const angle = -Math.PI / 6;
      ctx.save();
      ctx.rotate(angle);
      const stepX = fontSize * 10;
      const stepY = fontSize * 4;
      const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
      for (let y = -diagonal; y < diagonal * 2; y += stepY) {
        for (let x = -diagonal; x < diagonal * 2; x += stepX) {
          ctx.fillText(text, x, y);
        }
      }
      ctx.restore();
    } else {
      const padding = fontSize;
      let x = 0;
      let y = 0;

      switch (position) {
        case 'topLeft':     ctx.textAlign = 'left';   x = padding;                  y = padding;                    break;
        case 'topCenter':   ctx.textAlign = 'center'; x = canvas.width / 2;         y = padding;                    break;
        case 'topRight':    ctx.textAlign = 'right';  x = canvas.width - padding;   y = padding;                    break;
        case 'centerLeft':  ctx.textAlign = 'left';   x = padding;                  y = canvas.height / 2;          break;
        case 'center':      ctx.textAlign = 'center'; x = canvas.width / 2;         y = canvas.height / 2;          break;
        case 'centerRight': ctx.textAlign = 'right';  x = canvas.width - padding;   y = canvas.height / 2;          break;
        case 'bottomLeft':  ctx.textAlign = 'left';   x = padding;                  y = canvas.height - padding;    break;
        case 'bottomCenter':ctx.textAlign = 'center'; x = canvas.width / 2;         y = canvas.height - padding;    break;
        case 'bottomRight': ctx.textAlign = 'right';  x = canvas.width - padding;   y = canvas.height - padding;    break;
      }

      // Draw text shadow for readability
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.3})`;
      ctx.lineWidth = fontSize / 8;
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }, [image, text, fontSize, color, opacity, position]);

  useEffect(() => {
    drawWatermark();
  }, [drawWatermark]);

  const download = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const baseName = imageFile?.name.replace(/\.[^.]+$/, '') || 'watermarked';
      downloadFile(blob, `${baseName}_watermark.${format === 'jpeg' ? 'jpg' : 'png'}`);
    }, `image/${format}`, format === 'jpeg' ? 0.92 : undefined);
  };

  const reset = () => {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <FullPageDropZone onFiles={handleDroppedFiles} accept="image/*" disabled={!!imageFile} />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-sky-100 w-16 h-16 rounded-2xl flex items-center justify-center">💧</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {!image ? (
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
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-gray-600 font-medium mb-2">{t('uploadDropzone')}</p>
          <p className="text-sm text-gray-400">{t('uploadHint')}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 space-y-4">
            {/* Text */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('textLabel')}</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('textPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-gray-700"
              />
            </div>

            {/* Font size + Color */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {t('fontSizeLabel')}: {fontSize}px
                </label>
                <input
                  type="range"
                  min={12}
                  max={120}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-pink-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('colorLabel')}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{color}</span>
                </div>
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                {t('opacityLabel')}: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={opacity * 100}
                onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                className="w-full accent-pink-400"
              />
            </div>

            {/* Position */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('positionLabel')}</label>
              {/* 3x3 grid */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mb-2">
                {GRID_POSITIONS.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`p-2 rounded-lg text-xs border-2 transition-all ${
                      position === pos
                        ? 'border-pink-400 bg-pink-50 text-pink-600 font-medium'
                        : 'border-pink-100 hover:border-pink-300 text-gray-500'
                    }`}
                  >
                    {t(`positions.${pos}`)}
                  </button>
                ))}
              </div>
              {/* Tiled option */}
              <button
                onClick={() => setPosition('tiled')}
                className={`w-full max-w-[240px] p-2 rounded-lg text-xs border-2 transition-all ${
                  position === 'tiled'
                    ? 'border-pink-400 bg-pink-50 text-pink-600 font-medium'
                    : 'border-pink-100 hover:border-pink-300 text-gray-500'
                }`}
              >
                {t('positions.tiled')}
              </button>
            </div>
          </div>

          {/* Canvas preview */}
          <div className="bg-white rounded-2xl border-2 border-pink-100 p-4">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">{t('preview')}</p>
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[400px] mx-auto rounded-xl object-contain"
              style={{ display: 'block' }}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => download('png')}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {t('downloadPng')}
            </button>
            <button
              onClick={() => download('jpeg')}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {t('downloadJpg')}
            </button>
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
