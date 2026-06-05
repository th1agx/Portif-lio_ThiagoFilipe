import { Code2, ContactRound, Mail, FileDown } from 'lucide-react'
import { Button } from '../components/Button'
import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import { links } from '../data/links'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Contact({ t }: { t: Translation }) {
  return (
    <MotionSection id="contato" className="px-4 py-24 sm:px-6 lg:px-8" variant="scale">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-studio-royal/20 via-studio-surface to-studio-purple/20 p-6 sm:p-10">
        <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />
        <motion.div
          className="flex flex-wrap gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <Button href={links.email}>
            <Mail size={16} /> {t.contact.emailLabel}
          </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <Button href={links.linkedin} target="_blank" rel="noreferrer" variant="secondary">
            <ContactRound size={16} /> {t.contact.linkedinLabel}
          </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <Button href={links.github} target="_blank" rel="noreferrer" variant="secondary">
            <Code2 size={16} /> {t.contact.githubLabel}
          </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <Button href={links.resume} target="_blank" rel="noreferrer" variant="secondary">
            <FileDown size={16} /> {t.common.downloadResume}
          </Button>
          </motion.span>
        </motion.div>
      </div>
      <footer className="mx-auto max-w-7xl py-10 text-sm text-studio-muted">
        <p>© 2026 Thiago Filipe</p>
      </footer>
    </MotionSection>
  )
}
