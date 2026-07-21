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

    let mouseX = -100
    let mouseY = -100
    let ballX = -100
    let ballY = -100
    let hasMoved = false

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!hasMoved) {
        ballX = mouseX
        ballY = mouseY
        hasMoved = true
      }
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
      ctx.clearRect(0, 0, width, height)

      if (hasMoved) {
        // Smooth lerp following physics (trailing close to cursor without sticking)
        ballX += (mouseX - ballX) * 0.14
        ballY += (mouseY - ballY) * 0.14

        ctx.beginPath()
        ctx.arc(ballX, ballY, 22, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26, 26, 26, 0.16)' // Visible organic paper ink ball
        ctx.fill()
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
      className="fixed inset-0 pointer-events-none z-[2] mix-blend-multiply"
    />
  )
}
