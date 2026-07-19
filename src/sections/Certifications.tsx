import { SectionHeader } from '../components/SectionHeader'
import type { Translation } from '../data/types'

export function Certifications({ t }: { t: Translation }) {
  return (
    <section id="certificacoes" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
        <div className="mt-16 flex flex-col gap-6">
          {t.certifications.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 border-b border-vanilla-border pb-6 last:border-0"
            >
              <span className="font-display text-2xl font-bold text-vanilla-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
