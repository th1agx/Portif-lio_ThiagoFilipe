import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '../components/SectionHeader'
import { TechBadge } from '../components/TechBadge'
import type { Translation } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

export function Skills({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!listRef.current) return

    const items = listRef.current.children
    
    gsap.from(items, {
      y: 40,
      opacity: 0,
      filter: 'blur(0px)',
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 1, // Smooth scrub
      }
    })
  }, { scope: containerRef })

  return (
    <section id="stack" className="px-4 py-24 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />
        </div>
        
        <div className="border-t border-vanilla-border" ref={listRef}>
          {t.skills.groups.map((group) => (
            <article key={group.title} className="grid gap-6 md:grid-cols-[1fr_3fr] border-b border-vanilla-border py-8 will-change-transform">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-vanilla-text">{group.title}</h3>
              </div>
              
              <div className="flex flex-wrap items-start gap-2">
                {group.items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
