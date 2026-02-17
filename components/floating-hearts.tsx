"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingHearts({ count = 20 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setHearts(generated)
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {"<3" === "<3" ? "\u2764\uFE0F" : ""}
        </div>
      ))}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--heart-opacity, 0.3);
          }
          90% {
            opacity: var(--heart-opacity, 0.3);
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
          --heart-opacity: inherit;
        }
      `}</style>
    </div>
  )
}
