import { Code2, ExternalLink, PanelRightOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import type { Locale, Project, Translation } from '../data/types'
import { Button } from './Button'
import { ProjectPreview } from './ProjectPreview'
import { TechBadge } from './TechBadge'

type ProjectCardProps = {
  project: Project
  locale: Locale
  t: Translation
  compact?: boolean
  onDetails: (project: Project) => void
}

export function ProjectCard({ project, locale, t, compact = false, onDetails }: ProjectCardProps) {
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
  }

  const previewLabel =
    project.previewLabel?.[locale] ?? (project.previewKind === 'real' ? t.common.realPreview : t.common.conceptualPreview)

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, rotateX: 1.2, rotateY: -1.2 }}
      onMouseMove={handleMouseMove}
      className="studio-card-spotlight group overflow-hidden rounded-lg border border-white/10 bg-studio-surface/82 shadow-glow backdrop-blur transition-colors duration-300 hover:border-studio-royal/45"
    >
      <div className={`${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'} relative z-10 overflow-hidden`}>
        <ProjectPreview project={project} />
      </div>
      <div className="relative z-10 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded bg-studio-royal/15 px-2 py-1 font-mono text-[0.68rem] font-bold uppercase text-studio-text">
            {project.status[locale]}
          </span>
          <span className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[0.68rem] font-bold uppercase text-studio-muted">
            {previewLabel}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-studio-text">{project.title[locale]}</h3>
        <p className="mt-3 min-h-[5.25rem] text-sm leading-6 text-studio-muted">{project.description[locale]}</p>
        <p className="mt-3 border-l-2 border-studio-candy pl-3 text-sm font-semibold text-studio-text">
          {project.value[locale]}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <motion.span key={tech} whileHover={{ y: -2, scale: 1.03 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
              <TechBadge label={tech} />
            </motion.span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="secondary">
            <Code2 size={16} /> {t.common.github}
          </Button>
          <button
            type="button"
            onClick={() => onDetails(project)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold text-studio-text transition hover:border-studio-candy/70 hover:bg-white/[0.1]"
          >
            <PanelRightOpen size={16} /> {t.common.details}
          </button>
          {project.demoUrl ? (
            <Button href={project.demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> {t.common.demo}
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
