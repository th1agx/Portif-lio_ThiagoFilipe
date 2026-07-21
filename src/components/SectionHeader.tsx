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

    gsap.from(containerRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {eyebrow && (
        <span className="font-mono text-sm font-bold uppercase tracking-widest2 text-vanilla-muted will-change-transform">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-bold tracking-tight text-vanilla-text sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-lg text-vanilla-muted will-change-transform">
          {description}
        </p>
      )}
    </div>
  )
}
