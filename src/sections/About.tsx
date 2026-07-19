import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '../components/SectionHeader'
import type { Translation } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

export function About({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // Scrubbed entrance for the image (continuous reveal)
    gsap.from(imageRef.current, {
      y: 120,
      opacity: 0,
      rotationX: 15,
      scale: 0.9,
      filter: 'blur(20px)',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        end: 'top 40%',
        scrub: 1.5,
      }
    })

    // Slight parallax effect on the image itself that continues even after entrance
    gsap.to(imageRef.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, 
      }
    })

    // Scrubbed text paragraphs
    const paragraphs = textRef.current?.querySelectorAll('p')
    if (paragraphs) {
      gsap.from(paragraphs, {
        y: 60,
        opacity: 0,
        filter: 'blur(12px)',
        stagger: 0.2, // Stagger works with scrub by spreading the animation duration
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.2,
        }
      })
    }

  }, { scope: containerRef })

  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] items-start" style={{ perspective: '1200px' }}>
          
          <div className="w-full will-change-transform" ref={imageRef}>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-vanilla-bg shadow-subtle border border-vanilla-border/50 transition-transform duration-700 hover:scale-[1.02] hover:rotate-1">
              <img
                src="./profile/thiago-filipe.jpeg"
                alt={t.hero.photoAlt}
                className="h-full w-full object-cover object-[50%_18%]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="h-full flex flex-col justify-center" ref={textRef}>
            <div className="mb-8">
              <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
            </div>

            <div className="flex flex-col gap-6">
              {t.about.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-relaxed will-change-transform ${i === 0 ? 'text-2xl font-medium text-vanilla-text leading-snug' : 'text-vanilla-muted'}`}
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
