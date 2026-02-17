"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const initialDelayMs = 1200
  const endDelayMs = 2000
  const fullText = "Загрузка чувств..."

  useEffect(() => {
    let charIndex = 0
    let typeInterval: ReturnType<typeof setInterval> | null = null
    const startTyping = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setText(fullText.slice(0, charIndex))
          charIndex++
        } else if (typeInterval) {
          clearInterval(typeInterval)
        }
      }, 140)
    }, initialDelayMs)

    return () => {
      clearTimeout(startTyping)
      if (typeInterval) {
        clearInterval(typeInterval)
      }
    }
  }, [])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    const startProgress = setTimeout(() => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (interval) {
              clearInterval(interval)
            }
            setTimeout(onComplete, endDelayMs)
            return 100
          }
          return prev + Math.random() * 2 + 0.6
        })
      }, 90)
    }, initialDelayMs)

    return () => {
      clearTimeout(startProgress)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [onComplete])

  const clampedProgress = Math.min(Math.round(progress), 100)
  const totalBlocks = 20
  const filledBlocks = Math.round((clampedProgress / 100) * totalBlocks)
  const emptyBlocks = totalBlocks - filledBlocks

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="text-6xl animate-pulse select-none" aria-hidden="true">
          {"\u2764\uFE0F"}
        </div>

        <h1 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide min-h-[2.5rem]">
          {text}
          <span className="animate-blink">|</span>
        </h1>

        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-sm text-muted-foreground tracking-widest">
            {"["}{"\u2588".repeat(filledBlocks)}{"\u2591".repeat(emptyBlocks)}{"]"} {clampedProgress}%
          </div>
        </div>

        {clampedProgress >= 100 && (
          <p className="text-accent animate-fade-in font-serif text-lg italic">
            {"Готово... открываю сердце"}
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
