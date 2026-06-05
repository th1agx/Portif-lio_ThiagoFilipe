import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Experience({ t }: { t: Translation }) {
  return (
    <MotionSection id="experiencia" className="px-4 py-24 sm:px-6 lg:px-8" variant="scale">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.experience.eyebrow} title={t.experience.title} />
        <motion.div
          className="grid gap-5 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {t.experience.items.map((item) => (
            <motion.article
              key={`${item.role}-${item.period}`}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-studio-surface/80 p-6"
            >
              <span className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-studio-royal via-studio-purple to-studio-candy" />
              <p className="font-mono text-xs font-bold uppercase text-studio-candy">{item.period}</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-studio-text">{item.role}</h3>
              <p className="mt-1 text-sm font-semibold text-studio-muted">
                {item.company} · {item.location}
              </p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="border-l border-studio-royal/60 pl-4 text-sm leading-6 text-studio-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  )
}
