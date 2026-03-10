'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { recordToolUsage } from '../utils/usage';

// Only track actual tool pages, not index pages
const TRACKABLE_PREFIXES = [
  '/pdf/merge', '/pdf/split', '/pdf/rotate', '/pdf/page-numbers',
  '/pdf/compress', '/pdf/to-image', '/pdf/encrypt', '/pdf/watermark',
  '/image/compress', '/image/watermark', '/image/gif', '/image/annotate',
  '/convert/', '/remove-bg', '/photo', '/video/compress', '/qrcode',
  '/tools/color', '/tools/favicon', '/tools/palette',
];

export default function ToolTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const isToolPage = TRACKABLE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
    if (isToolPage) {
      recordToolUsage(pathname);
    }
  }, [pathname]);

  return null;
}
