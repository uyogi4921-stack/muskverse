import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MUSKVERSE — The Empire Timeline. 1971 → 2026.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
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
          background:
            'radial-gradient(ellipse 80% 60% at 50% 75%, #0c2d4d 0%, #050505 60%)',
          color: '#f4f4f5',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Star dots */}
        {[
          [8, 12], [22, 28], [38, 9], [55, 20], [71, 14], [88, 26],
          [15, 55], [85, 58], [6, 80], [93, 82], [45, 6], [64, 33],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              borderRadius: 999,
              background: '#cbd5e1',
              opacity: 0.8,
            }}
          />
        ))}

        <div
          style={{
            fontSize: 28,
            letterSpacing: 14,
            color: '#38bdf8',
            marginBottom: 18,
          }}
        >
          1971 → 2026 · ONE EMPIRE
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: -2,
            background: 'linear-gradient(180deg, #ffffff 30%, #64748b 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          MUSKVERSE
        </div>
        <div style={{ fontSize: 34, color: '#8b8b96', marginTop: 14 }}>
          The Empire Timeline
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginTop: 36,
            fontSize: 30,
          }}
        >
          <span style={{ color: '#4ade80' }}>$500 game at 12</span>
          <span style={{ color: '#8b8b96' }}>→</span>
          <span style={{ color: '#fbbf24' }}>first trillionaire</span>
        </div>
      </div>
    ),
    size
  );
}
