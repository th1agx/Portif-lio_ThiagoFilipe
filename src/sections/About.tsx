import { SectionHeader } from '../components/SectionHeader'
import { MotionSection } from '../components/MotionSection'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function About({ t }: { t: Translation }) {
  return (
    <MotionSection id="sobre" className="px-4 py-24 sm:px-6 lg:px-8" variant="slide">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="scanline absolute inset-0 z-20 pointer-events-none rounded-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-galaxy-surface/50 p-2 shadow-card backdrop-blur-md">
              <img
                src="./profile/thiago-filipe.jpeg"
                alt={t.hero.photoAlt}
                className="aspect-[4/5] w-full rounded-xl object-cover object-[50%_18%] filter grayscale-[30%] contrast-[1.1] transition-all duration-700 hover:grayscale-0 hover:contrast-100"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-galaxy-cyan/20 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-galaxy-purple/20 blur-2xl" />
          </motion.div>

          <div>
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {t.about.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={paragraph}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                  className={`text-lg leading-relaxed ${i === 0 ? 'text-galaxy-text font-medium text-xl' : 'text-galaxy-muted'}`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </MotionSection>
  )
}
