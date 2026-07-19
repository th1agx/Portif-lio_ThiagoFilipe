import { BrainCircuit, Code2, Database, TestTube2 } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { TechBadge } from '../components/TechBadge'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

const icons = [BrainCircuit, Code2, Database, TestTube2]

export function Skills({ t }: { t: Translation }) {
  return (
    <MotionSection id="stack" className="px-4 py-24 sm:px-6 lg:px-8" variant="scale">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />
        <motion.div
          className="mt-16 flex flex-col gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {t.skills.groups.map((group, index) => {
            const Icon = icons[index] || Code2
            return (
              <motion.article
                key={group.title}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                className="group relative flex flex-col md:flex-row md:items-start gap-6 border-b border-white/[0.03] pb-12 last:border-0 last:pb-0"
              >
                <div className="flex w-full md:w-64 shrink-0 items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] text-galaxy-cyan transition-colors group-hover:bg-galaxy-cyan/10 group-hover:text-galaxy-cyan">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-galaxy-text">{group.title}</h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 md:mt-1">
                  {group.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </MotionSection>
  )
}
