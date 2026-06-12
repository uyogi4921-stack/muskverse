'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Counter from '@/components/ui/Counter';

/** Counts 1984 → 2025 in sync with the net-worth counter. */
function YearTicker() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [year, setYear] = useState(1984);

  useEffect(() => {
    if (!inView) return;
    let rafId = 0;
    const start = performance.now();
    const duration = 3000;
    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setYear(Math.round(1984 + (2025 - 1984) * easeOutExpo(progress)));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  return (
    <span ref={ref} className="tabular-nums">
      {year}
    </span>
  );
}

/** Twinkling starfield backdrop — pure SVG. */
function TributeStars() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    >
      {Array.from({ length: 54 }).map((_, i) => {
        const x = (i * 61) % 100;
        const y = (i * 41) % 100;
        return (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={i % 5 === 0 ? 1.6 : 0.9}
            fill={i % 7 === 0 ? '#fbbf24' : '#cbd5e1'}
          >
            <animate
              attributeName="opacity"
              values="0.9;0.15;0.9"
              dur={`${2 + (i % 6)}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}

const WEALTH_STEPS = [
  { year: '1984', label: 'Blastar, age 12', value: '$500' },
  { year: '1999', label: 'Zip2 exit', value: '$22M' },
  { year: '2002', label: 'PayPal exit', value: '$176M' },
  { year: '2021', label: 'World’s richest', value: '$185B' },
  { year: '2025', label: 'First trillionaire', value: '$1T' },
];

/** Orbit rings — pure SVG, no WebGL. */
function OrbitRings() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-40"
      aria-hidden="true"
    >
      {[150, 200, 250].map((r, i) => (
        <g key={r} className="origin-center" style={{ animation: `spin ${22 + i * 9}s linear infinite${i % 2 ? ' reverse' : ''}` }}>
          <circle cx="300" cy="300" r={r} fill="none" stroke="#fbbf24" strokeOpacity={0.25 - i * 0.05} strokeDasharray={i === 1 ? '4 10' : undefined} />
          <circle cx={300 + r} cy="300" r="4" fill={i === 0 ? '#fbbf24' : i === 1 ? '#38bdf8' : '#f97316'} />
        </g>
      ))}
    </svg>
  );
}

export default function Tribute() {
  return (
    <section
      id="tribute"
      data-year="2025"
      aria-labelledby="tribute-heading"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center overflow-hidden px-6 py-[var(--space-section)] text-center"
    >
      <TributeStars />
      <OrbitRings />

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative font-display text-xs uppercase tracking-[0.5em] text-amber-400"
      >
        2025 · A First in Human History
      </motion.p>

      <motion.h2
        id="tribute-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative mt-4 max-w-3xl text-balance font-display text-[length:var(--text-section)] font-bold leading-[1.02] tracking-tight"
      >
        From a{' '}
        <span className="text-emerald-400">$500 game</span> to the world&apos;s
        first <span className="text-amber-400">trillionaire</span>.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative mt-10"
      >
        <Counter
          value={1000000000000}
          prefix="$"
          duration={3000}
          className="block bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text font-display text-[clamp(1.9rem,1rem+5vw,4.5rem)] font-bold tabular-nums text-transparent"
        />
        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted">
          Estimated net worth · 1984 → <YearTicker />
        </p>
      </motion.div>

      {/* Wealth ladder */}
      <div className="relative mt-14 flex flex-wrap items-stretch justify-center gap-3">
        {WEALTH_STEPS.map((step, i) => (
          <motion.div
            key={step.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            className="glass flex min-w-[120px] flex-col items-center rounded-2xl px-4 py-3"
          >
            <span className="font-display text-[11px] tabular-nums text-muted">
              {step.year}
            </span>
            <span className="mt-1 font-display text-xl font-bold text-ink">
              {step.value}
            </span>
            <span className="mt-1 text-[11px] text-muted">{step.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative mt-14 max-w-xl text-balance text-sm italic leading-relaxed text-slate-400"
      >
        Dedicated to Elon Musk — the kid from Pretoria who sold a space game
        for five hundred dollars, slept on an office floor, bet every exit on
        the next impossible thing, and never stopped shipping.
      </motion.p>
    </section>
  );
}
