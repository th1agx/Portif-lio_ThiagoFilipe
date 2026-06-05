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
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />
        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {t.skills.groups.map((group, index) => {
            const Icon = icons[index]
            return (
              <motion.article
                key={group.title}
                variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="studio-card-spotlight rounded-lg border border-white/10 bg-studio-surface/80 p-5 transition-colors hover:border-studio-purple/50"
              >
                <Icon className="mb-5 text-studio-candy" size={24} />
                <h3 className="font-display text-lg font-bold text-studio-text">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
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
