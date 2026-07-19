import { ArrowDown, Code2, Contact, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { links } from '../data/links'
import type { Translation } from '../data/types'

export function Hero({ t }: { t: Translation }) {
  const reduceMotion = false

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Subtle top glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-galaxy-cyanDim to-transparent blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: -1 }}
      />
      
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center mt-[-4rem]">
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-eyebrow mb-6"
        >
          {t.hero.eyebrow}
        </motion.p>
        
        <motion.h1
          className="max-w-4xl font-display text-5xl font-bold tracking-tight text-galaxy-text sm:text-7xl lg:text-8xl"
        >
          <div className="overflow-hidden pb-1">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Thiago Filipe
            </motion.div>
          </div>
          <div className="overflow-hidden pb-3 pt-2">
            <motion.span 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className="animated-gradient-text block bg-gradient-to-r from-galaxy-cyan via-galaxy-purple to-galaxy-pink bg-clip-text text-transparent"
            >
              {t.hero.title}
            </motion.span>
          </div>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-galaxy-subtle sm:text-xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#projetos">
            {t.hero.primaryCta} <ArrowDown size={16} />
          </Button>
          <Button href={links.resume} variant="ghost" target="_blank" rel="noreferrer">
            {t.common.downloadResume}
          </Button>
        </motion.div>

        {/* Metrics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 flex flex-wrap justify-center gap-6 border-t border-white/5 pt-8"
        >
          {t.hero.metrics.map((metric) => (
            <span
              key={metric}
              className="text-sm font-medium text-galaxy-muted"
            >
              {metric}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Social Links Bottom Left */}
      <motion.div
        className="absolute bottom-8 left-8 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <a href={links.github} target="_blank" rel="noreferrer" className="text-galaxy-muted hover:text-galaxy-text transition-colors" aria-label="GitHub">
          <Code2 size={20} />
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-galaxy-muted hover:text-galaxy-text transition-colors" aria-label="LinkedIn">
          <Contact size={20} />
        </a>
        <a href={links.email} className="text-galaxy-muted hover:text-galaxy-text transition-colors" aria-label="Email">
          <Mail size={20} />
        </a>
      </motion.div>

      {/* Location Bottom Right */}
      <motion.div
        className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 text-sm text-galaxy-muted"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <MapPin size={16} className="text-galaxy-cyan" />
        {t.common.availableFor}
      </motion.div>
    </section>
  )
}
