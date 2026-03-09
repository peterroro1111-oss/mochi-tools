import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Utility Tools — Mochi Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 50%, #fef9f4 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🔧</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#115e59' }}>
          {isZh ? '實用工具' : 'Utility Tools'}
        </div>
        <div style={{ fontSize: 24, color: '#b89b8a', marginTop: 12 }}>
          {isZh ? '顏色轉換、Favicon、色彩擷取、QR Code' : 'Color Converter, Favicon, Palette, QR Code'}
        </div>
        <div style={{ fontSize: 20, color: '#f48fb1', marginTop: 24, fontWeight: 700 }}>Mochi Tools 🍡</div>
      </div>
    ),
    { ...size }
  );
}
