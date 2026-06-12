import type { Company } from '@/data/companies';

/**
 * Lightweight animated SVG fallbacks rendered on mobile instead of
 * WebGL canvases. Pure SMIL/CSS animation — no JS per frame.
 */
export default function MobileVisual({
  scene,
  accent,
}: {
  scene: Company['scene'];
  accent: string;
}) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      {scene === 'origins' && <PixelShipSvg accent={accent} />}
      {scene === 'zip2' && <GlobeSvg accent={accent} />}
      {scene === 'paypal' && <CoinSvg accent={accent} />}
      {scene === 'spacex' && <RocketSvg accent={accent} />}
      {scene === 'tesla' && <CarSvg accent={accent} />}
      {scene === 'neuralink' && <BrainSvg accent={accent} />}
      {scene === 'boring' && <TunnelSvg accent={accent} />}
      {scene === 'x' && <XSvg accent={accent} />}
      {scene === 'xai' && <CoreSvg accent={accent} />}
    </div>
  );
}

const base = 'h-56 w-56 sm:h-64 sm:w-64';

function PixelShipSvg({ accent }: { accent: string }) {
  // Pixel grid mirrors the 3D voxel Blastar ship
  const cells: [number, number][] = [
    [4, 0],
    [3, 1], [4, 1], [5, 1],
    [3, 2], [4, 2], [5, 2],
    [0, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [8, 3],
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
    [0, 5], [1, 5], [3, 5], [4, 5], [5, 5], [7, 5], [8, 5],
    [0, 6], [8, 6],
  ];
  const size = 16;
  return (
    <svg viewBox="0 0 200 200" className={`${base} animate-drift`}>
      {cells.map(([x, y], i) => (
        <rect
          key={i}
          x={28 + x * size}
          y={30 + y * size}
          width={size - 2}
          height={size - 2}
          fill={accent}
          fillOpacity={y <= 2 && x === 4 ? 1 : 0.75}
        />
      ))}
      {/* Engine flames */}
      {[3, 5].map((x) => (
        <rect key={x} x={30 + x * size} y={146} width={size - 6} height={14} fill="#fde68a">
          <animate attributeName="height" values="14;24;10;14" dur="0.4s" repeatCount="indefinite" />
        </rect>
      ))}
      {/* Score line, arcade-style */}
      <text x="28" y="22" fill={accent} fontSize="11" fontFamily="monospace" opacity="0.8">
        SCORE 000500
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}

function GlobeSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${base} animate-spin-slow`}>
      <circle cx="100" cy="100" r="70" fill="none" stroke={accent} strokeOpacity="0.5" />
      <ellipse cx="100" cy="100" rx="70" ry="28" fill="none" stroke={accent} strokeOpacity="0.35" />
      <ellipse cx="100" cy="100" rx="28" ry="70" fill="none" stroke={accent} strokeOpacity="0.35" />
      <ellipse cx="100" cy="100" rx="52" ry="70" fill="none" stroke={accent} strokeOpacity="0.2" />
      {[
        [100, 30], [148, 62], [165, 110], [128, 162], [62, 155], [38, 95], [70, 45],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={i % 3 === 0 ? '#f97316' : accent}>
          <animate attributeName="opacity" values="1;0.3;1" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function CoinSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={base}>
      <ellipse cx="100" cy="100" rx="64" ry="64" fill="none" stroke={accent} strokeWidth="3" strokeOpacity="0.8">
        <animate attributeName="rx" values="64;14;64" dur="3.4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="100" cy="100" rx="46" ry="46" fill={accent} fillOpacity="0.12">
        <animate attributeName="rx" values="46;10;46" dur="3.4s" repeatCount="indefinite" />
      </ellipse>
      <path d="M78 78 L122 122 M122 78 L78 122" stroke={accent} strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="100" r="86" fill="none" stroke={accent} strokeOpacity="0.25" strokeDasharray="4 10" className="animate-spin-slow origin-center" />
    </svg>
  );
}

function RocketSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${base} animate-drift`}>
      <path d="M100 24 C112 44 116 70 116 96 L84 96 C84 70 88 44 100 24 Z" fill="#d7d7de" />
      <path d="M84 96 L116 96 L116 132 L84 132 Z" fill="#bfbfca" />
      <path d="M84 104 L70 130 L84 132 Z" fill="#8a8a96" />
      <path d="M116 104 L130 130 L116 132 Z" fill="#8a8a96" />
      <rect x="84" y="98" width="32" height="7" fill={accent} />
      <circle cx="100" cy="74" r="9" fill="#0c2d4d" stroke={accent} strokeWidth="2" />
      <path d="M92 134 L108 134 L100 168 Z" fill={accent}>
        <animate attributeName="d" values="M92 134 L108 134 L100 168 Z;M92 134 L108 134 L100 178 Z;M92 134 L108 134 L100 168 Z" dur="0.5s" repeatCount="indefinite" />
      </path>
      <path d="M96 134 L104 134 L100 154 Z" fill="#fde68a">
        <animate attributeName="d" values="M96 134 L104 134 L100 154 Z;M96 134 L104 134 L100 162 Z;M96 134 L104 134 L100 154 Z" dur="0.34s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function CarSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 240 140" className={`${base} animate-drift`}>
      <path d="M28 92 C40 70 66 56 104 52 C150 48 186 62 206 88 L212 92 Z" fill={accent} fillOpacity="0.85" />
      <path d="M84 58 C100 42 144 42 162 58 L150 60 C132 50 108 50 96 60 Z" fill="#18181f" />
      <rect x="24" y="90" width="192" height="12" rx="6" fill="#27272e" />
      {[68, 176].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="102" r="17" fill="#0c0c0f" stroke="#3f3f46" strokeWidth="4" />
          <line x1={cx - 9} y1="102" x2={cx + 9} y2="102" stroke="#52525b" strokeWidth="3">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} 102`} to={`360 ${cx} 102`} dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>
      ))}
      <rect x="204" y="80" width="6" height="5" rx="2" fill="#fef9c3" />
    </svg>
  );
}

function BrainSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={base}>
      <path
        d="M100 40 C66 40 46 64 48 92 C44 118 62 142 88 144 C92 152 108 152 112 144 C138 142 156 118 152 92 C154 64 134 40 100 40 Z"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
        strokeWidth="2"
      >
        <animate attributeName="fill-opacity" values="0.14;0.3;0.14" dur="2.6s" repeatCount="indefinite" />
      </path>
      <path d="M100 42 L100 148" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M70 70 Q84 84 72 102 M130 70 Q116 84 128 102 M84 56 Q96 66 90 80 M116 56 Q104 66 110 80" stroke={accent} strokeOpacity="0.6" fill="none" strokeWidth="1.5" />
      {[
        [70, 70], [130, 70], [72, 102], [128, 102], [100, 60], [100, 120],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={accent}>
          <animate attributeName="opacity" values="1;0.2;1" dur={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function XSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${base} animate-drift`}>
      <circle cx="100" cy="100" r="80" fill="none" stroke={accent} strokeOpacity="0.25" strokeDasharray="3 9" className="animate-spin-slow origin-center" />
      <path d="M58 52 L142 148 M142 52 L58 148" stroke={accent} strokeWidth="18" strokeLinecap="round">
        <animate attributeName="stroke-opacity" values="1;0.6;1" dur="2.4s" repeatCount="indefinite" />
      </path>
      <path d="M58 52 L142 148 M142 52 L58 148" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function TunnelSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={base}>
      {[78, 60, 44, 30, 18].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={i % 2 === 0 ? accent : '#f97316'} strokeWidth={3 - i * 0.4} strokeOpacity={0.85 - i * 0.14}>
          <animate attributeName="r" values={`${r};${r + 14};${r}`} dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="100" cy="100" r="7" fill="#fef08a">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CoreSvg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className={base}>
      <polygon points="100,26 164,63 164,137 100,174 36,137 36,63" fill="none" stroke={accent} strokeOpacity="0.6" className="animate-spin-slow origin-center" />
      <polygon points="100,52 142,76 142,124 100,148 58,124 58,76" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="20" fill={accent} fillOpacity="0.7">
        <animate attributeName="r" values="20;26;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
