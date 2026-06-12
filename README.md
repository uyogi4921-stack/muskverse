# MUSKVERSE — The Empire Timeline

An immersive, single-page visual history of Elon Musk — from a $500 space
game written at age 12 to the world's first trillionaire.

**Live:** https://muskverse-nine.vercel.app

![MUSKVERSE](https://muskverse-nine.vercel.app/opengraph-image)

## The story

Nine full-viewport era sections, each with a 3D centerpiece built entirely
from Three.js geometry primitives (no model downloads):

| Era | Section | 3D centerpiece |
|-----|---------|----------------|
| 1971 | The Origin | Voxel Blastar ship on a retro CRT grid |
| 1995 | Zip2 | Wireframe city-guide globe with map pins |
| 1999 | X.com / PayPal | Spinning chrome coin with X mark |
| 2002 | SpaceX | Low-poly rocket with flickering plume |
| 2003 | Tesla | Extruded sedan silhouette on a turntable |
| 2016 | Neuralink | Vertex-displaced brain mesh with electrodes |
| 2016 | The Boring Company | Infinite glowing tunnel rings |
| 2022 | X / Twitter | Monolithic chrome X with broadcast ring |
| 2023 | xAI | Nested icosahedra with pulsing energy core |

Plus: scroll-driven camera rig in every scene, a persistent year rail,
an interactive horizontal timeline (1971 → 2026, 33 events with glass
modals), an animated stats bento, and a $1,000,000,000,000 tribute counter.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Three.js** via @react-three/fiber + @react-three/drei
- **Framer Motion** + **Lenis** smooth scroll
- **Upstash Redis** for the subscribe form (file fallback in dev)

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm test           # Playwright smoke tests
```

## Architecture notes

- All content lives in [`data/companies.ts`](data/companies.ts) — no CMS.
- 3D scenes lazy-load via `next/dynamic` and mount only near the viewport,
  keeping ≤2 WebGL contexts alive.
- On mobile, every scene swaps to an animated SVG fallback — zero WebGL.
- `/api/timeline` serves the events JSON; the timeline section fetches it
  client-side. `/api/subscribe` validates server-side and writes to Redis
  (`KV_REST_API_URL`/`KV_REST_API_TOKEN`) or `lib/subscribers.json` locally.

Lighthouse (desktop, production): performance 87 · accessibility 95 ·
best practices 100 · SEO 100.

---

*Dedicated to Elon Musk · 1971 → ∞. An independent visual history, not
affiliated with Elon Musk or any company shown.*
