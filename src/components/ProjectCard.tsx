import { Code2, ExternalLink, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import type { Locale, Project, Translation } from '../data/types'
import { ProjectPreview } from './ProjectPreview'

type ProjectCardProps = {
  project: Project
  locale: Locale
  t: Translation
  compact?: boolean // kept for backwards compat but ignored in our unified grid
  onDetails: (project: Project) => void
}

export function ProjectCard({ project, locale, t, onDetails }: ProjectCardProps) {
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="project-card-overlay group flex flex-col justify-end min-h-[400px] rounded-2xl bg-galaxy-surface"
    >
      <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <ProjectPreview project={project} />
      </div>
      
      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-galaxy-text mb-2">
            {project.title[locale]}
          </h3>
          <p className="text-sm font-medium text-galaxy-subtle line-clamp-2">
            {project.description[locale]}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-galaxy-muted">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < Math.min(project.technologies.length, 4) - 1 && <span className="ml-2 text-white/20">·</span>}
            </span>
          ))}
          {project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t border-white/5 pt-6">
          <button
            type="button"
            onClick={() => onDetails(project)}
            className="flex items-center gap-2 text-sm font-medium text-galaxy-text transition-colors hover:text-galaxy-cyan"
          >
            {t.common.details} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <div className="flex-1" />
          
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-galaxy-muted hover:text-galaxy-text transition-colors"
          >
            <Code2 size={16} /> <span className="hidden sm:inline">Code</span>
          </a>
          
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-galaxy-cyan hover:text-galaxy-cyan/80 transition-colors"
            >
              <ExternalLink size={16} /> <span className="hidden sm:inline">Demo</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
