import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, ContactRound, Mail, FileDown } from 'lucide-react'
import { links } from '../data/links'
import type { Translation } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

export function Contact({ t }: { t: Translation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // Scrub parallax for the dark section (feels like an unveiling)
    gsap.from(containerRef.current, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      }
    })

    if (leftColRef.current) {
      gsap.from(leftColRef.current.children, {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 1,
        }
      })
    }

    if (rightColRef.current) {
      gsap.from(rightColRef.current.children, {
        y: 40,
        opacity: 0,
        filter: 'blur(5px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 1,
        }
      })
    }

  }, { scope: containerRef })

  return (
    <section id="contato" className="px-4 py-32 sm:px-6 lg:px-8 mt-24 will-change-transform" ref={containerRef}>
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-16 justify-between items-start">
        <div className="max-w-2xl" ref={leftColRef}>
          <p className="font-mono text-xs font-bold uppercase tracking-widest2 text-vanilla-muted mb-6 will-change-transform">{t.contact.eyebrow}</p>
          <h2 className="font-display text-5xl font-black tracking-tightest sm:text-7xl mb-8 will-change-transform text-vanilla-text">
            {t.contact.title}
          </h2>
          <p className="text-xl text-vanilla-muted max-w-xl will-change-transform">
            {t.contact.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto mt-8 md:mt-0" ref={rightColRef}>
          <a href={links.email} className="group flex items-center justify-between border-b border-vanilla-border pb-4 text-2xl font-bold hover:text-vanilla-muted transition-colors will-change-transform text-vanilla-text">
            <span>{t.contact.emailLabel}</span>
            <Mail size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-vanilla-border pb-4 text-2xl font-bold hover:text-vanilla-muted transition-colors will-change-transform text-vanilla-text">
            <span>{t.contact.linkedinLabel}</span>
            <ContactRound size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-vanilla-border pb-4 text-2xl font-bold hover:text-vanilla-muted transition-colors will-change-transform text-vanilla-text">
            <span>{t.contact.githubLabel}</span>
            <Code2 size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.resume} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-vanilla-border pb-4 text-2xl font-bold hover:text-vanilla-muted transition-colors will-change-transform text-vanilla-text">
            <span>{t.common.downloadResume}</span>
            <FileDown size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl mt-32 border-t border-vanilla-border pt-8 flex justify-between items-center text-sm font-medium text-vanilla-muted">
        <p>© {new Date().getFullYear()} Thiago Filipe</p>
        <p>Creative Developer</p>
      </div>
    </section>
  )
}
