"use client"

import { useState, useEffect } from "react"

interface TypewriterReactiveProps {
  text: string
  delay?: number
  baseColor?: string
  activeColor?: string
  waveDelay?: number
}

export function TypewriterReactive({
  text,
  delay = 100,
  baseColor = "rgba(255, 255, 255, 0.3)",
  activeColor = "rgba(255, 255, 255, 1)",
  waveDelay = 500,
}: TypewriterReactiveProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [waveProgress, setWaveProgress] = useState(0)

  // Typewriter effect
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setIsComplete(false)
    setWaveProgress(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true)
    }
  }, [currentIndex, text, delay, isComplete])

  // Wave effect (starts after typewriter completes)
  useEffect(() => {
    if (!isComplete) return

    const timeout = setTimeout(() => {
      const startTime = Date.now()
      const duration = 3000

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setWaveProgress(progress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }, waveDelay)

    return () => clearTimeout(timeout)
  }, [isComplete, waveDelay])

  const gradientPosition = waveProgress * 150
  const strokeOpacity = Math.max(0.3 - waveProgress * 0.3, 0)

  return (
    <span
      style={{
        backgroundImage: `linear-gradient(135deg, ${activeColor} ${gradientPosition}%, ${baseColor} ${gradientPosition + 20}%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: `2px rgba(255, 255, 255, ${strokeOpacity})`,
      }}
    >
      {displayedText}
    </span>
  )
}
