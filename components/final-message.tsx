"use client"

import { useEffect, useState } from "react"

export function FinalMessage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const el = document.getElementById("final-message")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="final-message"
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20"
    >
      <div
        className={`flex flex-col items-center gap-6 text-center max-w-md transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-6xl select-none">{"\u{1F48C}"}</div>

        <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
          {"Это послание создано с любовью, специально для тебя. Ты - лучшее, что случилось со мной."}
        </p>

        <p className="text-muted-foreground text-sm mt-4">
          {"Сделано с "}{"\u2764\uFE0F"}{" для самого родного человека"}
        </p>
      </div>
    </section>
  )
}
