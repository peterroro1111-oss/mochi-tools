'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodePage() {
  const t = useTranslations('qrcode');
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  const download = useCallback(() => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'qrcode.png';
    a.click();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔗</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('inputLabel')}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('inputPlaceholder')}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-gray-700"
          />
        </div>

        {/* Size slider */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {t('sizeLabel')}: {size}px
          </label>
          <input
            type="range"
            min={128}
            max={512}
            step={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-pink-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fgColorLabel')}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{fgColor}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('bgColorLabel')}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{bgColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-6 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4 text-center">{t('preview')}</p>
        <div ref={qrRef} className="flex justify-center">
          {text ? (
            <QRCodeCanvas
              value={text}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level="M"
              includeMargin
              style={{ borderRadius: '12px' }}
            />
          ) : (
            <div
              className="flex items-center justify-center border-2 border-dashed border-pink-200 rounded-xl text-gray-400 text-sm"
              style={{ width: size, height: size }}
            >
              {t('emptyHint')}
            </div>
          )}
        </div>
      </div>

      {/* Download */}
      {text && (
        <div className="flex justify-center">
          <button
            onClick={download}
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            {t('downloadBtn')}
          </button>
        </div>
      )}
    </div>
  );
}
