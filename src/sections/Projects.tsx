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
  const featured = projects.filter((project) => project.featured)
  const secondary = projects.filter((project) => !project.featured)

  return (
    <>
      <MotionSection id="projetos" className="px-4 py-24 sm:px-6 lg:px-8" variant="rise">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
          <div className="mb-6 inline-flex rounded-lg border border-white/10 bg-white/[0.05] p-1">
            <a href="#projetos" className="rounded-md bg-studio-royal px-4 py-2 text-sm font-bold text-white">
              {t.projects.featuredTitle}
            </a>
            <a href="#labs" className="rounded-md px-4 py-2 text-sm font-bold text-studio-muted transition hover:text-studio-text">
              {t.projects.secondaryTitle}
            </a>
          </div>
          <motion.div
            className="grid gap-5 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.08 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} t={t} onDetails={onDetails} />
            ))}
          </motion.div>
        </div>
      </MotionSection>

      <MotionSection id="labs" className="px-4 py-24 sm:px-6 lg:px-8" variant="slide">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-5 font-display text-2xl font-bold text-studio-text">{t.projects.secondaryTitle}</h3>
          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.08 }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {secondary.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} t={t} compact onDetails={onDetails} />
            ))}
          </motion.div>
        </div>
      </MotionSection>
    </>
  )
}
