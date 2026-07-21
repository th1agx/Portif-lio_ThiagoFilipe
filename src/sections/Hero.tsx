import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import type { Translation } from '../data/types'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero({ t, isLoaded }: { t: Translation; isLoaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Cinematic Entrance Animation - Subtle fade-in when revealed
  useGSAP(() => {
    if (!isLoaded || !containerRef.current || !contentRef.current) return

    gsap.fromTo(contentRef.current.children, 
      { opacity: 0.8, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power2.out' }
    )
  }, [isLoaded])

  // Camera Fly-through (Scroll Scrub with subtle depth, no heavy blur)
  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return

    gsap.to(contentRef.current, {
      z: -120, // Gentle push into depth
      yPercent: -10, // Subtle parallax
      opacity: 0.1, // Fade out smoothly without blurring to illegibility
      filter: 'blur(2px)', // Minimal art-direction blur
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
  }, { scope: containerRef })

  const renderSplitText = (text: string, className: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-3 mr-[0.3em]">
        <span className={`inline-block ${className}`}>{word}</span>
      </span>
    ))
  }

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center pt-20 pb-32" ref={containerRef} style={{ transformStyle: 'preserve-3d' }}>
      <div className="mx-auto w-full" ref={contentRef} style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex flex-col gap-6 will-change-transform">
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-vanilla-text leading-[1.1]">
            {renderSplitText(t.hero.title, 'hero-title-word')}
          </h1>
          
          <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-vanilla-muted leading-[1.2]">
            {renderSplitText(t.hero.subtitle, 'hero-subtitle-word')}
          </h2>

          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="max-w-xl text-2xl leading-relaxed text-vanilla-text font-medium">
              Software Engineer focado em IA, Automação e Sistemas de Alta Performance.
            </p>
            
            <a 
              href="#sobre"
              className="group flex h-16 w-16 items-center justify-center rounded-full bg-vanilla-text text-vanilla-bg transition-transform shrink-0 hover:scale-110"
            >
              <ArrowDown size={24} />
            </a>
          </div>
        </div>

        <div className="mt-32 flex flex-wrap gap-8 md:gap-16 border-t border-vanilla-border pt-8 will-change-transform">
          {t.hero.metrics.map((metric) => (
            <span
              key={metric}
              className="hero-badge text-sm font-bold uppercase tracking-widest2 text-vanilla-muted"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
