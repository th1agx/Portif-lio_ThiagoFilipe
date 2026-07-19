export function TechBadge({ label }: { label: string }) {
  return (
    <span className="tech-badge inline-flex items-center gap-1.5">
      <span className="h-1 w-1 rounded-full bg-galaxy-cyan/40" />
      {label}
    </span>
  )
}
