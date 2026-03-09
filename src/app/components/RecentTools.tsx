'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getRecentTools, type RecentTool } from '../utils/usage';

// Map tool paths to their icon + translation namespace/key
const TOOL_MAP: Record<string, { icon: string; nameKey: string }> = {
  '/pdf': { icon: '📄', nameKey: 'categories.pdf.name' },
  '/pdf/merge': { icon: '📑', nameKey: 'tools.pdfMerge' },
  '/pdf/split': { icon: '✂️', nameKey: 'tools.pdfSplit' },
  '/pdf/rotate': { icon: '🔄', nameKey: 'tools.pdfRotate' },
  '/pdf/page-numbers': { icon: '🔢', nameKey: 'tools.pdfPageNumbers' },
  '/pdf/compress': { icon: '🗜️', nameKey: 'tools.pdfCompress' },
  '/pdf/to-image': { icon: '🖼️', nameKey: 'tools.pdfToImage' },
  '/pdf/encrypt': { icon: '🔒', nameKey: 'tools.pdfEncrypt' },
  '/pdf/watermark': { icon: '💧', nameKey: 'tools.pdfWatermark' },
  '/image': { icon: '🖼️', nameKey: 'categories.image.name' },
  '/image/compress': { icon: '🗜️', nameKey: 'tools.imageCompress' },
  '/image/watermark': { icon: '💧', nameKey: 'tools.imageWatermark' },
  '/image/gif': { icon: '🎞️', nameKey: 'tools.gifMaker' },
  '/image/annotate': { icon: '✏️', nameKey: 'tools.imageAnnotate' },
  '/image/resize': { icon: '📐', nameKey: 'tools.imageResize' },
  '/convert/png-to-jpg': { icon: '🔄', nameKey: 'tools.pngToJpg' },
  '/convert/jpg-to-png': { icon: '🔄', nameKey: 'tools.jpgToPng' },
  '/convert/png-to-webp': { icon: '🔄', nameKey: 'tools.pngToWebp' },
  '/convert/webp-to-png': { icon: '🔄', nameKey: 'tools.webpToPng' },
  '/convert/jpg-to-webp': { icon: '🔄', nameKey: 'tools.jpgToWebp' },
  '/convert/webp-to-jpg': { icon: '🔄', nameKey: 'tools.webpToJpg' },
  '/convert/heic-to-jpg': { icon: '🔄', nameKey: 'tools.heicToJpg' },
  '/convert/mp4-to-webm': { icon: '🔄', nameKey: 'tools.mp4ToWebm' },
  '/convert/webm-to-mp4': { icon: '🔄', nameKey: 'tools.webmToMp4' },
  '/convert/mp4-to-gif': { icon: '🎞️', nameKey: 'tools.mp4ToGif' },
  '/convert/mov-to-mp4': { icon: '📱', nameKey: 'tools.movToMp4' },
  '/remove-bg': { icon: '🎨', nameKey: 'categories.removeBg.name' },
  '/photo': { icon: '📸', nameKey: 'categories.photo.name' },
  '/video': { icon: '🎬', nameKey: 'categories.video.name' },
  '/video/compress': { icon: '🗜️', nameKey: 'tools.videoCompress' },
  '/qrcode': { icon: '🔗', nameKey: 'tools.qrcode' },
  '/tools': { icon: '🔧', nameKey: 'categories.utility.name' },
  '/tools/color': { icon: '🎨', nameKey: 'tools.colorConverter' },
  '/tools/favicon': { icon: '⭐', nameKey: 'tools.favicon' },
  '/tools/palette': { icon: '🎨', nameKey: 'tools.palette' },
  '/tools/password': { icon: '🔑', nameKey: 'tools.password' },
  '/tools/screen-recorder': { icon: '🎥', nameKey: 'tools.screenRecorder' },
};

export default function RecentTools() {
  const [recent, setRecent] = useState<RecentTool[]>([]);
  const t = useTranslations('home');

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="mb-10 md:mb-14">
      <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>🕐</span> {t('recentTitle')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recent.map((item) => {
          const tool = TOOL_MAP[item.href];
          if (!tool) return null;
          return (
            <Link
              key={item.href}
              href={item.href as '/pdf'}
              className="bg-white rounded-2xl border-2 border-pink-50 hover:border-pink-200 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3"
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-600 truncate">{t(tool.nameKey)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
