import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { links } from '../data/links'
import type { Locale, Translation } from '../data/types'
import { Button } from './Button'
import { LanguageToggle } from './LanguageToggle'

type NavbarProps = {
  locale: Locale
  t: Translation
  onLocaleChange: (locale: Locale) => void
}

const navItems = [
  ['#home', 'home'],
  ['#sobre', 'about'],
  ['#stack', 'stack'],
  ['#projetos', 'projects'],
  ['#labs', 'labs'],
  ['#experiencia', 'experience'],
  ['#certificacoes', 'certifications'],
  ['#contato', 'contact'],
] as const

export function Navbar({ locale, t, onLocaleChange }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const sections = navItems
      .map(([href]) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.12, 0.28, 0.45] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const linksMarkup = navItems.map(([href, key]) => (
    <a
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      className={`relative rounded px-2 py-1 text-sm font-semibold transition ${
        activeSection === href ? 'text-studio-text' : 'text-studio-muted hover:text-studio-text'
      }`}
    >
      {t.nav[key]}
      {activeSection === href ? (
        <motion.span
          layoutId="active-nav"
          className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-studio-candy"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      ) : null}
    </a>
  ))

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-studio-bg/70 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <a href="#home" className="flex items-center gap-3" aria-label="Thiago Filipe">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-studio-royal via-studio-purple to-studio-candy font-display text-sm font-extrabold">
            TF
          </span>
          <span className="hidden font-display text-sm font-bold text-studio-text sm:block">Thiago Filipe</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">{linksMarkup}</div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <Button href={links.resume} variant="secondary" target="_blank" rel="noreferrer">
            {t.common.downloadResume}
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-studio-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t.common.close : 'Menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-white/10 bg-studio-bg/95 px-4 py-4 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {linksMarkup}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <LanguageToggle locale={locale} onChange={onLocaleChange} />
              <Button href={links.resume} variant="secondary" target="_blank" rel="noreferrer">
                {t.common.downloadResume}
              </Button>
            </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
