export function TraceDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className={`w-full h-6 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 12 H140 L156 4 H244 L260 20 H400"
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth="1"
      />
      <circle cx="140" cy="12" r="2" fill="var(--text-tertiary)" />
      <circle cx="260" cy="20" r="2" fill="var(--text-tertiary)" />
    </svg>
  );
}
