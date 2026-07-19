import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Locale, Translation } from '../data/types'
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
  ['#experiencia', 'experience'],
] as const

export function Navbar({ locale, t, onLocaleChange }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(true) // Hidden at the very top to let Hero shine

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar after scrolling past 150px
    if (latest > 150) {
      setHidden(false)
    } else {
      setHidden(true)
      setOpen(false) // Close mobile menu if at top
    }
  })

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
      className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        activeSection === href ? 'text-galaxy-text' : 'text-galaxy-muted hover:text-galaxy-cyan'
      }`}
    >
      {t.nav[key as keyof typeof t.nav] || key}
      {activeSection === href ? (
        <motion.span
          layoutId="active-nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] border border-white/[0.05]"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      ) : null}
    </a>
  ))

  return (
    <>
      <motion.header 
        className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none"
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -20, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav 
          className="nav-pill flex items-center gap-2 rounded-full px-2 py-2 pointer-events-auto shadow-card" 
          aria-label="Main"
        >
          <a href="#home" className="flex items-center justify-center h-8 w-8 ml-1 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-colors" aria-label="Thiago Filipe">
            <span className="font-display text-xs font-extrabold tracking-wider text-galaxy-text">
              TF
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex ml-2 mr-2">
            {linksMarkup}
          </div>

          <div className="hidden items-center md:flex ml-1 mr-1">
            <LanguageToggle locale={locale} onChange={onLocaleChange} />
          </div>

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-galaxy-text md:hidden ml-auto mr-1"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t.common.close : 'Menu'}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && !hidden ? (
          <motion.div
            className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-white/10 bg-galaxy-surface/95 px-4 py-6 shadow-glow backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-2">
              {linksMarkup}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <LanguageToggle locale={locale} onChange={onLocaleChange} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
