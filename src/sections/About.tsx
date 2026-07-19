import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'

export function About({ t }: { t: Translation }) {
  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] items-start">
          
          <MotionSection className="w-full">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-vanilla-bg shadow-subtle border border-vanilla-border/50">
              <img
                src="./profile/thiago-filipe.jpeg"
                alt={t.hero.photoAlt}
                className="h-full w-full object-cover object-[50%_18%] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </MotionSection>

          <MotionSection delay={0.2} className="h-full flex flex-col justify-center">
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
            <div className="flex flex-col gap-6">
              {t.about.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-relaxed ${i === 0 ? 'text-2xl font-medium text-vanilla-text leading-snug' : 'text-vanilla-muted'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionSection>

        </div>
      </div>
    </section>
  )
}
