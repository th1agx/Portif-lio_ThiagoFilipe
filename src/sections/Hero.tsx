import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import type { Translation } from '../data/types'

export function Hero({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animate title words
    tl.from('.hero-title-word', {
      y: 60,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 1.2,
      stagger: 0.04,
      delay: 0.2
    })
    // Animate subtitle words
    .from('.hero-subtitle-word', {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1,
      stagger: 0.02,
    }, '-=0.8')
    // Animate description and CTA
    .from('.hero-desc', {
      y: 20,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from('.hero-cta', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.5)',
    }, '-=0.8')
    // Animate badges in cascade
    .from('.hero-badge', {
      y: 15,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    }, '-=0.6')

  }, { scope: containerRef })

  // Helper to split text into words wrapped in overflow-hidden
  const renderSplitText = (text: string, className: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-2 mr-[0.3em]">
        <span className={`inline-block ${className} will-change-transform`}>{word}</span>
      </span>
    ))
  }

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center px-4 pt-20 pb-32 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-vanilla-text leading-[1.1]">
            {renderSplitText(t.hero.title, 'hero-title-word')}
          </h1>
          
          <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-vanilla-muted leading-[1.2]">
            {renderSplitText(t.hero.subtitle, 'hero-subtitle-word')}
          </h2>

          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="hero-desc max-w-xl text-2xl leading-relaxed text-vanilla-text font-medium will-change-transform">
              Software Engineer focado em IA, Automação e Sistemas de Alta Performance.
            </p>
            
            <a 
              href="#sobre"
              className="hero-cta group flex h-16 w-16 items-center justify-center rounded-full bg-vanilla-text text-vanilla-bg transition-transform hover:scale-105 shrink-0 will-change-transform"
            >
              <ArrowDown size={24} className="transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        <div className="mt-32 flex flex-wrap gap-8 md:gap-16 border-t border-vanilla-border pt-8">
          {t.hero.metrics.map((metric) => (
            <span
              key={metric}
              className="hero-badge text-sm font-bold uppercase tracking-widest2 text-vanilla-muted will-change-transform"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
