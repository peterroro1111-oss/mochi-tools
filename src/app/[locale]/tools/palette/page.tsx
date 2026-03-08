'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface ColorInfo {
  hex: string;
  rgb: string;
  count: number;
}

export default function PalettePage() {
  const t = useTranslations('palette');
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const extractColors = useCallback((img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const maxSize = 200; // Downsample for performance
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // K-means clustering
    const pixels: [number, number, number][] = [];
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 128) { // Skip transparent
        pixels.push([data[i], data[i + 1], data[i + 2]]);
      }
    }

    const k = 8;
    const result = kMeans(pixels, k);
    const sorted = result.sort((a, b) => b.count - a.count);

    setColors(sorted.map(c => ({
      hex: '#' + [c.center[0], c.center[1], c.center[2]].map(v => Math.round(v).toString(16).padStart(2, '0')).join(''),
      rgb: `rgb(${Math.round(c.center[0])}, ${Math.round(c.center[1])}, ${Math.round(c.center[2])})`,
      count: c.count,
    })));
  }, []);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => extractColors(img);
    img.src = url;
  }, [extractColors]);

  const copyColor = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(''), 2000);
  };

  const copyAll = () => {
    const text = colors.map(c => `${c.hex} | ${c.rgb}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied('all');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center">🎨</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
        {!imageUrl ? (
          <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <p className="text-gray-500">{t('uploadBtn')}</p>
          </div>
        ) : (
          <div className="text-center">
            <img src={imageUrl} alt="" className="max-h-48 mx-auto rounded-xl border-2 border-pink-100 mb-4" />
            <button onClick={() => { setImageUrl(''); setColors([]); }}
              className="text-sm text-pink-500 hover:text-pink-700">
              {t('resetBtn')}
            </button>
          </div>
        )}
      </div>

      {colors.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium text-gray-700">{t('extractedColors')}</p>
            <button onClick={copyAll} className="text-xs text-pink-500 hover:text-pink-700">
              {copied === 'all' ? t('copied') : t('copyAll')}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((c, idx) => (
              <div key={idx} className="text-center cursor-pointer group" onClick={() => copyColor(c.hex)}>
                <div className="w-full h-20 rounded-xl border-2 border-pink-100 mb-2 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: c.hex }} />
                <p className="text-xs font-mono text-gray-700 font-medium">{c.hex}</p>
                <p className="text-[10px] text-gray-400">{c.rgb}</p>
                {copied === c.hex && <p className="text-[10px] text-pink-500">{t('copied')}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// K-means clustering
function kMeans(pixels: [number, number, number][], k: number) {
  if (pixels.length === 0) return [];

  // Initialize centers randomly
  const centers: [number, number, number][] = [];
  const used = new Set<number>();
  for (let i = 0; i < k && i < pixels.length; i++) {
    let idx: number;
    do { idx = Math.floor(Math.random() * pixels.length); } while (used.has(idx));
    used.add(idx);
    centers.push([...pixels[idx]]);
  }

  const assignments = new Array(pixels.length).fill(0);

  for (let iter = 0; iter < 20; iter++) {
    // Assign pixels to nearest center
    for (let i = 0; i < pixels.length; i++) {
      let best = 0, bestDist = Infinity;
      for (let j = 0; j < centers.length; j++) {
        const d = dist(pixels[i], centers[j]);
        if (d < bestDist) { bestDist = d; best = j; }
      }
      assignments[i] = best;
    }

    // Update centers
    const sums = centers.map(() => [0, 0, 0]);
    const counts = new Array(centers.length).fill(0);
    for (let i = 0; i < pixels.length; i++) {
      const c = assignments[i];
      sums[c][0] += pixels[i][0];
      sums[c][1] += pixels[i][1];
      sums[c][2] += pixels[i][2];
      counts[c]++;
    }
    for (let j = 0; j < centers.length; j++) {
      if (counts[j] > 0) {
        centers[j] = [sums[j][0] / counts[j], sums[j][1] / counts[j], sums[j][2] / counts[j]];
      }
    }
  }

  // Count pixels per cluster
  const counts = new Array(centers.length).fill(0);
  for (const a of assignments) counts[a]++;

  return centers.map((center, i) => ({ center, count: counts[i] })).filter(c => c.count > 0);
}

function dist(a: [number, number, number], b: [number, number, number]) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}
