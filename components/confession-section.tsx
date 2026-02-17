"use client"

import { useState, useCallback, useEffect } from "react"

interface ConfessionBurst {
  id: number
  x: number
  y: number
  emoji: string
  dx: number
  dy: number
}

export function ConfessionSection() {
  const [revealed, setRevealed] = useState(false)
  const [bursts, setBursts] = useState<ConfessionBurst[]>([])

  const handleClick = useCallback(() => {
    setRevealed(true)
    const emojis = ["\u2764\uFE0F", "\u{1F495}", "\u{1F496}", "\u{1F497}", "\u{1F49E}", "\u2728", "\u{1F31F}"]
    const newBursts: ConfessionBurst[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      dx: (Math.random() - 0.5) * 300,
      dy: (Math.random() - 0.5) * 300 - 100,
    }))
    setBursts(newBursts)
  }, [])

  useEffect(() => {
    if (bursts.length > 0) {
      const timer = setTimeout(() => setBursts([]), 2000)
      return () => clearTimeout(timer)
    }
  }, [bursts])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="absolute pointer-events-none animate-burst text-2xl md:text-3xl"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
            ["--dx" as string]: `${burst.dx}px`,
            ["--dy" as string]: `${burst.dy}px`,
          }}
        >
          {burst.emoji}
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-2xl">
        <div className="text-5xl md:text-7xl select-none animate-heart-soft" aria-hidden="true">
          {"\u{1F498}"}
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight text-balance">
          {"Ты стала самым красивым обновлением моей жизни"}
        </h2>

        {!revealed ? (
          <button
            onClick={handleClick}
            className="group relative mt-4 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-serif text-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(220,50,80,0.4)]"
          >
            <span className="relative z-10">{"Нажми сюда"}</span>
            <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
          </button>
        ) : (
          <div className="animate-reveal flex flex-col items-center gap-6">
            <div className="h-px w-24 bg-accent/50" />
            <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
              {"Каждое утро я просыпаюсь с мыслью о тебе, и каждый день ты доказываешь, что реальность может быть красивее, чем любая мечта."}
            </p>
            <p className="font-serif text-lg md:text-xl text-accent">
              {"Ты - моё самое любимое уведомление"}
            </p>
            <div className="h-px w-24 bg-accent/50" />
            <p className="text-muted-foreground text-sm mt-4">
              {"...листай вниз, дальше ещё интереснее"}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        .animate-burst {
          animation: burst 1.5s ease-out forwards;
        }
        @keyframes heart-soft {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.06); }
          55% { transform: scale(0.98); }
        }
        .animate-heart-soft {
          animation: heart-soft 1.6s ease-in-out infinite;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
