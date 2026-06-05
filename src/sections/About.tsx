import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function About({ t }: { t: Translation }) {
  return (
    <MotionSection id="sobre" className="px-4 py-24 sm:px-6 lg:px-8" variant="slide">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
        <motion.div
          className="grid gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {t.about.paragraphs.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-5 text-base leading-8 text-studio-muted"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  )
}
