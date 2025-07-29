'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiProps {
  show: boolean
}

export function Confetti({ show }: ConfettiProps) {
  useEffect(() => {
    if (show) {
      // Fire confetti from multiple positions
      const duration = 2000
      const end = Date.now() + duration

      const colors = ['#0D9488', '#134E4A', '#F59E0B']

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [show])

  return null
}