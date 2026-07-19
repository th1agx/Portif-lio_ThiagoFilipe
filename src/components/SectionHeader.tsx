type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-16">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title text-4xl sm:text-6xl md:text-8xl tracking-tightest mb-6">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-xl leading-relaxed text-vanilla-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}
