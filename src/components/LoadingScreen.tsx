import { useRef, useEffect } from 'react'
import gsap from 'gsap'

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !progressRef.current || !percentRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })

    // Simulated loading progress
    const progressObj = { value: 0 }
    
    tl.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.innerText = `${Math.round(progressObj.value)}%`
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${progressObj.value}%`
        }
      }
    })

    // Fade out text and bar
    tl.to([textRef.current, progressRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '-=0.2')

    // Slide the whole container up (curtain effect)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
    }, '-=0.2')

  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-vanilla-text text-vanilla-bg"
    >
      <div ref={textRef} className="flex flex-col items-center text-center">
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">THIAGO FILIPE</h1>
        <p className="mt-4 text-xl tracking-widest uppercase font-mono opacity-60">Software Engineer</p>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-64">
        <div className="w-full h-[1px] bg-vanilla-bg/20 relative overflow-hidden">
          <div ref={progressRef} className="absolute left-0 top-0 bottom-0 bg-vanilla-bg w-0" />
        </div>
        <div className="flex justify-between w-full text-xs font-mono tracking-widest opacity-60">
          <span>INITIALIZING</span>
          <span ref={percentRef}>0%</span>
        </div>
      </div>
    </div>
  )
}
