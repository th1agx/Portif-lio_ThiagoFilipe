type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-6 text-lg leading-relaxed text-galaxy-muted">{description}</p> : null}
    </div>
  )
}
