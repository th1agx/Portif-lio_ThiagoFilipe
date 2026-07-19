import { useEffect, useMemo, useState } from 'react'
import type { Locale, Project } from './data/types'
import { translations } from './data/i18n'
import { Starfield } from './components/Starfield'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { ProjectDrawer } from './components/ProjectDrawer'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  const stored = window.localStorage.getItem('thiago-portfolio-locale')
  return stored === 'en' || stored === 'pt' ? stored : 'pt'
}

function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const t = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    window.localStorage.setItem('thiago-portfolio-locale', locale)
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title

    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription?.setAttribute('content', t.meta.description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    ogTitle?.setAttribute('content', t.meta.title)

    const ogDescription = document.querySelector('meta[property="og:description"]')
    ogDescription?.setAttribute('content', t.meta.description)
  }, [locale, t])

  return (
    <>
      <Starfield />
      <Navbar locale={locale} t={t} onLocaleChange={setLocale} />
      <main key={locale}>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Projects locale={locale} t={t} onDetails={setSelectedProject} />
        <Experience t={t} />
        <Certifications t={t} />
        <Contact t={t} />
      </main>
      <ProjectDrawer project={selectedProject} locale={locale} t={t} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default App
