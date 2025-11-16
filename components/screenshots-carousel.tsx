"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScreenshotsCarouselProps {
  screenshots: string[]
  projectTitle: string
}

export function ScreenshotsCarousel({ screenshots, projectTitle }: ScreenshotsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !cardsRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".screenshot-card")

      // Set initial states: first card visible, rest invisible
      cards.forEach((card, index) => {
        gsap.set(card, {
          opacity: index === 0 ? 1 : 0,
        })
      })

      const scrollPerCard = 450 // vh per card - keep it reasonable
      const initialDelay = 0

      // Fade in each next card on top of the previous ones
      cards.forEach((card, index) => {
        if (index === 0) return // Skip first card (already visible)

        const startScroll = initialDelay + (index - 1) * scrollPerCard
        const endScroll = initialDelay + index * scrollPerCard

        console.log(`Card ${index} will slide in from ${startScroll}vh to ${endScroll}vh`)

        // Create timeline for independent fade + slide control
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsRef.current,
            start: `top+=${startScroll}vh top`,
            end: `top+=${endScroll}vh top`,
            scrub: 3,
            id: `card-${index}`,
          }
        })

        // Quick fade in (first 25% of scroll range)
        tl.fromTo(card,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" },
          0
        )

        // Slide up throughout entire scroll range
        tl.fromTo(card,
          { yPercent: 15 },
          { yPercent: 0, duration: 1, ease: "power1.inOut" },
          0
        )
      })
    }, cardsRef)

    return () => ctx.revert()
  }, [screenshots])

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-20 pb-4"
      style={{ minHeight: `${(screenshots.length - 1) * 100}vh` }}
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white">Screenshots</h2>
        <p className="text-sm text-gray-500 font-mono mt-2">↓ Scroll to reveal</p>
      </div>

      {/* Stacked Cards Container */}
      <div
        ref={cardsRef}
        className="sticky top-20 h-[70vh] mx-auto max-w-5xl flex items-center justify-center"
      >
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="screenshot-card absolute left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] h-[70vh] rounded-3xl overflow-hidden ring-1 ring-purple-500/20 shadow-2xl shadow-purple-500/10"
            style={{
              top: `${index * 40}px`, // Offset each card by 40px
              zIndex: index + 1, // Higher index = higher z-index (next card on top)
            }}
          >
            <Image
              src={screenshot || "/placeholder.svg"}
              alt={`${projectTitle} screenshot ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 80vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Screenshot number */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="text-sm font-mono text-white">
                {index + 1} / {screenshots.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
