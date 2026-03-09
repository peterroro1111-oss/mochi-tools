'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { downloadFile } from '@/app/utils/download';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

interface TextLayer {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

export default function ImageAnnotatePage() {
  const t = useTranslations('imageAnnotate');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '可以添加多個文字標註嗎？', answer: '可以，支援添加多個文字圖層，每個可以獨立設定位置、字型大小和顏色。' },
    { question: '文字位置可以調整嗎？', answer: '可以，點擊圖片放置文字後，可以拖曳調整位置。' },
    { question: '標註後可以下載什麼格式？', answer: '可以下載 PNG 格式，保留完整畫質。' },
  ] : [
    { question: 'Can multiple text annotations be added?', answer: 'Yes, supports multiple text layers, each with independent position, font size, and color settings.' },
    { question: 'Can text position be adjusted?', answer: 'Yes, after placing text by clicking on the image, you can drag to adjust position.' },
    { question: 'What format can annotated images be downloaded in?', answer: 'Downloaded as PNG format to preserve full quality.' },
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
  const [layers, setLayers] = useState<TextLayer[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#ff0000');
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = url;
    setLayers([]);
  }, []);

  const addText = useCallback(() => {
    if (!currentText || !image) return;
    setLayers(prev => [...prev, {
      id: nextId.current++,
      text: currentText,
      x: 50,
      y: 50 + prev.length * 40,
      fontSize,
      color,
    }]);
    setCurrentText('');
  }, [currentText, fontSize, color, image]);

  const removeLayer = (id: number) => {
    setLayers(prev => prev.filter(l => l.id !== id));
  };

  // Render canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    // Scale canvas to fit container but keep original aspect
    const maxW = containerRef.current?.clientWidth || 600;
    const scale = Math.min(1, maxW / image.width);
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (const layer of layers) {
      ctx.font = `${layer.fontSize * scale}px sans-serif`;
      ctx.fillStyle = layer.color;
      ctx.fillText(layer.text, layer.x * scale, layer.y * scale);
    }
  }, [image, layers]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !image || !currentText) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const maxW = containerRef.current?.clientWidth || 600;
    const scale = Math.min(1, maxW / image.width);
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    setLayers(prev => [...prev, {
      id: nextId.current++,
      text: currentText,
      x, y,
      fontSize,
      color,
    }]);
    setCurrentText('');
  }, [currentText, fontSize, color, image]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !image) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const maxW = containerRef.current?.clientWidth || 600;
    const scale = Math.min(1, maxW / image.width);
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;

    // Find clicked layer (reverse order for top layer priority)
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      if (mx >= l.x && mx <= l.x + l.text.length * l.fontSize * 0.6 && my >= l.y - l.fontSize && my <= l.y) {
        setDragging(l.id);
        setDragOffset({ x: mx - l.x, y: my - l.y });
        return;
      }
    }
    // If not dragging, place text
    if (currentText) handleCanvasClick(e);
  }, [layers, currentText, image, handleCanvasClick]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging === null || !canvasRef.current || !image) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const maxW = containerRef.current?.clientWidth || 600;
    const scale = Math.min(1, maxW / image.width);
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;
    setLayers(prev => prev.map(l => l.id === dragging ? { ...l, x: mx - dragOffset.x, y: my - dragOffset.y } : l));
  }, [dragging, dragOffset, image]);

  const handleMouseUp = useCallback(() => setDragging(null), []);

  const download = useCallback(() => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0);
    for (const layer of layers) {
      ctx.font = `${layer.fontSize}px sans-serif`;
      ctx.fillStyle = layer.color;
      ctx.fillText(layer.text, layer.x, layer.y);
    }
    canvas.toBlob(blob => {
      if (blob) downloadFile(blob, 'annotated.png');
    }, 'image/png');
  }, [image, layers]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center">✏️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {!image ? (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
          <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <p className="text-gray-500">{t('uploadBtn')}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('textLabel')}</label>
                <input
                  type="text"
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  placeholder={t('textPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-sm text-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fontSizeLabel')}</label>
                <input type="number" value={fontSize} onChange={(e) => setFontSize(+e.target.value)} min={10} max={200}
                  className="w-20 px-3 py-2.5 rounded-xl border-2 border-pink-100 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('colorLabel')}</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer" />
              </div>
              <button onClick={addText} className="px-4 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                {t('addBtn')}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">{t('clickHint')}</p>
          </div>

          {/* Layers list */}
          {layers.length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-pink-100 p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">{t('layersLabel')}</p>
              <div className="space-y-1">
                {layers.map(l => (
                  <div key={l.id} className="flex items-center justify-between bg-pink-50 rounded-lg px-3 py-2 text-sm">
                    <span style={{ color: l.color }}>{l.text}</span>
                    <button onClick={() => removeLayer(l.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Canvas */}
          <div ref={containerRef} className="bg-white rounded-2xl border-2 border-pink-100 p-4 mb-4">
            <canvas
              ref={canvasRef}
              className="max-w-full rounded-xl cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          {/* Download */}
          <div className="flex justify-center gap-3">
            <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all">
              {t('downloadBtn')}
            </button>
            <button onClick={() => { setImage(null); setLayers([]); }}
              className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-500 rounded-xl font-medium hover:bg-pink-50 transition-all">
              {t('resetBtn')}
            </button>
          </div>
        </>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
