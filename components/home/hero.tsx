"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMotionAllowed } from "@/components/motion/use-motion-allowed"

// Speed against scroll: 1 moves with the page, lower values hold back.
const SPEED = { creative: 0.85, developer: 0.65 }

/** The two hero words leave the screen at different speeds, so they separate as the page scrolls. */
export function Hero() {
  const motionAllowed = useMotionAllowed()
  const [viewportHeight, setViewportHeight] = useState(800)

  useEffect(() => {
    const measure = () => setViewportHeight(window.innerHeight)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const { scrollY } = useScroll()
  const heldBy = (speed: number) => (scroll: number) => (motionAllowed ? Math.min(scroll, viewportHeight) * (1 - speed) : 0)
  const creativeY = useTransform(scrollY, heldBy(SPEED.creative))
  const developerY = useTransform(scrollY, heldBy(SPEED.developer))
  // The held word recedes as content passes over it.
  const developerOpacity = useTransform(scrollY, (scroll) => (motionAllowed ? 1 - 0.6 * Math.min(scroll / viewportHeight, 1) : 1))

  return (
    <section className="relative z-0 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-between px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex w-full flex-1 flex-col justify-center">
        <span className="mb-4 inline-block self-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 md:self-start">
          Full-stack
        </span>
        <h1 className="whitespace-nowrap text-center text-[clamp(2.5rem,14.5vw,12rem)] font-black leading-none tracking-tighter md:text-left">
          <motion.span className="block text-white" style={{ y: creativeY }}>CREATIVE</motion.span>
          <motion.span className="text-outline block" style={{ y: developerY, opacity: developerOpacity }}>
            DEVELOPER
          </motion.span>
        </h1>
      </div>
    </section>
  )
}
