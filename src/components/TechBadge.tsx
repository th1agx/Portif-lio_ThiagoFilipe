export function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-normal text-studio-muted">
      {label}
    </span>
  )
}
