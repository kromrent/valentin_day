"use client"

import { useEffect, useState } from "react"

// Set your start date here (Samara time, UTC+4)
const START_DATE = new Date("2026-01-01T03:00:00+04:00")

function getTimeDiff() {
  const now = new Date()
  const diff = now.getTime() - START_DATE.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

function getDaysWord(n: number) {
  const mod100 = n % 100
  const mod10 = n % 10
  if (mod100 >= 11 && mod100 <= 19) return "дней"
  if (mod10 === 1) return "день"
  if (mod10 >= 2 && mod10 <= 4) return "дня"
  return "дней"
}

export function LoveTimer() {
  const [time, setTime] = useState(getTimeDiff)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDiff())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeBlocks = [
    { value: time.days, label: getDaysWord(time.days) },
    { value: time.hours, label: "часов" },
    { value: time.minutes, label: "минут" },
    { value: time.seconds, label: "секунд" },
  ]

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-10 text-center max-w-2xl">
        <div className="text-5xl select-none" aria-hidden="true">{"\u23F0"}</div>

        <h3 className="font-serif text-2xl md:text-3xl text-foreground text-balance">
          {"Наш таймер любви"}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 px-6 py-5 backdrop-blur-sm"
            >
              <span className="font-mono text-4xl md:text-5xl text-primary font-bold tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="h-px w-32 bg-accent/30" />
          <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed text-balance">
            {"Мы знакомы уже "}{time.days}{" "}{getDaysWord(time.days)}
          </p>
          <p className="font-serif text-lg text-accent">
            {"И каждый день ты делаешь меня счастливее"}
          </p>
          <div className="h-px w-32 bg-accent/30" />
        </div>

        <div className="mt-6 flex items-center gap-2">
          {["\u2764\uFE0F", "\u{1F9E1}", "\u{1F49B}", "\u{1F49A}", "\u{1F499}", "\u{1F49C}"].map(
            (heart, i) => (
              <span
                key={i}
                className="text-2xl animate-pulse-stagger select-none"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {heart}
              </span>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-stagger {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .animate-pulse-stagger {
          animation: pulse-stagger 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
