"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMotionAllowed } from "./use-motion-allowed"

/** Contents travel this many pixels across their clipped frame while it crosses the screen. */
const TRAVEL = 64

/**
 * A clipped frame whose contents travel slower than the frame itself.
 * `data-live` is true while the frame is on screen, so pictures only animate when they can be seen.
 */
export function Held({ className, children }: { className?: string; children: ReactNode }) {
  const enabled = useMotionAllowed()
  const ref = useRef<HTMLDivElement>(null)
  const live = useInView(ref, { amount: 0.45 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, (progress) => (enabled ? (progress - 0.5) * TRAVEL : 0))

  return (
    <div ref={ref} data-live={live} className={cn("relative overflow-clip bg-[#0b0c0e]", className)}>
      {/* Taller than the frame by the travel distance, so drifting never shows an edge. */}
      <motion.div className="absolute inset-x-0 -bottom-8 -top-8" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
