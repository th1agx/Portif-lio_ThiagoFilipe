import { Award } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Certifications({ t }: { t: Translation }) {
  return (
    <MotionSection id="certificacoes" className="px-4 py-24 sm:px-6 lg:px-8" variant="rise">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
        <motion.div
          className="mt-12 flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {t.certifications.items.map((item) => (
            <motion.div
              key={item}
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="group flex items-center gap-4 border-b border-white/[0.04] pb-6 last:border-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-galaxy-cyan transition-colors group-hover:bg-galaxy-cyan/10 group-hover:text-galaxy-cyan">
                <Award size={18} />
              </div>
              <span className="text-lg font-medium text-galaxy-text group-hover:text-galaxy-cyan transition-colors">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  )
}
