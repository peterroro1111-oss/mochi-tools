'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { downloadFile } from '@/app/utils/download';

const TEMPLATES = [
  { key: 'gradient1', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { key: 'gradient2', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { key: 'gradient3', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { key: 'solid', bg: '#1a1a2e' },
];

const WIDTH = 1200;
const HEIGHT = 630;

export default function OgImagePage() {
  const t = useTranslations('ogImage');
  const [title, setTitle] = useState('My Awesome Page');
  const [subtitle, setSubtitle] = useState('A great description here');
  const [template, setTemplate] = useState(0);
  const [customBg, setCustomBg] = useState('#667eea');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Background
    const bg = template < TEMPLATES.length ? TEMPLATES[template].bg : customBg;
    if (bg.startsWith('linear-gradient')) {
      // Parse gradient
      const match = bg.match(/#[0-9a-f]{6}/gi) || ['#667eea', '#764ba2'];
      const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      grad.addColorStop(0, match[0]);
      grad.addColorStop(1, match[1] || match[0]);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bg;
    }
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Title - auto-adjust font size
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let titleSize = 72;
    ctx.font = `bold ${titleSize}px sans-serif`;
    while (ctx.measureText(title).width > WIDTH - 160 && titleSize > 24) {
      titleSize -= 4;
      ctx.font = `bold ${titleSize}px sans-serif`;
    }
    ctx.fillText(title, WIDTH / 2, HEIGHT / 2 - (subtitle ? 30 : 0), WIDTH - 120);

    // Subtitle
    if (subtitle) {
      const subSize = Math.max(20, titleSize * 0.5);
      ctx.font = `${subSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(subtitle, WIDTH / 2, HEIGHT / 2 + titleSize * 0.6, WIDTH - 160);
    }
  }, [title, subtitle, template, customBg]);

  useEffect(() => { draw(); }, [draw]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (blob) downloadFile(blob, 'og-image.png');
    }, 'image/png');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center">🖼️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('titleLabel')}</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-sm text-gray-700" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('subtitleLabel')}</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-sm text-gray-700" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">{t('templateLabel')}</label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => setTemplate(idx)}
                  className={`h-12 rounded-xl border-2 transition-all ${template === idx ? 'border-pink-400 scale-105' : 'border-pink-100'}`}
                  style={{ background: tmpl.bg }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('customBgLabel')}</label>
            <input type="color" value={customBg} onChange={(e) => { setCustomBg(e.target.value); setTemplate(999); }}
              className="w-full h-10 rounded-lg border-2 border-pink-100 cursor-pointer" />
          </div>
          <button onClick={download}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            {t('downloadBtn')}
          </button>
        </div>

        {/* Preview */}
        <div className="md:col-span-2 bg-white rounded-2xl border-2 border-pink-100 p-4">
          <p className="text-sm font-medium text-gray-500 mb-2">{t('previewLabel')} (1200×630)</p>
          <canvas ref={canvasRef} className="w-full rounded-xl border border-gray-100" style={{ aspectRatio: '1200/630' }} />
        </div>
      </div>
    </div>
  );
}
