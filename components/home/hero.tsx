"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
        <span className="mb-4 inline-block self-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-300 sm:tracking-[0.2em] md:self-start">
          Software for small businesses
        </span>
        <h1 className="whitespace-nowrap text-center text-[clamp(2.5rem,14.5vw,12rem)] font-black leading-none tracking-tighter md:text-left">
          <motion.span className="block text-white" style={{ y: creativeY }}>CREATIVE</motion.span>
          <motion.span className="text-outline block" style={{ y: developerY, opacity: developerOpacity }}>
            DEVELOPER
          </motion.span>
        </h1>
        {/* Travels with the held word above it, so the two never collide. */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-6 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-12 md:pl-[4.5rem] lg:pl-20"
          style={{ y: developerY }}
        >
          <p className="max-w-[52ch] text-pretty text-center text-lg leading-relaxed text-zinc-300 md:text-left">
            I build small software tools for small businesses in Lisbon: enquiries, bookings, invoice reminders, paperwork.
          </p>
          <Link href="/services" className="action shrink-0">
            See the six services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
