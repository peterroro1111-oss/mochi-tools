'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';

interface ColorState {
  hex: string;
  r: number; g: number; b: number;
  h: number; s: number; l: number;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [Math.round(hue2rgb(p, q, h + 1/3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1/3) * 255)];
}

export default function ColorConverterPage() {
  const t = useTranslations('colorConverter');
  const locale = useLocale();
  const faqs = locale === 'zh' ? [
    { question: '支援哪些顏色格式？', answer: '支援 HEX、RGB、HSL 三種常用顏色格式的即時互轉。' },
    { question: '可以直接複製顏色值嗎？', answer: '可以，每種格式旁邊都有複製按鈕，一鍵複製到剪貼簿。' },
    { question: '輸入格式有什麼要求？', answer: 'HEX 格式輸入 #rrggbb，RGB 輸入 rgb(r,g,b)，HSL 輸入 hsl(h,s%,l%)，會自動識別並轉換。' },
  ] : [
    { question: 'What color formats are supported?', answer: 'Supports real-time conversion between HEX, RGB, and HSL color formats.' },
    { question: 'Can color values be copied directly?', answer: 'Yes, each format has a copy button for one-click clipboard copying.' },
    { question: 'What input format is required?', answer: 'HEX: #rrggbb, RGB: rgb(r,g,b), HSL: hsl(h,s%,l%). Auto-detected and converted.' },
  ];
  const relatedToolsList = locale === 'zh' ? [
    { href: '/tools/palette', icon: '🎨', name: '色票提取', desc: '從圖片提取配色', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
    { href: '/tools/favicon', icon: '⭐', name: 'Favicon 產生器', desc: '製作網站圖示', gradient: 'from-yellow-50 to-amber-50', border: 'border-yellow-200 hover:border-yellow-400' },
    { href: '/tools/qrcode', icon: '📱', name: 'QR Code 產生器', desc: '產生 QR Code', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/image/compress', icon: '🗜️', name: '圖片壓縮', desc: '壓縮 JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  ] : [
    { href: '/tools/palette', icon: '🎨', name: 'Palette Extractor', desc: 'Extract colors from images', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
    { href: '/tools/favicon', icon: '⭐', name: 'Favicon Generator', desc: 'Create website icons', gradient: 'from-yellow-50 to-amber-50', border: 'border-yellow-200 hover:border-yellow-400' },
    { href: '/tools/qrcode', icon: '📱', name: 'QR Code Generator', desc: 'Generate QR codes', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
    { href: '/image/compress', icon: '🗜️', name: 'Image Compress', desc: 'Compress JPG/PNG/WebP', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  ];
  const [color, setColor] = useState<ColorState>({ hex: '#f8a4b8', r: 248, g: 164, b: 184, h: 346, s: 88, l: 81 });
  const [copied, setCopied] = useState('');

  const updateFromHex = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const [h, s, l] = rgbToHsl(...rgb);
    setColor({ hex, r: rgb[0], g: rgb[1], b: rgb[2], h, s, l });
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
    const [h, s, l] = rgbToHsl(r, g, b);
    setColor({ hex, r, g, b, h, s, l });
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const [r, g, b] = hslToRgb(h, s, l);
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    setColor({ hex, r, g, b, h, s, l });
  }, []);

  const handleInput = useCallback((value: string) => {
    const v = value.trim();
    // HEX
    if (/^#?[0-9a-f]{6}$/i.test(v)) {
      updateFromHex(v.startsWith('#') ? v : '#' + v);
    }
    // RGB
    const rgbMatch = v.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (rgbMatch) {
      updateFromRgb(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3]);
    }
    // HSL
    const hslMatch = v.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);
    if (hslMatch) {
      updateFromHsl(+hslMatch[1], +hslMatch[2], +hslMatch[3]);
    }
  }, [updateFromHex, updateFromRgb, updateFromHsl]);

  const copyValue = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const formats = [
    { key: 'hex', label: 'HEX', value: color.hex },
    { key: 'rgb', label: 'RGB', value: `rgb(${color.r}, ${color.g}, ${color.b})` },
    { key: 'hsl', label: 'HSL', value: `hsl(${color.h}, ${color.s}%, ${color.l}%)` },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center">🎨</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Color preview */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl border-2 border-pink-100 shadow-inner" style={{ backgroundColor: color.hex }} />
          <div className="flex-1">
            <input
              type="color"
              value={color.hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full h-12 rounded-xl cursor-pointer border-2 border-pink-100"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('inputLabel')}</label>
          <input
            type="text"
            placeholder={t('inputPlaceholder')}
            onChange={(e) => handleInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-sm font-mono text-gray-700"
          />
        </div>
      </div>

      {/* Formats */}
      <div className="space-y-3">
        {formats.map((f) => (
          <div key={f.key} className="bg-white rounded-2xl border-2 border-pink-100 p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">{f.label}</span>
              <p className="text-lg font-mono text-gray-700">{f.value}</p>
            </div>
            <button
              onClick={() => copyValue(f.value, f.key)}
              className="px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all"
            >
              {copied === f.key ? t('copied') : t('copyBtn')}
            </button>
          </div>
        ))}
      </div>

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
