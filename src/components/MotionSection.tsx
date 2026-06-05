import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type MotionSectionProps = {
  id: string
  children: ReactNode
  className?: string
  variant?: 'rise' | 'slide' | 'scale'
}

const variants = {
  rise: {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: -34 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
}

export function MotionSection({ id, children, className = '', variant = 'rise' }: MotionSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: false, amount: 0.16 }}
      variants={variants[variant]}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
