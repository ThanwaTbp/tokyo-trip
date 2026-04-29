'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/layout/ThemeProvider'

interface Flake {
  x: number; y: number; r: number; sp: number; sw: number; o: number
}

export function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0

    const flakes: Flake[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      r: Math.random() * 2.5 + 0.8,
      sp: Math.random() * 1.1 + 0.35,
      sw: Math.random() * 0.7 - 0.35,
      o: Math.random() * 0.55 + 0.18,
    }))

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const color = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(180,200,255,0.9)'
      flakes.forEach(f => {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.globalAlpha = f.o
        ctx.fillStyle = color
        ctx.fill()
        f.y += f.sp; f.x += f.sw
        if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W }
        if (f.x > W + 10) f.x = -10
        if (f.x < -10) f.x = W + 10
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 pointer-events-none z-0'
      style={{ opacity: theme === 'dark' ? 0.7 : 0.35 }}
    />
  )
}
