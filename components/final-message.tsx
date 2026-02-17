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
        <div className={`text-6xl select-none ${visible ? "animate-envelope-reveal" : ""}`}>
          {"\u{1F48C}"}
        </div>

        <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
          {"Это послание создано с любовью, специально для тебя. Ты - лучшее, что случилось со мной."}
        </p>

        <p className="text-muted-foreground text-sm mt-4">
          {"Сделано с "}{"\u2764\uFE0F"}{" для самого родного человека"}
        </p>
      </div>

      <style jsx>{`
        @keyframes envelope-reveal {
          0% { transform: translateY(12px) scale(0.7) rotate(-8deg); opacity: 0; }
          45% { transform: translateY(-4px) scale(1.08) rotate(4deg); opacity: 1; }
          70% { transform: translateY(2px) scale(0.98) rotate(-2deg); }
          100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
        }
        .animate-envelope-reveal {
          animation: envelope-reveal 1.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
          display: inline-block;
          transform-origin: center;
          filter: drop-shadow(0 6px 10px rgba(255, 120, 150, 0.18));
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-envelope-reveal {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
