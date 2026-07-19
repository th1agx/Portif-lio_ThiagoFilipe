import { SectionHeader } from '../components/SectionHeader'
import { TechBadge } from '../components/TechBadge'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'

export function Skills({ t }: { t: Translation }) {
  return (
    <section id="stack" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionSection>
          <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />
        </MotionSection>
        
        <div className="mt-16 border-t border-vanilla-border">
          {t.skills.groups.map((group, index) => (
            <MotionSection key={group.title} delay={index * 0.1}>
              <article className="grid gap-6 md:grid-cols-[1fr_3fr] border-b border-vanilla-border py-8">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-vanilla-text">{group.title}</h3>
                </div>
                
                <div className="flex flex-wrap items-start gap-2">
                  {group.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
