import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function MotionSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom Jitter/GSAP style easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
