'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useLenis } from '@/components/providers/SmoothScroll';
import MagneticButton from '@/components/ui/MagneticButton';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

const TITLE = 'MUSKVERSE';

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.07,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function MobileStarfield() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-[58%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(12,45,77,0.9)_0%,rgba(56,189,248,0.12)_55%,transparent_72%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-70">
        {Array.from({ length: 46 }).map((_, i) => {
          const x = (i * 73) % 100;
          const y = (i * 37) % 100;
          return (
            <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 4 === 0 ? 1.5 : 0.8} fill="#cbd5e1">
              <animate
                attributeName="opacity"
                values="0.9;0.2;0.9"
                dur={`${2 + (i % 5)}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const lenis = useLenis();

  const scrollToStory = () => {
    const target = document.getElementById('origins');
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      data-year="1971"
      aria-labelledby="hero-heading"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {isMobile ? <MobileStarfield /> : <HeroScene />}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-5 font-display text-xs uppercase tracking-[0.5em] text-electric sm:text-sm"
        >
          1971 → 2026 · One Empire
        </motion.p>

        <h1
          id="hero-heading"
          className="font-display text-[length:var(--text-hero)] font-bold leading-none tracking-tight"
          style={{ perspective: 600 }}
        >
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden="true" className="inline-block">
            {TITLE.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 max-w-xl text-balance text-base text-muted sm:text-lg"
        >
          The visual history of Elon Musk — from a $500 space game written at
          age 12 to rockets, robots, minds wired to machines, and the
          world&apos;s first trillion-dollar fortune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-10"
        >
          <MagneticButton
            onClick={scrollToStory}
            className="glass rounded-full px-8 py-4 font-display text-sm uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:border-electric/60 hover:text-electric"
          >
            Begin in 1971
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-2">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-electric"
          />
        </div>
      </motion.div>
    </section>
  );
}
