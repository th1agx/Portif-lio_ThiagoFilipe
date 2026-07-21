import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        end: 'top 40%',
        scrub: 1, // Continuous scrub
      }
    })

    if (eyebrow) {
      tl.from('.header-eyebrow', {
        y: 40,
        opacity: 0,
        ease: 'none'
      })
    }

    tl.from('.header-title-word', {
      y: 40,
      opacity: 0,
      filter: 'blur(2px)',
      stagger: 0.08,
      ease: 'none'
    }, 0)

    if (description) {
      tl.from('.header-desc', {
        y: 40,
        opacity: 0,
        ease: 'none'
      }, 0.2) // slightly delayed relative to the timeline start
    }

  }, { scope: containerRef })

  const renderSplitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-1 mr-[0.25em]">
        <span className="header-title-word inline-block will-change-transform">{word}</span>
      </span>
    ))
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {eyebrow && (
        <span className="header-eyebrow font-mono text-sm font-bold uppercase tracking-widest2 text-vanilla-muted will-change-transform">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-bold tracking-tight text-vanilla-text sm:text-5xl">
        {renderSplitText(title)}
      </h2>
      {description && (
        <p className="header-desc max-w-2xl text-lg text-vanilla-muted will-change-transform">
          {description}
        </p>
      )}
    </div>
  )
}
