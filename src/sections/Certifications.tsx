import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'

export function Certifications({ t }: { t: Translation }) {
  return (
    <section id="certificacoes" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionSection>
          <SectionHeader eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
        </MotionSection>
        <div className="mt-16 flex flex-col gap-6">
          {t.certifications.items.map((item, index) => (
            <MotionSection key={item} delay={index * 0.05}>
              <div className="flex items-center gap-4 border-b border-vanilla-border pb-6 last:border-0">
                <span className="font-display text-2xl font-bold text-vanilla-text">{item}</span>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
