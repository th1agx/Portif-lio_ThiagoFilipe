import { useEffect, useRef } from 'react'
import { mouseStore } from '../lib/mouseStore'

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

    // Cursor node position with lerp (slightly behind mouse)
    let nodeX = -200
    let nodeY = -200

    const handleMouseMove = (e: MouseEvent) => {
      mouseStore.x = e.clientX
      mouseStore.y = e.clientY
      mouseStore.ndcX = (e.clientX / window.innerWidth) * 2 - 1
      mouseStore.ndcY = -((e.clientY / window.innerHeight) * 2 - 1)
      if (!mouseStore.hasMoved) {
        nodeX = e.clientX
        nodeY = e.clientY
        mouseStore.hasMoved = true
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

      if (mouseStore.hasMoved) {
        // Smooth lag — cursor node trails the mouse organically
        nodeX += (mouseStore.x - nodeX) * 0.12
        nodeY += (mouseStore.y - nodeY) * 0.12

        // Draw connection lines to a few nearby "ghost" anchor positions
        // These simulate graph edges connecting the cursor node to invisible anchors
        const anchors = [
          { x: nodeX - 80, y: nodeY - 40 },
          { x: nodeX + 90, y: nodeY - 60 },
          { x: nodeX - 50, y: nodeY + 70 },
          { x: nodeX + 60, y: nodeY + 50 },
        ]

        for (const anchor of anchors) {
          ctx.beginPath()
          ctx.moveTo(nodeX, nodeY)
          ctx.lineTo(anchor.x, anchor.y)
          ctx.strokeStyle = 'rgba(26, 26, 26, 0.06)'
          ctx.lineWidth = 0.8
          ctx.stroke()

          // Ghost anchor node
          ctx.beginPath()
          ctx.arc(anchor.x, anchor.y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(26, 26, 26, 0.10)'
          ctx.fill()
        }

        // Main cursor node — small crisp circle like a graph node
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26, 26, 26, 0.28)'
        ctx.fill()

        // Outer glow ring (very faint)
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 10, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.07)'
        ctx.lineWidth = 1
        ctx.stroke()
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
