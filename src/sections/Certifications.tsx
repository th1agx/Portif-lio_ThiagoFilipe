import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '../components/SectionHeader'
import type { Translation } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

export function Certifications({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!listRef.current) return

    const items = listRef.current.children
    
    gsap.from(items, {
      y: 30,
      opacity: 0,
      filter: 'blur(0px)',
      duration: 1.0,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    })
  }, { scope: containerRef })

  return (
    <section id="certificacoes" className="px-4 py-24 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <SectionHeader eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
        </div>
        <div className="flex flex-col gap-6" ref={listRef}>
          {t.certifications.items.map((item) => (
            <div key={item} className="flex items-center gap-4 border-b border-vanilla-border pb-6 last:border-0 will-change-transform">
              <span className="font-display text-2xl font-bold text-vanilla-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
