import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
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
      <nav className="fixed top-0 left-0 right-0 z-40 bg-vanilla-bg border-b border-vanilla-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center">
            <span className="font-display text-2xl font-black tracking-tightest text-vanilla-text">
              TF.
            </span>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-vanilla-text hover:text-vanilla-muted transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pl-4 border-l border-vanilla-border">
              <LanguageToggle locale={locale} onToggle={onLocaleChange} />
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 text-vanilla-text"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 bg-vanilla-bg border-b border-vanilla-border md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-bold text-vanilla-text hover:bg-vanilla-border"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-3 pt-4 pb-2 border-t border-vanilla-border">
                <LanguageToggle locale={locale} onToggle={onLocaleChange} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
