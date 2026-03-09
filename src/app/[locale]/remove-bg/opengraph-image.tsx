import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Background Removal — Mochi Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fef9f4 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🎨</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#5b21b6' }}>
          {isZh ? 'AI 去背' : 'AI Remove Background'}
        </div>
        <div style={{ fontSize: 24, color: '#b89b8a', marginTop: 12 }}>
          {isZh ? '一鍵移除圖片背景，輸出透明 PNG' : 'One-click background removal, transparent PNG'}
        </div>
        <div style={{ fontSize: 20, color: '#f48fb1', marginTop: 24, fontWeight: 700 }}>Mochi Tools 🍡</div>
      </div>
    ),
    { ...size }
  );
}
