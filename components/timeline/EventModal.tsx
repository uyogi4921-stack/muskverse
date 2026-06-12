'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/data/companies';

interface EventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!event) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 p-6 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative w-full max-w-md rounded-3xl p-8"
            style={{ boxShadow: `0 0 80px -20px ${event.accent}55` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close event details"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric"
            >
              ✕
            </button>

            <p
              className="font-display text-xs uppercase tracking-[0.35em]"
              style={{ color: event.accent }}
            >
              {event.date} · {event.company}
            </p>
            <h3
              id="event-modal-title"
              className="mt-3 font-display text-2xl font-bold leading-tight"
            >
              {event.title}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-300">{event.detail}</p>

            <div
              aria-hidden="true"
              className="mt-6 h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${event.accent}, transparent)`,
              }}
            />
            <p className="mt-3 font-display text-5xl font-bold text-white/10">
              {event.year}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
