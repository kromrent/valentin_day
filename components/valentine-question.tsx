"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export function ValentineQuestion() {
  const [said, setSaid] = useState(false)
  const [noScale, setNoScale] = useState(1)
  const [yesScale, setYesScale] = useState(1)
  const noRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const escapeNo = useCallback(() => {
    if (!noRef.current || !containerRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const btn = noRef.current.getBoundingClientRect()

    const maxX = container.width - btn.width - 10
    const maxY = container.height - btn.height - 10

    const newX = Math.max(10, Math.random() * maxX)
    const newY = Math.max(10, Math.random() * maxY)

    noRef.current.style.position = "absolute"
    noRef.current.style.left = `${newX}px`
    noRef.current.style.top = `${newY}px`
    noRef.current.style.transition = "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"

    setNoScale((prev) => Math.max(prev * 0.85, 0.3))
    setYesScale((prev) => Math.min(prev * 1.1, 2.0))
  }, [])

  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; char: string }>>([])

  useEffect(() => {
    if (sparkles.length > 0) {
      const t = setTimeout(() => setSparkles([]), 1500)
      return () => clearTimeout(t)
    }
  }, [sparkles])

  if (said) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="pointer-events-none absolute animate-sparkle-fly text-3xl"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              ["--rand-x" as string]: `${(Math.random() - 0.5) * 200}px`,
              ["--rand-y" as string]: `${-Math.random() * 200 - 50}px`,
            }}
          >
            {s.char}
          </span>
        ))}
        <div className="animate-bounce-in flex flex-col items-center gap-6 text-center">
          <div className="text-7xl md:text-9xl select-none animate-heart-beat">{"\u2764\uFE0F"}</div>
          <h3 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {"Ура! Теперь это официально!"}
          </h3>
          <p className="text-accent font-serif text-xl italic">
            {"Ты - моя Валентинка навсегда"}
          </p>
        </div>
        <style jsx>{`
          @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.3) rotate(-5deg); }
            50% { transform: scale(1.05) rotate(2deg); }
            70% { transform: scale(0.95) rotate(-1deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
          @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.15); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
          }
          .animate-heart-beat { animation: heart-beat 1.2s ease-in-out infinite; }
          @keyframes sparkle-fly {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--rand-x), var(--rand-y)) scale(0); opacity: 0; }
          }
          .animate-sparkle-fly { animation: sparkle-fly 1.2s ease-out forwards; }
        `}</style>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
        <div className="text-5xl select-none" aria-hidden="true">{"\u{1F48C}"}</div>

        <h3 className="font-serif text-2xl md:text-4xl text-foreground leading-relaxed text-balance">
          {"Ты уверена, что хочешь стать моей Валентинкой?"}
        </h3>

        <div
          ref={containerRef}
          className="relative w-full min-h-[280px] md:min-h-[320px] rounded-2xl border border-border bg-card/50 p-6 flex items-center justify-center"
        >
          <button
            ref={noRef}
            onMouseEnter={escapeNo}
            onTouchStart={escapeNo}
            className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-sans text-lg transition-all"
            style={{ transform: `scale(${noScale})` }}
          >
            {"Нет"}
          </button>

          <button
            onClick={() => {
              setSaid(true)
              const chars = ["\u2764\uFE0F", "\u{1F495}", "\u{1F496}", "\u2728", "\u{1F31F}", "\u{1F49D}", "\u{1F48B}"]
              setSparkles(
                Array.from({ length: 25 }, (_, i) => ({
                  id: i,
                  x: 30 + Math.random() * 40,
                  y: 30 + Math.random() * 40,
                  char: chars[Math.floor(Math.random() * chars.length)],
                }))
              )
            }}
            className="ml-8 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-serif text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,50,80,0.5)]"
            style={{ transform: `scale(${yesScale})` }}
          >
            {"Да!"}
          </button>
        </div>

        <p className="text-muted-foreground text-xs italic">
          {"*кнопка 'Нет' обладает собственным мнением"}
        </p>
      </div>
    </section>
  )
}
