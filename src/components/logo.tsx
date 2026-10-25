export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.25" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M8.5 20.5c.4-5.4 3.2-8.6 7.5-8.6s7.1 3.2 7.5 8.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M11 20.5h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 text-ink">
      <Mark className="size-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-[0.14em]">BANGERT</span>
        {compact ? null : (
          <span className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-stone">
            Pâtisserie
          </span>
        )}
      </span>
    </span>
  );
}
