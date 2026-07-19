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
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    if (leftColRef.current) {
      tl.from(leftColRef.current.children, {
        y: 40,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      })
    }

    if (rightColRef.current) {
      tl.from(rightColRef.current.children, {
        y: 20,
        opacity: 0,
        filter: 'blur(5px)',
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.8')
    }

    if (footerRef.current) {
      tl.from(footerRef.current.children, {
        y: 10,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.6')
    }

  }, { scope: containerRef })

  return (
    <section id="contato" className="px-4 py-32 sm:px-6 lg:px-8 bg-black text-[#F4F1EA] mt-24" ref={containerRef}>
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-16 justify-between items-start">
        <div className="max-w-2xl" ref={leftColRef}>
          <p className="font-mono text-xs font-bold uppercase tracking-widest2 text-[#F4F1EA]/60 mb-6 will-change-transform">{t.contact.eyebrow}</p>
          <h2 className="font-display text-5xl font-black tracking-tightest sm:text-7xl mb-8 will-change-transform">
            {t.contact.title}
          </h2>
          <p className="text-xl text-[#F4F1EA]/80 max-w-xl will-change-transform">
            {t.contact.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto mt-8 md:mt-0" ref={rightColRef}>
          <a href={links.email} className="group flex items-center justify-between border-b border-[#F4F1EA]/20 pb-4 text-2xl font-bold hover:border-[#F4F1EA] transition-colors will-change-transform">
            <span>{t.contact.emailLabel}</span>
            <Mail size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F4F1EA]/20 pb-4 text-2xl font-bold hover:border-[#F4F1EA] transition-colors will-change-transform">
            <span>{t.contact.linkedinLabel}</span>
            <ContactRound size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F4F1EA]/20 pb-4 text-2xl font-bold hover:border-[#F4F1EA] transition-colors will-change-transform">
            <span>{t.contact.githubLabel}</span>
            <Code2 size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.resume} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F4F1EA]/20 pb-4 text-2xl font-bold hover:border-[#F4F1EA] transition-colors will-change-transform">
            <span>{t.common.downloadResume}</span>
            <FileDown size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl mt-32 border-t border-[#F4F1EA]/20 pt-8 flex justify-between items-center text-sm font-medium text-[#F4F1EA]/60" ref={footerRef}>
        <p className="will-change-transform">© {new Date().getFullYear()} Thiago Filipe</p>
        <p className="will-change-transform">Vanilla Premium UI</p>
      </div>
    </section>
  )
}
