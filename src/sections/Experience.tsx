import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'

export function Experience({ t }: { t: Translation }) {
  return (
    <section id="experiencia" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionSection>
          <SectionHeader eyebrow={t.experience.eyebrow} title={t.experience.title} />
        </MotionSection>
        
        <div className="mt-16 border-t border-vanilla-border">
          {t.experience.items.map((item, index) => (
            <MotionSection key={`${item.role}-${item.period}`} delay={index * 0.1}>
              <article className="grid gap-6 md:grid-cols-[1fr_3fr] border-b border-vanilla-border py-12">
                <div>
                  <p className="font-mono text-sm tracking-widest2 text-vanilla-muted mb-2 uppercase">{item.period}</p>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="font-display text-4xl font-bold tracking-tight text-vanilla-text">{item.role}</h3>
                  <p className="mt-2 text-xl font-medium text-vanilla-muted">
                    {item.company} <span className="mx-2">—</span> {item.location}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-lg leading-relaxed text-vanilla-text">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
