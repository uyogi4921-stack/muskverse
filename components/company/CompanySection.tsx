'use client';

import { motion } from 'framer-motion';
import type { Company } from '@/data/companies';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useInView } from '@/hooks/useInView';
import Counter from '@/components/ui/Counter';
import TiltCard from '@/components/ui/TiltCard';
import CompanyScene from './CompanyScene';
import MobileVisual from './MobileVisual';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface CompanySectionProps {
  company: Company;
  index: number;
  nextAccent?: string;
}

export default function CompanySection({
  company,
  index,
  nextAccent,
}: CompanySectionProps) {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView<HTMLElement>('400px');
  const reversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={company.id}
      data-year={company.founded}
      aria-labelledby={`${company.id}-heading`}
      className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-[var(--space-section)] lg:grid-cols-2 lg:gap-16 lg:px-12"
    >
      {/* Era ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(55% 45% at ${reversed ? '70%' : '30%'} 40%, ${company.accent}09, transparent 70%)`,
        }}
      />
      {/* Bleed into the next era's color */}
      {nextAccent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
          style={{
            background: `linear-gradient(to bottom, transparent, ${nextAccent}0a)`,
          }}
        />
      )}

      {/* Era watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-2 select-none font-display text-[18vw] font-bold leading-none text-white/[0.03] lg:left-6 lg:text-[11rem]"
      >
        {company.founded}
      </span>

      {/* Copy column */}
      <div className={reversed ? 'lg:order-2' : ''}>
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-display text-xs uppercase tracking-[0.4em]"
          style={{ color: company.accent }}
        >
          {company.era}
        </motion.p>

        <motion.h2
          id={`${company.id}-heading`}
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-3 font-display text-[length:var(--text-section)] font-bold leading-[0.95] tracking-tight"
        >
          {company.name}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-3 font-display text-lg italic text-muted"
        >
          {company.tagline}
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-6 max-w-xl leading-relaxed text-slate-300"
        >
          {company.origin}
        </motion.p>

        {/* Era quote */}
        <motion.blockquote
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-5 max-w-xl border-l-2 pl-4 font-display text-base italic leading-relaxed text-slate-200"
          style={{ borderColor: company.accent }}
        >
          “{company.quote}”
          <footer className="mt-1 text-xs not-italic uppercase tracking-[0.25em] text-muted">
            — Elon Musk
          </footer>
        </motion.blockquote>

        {/* Milestones */}
        <div className="mt-8 grid gap-3">
          {company.milestones.map((milestone, i) => (
            <motion.div
              key={milestone.title}
              variants={fadeUp}
              custom={4 + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <TiltCard
                maxTilt={4}
                className="glass group rounded-2xl p-4 transition-colors duration-300 hover:border-white/20"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="shrink-0 font-display text-sm font-bold tabular-nums"
                    style={{ color: company.accent }}
                  >
                    {milestone.date}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {milestone.detail}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Signature stat + status */}
        <motion.div
          variants={fadeUp}
          custom={8}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <div>
            <Counter
              value={company.stat.value}
              prefix={company.stat.prefix}
              suffix={company.stat.suffix}
              className="font-display text-4xl font-bold tabular-nums sm:text-5xl"
            />
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted">
              {company.stat.label}
            </p>
          </div>
          <p className="max-w-xs border-l pl-4 text-sm leading-relaxed text-slate-400" style={{ borderColor: `${company.accent}55` }}>
            {company.status}
          </p>
        </motion.div>
      </div>

      {/* Visual column */}
      <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
        <div
          className="glass relative aspect-square w-full overflow-hidden rounded-3xl"
          style={{
            boxShadow: `0 0 120px -40px ${company.accent}66`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${company.accent}14, transparent 70%)`,
            }}
          />
          {isMobile ? (
            <MobileVisual scene={company.scene} accent={company.accent} />
          ) : (
            inView && <CompanyScene scene={company.scene} />
          )}
        </div>
      </div>
    </section>
  );
}
