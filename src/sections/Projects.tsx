import { projects } from '../data/projects'
import type { Locale, Project, Translation } from '../data/types'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'

type ProjectsProps = {
  locale: Locale
  t: Translation
  onDetails: (project: Project) => void
}

export function Projects({ locale, t, onDetails }: ProjectsProps) {
  const allProjects = projects

  return (
    <section id="projetos" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionSection>
          <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
        </MotionSection>
        
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {allProjects.map((project, index) => (
            <MotionSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} locale={locale} t={t} onDetails={onDetails} />
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
