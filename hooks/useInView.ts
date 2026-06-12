'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver wrapper used to mount 3D canvases only when
 * their section is near the viewport, keeping at most 1-2 WebGL
 * contexts alive at a time.
 */
export function useInView<T extends HTMLElement>(rootMargin = '300px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
