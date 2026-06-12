'use client';

import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px), (pointer: coarse) and (max-width: 1023px)';

/**
 * Returns true on small/touch viewports where heavy 3D canvases are
 * swapped for lightweight SVG/CSS fallbacks. Defaults to true (the
 * cheap path) until the first client-side measurement to avoid
 * mounting WebGL during hydration on phones.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
