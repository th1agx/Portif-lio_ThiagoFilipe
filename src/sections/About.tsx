import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '../components/SectionHeader'
import type { Translation } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

export function About({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return

    // Camera flies INTO the About section (comes from z: -1500 to z: 0)
    gsap.from(contentRef.current, {
      z: -1500,
      opacity: 0,
      filter: 'blur(30px)',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom', // Start animating as soon as it enters viewport
        end: 'top 30%',     // Finished moving into place when it's near the top
        scrub: 1.5,
      }
    })

    // Slight parallax effect on the image itself that continues even after entrance
    gsap.to(imageRef.current, {
      yPercent: -20,
      rotateX: 5, // Subtle 3D breathing
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2, 
      }
    })

  }, { scope: containerRef })

  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8 relative" ref={containerRef} style={{ transformStyle: 'preserve-3d' }}>
      <div className="mx-auto max-w-7xl" ref={contentRef} style={{ transformStyle: 'preserve-3d' }}>
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] items-start" style={{ transformStyle: 'preserve-3d' }}>
          
          <div className="w-full will-change-transform" ref={imageRef}>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-vanilla-bg shadow-subtle border border-vanilla-border/50">
              <img
                src="./profile/thiago-filipe.jpeg"
                alt={t.hero.photoAlt}
                className="h-full w-full object-cover object-[50%_18%] transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="h-full flex flex-col justify-center will-change-transform">
            <div className="mb-8">
              <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
            </div>

            <div className="flex flex-col gap-6">
              {t.about.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-relaxed ${i === 0 ? 'text-2xl font-medium text-vanilla-text leading-snug' : 'text-vanilla-muted'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
