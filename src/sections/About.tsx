import { SectionHeader } from '../components/SectionHeader'
import type { Translation } from '../data/types'
import { motion } from 'framer-motion'

export function About({ t }: { t: Translation }) {
  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] items-start">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* Imagem em P&B com contorno rígido - Estilo Editorial */}
            <div className="aspect-[3/4] w-full overflow-hidden border border-vanilla-border bg-vanilla-bg p-2">
              <img
                src="./profile/thiago-filipe.jpeg"
                alt={t.hero.photoAlt}
                className="h-full w-full object-cover object-[50%_18%] grayscale contrast-125"
                loading="lazy"
              />
            </div>
            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest2 text-vanilla-muted">
              FIG 1. — {t.hero.photoAlt}
            </p>
          </motion.div>

          <div className="lg:pl-12 lg:border-l lg:border-vanilla-border h-full">
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
            <motion.div
              className="flex flex-col gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {t.about.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={paragraph}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                  className={`text-lg leading-relaxed ${i === 0 ? 'text-2xl font-medium text-vanilla-text leading-snug' : 'text-vanilla-muted'}`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
