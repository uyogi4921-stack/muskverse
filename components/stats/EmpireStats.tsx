'use client';

import { motion } from 'framer-motion';
import Counter from '@/components/ui/Counter';
import TiltCard from '@/components/ui/TiltCard';

interface EmpireStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
  accent: string;
  wide?: boolean;
}

const STATS: EmpireStat[] = [
  {
    value: 450,
    suffix: '+',
    label: 'Orbital launches',
    caption: 'More than every other launch provider combined',
    accent: '#f97316',
  },
  {
    value: 7,
    suffix: 'M+',
    label: 'Vehicles delivered',
    caption: 'From one Roadster to a global fleet',
    accent: '#ef4444',
  },
  {
    value: 8000,
    suffix: '+',
    label: 'Starlink satellites',
    caption: 'The largest constellation ever flown',
    accent: '#38bdf8',
  },
  {
    value: 1024,
    label: 'Electrodes per implant',
    caption: 'Reading thoughts, one neuron at a time',
    accent: '#e879f9',
  },
  {
    value: 200000,
    suffix: '+',
    label: 'GPUs in Colossus',
    caption: 'Built in 122 days, still growing',
    accent: '#22d3ee',
  },
  {
    value: 1,
    prefix: '$',
    suffix: 'T',
    label: 'Net worth — a first',
    caption: 'The first trillion-dollar fortune in history',
    accent: '#fbbf24',
    wide: true,
  },
];

export default function EmpireStats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative mx-auto max-w-7xl px-6 py-[var(--space-section)] lg:px-12"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-xs uppercase tracking-[0.4em] text-electric"
      >
        Across Eight Companies
      </motion.p>
      <motion.h2
        id="stats-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 font-display text-[length:var(--text-section)] font-bold leading-none tracking-tight"
      >
        The Empire by the Numbers
      </motion.h2>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className={stat.wide ? 'col-span-2 lg:col-span-1' : ''}
          >
            <TiltCard
              maxTilt={5}
              className="glass h-full rounded-3xl p-6"
            >
              <div
                aria-hidden="true"
                className="h-1 w-10 rounded-full"
                style={{ background: stat.accent }}
              />
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="mt-4 block font-display text-3xl font-bold tabular-nums sm:text-4xl"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.25em]" style={{ color: stat.accent }}>
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stat.caption}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
