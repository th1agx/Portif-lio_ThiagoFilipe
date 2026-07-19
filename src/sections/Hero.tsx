import { ArrowDown, Code2, Contact, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { links } from '../data/links'
import type { Translation } from '../data/types'

export function Hero({ t }: { t: Translation }) {
  const reduceMotion = false
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  }
  const heroItem = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40">
      <motion.div
        className="absolute inset-x-0 top-16 h-72 bg-[linear-gradient(95deg,transparent,rgba(49,92,255,0.14),rgba(122,60,255,0.11),rgba(255,77,109,0.08),transparent)] blur-2xl"
        animate={reduceMotion ? undefined : { x: ['-8%', '8%', '-4%'], opacity: [0.55, 0.9, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-0 top-28 h-px bg-gradient-to-r from-transparent via-studio-royal/45 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial="hidden" animate="visible" variants={heroContainer}>
          <motion.p
            variants={heroItem}
            className="mb-5 inline-flex rounded border border-studio-candy/30 bg-studio-candy/10 px-3 py-1 font-mono text-xs font-bold uppercase text-studio-candy"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-studio-text sm:text-6xl lg:text-7xl"
          >
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={{ y: '100%', opacity: 0, rotateZ: 3 }}
                animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="origin-bottom-left"
              >
                Thiago Filipe
              </motion.div>
            </div>
            <div className="overflow-hidden mt-3">
              <motion.span 
                initial={{ y: '100%', opacity: 0, rotateZ: 2 }}
                animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="animated-gradient-text block bg-gradient-to-r from-studio-royal via-studio-purple to-studio-candy bg-clip-text text-transparent origin-bottom-left"
              >
                {t.hero.title}
              </motion.span>
            </div>
          </motion.h1>
          <motion.p variants={heroItem} className="mt-6 max-w-2xl text-lg leading-8 text-studio-muted">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
            <Button href="#projetos">
              {t.hero.primaryCta} <ArrowDown size={16} />
            </Button>
            <Button href="#contato" variant="secondary">
              {t.hero.secondaryCta}
            </Button>
            <Button href={links.resume} variant="ghost" target="_blank" rel="noreferrer">
              {t.common.downloadResume}
            </Button>
          </motion.div>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
            {t.hero.metrics.map((metric, index) => (
              <motion.span
                key={metric}
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
                className="rounded border border-white/10 bg-white/[0.05] px-3 py-2 font-mono text-xs font-bold text-studio-muted"
              >
                {metric}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={reduceMotion ? undefined : { y: -8, rotate: -0.6 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            className="absolute -inset-8 rounded-full bg-gradient-to-br from-studio-royal/40 via-studio-purple/40 to-studio-candy/40 blur-3xl mix-blend-screen"
            animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-studio-candy/30 to-studio-royal/30 blur-2xl mix-blend-color-dodge"
            animate={reduceMotion ? undefined : { opacity: [0.5, 0.8, 0.5], scale: [1.02, 0.98, 1.02] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-3 shadow-glow backdrop-blur">
            <motion.div
              className="absolute right-5 top-5 z-10 h-3 w-14 rounded-full bg-studio-candy shadow-candy"
              animate={reduceMotion ? undefined : { width: [56, 24, 56], opacity: [1, 0.65, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img
              src="./profile/thiago-filipe.jpeg"
              alt={t.hero.photoAlt}
              className="aspect-[4/5] w-full rounded-xl object-cover object-[50%_18%]"
              loading="eager"
            />
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-studio-bg/80 px-4 py-3">
              <span className="font-mono text-xs font-bold uppercase text-studio-muted">{t.common.availableFor}</span>
              <MapPin size={16} className="text-studio-candy" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-12 flex max-w-7xl flex-wrap gap-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55 }}
      >
        <Button href={links.github} variant="secondary" target="_blank" rel="noreferrer">
          <Code2 size={16} /> GitHub
        </Button>
        <Button href={links.linkedin} variant="secondary" target="_blank" rel="noreferrer">
          <Contact size={16} /> LinkedIn
        </Button>
        <Button href={links.email} variant="secondary">
          <Mail size={16} /> Email
        </Button>
      </motion.div>
    </section>
  )
}
