import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import type { Translation } from '../data/types'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero({ t, isLoaded }: { t: Translation; isLoaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // Initial Entrance Animation
  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero-title-word', {
      y: 80,
      opacity: 0,
      filter: 'blur(16px)',
      duration: 1.4,
      stagger: 0.05,
      delay: 0.2
    })
    .from('.hero-subtitle-word', {
      y: 50,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 1.2,
      stagger: 0.03,
    }, '-=1.0')
    .from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
    }, '-=0.8')
    .from(ctaRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
    }, '-=1.0')
    .from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
    }, '-=0.8')

  }, [isLoaded])

  // Scrub Parallax on Scroll
  useGSAP(() => {
    if (!containerRef.current) return

    // The entire hero section fades and blurs out slowly as it goes up
    gsap.to(containerRef.current, {
      opacity: 0,
      filter: 'blur(10px)',
      yPercent: 30, // Moves down slightly while page scrolls up (parallax)
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Sub-elements move at different speeds (true parallax)
    gsap.to(titleRef.current, {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true }
    })
    
    gsap.to(subtitleRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true }
    })

    gsap.to([descRef.current, ctaRef.current], {
      yPercent: -60,
      ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true }
    })

  }, { scope: containerRef })

  const renderSplitText = (text: string, className: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-3 mr-[0.3em]">
        <span className={`inline-block ${className} will-change-transform`}>{word}</span>
      </span>
    ))
  }

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center px-4 pt-20 pb-32 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6">
          <h1 ref={titleRef} className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-vanilla-text leading-[1.1] will-change-transform">
            {renderSplitText(t.hero.title, 'hero-title-word')}
          </h1>
          
          <h2 ref={subtitleRef} className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-vanilla-muted leading-[1.2] will-change-transform">
            {renderSplitText(t.hero.subtitle, 'hero-subtitle-word')}
          </h2>

          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p ref={descRef} className="max-w-xl text-2xl leading-relaxed text-vanilla-text font-medium will-change-transform">
              Software Engineer focado em IA, Automação e Sistemas de Alta Performance.
            </p>
            
            <a 
              ref={ctaRef}
              href="#sobre"
              className="group flex h-16 w-16 items-center justify-center rounded-full bg-vanilla-text text-vanilla-bg transition-transform shrink-0 will-change-transform"
            >
              <ArrowDown size={24} className="transition-transform" />
            </a>
          </div>
        </div>

        <div ref={badgeRef} className="mt-32 flex flex-wrap gap-8 md:gap-16 border-t border-vanilla-border pt-8 will-change-transform">
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
