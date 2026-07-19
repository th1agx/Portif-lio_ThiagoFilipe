import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function MotionSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current, {
      y: 40,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.2,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse', // Permite que a animação desfaça se rolar para cima (opcional, mas premium)
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className} style={{ willChange: 'transform, opacity, filter' }}>
      {children}
    </div>
  )
}
