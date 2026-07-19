import { useRef, useEffect } from 'react'
import gsap from 'gsap'

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const progressContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })

    // Cinematic Intro sequence
    // 1. Grid fades in very slowly
    tl.to(gridRef.current, {
      opacity: 0.05, // Extremely subtle
      duration: 2.5,
      ease: 'power2.inOut',
    })

    // 2. Name emerges from extreme blur and slight scale
    tl.fromTo(nameRef.current, 
      { opacity: 0, filter: 'blur(30px)', scale: 1.05 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 2, ease: 'power3.out' },
      '-=1.5'
    )

    // 3. Role emerges quietly
    tl.fromTo(roleRef.current, 
      { opacity: 0, filter: 'blur(10px)', y: 10 },
      { opacity: 0.6, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' },
      '-=1'
    )

    // 4. Progress bar appears
    tl.fromTo(progressContainerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )

    // 5. Progress simulation
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

    // 6. Dissolve elements out with a slight camera push forward (scale up)
    tl.to([nameRef.current, roleRef.current, progressContainerRef.current, gridRef.current], {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(15px)',
      duration: 1.5,
      ease: 'power3.inOut',
      stagger: 0.1
    })

    // 7. Curtain rises (background fades out into transparent, revealing the scene)
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '-=0.8')
    
    // Unmount
    tl.set(containerRef.current, { display: 'none' })

  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none">
      
      {/* Vanilla Creme Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-vanilla-bg flex flex-col items-center justify-center text-vanilla-text">
        
        {/* Subtle Grid */}
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
          }}
        />

        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 ref={nameRef} className="font-display text-5xl sm:text-7xl font-bold tracking-[0.2em] will-change-transform opacity-0">THIAGO FILIPE</h1>
          <p ref={roleRef} className="mt-6 text-sm tracking-[0.3em] uppercase font-mono opacity-0 will-change-transform">Software Engineer</p>
        </div>

        <div ref={progressContainerRef} className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-64 opacity-0 will-change-transform">
          <div className="w-full h-[1px] bg-vanilla-text/10 relative overflow-hidden">
            <div ref={progressRef} className="absolute left-0 top-0 bottom-0 bg-vanilla-text/80 w-0" />
          </div>
          <div className="flex justify-between w-full text-[10px] font-mono tracking-widest opacity-60">
            <span>INITIALIZING</span>
            <span ref={percentRef}>0%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
