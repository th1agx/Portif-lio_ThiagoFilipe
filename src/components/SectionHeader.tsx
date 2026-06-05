type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-studio-candy">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold leading-tight text-studio-text sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-studio-muted">{description}</p> : null}
    </div>
  )
}
