export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-mono text-[11px] uppercase tracking-wider text-text-tertiary border border-border px-2 py-0.5 rounded-sm">
      {children}
    </span>
  );
}
