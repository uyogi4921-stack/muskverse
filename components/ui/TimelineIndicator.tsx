'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANIES } from '@/data/companies';
import { useLenis } from '@/components/providers/SmoothScroll';

interface Stop {
  id: string;
  year: number;
  label: string;
  accent: string;
}

const STOPS: Stop[] = [
  { id: 'hero', year: 1971, label: 'MUSKVERSE', accent: '#38bdf8' },
  ...COMPANIES.map((company) => ({
    id: company.id,
    year: company.founded,
    label: company.name,
    accent: company.accent,
  })),
  { id: 'tribute', year: 2025, label: 'The Trillionaire', accent: '#fbbf24' },
  { id: 'timeline', year: 2026, label: 'Full Timeline', accent: '#f97316' },
];

/**
 * Fixed vertical rail on the right edge showing the current era year
 * and one dot per section. Driven by IntersectionObserver.
 */
export default function TimelineIndicator() {
  const [activeId, setActiveId] = useState('hero');
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    STOPS.forEach((stop) => {
      const el = document.getElementById(stop.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const active = STOPS.find((stop) => stop.id === activeId) ?? STOPS[0];

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Era timeline"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <div
        className="relative h-10 w-16 overflow-hidden text-center"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={active.year}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 font-display text-xl font-bold tabular-nums"
            style={{ color: active.accent }}
          >
            {active.year}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-3">
        {STOPS.map((stop) => {
          const isActive = stop.id === activeId;
          return (
            <button
              key={stop.id}
              type="button"
              onClick={() => jumpTo(stop.id)}
              aria-label={`Jump to ${stop.label} (${stop.year})`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex h-4 w-4 items-center justify-center"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  background: isActive ? stop.accent : '#3f3f46',
                  boxShadow: isActive ? `0 0 12px ${stop.accent}` : 'none',
                }}
              />
              <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded-md bg-surface-2 px-2.5 py-1 font-display text-[11px] uppercase tracking-wider text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {stop.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-16 w-px bg-gradient-to-b from-white/20 to-transparent" />
    </nav>
  );
}
