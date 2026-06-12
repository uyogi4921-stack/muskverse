'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

type ToastState = { kind: 'success' | 'error'; message: string } | null;

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (next: NonNullable<ToastState>) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(next);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const payload: { success: boolean; error?: string } = await res.json();

      if (res.ok && payload.success) {
        showToast({
          kind: 'success',
          message: 'You’re in. Updates from the empire, incoming.',
        });
        setEmail('');
      } else {
        showToast({
          kind: 'error',
          message: payload.error ?? 'Something went wrong. Try again.',
        });
      }
    } catch {
      showToast({
        kind: 'error',
        message: 'Network error — check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="relative mx-auto max-w-3xl px-6 pb-[var(--space-section)] text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass rounded-3xl px-6 py-12 sm:px-12"
      >
        <h2
          id="subscribe-heading"
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          The story isn&apos;t over.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Subscribe and we&apos;ll ping you when new chapters land — launches,
          launches that explode, and everything in between.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <input
            id="subscribe-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@earth.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-electric/70 focus:outline-none"
          />
          <MagneticButton
            type="submit"
            disabled={submitting}
            className="rounded-full bg-gradient-to-r from-electric to-sky-400 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.15em] text-void transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Sending…' : 'Subscribe'}
          </MagneticButton>
        </form>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="status"
            aria-live="polite"
            className={`glass fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium ${
              toast.kind === 'success' ? 'text-emerald-300' : 'text-red-300'
            }`}
            style={{
              boxShadow:
                toast.kind === 'success'
                  ? '0 0 40px -10px rgba(52, 211, 153, 0.6)'
                  : '0 0 40px -10px rgba(248, 113, 113, 0.6)',
            }}
          >
            <span aria-hidden="true">
              {toast.kind === 'success' ? '🚀' : '⚠️'}
            </span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
