"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMotionAllowed } from "./use-motion-allowed"

/**
 * A clipped frame whose contents travel slower than the frame itself.
 * `data-live` is true while the frame is on screen, so pictures only animate when they can be seen.
 *
 * `travel` is how many pixels the contents move across the frame while it crosses the screen.
 * The contents are that much taller than the frame, so a picture that must not lose its sides
 * to cropping (a screenshot) should use a small value.
 */
export function Held({ className, children, travel = 64 }: { className?: string; children: ReactNode; travel?: number }) {
  const enabled = useMotionAllowed()
  const ref = useRef<HTMLDivElement>(null)
  const live = useInView(ref, { amount: 0.45 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, (progress) => (enabled ? (progress - 0.5) * travel : 0))

  return (
    <div ref={ref} data-live={live} className={cn("relative overflow-clip bg-[#0b0c0e]", className)}>
      {/* Taller than the frame by the travel distance, so drifting never shows an edge. */}
      <motion.div className="absolute inset-x-0" style={{ top: -travel / 2, bottom: -travel / 2, y }}>
        {children}
      </motion.div>
    </div>
  )
}
