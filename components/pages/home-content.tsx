"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { TextReveal } from "../text-reveal"
import { Typewriter } from "../typewriter"
import { useSandstormTransition } from "../transitions/sandstorm-transition"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

export default function HomePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { stormControls } = useSandstormContext()
  const { triggerStorm } = useSandstormTransition({
    targetPath: "/projects",
    duration: 3000, // 3 seconds
  })

  const handleLinkClick = () => {
    triggerStorm()
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-between overflow-hidden px-4 py-20 sm:px-6 lg:px-8",
        "transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]",
        stormControls.isActive ? "opacity-0" : "opacity-100",
      )}
    >
      {/* Hero Content — title block unchanged */}
      <div className="flex w-full flex-1 flex-col justify-center">
        <motion.span
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="mb-4 inline-block self-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 md:self-start"
        >
          Full-stack
        </motion.span>

        <div className="w-full space-y-4 text-center md:text-left">
          <h1 className="text-[2.75rem] xs:text-[3.75rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter">
            <TextReveal text="CREATIVE" className="block text-white" />
            <TextReveal
              text="DEVELOPER"
              className="block text-transparent"
              delay={0.3}
              style={{
                WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
              }}
            />
          </h1>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.35 }}
          className="mt-8 text-center md:mt-12 md:text-left"
        >
          <p className="font-mono text-xs text-zinc-500 sm:text-sm">
            <Typewriter text="// From scoring sessions to shipping React apps." delay={42} />
          </p>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative pb-8 pt-4 md:pb-12">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.45 }}
          className="mb-8 flex justify-center"
        >
          <button
            type="button"
            onClick={handleLinkClick}
            className={cn(
              "group inline-flex items-center gap-3 rounded-lg border border-teal-500/40 bg-teal-500/10 px-5 py-3 text-sm font-medium text-teal-100",
              "shadow-[0_16px_40px_-20px_rgba(20,184,166,0.35)] transition-[background-color,border-color,transform,box-shadow,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:border-teal-400/55 hover:bg-teal-500/20 hover:text-white active:scale-[0.98]",
            )}
          >
            <span>Explore work</span>
            <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-[transform,border-color,background-color] group-hover:translate-x-0.5 group-hover:border-teal-500/35 group-hover:bg-teal-500/15">
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.52 }}
          className="mx-auto max-w-md border-t border-zinc-800/80 pt-8 text-center md:ml-auto md:mr-0 md:text-right"
        >
          <p className="mb-3 text-pretty text-xs leading-relaxed text-zinc-500 sm:text-sm">
            I build web apps with Next.js, React, and TypeScript, mostly with Firebase or Postgres on the backend.
            Before that I composed for film and built audio tools — same attention to timing and detail, different
            medium.
          </p>
          <p className="font-mono text-xs text-zinc-600">Yuval Lavi — Los Angeles</p>
        </motion.div>
      </div>
    </section>
  )
}
