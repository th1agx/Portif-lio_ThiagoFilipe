import { useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type MotionSectionProps = {
  id: string
  children: ReactNode
  className?: string
  variant?: 'rise' | 'slide' | 'scale'
}

export function MotionSection({ id, children, className = '', variant = 'rise' }: MotionSectionProps) {
  const reduceMotion = false
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (reduceMotion || !sectionRef.current) return

    let initialVars: gsap.TweenVars = { opacity: 0 }
    
    if (variant === 'rise') {
      initialVars.y = 80
    } else if (variant === 'slide') {
      initialVars.x = -60
    } else if (variant === 'scale') {
      initialVars.y = 40
      initialVars.scale = 0.92
    }

    gsap.set(sectionRef.current, initialVars)

    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1, 
      },
    })
  }, { scope: sectionRef, dependencies: [variant, reduceMotion] })

  return (
    <section id={id} className={className} ref={sectionRef}>
      {children}
    </section>
  )
}
