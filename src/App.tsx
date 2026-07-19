import { useEffect, useMemo, useState } from 'react'

import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Navbar } from './components/Navbar'
import { CursorTrail } from './components/CursorTrail'
import { ProjectDrawer } from './components/ProjectDrawer'
import { translations } from './data/i18n'
import type { Locale, Project } from './data/types'

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
  }, [locale, t])

  return (
    <div className="relative min-h-screen selection:bg-vanilla-text selection:text-vanilla-bg">
      <CursorTrail />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-x border-vanilla-border bg-vanilla-bg">
        <Navbar locale={locale} t={t} onLocaleChange={setLocale} />
        
        <main className="flex flex-col gap-0 divide-y divide-vanilla-border">
          <Hero t={t} />
          <About t={t} />
          <Skills t={t} />
          <Projects locale={locale} t={t} onDetails={setSelectedProject} />
          <Experience t={t} />
          <Certifications t={t} />
        </main>
        
        <Contact t={t} />
      </div>

      <ProjectDrawer project={selectedProject} locale={locale} t={t} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
