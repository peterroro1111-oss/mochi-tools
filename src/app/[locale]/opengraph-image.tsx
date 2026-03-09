import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mochi Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fef9f4 0%, #fff0f3 50%, #fde4eb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🍡</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f48fb1, #ec407a)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Mochi Tools
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#b89b8a',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          {isZh
            ? '免費線上工具 — PDF、圖片、影片，全在瀏覽器完成'
            : 'Free Online Tools — PDF, Image, Video, all in your browser'}
        </div>
      </div>
    ),
    { ...size }
  );
}
