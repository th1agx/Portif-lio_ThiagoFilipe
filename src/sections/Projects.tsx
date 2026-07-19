import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import type { Locale, Project, Translation } from '../data/types'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

type ProjectsProps = {
  locale: Locale
  t: Translation
  onDetails: (project: Project) => void
}

export function Projects({ locale, t, onDetails }: ProjectsProps) {
  const allProjects = projects
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardsRef.current) return

    const cards = cardsRef.current.children
    
    gsap.from(cards, {
      y: 120,
      rotationX: 20,
      translateZ: -50,
      opacity: 0,
      filter: 'blur(15px)',
      stagger: 0.2, // Stagger works wonderfully with scrub
      ease: 'none',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 95%',
        end: 'top 10%',
        scrub: 1, // Smooth cinematic scrub
      }
    })
  }, { scope: containerRef })

  return (
    <section id="projetos" className="px-4 py-24 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
        </div>
        
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" ref={cardsRef} style={{ perspective: '1200px' }}>
          {allProjects.map((project) => (
            <div key={project.id} className="will-change-transform">
              <ProjectCard project={project} locale={locale} t={t} onDetails={onDetails} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
