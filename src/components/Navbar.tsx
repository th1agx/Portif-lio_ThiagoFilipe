import { Menu, X } from 'lucide-react'
import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Locale, Translation } from '../data/types'
import { LanguageToggle } from './LanguageToggle'

type NavbarProps = {
  locale: Locale
  t: Translation
  onLocaleChange: (locale: Locale) => void
}

export function Navbar({ locale, t, onLocaleChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial load animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.1
    })
  }, { scope: navRef })

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', display: 'block' }
      )
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0, y: -20, scale: 0.95, duration: 0.3, ease: 'power3.in',
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = 'none'
        }
      })
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#sobre' },
    { name: t.nav.stack, href: '#stack' },
    { name: t.nav.projects, href: '#projetos' },
    { name: t.nav.experience, href: '#experiencia' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-fit px-4 will-change-transform"
      >
        <div className="flex items-center gap-6 rounded-full border border-vanilla-border bg-vanilla-bg/70 px-6 py-3 backdrop-blur-md shadow-subtle">
          <div className="flex shrink-0 items-center">
            <span className="font-display text-lg font-bold tracking-tight text-vanilla-text">
              Thiago Filipe
            </span>
          </div>
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-vanilla-muted transition-colors hover:text-vanilla-text"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:block pl-2 border-l border-vanilla-border">
            <LanguageToggle locale={locale} onToggle={onLocaleChange} />
          </div>
          
          <div className="flex md:hidden">
            <button onClick={toggleMenu} type="button" className="text-vanilla-text hover:text-vanilla-muted">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-vanilla-border bg-vanilla-bg/95 p-6 backdrop-blur-xl md:hidden shadow-subtle"
        style={{ display: 'none' }}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-vanilla-text"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-vanilla-border">
            <LanguageToggle locale={locale} onToggle={onLocaleChange} />
          </div>
        </div>
      </div>
    </>
  )
}
