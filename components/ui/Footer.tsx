export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-12">
        <p className="font-display text-sm font-bold tracking-[0.3em] text-ink">
          MUSKVERSE
        </p>
        <p className="text-xs leading-relaxed text-muted">
          Dedicated to Elon Musk · 1971 → ∞. An independent visual history,
          not affiliated with Elon Musk or any company shown. Figures
          approximate as of 2026.
        </p>
      </div>
    </footer>
  );
}
