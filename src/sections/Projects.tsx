import { projects } from '../data/projects'
import type { Locale, Project, Translation } from '../data/types'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import { motion } from 'framer-motion'

type ProjectsProps = {
  locale: Locale
  t: Translation
  onDetails: (project: Project) => void
}

export function Projects({ locale, t, onDetails }: ProjectsProps) {
  // We unify featured and secondary projects for a clean grid layout
  const allProjects = projects

  return (
    <MotionSection id="projetos" className="px-4 py-24 sm:px-6 lg:px-8" variant="rise">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
        
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} t={t} onDetails={onDetails} />
          ))}
        </motion.div>
      </div>
    </MotionSection>
  )
}
