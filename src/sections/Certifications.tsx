import { Award } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Certifications({ t }: { t: Translation }) {
  return (
    <MotionSection id="certificacoes" className="px-4 py-24 sm:px-6 lg:px-8" variant="rise">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
        <motion.div
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {t.certifications.items.map((item) => (
            <motion.div
              key={item}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 transition-colors hover:border-studio-candy/45 hover:bg-white/[0.065]"
            >
              <Award className="mt-1 shrink-0 text-studio-candy" size={18} />
              <span className="text-sm leading-6 text-studio-muted">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  )
}
