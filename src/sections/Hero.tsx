import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import type { Translation } from '../data/types'
import { MotionSection } from '../components/MotionSection'

export function Hero({ t }: { t: Translation }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center px-4 pt-20 pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <div className="overflow-hidden">
            <motion.h1 variants={item} className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-vanilla-text">
              {t.hero.title}
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.h2 variants={item} className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-vanilla-muted">
              {t.hero.subtitle}
            </motion.h2>
          </div>

          <motion.div variants={item} className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="max-w-xl text-2xl leading-relaxed text-vanilla-text font-medium">
              Software Engineer focado em IA, Automação e Sistemas de Alta Performance.
            </p>
            
            <a 
              href="#sobre"
              className="group flex h-16 w-16 items-center justify-center rounded-full bg-vanilla-text text-vanilla-bg transition-transform hover:scale-105 shrink-0"
            >
              <ArrowDown size={24} className="transition-transform group-hover:translate-y-1" />
            </a>
          </motion.div>
        </motion.div>

        <MotionSection delay={0.6} className="mt-32 flex flex-wrap gap-8 md:gap-16 border-t border-vanilla-border pt-8">
          {t.hero.metrics.map((metric) => (
            <span
              key={metric}
              className="text-sm font-bold uppercase tracking-widest2 text-vanilla-muted"
            >
              {metric}
            </span>
          ))}
        </MotionSection>
      </div>
    </section>
  )
}
