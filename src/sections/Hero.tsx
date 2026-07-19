import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import type { Translation } from '../data/types'

export function Hero({ t }: { t: Translation }) {
  const reduceMotion = false

  return (
    <section id="home" className="relative flex min-h-[90vh] flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
      
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tightest leading-[0.85] text-vanilla-text uppercase">
            <span className="block">{t.hero.title}</span>
            <span className="block text-vanilla-muted">{t.hero.subtitle}</span>
          </h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-vanilla-border pt-8">
            <p className="max-w-xl text-xl leading-relaxed text-vanilla-text font-medium">
              Software Engineer focado em IA, Automação e Sistemas de Alta Performance.
            </p>
            
            <a 
              href="#sobre"
              className="group flex h-16 w-16 items-center justify-center rounded-full border border-vanilla-border transition-colors hover:bg-vanilla-text hover:text-vanilla-bg shrink-0"
            >
              <ArrowDown size={24} className="transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 flex flex-wrap gap-8 md:gap-16 border-t border-vanilla-border pt-8"
        >
          {t.hero.metrics.map((metric) => (
            <span
              key={metric}
              className="text-sm font-bold uppercase tracking-widest2 text-vanilla-muted"
            >
              {metric}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
