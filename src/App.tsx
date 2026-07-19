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
      {/* Layer 0: Galaxy gradient — sits ABOVE body's black bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(255, 42, 109, 0.45), transparent)',
              'radial-gradient(ellipse 70% 55% at 80% 20%, rgba(113, 28, 255, 0.45), transparent)',
              'radial-gradient(ellipse 80% 50% at 50% 90%, rgba(5, 213, 255, 0.3), transparent)',
              'linear-gradient(180deg, #000000 0%, #0a0518 50%, #000000 100%)',
            ].join(', '),
          }}
        />
        {/* Aurora overlay */}
        <div
          className="absolute"
          style={{
            inset: '-20%',
            background: [
              'linear-gradient(115deg, transparent 0%, rgba(49, 92, 255, 0.18) 28%, transparent 46%)',
              'linear-gradient(245deg, transparent 10%, rgba(122, 60, 255, 0.18) 42%, rgba(255, 77, 109, 0.12) 58%, transparent 78%)',
            ].join(', '),
            filter: 'blur(26px)',
            animation: 'studio-aurora 18s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Layer 1: Starfield canvas (z-index: 1 set in component) */}
      <Starfield />

      {/* Layer 2+: All content above the effects */}
      <Navbar locale={locale} t={t} onLocaleChange={setLocale} />
      <main key={locale} className="relative" style={{ zIndex: 5 }}>
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
