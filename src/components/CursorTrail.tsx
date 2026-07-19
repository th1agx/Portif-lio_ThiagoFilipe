import { useEffect, useRef } from 'react'

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    let points: { x: number; y: number; age: number }[] = []
    let mouse = { x: -100, y: -100 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      points.push({ x: mouse.x, y: mouse.y, age: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    let animationFrame: number

    const render = () => {
      // Fade out effect by drawing a semi-transparent clear layer
      ctx.clearRect(0, 0, width, height)

      if (points.length > 0) {
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        for (let i = 0; i < points.length; i++) {
          const p = points[i]
          p.age += 1

          if (i === 0) {
            ctx.moveTo(p.x, p.y)
          } else {
            // Smooth curve
            const xc = (points[i - 1].x + p.x) / 2
            const yc = (points[i - 1].y + p.y) / 2
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc)
          }
        }
        
        // The stroke color is deep black, we use varying thickness or just solid
        ctx.strokeStyle = '#e6e3dc' // Slightly darker than background for a subtle paintbrush effect behind content
        ctx.lineWidth = 60 // Much thicker

        ctx.stroke()
        
        // Filter out old points
        points = points.filter(p => p.age < 20)
      }

      animationFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      id="cursor-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] mix-blend-multiply opacity-50"
    />
  )
}
