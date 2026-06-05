import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Locale, Project, Translation } from '../data/types'
import { Button } from './Button'
import { TechBadge } from './TechBadge'

type ProjectDrawerProps = {
  project: Project | null
  locale: Locale
  t: Translation
  onClose: () => void
}

export function ProjectDrawer({ project, locale, t, onClose }: ProjectDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, project])

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label={t.common.close}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
            className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-studio-surface p-6 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mb-6 flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-mono text-xs font-bold uppercase text-studio-candy">{project.status[locale]}</p>
                <h2 id="project-drawer-title" className="mt-2 font-display text-3xl font-extrabold text-studio-text">
                  {project.title[locale]}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-studio-text"
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="text-base leading-7 text-studio-muted">
              {project.description[locale]}
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="font-mono text-xs font-bold uppercase text-studio-muted">{t.common.technologies}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-6 space-y-4">
              {project.details[locale].map((detail) => (
                <p key={detail} className="leading-7 text-studio-muted">
                  {detail}
                </p>
              ))}
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-8 flex flex-wrap gap-3">
              <Button href={project.repoUrl} target="_blank" rel="noreferrer">
                {t.common.github}
              </Button>
              {project.demoUrl ? (
                <Button href={project.demoUrl} target="_blank" rel="noreferrer" variant="secondary">
                  {t.common.demo}
                </Button>
              ) : null}
            </motion.div>
            </motion.div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
