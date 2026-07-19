import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import type { Locale, Translation } from '../data/types'
import { LanguageToggle } from './LanguageToggle'

type NavbarProps = {
  locale: Locale
  t: Translation
  onLocaleChange: (locale: Locale) => void
}

export function Navbar({ locale, t, onLocaleChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar always unless we scroll down fast, or just keep it floating.
    // Let's keep it always floating, but maybe add a backdrop shadow on scroll.
    if (latest > 50) {
      setIsVisible(true)
    } else {
      setIsVisible(true)
    }
  })

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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible || isOpen ? 0 : -100,
          opacity: isVisible || isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-fit px-4"
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
          
          {/* Hamburger for mobile */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} type="button" className="text-vanilla-text hover:text-vanilla-muted">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-vanilla-border bg-vanilla-bg/95 p-6 backdrop-blur-xl md:hidden shadow-subtle"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
