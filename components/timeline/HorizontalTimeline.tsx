'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent } from '@/data/companies';
import { TIMELINE_RANGE } from '@/data/companies';
import EventModal from './EventModal';

const YEAR_WIDTH = 130;

/**
 * Interactive horizontal timeline (1971 → 2026). Events are fetched
 * client-side from /api/timeline to exercise the front↔back wiring.
 */
export default function HorizontalTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<TimelineEvent | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/timeline', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Timeline request failed: ${res.status}`);
        return res.json();
      })
      .then((payload: { success: boolean; data: TimelineEvent[] }) => {
        if (payload.success) setEvents(payload.data);
        else setError(true);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(true);
      });
    return () => controller.abort();
  }, []);

  // Pre-1995 is sparse (two events in 24 years), so early years are
  // compressed into single slots with break markers instead of an
  // 11-year blank stretch.
  const slots: (number | 'gap')[] = [
    1971,
    'gap',
    1984,
    'gap',
    ...Array.from({ length: TIMELINE_RANGE.end - 1995 + 1 }, (_, i) => 1995 + i),
  ];
  const slotIndexByYear = new Map<number, number>();
  slots.forEach((slot, i) => {
    if (typeof slot === 'number') slotIndexByYear.set(slot, i);
  });
  const trackWidth = slots.length * YEAR_WIDTH;

  const positionFor = (event: TimelineEvent) => {
    const index = slotIndexByYear.get(event.year) ?? 0;
    return index * YEAR_WIDTH + YEAR_WIDTH / 2;
  };

  const scrollByAmount = (direction: 1 | -1) => {
    scroller.current?.scrollBy({ left: direction * 520, behavior: 'smooth' });
  };

  // Stagger events that share a year so nodes don't overlap
  const lanes = new Map<number, number>();
  const eventsWithLane = events.map((event) => {
    const lane = lanes.get(event.year) ?? 0;
    lanes.set(event.year, lane + 1);
    return { event, lane };
  });

  return (
    <section
      id="timeline"
      data-year="2026"
      aria-labelledby="timeline-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs uppercase tracking-[0.4em] text-flame"
        >
          1971 → 2026
        </motion.p>
        <motion.h2
          id="timeline-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-display text-[length:var(--text-section)] font-bold leading-none tracking-tight"
        >
          Full Timeline
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-lg text-muted"
        >
          Five decades of launches, exits, and moonshots. Drag sideways and
          tap any node to open the story.
        </motion.p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll timeline left"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg text-muted transition-colors hover:border-electric/50 hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll timeline right"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg text-muted transition-colors hover:border-electric/50 hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="timeline-scroll mt-12 overflow-x-auto pb-8"
        role="region"
        aria-label="Horizontal timeline of events from 1971 to 2026"
        tabIndex={0}
      >
        <div
          className="relative mx-6 h-64 lg:mx-12"
          style={{ width: trackWidth, minWidth: trackWidth }}
        >
          {/* Spine */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-electric/50 via-white/20 to-flame/50" />

          {/* Year ticks + compression breaks */}
          {slots.map((slot, i) => (
            <div
              key={`${slot}-${i}`}
              className="absolute top-1/2"
              style={{ left: i * YEAR_WIDTH + YEAR_WIDTH / 2 }}
            >
              {slot === 'gap' ? (
                <span className="absolute top-3 -translate-x-1/2 font-display text-[11px] tracking-widest text-white/20">
                  ···
                </span>
              ) : (
                <>
                  <div className="h-2 w-px -translate-y-full bg-white/25" />
                  <span className="absolute top-3 -translate-x-1/2 font-display text-[11px] tabular-nums text-muted">
                    {slot}
                  </span>
                </>
              )}
            </div>
          ))}

          {/* Event nodes */}
          {eventsWithLane.map(({ event, lane }, i) => {
            const above = (i + lane) % 2 === 0;
            const offset = 44 + lane * 52;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelected(event)}
                aria-label={`${event.date}: ${event.title}`}
                aria-haspopup="dialog"
                className="group absolute -translate-x-1/2 focus-visible:outline-none"
                style={{
                  left: positionFor(event),
                  top: above ? `calc(50% - ${offset}px)` : `calc(50% + ${offset - 30}px)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 w-px bg-white/15"
                  style={
                    above
                      ? { top: '100%', height: offset - 14 }
                      : { bottom: '100%', height: offset - 44 }
                  }
                />
                <span
                  className="glass block whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 group-hover:scale-105 group-focus-visible:ring-2"
                  style={{
                    borderColor: `${event.accent}55`,
                    boxShadow: `0 0 0px transparent`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 24px -6px ${event.accent}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0px transparent';
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: event.accent }}
                  />
                  {event.title}
                </span>
              </button>
            );
          })}

          {events.length === 0 && !error && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="shimmer h-8 w-64 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="mx-auto max-w-7xl px-6 text-sm text-red-400 lg:px-12" role="alert">
          Couldn&apos;t load the timeline. Refresh to try again.
        </p>
      )}

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
