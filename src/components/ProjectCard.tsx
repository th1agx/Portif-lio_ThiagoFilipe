import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import type { Locale, Project, Translation } from '../data/types'
import { ProjectPreview } from './ProjectPreview'
import { TechBadge } from './TechBadge'

type ProjectCardProps = {
  project: Project
  locale: Locale
  t: Translation
  onDetails: (project: Project) => void
}

export function ProjectCard({ project, locale, t, onDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate rotation (-3 to 3 degrees for subtlety)
    const xPct = x / rect.width - 0.5
    const yPct = y / rect.height - 0.5
    
    gsap.to(cardRef.current, {
      rotateX: -yPct * 6,
      rotateY: xPct * 6,
      scale: 1.01,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
  }

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col gap-6 will-change-transform"
    >
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-white/50 cursor-pointer"
        onClick={() => onDetails(project)}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          <ProjectPreview project={project} />
        </div>
        <div className="absolute inset-0 bg-vanilla-bg/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-2xl font-black tracking-tightest text-vanilla-text">
              {project.title[locale]}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest2 text-vanilla-muted">
              {project.status[locale]}
            </span>
          </div>
          <p className="text-lg leading-relaxed text-vanilla-muted line-clamp-3">
            {project.description[locale]}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-mono text-vanilla-muted flex items-center ml-2">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDetails(project)}
          className="mt-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-vanilla-text transition-colors hover:text-vanilla-muted w-max"
        >
          {t.common.details} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  )
}
