import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Experience({ t }: { t: Translation }) {
  return (
    <MotionSection id="experiencia" className="px-4 py-24 sm:px-6 lg:px-8" variant="scale">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow={t.experience.eyebrow} title={t.experience.title} />
        
        <div className="relative mt-16">
          {/* Timeline center line */}
          <div className="timeline-line absolute bottom-0 left-[15px] top-0 w-px md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            className="flex flex-col gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {t.experience.items.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.article
                  key={`${item.role}-${item.period}`}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[11px] top-1 h-[10px] w-[10px] rounded-full bg-galaxy-cyan shadow-[0_0_12px_rgba(77,196,232,0.8)] md:left-1/2 md:-translate-x-1/2 md:top-2" />

                  {/* Content (half width on desktop) */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <p className="font-mono text-sm tracking-widest2 text-galaxy-cyan/80 mb-2">{item.period}</p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-galaxy-text">{item.role}</h3>
                    <p className="mt-1 text-base font-medium text-galaxy-subtle">
                      {item.company} <span className="text-white/20 px-1">·</span> {item.location}
                    </p>
                    <ul className={`mt-6 space-y-4 ${isEven ? '' : 'md:flex md:flex-col md:items-end'}`}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="text-base leading-relaxed text-galaxy-muted max-w-md">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Empty half for spacing on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  )
}
