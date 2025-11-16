"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 100, className = "", onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset animation when text changes
    setDisplayedText("")
    setCurrentIndex(0)
    setIsComplete(false)
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
      onComplete?.()
    }
  }, [currentIndex, text, delay, onComplete, isComplete])

  return <span className={className}>{displayedText}</span>
}
