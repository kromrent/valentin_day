"use client"

import { useState, useCallback, useRef } from "react"

export function MiniGame() {
  const [accepted, setAccepted] = useState(false)
  const noRef = useRef<HTMLButtonElement>(null)
  const maybeRef = useRef<HTMLButtonElement>(null)

  const runAway = useCallback((ref: React.RefObject<HTMLButtonElement | null>) => {
    if (!ref.current) return
    const btn = ref.current
    const parent = btn.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    const maxX = parentRect.width - btnRect.width - 20
    const maxY = parentRect.height - btnRect.height - 20

    const newX = Math.max(10, Math.random() * maxX)
    const newY = Math.max(10, Math.random() * maxY)

    btn.style.position = "absolute"
    btn.style.left = `${newX}px`
    btn.style.top = `${newY}px`
    btn.style.transition = "all 0.3s ease-out"
  }, [])

  if (accepted) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="animate-scale-in flex flex-col items-center gap-6 text-center">
          <div className="text-7xl md:text-8xl select-none">{"\u{1F389}"}</div>
          <h3 className="font-serif text-3xl md:text-4xl text-foreground">
            {"Я знал, что ты выберешь правильно!"}
          </h3>
          <p className="text-accent font-serif text-xl italic">
            {"Ты навсегда в моём сердце"}
          </p>
        </div>

        <style jsx>{`
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
            animation: scale-in 0.6s ease-out;
          }
        `}</style>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
        <div className="text-5xl select-none animate-joystick-sway" aria-hidden="true">
          {"\u{1F3AE}"}
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed text-balance">
          {"У тебя есть 1 попытка выбрать правильный ответ"}
        </h3>

        <p className="text-muted-foreground text-sm">
          {"(подсказка: неправильные кнопки убегают)"}
        </p>

        <div className="relative w-full min-h-[250px] md:min-h-[300px] rounded-2xl border border-border bg-card/50 p-6">
          <button
            ref={noRef}
            onMouseEnter={() => runAway(noRef)}
            onTouchStart={() => runAway(noRef)}
            className="absolute left-[10%] top-[20%] px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-sans text-lg transition-transform hover:scale-95"
          >
            {"Нет"}
          </button>

          <button
            ref={maybeRef}
            onMouseEnter={() => runAway(maybeRef)}
            onTouchStart={() => runAway(maybeRef)}
            className="absolute right-[10%] top-[20%] px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-sans text-lg transition-transform hover:scale-95"
          >
            {"Возможно"}
          </button>

          <button
            onClick={() => setAccepted(true)}
            className="absolute left-1/2 bottom-[15%] -translate-x-1/2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-serif text-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(220,50,80,0.5)] active:scale-95"
          >
            {"Конечно да!"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes joystick-sway {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-4deg) translateY(-2px); }
          50% { transform: rotate(3deg) translateY(1px); }
          75% { transform: rotate(-2deg) translateY(-1px); }
        }
        @keyframes joystick-glow {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(255, 95, 130, 0)); }
          25% { filter: drop-shadow(0 0 10px rgba(255, 95, 130, 0.35)); }
          50% { filter: drop-shadow(0 0 6px rgba(255, 95, 130, 0.25)); }
          75% { filter: drop-shadow(0 0 8px rgba(255, 95, 130, 0.3)); }
        }
        .animate-joystick-sway {
          animation:
            joystick-sway 2.4s ease-in-out infinite,
            joystick-glow 2.4s ease-in-out infinite;
          display: inline-block;
          transform-origin: center;
        }
      `}</style>
    </section>
  )
}
