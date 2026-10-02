"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { TextReveal } from "../text-reveal"
import { useSandstormTransition } from "../transitions/sandstorm-transition"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

export default function HomePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [motionReady, setMotionReady] = useState(false)
  useEffect(() => {
    setMotionReady(true)
    if (reduceMotion || !sectionRef.current) return

    const delays = [50, 350, 450]
    const animations = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-home-entrance]"))
      .flatMap((element, index) => element.animate ? [element.animate(
        [{ opacity: 0.65, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 650, delay: delays[index], easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      )] : [])
    return () => animations.forEach((animation) => animation.cancel())
  }, [reduceMotion])

  const { stormControls } = useSandstormContext()
  const { triggerStorm } = useSandstormTransition({
    targetPath: "/projects",
    duration: 900,
  })

  const handleLinkClick = () => {
    triggerStorm()
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-between overflow-hidden px-4 py-20 sm:px-6 lg:px-8",
        "transition-opacity duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
        stormControls.isActive ? "opacity-0" : "opacity-100",
      )}
    >
      {/* Hero Content — title block unchanged */}
      <div className="flex w-full flex-1 flex-col justify-center">
        <motion.span
          data-home-entrance
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="mb-4 inline-block self-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 md:self-start"
        >
          Full-stack
        </motion.span>

        <div className="w-full space-y-4 text-center md:text-left">
          <h1 className="text-[2.75rem] xs:text-[3.75rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter">
            {motionReady ? (
              <>
                <TextReveal text="CREATIVE" className="block text-white" />
                <TextReveal
                  text="DEVELOPER"
                  className="block text-transparent"
                  delay={0.3}
                  style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
                />
              </>
            ) : (
              <>
                <div className="block text-white">CREATIVE</div>
                <div className="block text-transparent" style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}>DEVELOPER</div>
              </>
            )}
          </h1>
        </div>

        <motion.div
          data-home-entrance
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.35 }}
          className="mt-8 text-center md:mt-12 md:text-left"
        >
          <p className="font-mono text-xs text-zinc-400 sm:text-sm">
            {"// From scoring sessions to shipping React apps."}
          </p>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative pb-8 pt-4 md:pb-12">
        <motion.div
          data-home-entrance
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.45 }}
          className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={handleLinkClick}
            className={cn(
              "group inline-flex min-h-14 w-full max-w-[260px] items-center justify-between gap-3 rounded-lg border border-teal-500/35 bg-zinc-950/70 px-4 py-2.5 text-left sm:w-[220px]",
              "font-mono text-xs uppercase tracking-[0.16em] text-teal-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_-24px_rgba(20,184,166,0.45)] backdrop-blur-sm",
              "transition-[background-color,border-color,transform,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:-translate-y-0.5 hover:border-teal-400/55 hover:bg-teal-500/[0.08] hover:text-white active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300",
            )}
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-teal-50">Explore work</span>
              <span className="text-[11px] tracking-[0.1em] text-teal-100/80 group-hover:text-teal-100">
                Selected projects
              </span>
            </span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-teal-300/20 bg-teal-500/[0.08] text-teal-100 transition-[transform,border-color,background-color] group-hover:translate-x-0.5 group-hover:border-teal-300/40 group-hover:bg-teal-500/15">
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </span>
          </button>

          <Link
            href="/services"
            prefetch={false}
            className={cn(
              "group inline-flex min-h-14 w-full max-w-[260px] items-center gap-3 rounded-lg border border-white/15 bg-zinc-950/70 px-4 py-2.5 text-left sm:w-[220px]",
              "font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm",
              "transition-[background-color,border-color,transform,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] hover:text-zinc-100 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300",
            )}
          >
            <span
              className="grid size-8 grid-cols-3 grid-rows-3 gap-0.5 rounded-full border border-white/10 bg-black/40 p-2"
              aria-hidden
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "size-1 rounded-full bg-zinc-500/70 transition-colors duration-300 group-hover:bg-zinc-100",
                    index % 2 === 0 && "bg-zinc-300/80",
                  )}
                />
              ))}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-zinc-100">Services</span>
              <span className="text-[11px] tracking-[0.1em] text-zinc-300 group-hover:text-zinc-100">
                Websites & tools
              </span>
            </span>
          </Link>
        </motion.div>

        <div
          className="mx-auto max-w-md border-t border-zinc-800/80 pt-8 text-center md:ml-auto md:mr-0 md:text-right"
        >
          <p className="mb-3 text-pretty text-xs leading-relaxed text-zinc-400 sm:text-sm">
            I build websites, automations, and custom tools for small businesses and independent professionals.
            Clear websites, connected tools, and a better way to keep track of your work.
          </p>
          <p className="font-mono text-xs text-zinc-400">Yuval Lavi — Lisbon</p>
        </div>
      </div>
    </section>
  )
}
