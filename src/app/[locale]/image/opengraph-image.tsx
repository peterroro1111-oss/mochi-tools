import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Image Tools — Mochi Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fef9f4 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🖼️</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#78350f' }}>
          {isZh ? '圖片工具' : 'Image Tools'}
        </div>
        <div style={{ fontSize: 24, color: '#b89b8a', marginTop: 12 }}>
          {isZh ? '壓縮、轉檔、浮水印、GIF 製作' : 'Compress, Convert, Watermark, GIF Maker'}
        </div>
        <div style={{ fontSize: 20, color: '#f48fb1', marginTop: 24, fontWeight: 700 }}>Mochi Tools 🍡</div>
      </div>
    ),
    { ...size }
  );
}
