import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI ID Photo — Mochi Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 50%, #fef9f4 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>📸</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#9f1239' }}>
          {isZh ? 'AI 證件照' : 'AI ID Photo'}
        </div>
        <div style={{ fontSize: 24, color: '#b89b8a', marginTop: 12 }}>
          {isZh ? '上傳照片，自動去背並生成標準證件照' : 'Upload photo, auto-generate standard ID photo'}
        </div>
        <div style={{ fontSize: 20, color: '#f48fb1', marginTop: 24, fontWeight: 700 }}>Mochi Tools 🍡</div>
      </div>
    ),
    { ...size }
  );
}
