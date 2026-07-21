import { useEffect, useMemo, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
import { LoadingScreen } from './components/LoadingScreen'
import { Scene } from './components/Scene'
import { translations } from './data/i18n'
import type { Locale, Project } from './data/types'

gsap.registerPlugin(ScrollTrigger)

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
  
  // To be implemented in Stage 2
  const [isLoading, setIsLoading] = useState(true)
  
  const mainWrapperRef = useRef<HTMLDivElement>(null)
  const t = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    window.localStorage.setItem('thiago-portfolio-locale', locale)
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title

    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription?.setAttribute('content', t.meta.description)
  }, [locale, t])

  // Global Scroll & Animation Context Architecture
  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    if (isLoading) {
      lenis.stop()
    } else {
      lenis.start()
    }

    // 2. GSAP Sync
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    // 3. Master Timeline Setup
    const masterCtx = gsap.context(() => {
      // Global timelines and parallax controllers
    }, mainWrapperRef)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      masterCtx.revert()
    }
  }, [isLoading])

  return (
    <div 
      ref={mainWrapperRef}
      className="relative min-h-screen selection:bg-vanilla-text selection:text-vanilla-bg bg-transparent overflow-hidden" 
    >
      {/* 3D WebGL Background Layer */}
      <Scene />

      {/* Cinematic Loader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Interactive Cursor Layer */}
      <CursorTrail />
      
      {/* Fixed Navbar rendered on top from frame 1 */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
        <Navbar locale={locale} t={t} onLocaleChange={setLocale} />
      </div>

      {/* DOM Layer (HTML Layout) */}
      <div className="relative z-10 w-full" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        
        <main className="flex flex-col gap-0 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ transformStyle: 'preserve-3d' }}>
          {/* Hero section */}
          <Hero t={t} isLoaded={!isLoading} />
          <About t={t} />
          <Skills t={t} />
          <Projects locale={locale} t={t} onDetails={setSelectedProject} />
          <Experience t={t} />
          <Certifications t={t} />
        </main>
        
        <div className="w-full relative z-20 bg-[#111111] text-[#F6F4EF] mt-24">
          <Contact t={t} />
        </div>
      </div>

      <ProjectDrawer project={selectedProject} locale={locale} t={t} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
