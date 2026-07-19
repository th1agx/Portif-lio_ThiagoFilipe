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

    // Animate the image block
    gsap.from(imageRef.current, {
      y: 80,
      opacity: 0,
      rotationX: 10,
      filter: 'blur(15px)',
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    })

    // Slight parallax effect on the image itself
    gsap.to(imageRef.current, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // Smooth scrub
      }
    })

    // Stagger text paragraphs
    const paragraphs = textRef.current?.querySelectorAll('p')
    if (paragraphs) {
      gsap.from(paragraphs, {
        y: 40,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      })
    }

  }, { scope: containerRef })

  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] items-start" style={{ perspective: '1000px' }}>
          
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
            <div className="opacity-0 translate-y-8" style={{ animation: 'none' }} /* Section header will be animated if we wrap it, but it has its own logic. Let's just animate the wrapper */>
               {/* Note: to animate SectionHeader seamlessly, we should probably refactor it or just animate its container */}
            </div>
            
            {/* We will just animate the paragraphs as requested */}
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
