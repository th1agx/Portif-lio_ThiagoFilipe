import { Code2, ContactRound, Mail, FileDown } from 'lucide-react'
import { Button } from '../components/Button'
import { MotionSection } from '../components/MotionSection'
import { links } from '../data/links'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function Contact({ t }: { t: Translation }) {
  return (
    <MotionSection id="contato" className="px-4 py-32 sm:px-6 lg:px-8" variant="scale">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-eyebrow mb-6">{t.contact.eyebrow}</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-galaxy-text sm:text-5xl lg:text-7xl mb-8">
          {t.contact.title}
        </h2>
        <p className="text-xl text-galaxy-subtle max-w-2xl mx-auto mb-12">
          {t.contact.description}
        </p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Button href={links.email} className="px-8 py-4 text-base">
              <Mail size={18} /> {t.contact.emailLabel}
            </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Button href={links.linkedin} target="_blank" rel="noreferrer" variant="secondary" className="px-8 py-4 text-base">
              <ContactRound size={18} /> {t.contact.linkedinLabel}
            </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Button href={links.github} target="_blank" rel="noreferrer" variant="secondary" className="px-8 py-4 text-base">
              <Code2 size={18} /> {t.contact.githubLabel}
            </Button>
          </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Button href={links.resume} target="_blank" rel="noreferrer" variant="ghost" className="px-8 py-4 text-base">
              <FileDown size={18} /> {t.common.downloadResume}
            </Button>
          </motion.span>
        </motion.div>
      </div>
      
      <footer className="mx-auto max-w-7xl mt-32 border-t border-white/5 py-8 text-center text-sm font-medium text-galaxy-muted">
        <p>© {new Date().getFullYear()} Thiago Filipe</p>
      </footer>
    </MotionSection>
  )
}
