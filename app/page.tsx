"use client"

import { useState, useCallback } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { FloatingHearts } from "@/components/floating-hearts"
import { ConfessionSection } from "@/components/confession-section"
import { MiniGame } from "@/components/mini-game"
import { ValentineQuestion } from "@/components/valentine-question"
import { LoveTimer } from "@/components/love-timer"
import { SectionDivider } from "@/components/section-divider"
import { FinalMessage } from "@/components/final-message"

export default function ValentinePage() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {loaded && (
        <main className="relative min-h-screen bg-background">
          <FloatingHearts count={25} />

          <div className="relative z-10">
            <ConfessionSection />
            <SectionDivider />
            <MiniGame />
            <SectionDivider />
            <ValentineQuestion />
            <SectionDivider />
            <LoveTimer />
            <SectionDivider />
            <FinalMessage />
          </div>
        </main>
      )}
    </>
  )
}
