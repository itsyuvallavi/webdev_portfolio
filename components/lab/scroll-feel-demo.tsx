"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Held } from "@/components/motion/held"
import { DayDemoFigure } from "@/components/samples/walkthrough"
import { ProcessSection } from "@/components/site/process-steps"
import { BookingPlate, EnquiryPlate, PaidPlate, PaperPlate } from "@/components/samples/service-plates"
import styles from "./scroll-feel.module.css"

const QuietDots = dynamic(() => import("@/components/site/quiet-dots").then((m) => m.QuietDotsBackground), { ssr: false })
const TodayDots = dynamic(
  () => import("@/components/monochrome-dots-background").then((m) => m.MonochromeDotsBackground),
  { ssr: false },
)

// Speed against scroll: 1 moves with the page, lower values hold back.
const SPEED = { creative: 0.85, developer: 0.65 }

// Each service sits on the opposite side from the one before and starts part-way down it.
// On a wide screen that is two columns offset by one row; below that, alternate left and right.
const stagger = [
  "md:mr-auto xl:col-start-1 xl:row-start-1",
  "md:ml-auto xl:col-start-2 xl:row-start-2",
  "md:mr-auto xl:col-start-1 xl:row-start-3",
  "md:ml-auto xl:col-start-2 xl:row-start-4",
].map((placement) => `${placement} xl:mx-0`)

const gutters = "mx-auto max-w-[1400px] px-4 sm:px-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10"

// Four services chosen from demand research. Draft copy; the pictures are
// illustrations drawn in code, not client work.
const features: { label: string; title: string; body: string; plate: ReactNode }[] = [
  {
    label: "01 / Enquiries",
    title: "Every enquiry answered.",
    body: "An assistant replies in seconds from your prices and diary, books the slot, and hands over to you when it is unsure.",
    plate: <EnquiryPlate />,
  },
  {
    label: "02 / Bookings",
    title: "A full diary, fewer calls.",
    body: "Online booking, a reminder the day before, and a cancelled slot offered to the waiting list automatically.",
    plate: <BookingPlate />,
  },
  {
    label: "03 / Getting paid",
    title: "Invoices that chase themselves.",
    body: "Polite reminders go out on schedule and stop the moment a client pays. You see what is owed at a glance.",
    plate: <PaidPlate />,
  },
  {
    label: "04 / Paperwork",
    title: "Photograph it. It files itself.",
    body: "Supplier invoices and receipts are read, checked and sent to your accountant's folder, with anything unclear flagged.",
    plate: <PaperPlate />,
  },
]

/** A light that travels down the right screen edge, beside the scrollbar, with scroll position, then fades. */
function EdgeLight({ enabled, viewportHeight }: { enabled: boolean; viewportHeight: number }) {
  const edgeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, (progress) => (0.1 + progress * 0.8) * viewportHeight - 150)

  useEffect(() => {
    if (!enabled) return
    const setOpacity = (value: string) => edgeRef.current?.style.setProperty("opacity", value)
    let timer: ReturnType<typeof setTimeout> | undefined
    const unsubscribe = scrollYProgress.on("change", () => {
      setOpacity("1")
      clearTimeout(timer)
      timer = setTimeout(() => setOpacity("0"), 180)
    })
    return () => {
      unsubscribe()
      clearTimeout(timer)
      setOpacity("0")
    }
  }, [enabled, scrollYProgress])

  return (
    <div ref={edgeRef} aria-hidden className={styles.edge}>
      <motion.div className={styles.light} style={{ y }} />
    </div>
  )
}

function Toggle<T extends string>({ label, value, options, onChange }: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-400">{label}</span>
      <span className="flex overflow-hidden rounded-md border border-white/15">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-8 px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal-300",
              value === option.value ? "bg-teal-300 text-zinc-950" : "text-zinc-300 hover:bg-white/10",
            )}
          >
            {option.label}
          </button>
        ))}
      </span>
    </div>
  )
}

const onOff = [{ value: "on", label: "On" }, { value: "off", label: "Off" }] as const

export function ScrollFeelDemo() {
  const [dots, setDots] = useState<"quiet" | "today">("quiet")
  const [weighted, setWeighted] = useState<"on" | "off">("on")
  const [speeds, setSpeeds] = useState<"on" | "off">("on")
  const [sheet, setSheet] = useState<"dark" | "paper">("dark")
  const [viewportHeight, setViewportHeight] = useState(800)
  const [controlsOpen, setControlsOpen] = useState(true)
  const reduceMotion = useReducedMotion()
  const mapOn = speeds === "on" && !reduceMotion

  useEffect(() => {
    const measure = () => setViewportHeight(window.innerHeight)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Weighted scrolling for mouse and trackpad; touch keeps native scrolling.
  useEffect(() => {
    if (weighted === "off" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.9 })
    return () => lenis.destroy()
  }, [weighted])

  const { scrollY } = useScroll()
  const heldBy = (speed: number) => (scroll: number) => (mapOn ? Math.min(scroll, viewportHeight) * (1 - speed) : 0)
  const creativeY = useTransform(scrollY, heldBy(SPEED.creative))
  const developerY = useTransform(scrollY, heldBy(SPEED.developer))
  // The held word recedes as content passes over it.
  const developerOpacity = useTransform(scrollY, (scroll) => (mapOn ? 1 - 0.6 * Math.min(scroll / viewportHeight, 1) : 1))

  // 0 when the sheet's bottom edge reaches the bottom of the screen, 1 when it leaves the top.
  const sheetRef = useRef<HTMLElement>(null)
  const { scrollYProgress: uncovered } = useScroll({ target: sheetRef, offset: ["end end", "end start"] })
  const settle = useTransform(uncovered, (progress) => (mapOn ? Math.min(progress / 0.6, 1) : 1))
  const closingOpacity = useTransform(settle, [0, 1], [0.4, 1])
  const closingFilter = useTransform(settle, (value) => `blur(${(1 - value) * 10}px)`)
  const closingY = useTransform(settle, (value) => (1 - value) * 120)

  return (
    <div className={styles.root} data-sheet={sheet}>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-black">
        {dots === "quiet" ? <QuietDots /> : <TodayDots />}
      </div>
      <EdgeLight enabled={mapOn} viewportHeight={viewportHeight} />

      <section className="relative z-0 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-between px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex w-full flex-1 flex-col justify-center">
          <span className="mb-4 inline-block self-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 md:self-start">
            Full-stack
          </span>
          <h1 className="whitespace-nowrap text-center text-[clamp(2.5rem,14.5vw,12rem)] font-black leading-none tracking-tighter md:text-left">
            <motion.span className="block text-white" style={{ y: creativeY }}>CREATIVE</motion.span>
            <motion.span className={cn("block", styles.outline)} style={{ y: developerY, opacity: developerOpacity }}>
              DEVELOPER
            </motion.span>
          </h1>
        </div>
      </section>

      <section className={cn(gutters, "relative z-10 pb-28 lg:pb-40")}>
        <DayDemoFigure holdEnabled={mapOn} />
      </section>

      <div className="relative">
        <section
          ref={sheetRef}
          className="relative z-10 border-t border-[var(--sheet-line)] bg-[var(--sheet-bg)] text-[var(--sheet-fg)]"
        >
          <div className={cn(gutters, "py-24 lg:py-32")}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sheet-muted)]">What I do</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
              Software that takes work off your hands.
            </h2>

            <div className="mt-16 grid gap-x-16 gap-y-20 lg:mt-24 lg:gap-y-28 xl:grid-cols-2">
              {features.map((feature, index) => (
                <article key={feature.label} className={cn("md:w-[72%] xl:row-span-2 xl:w-auto", stagger[index % stagger.length])}>
                  <p className="font-mono text-xs text-[var(--sheet-accent)]">{feature.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{feature.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{feature.body}</p>
                  <Held enabled={mapOn} className="mt-8 aspect-[4/5] rounded-lg border border-[var(--sheet-line)] sm:aspect-[16/10]">
                    {feature.plate}
                  </Held>
                </article>
              ))}
            </div>

            <ProcessSection enabled={mapOn} />
          </div>
        </section>

        {/* Sits under the sheet and is uncovered as the sheet scrolls off it. */}
        <footer className="sticky bottom-0 z-0 h-[100dvh] overflow-clip">
          <motion.div
            className={cn(gutters, "flex h-full flex-col justify-center")}
            style={{ opacity: closingOpacity, filter: closingFilter, y: closingY }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Have something in mind?</p>
            <p className={cn("mt-6 text-[3.5rem] font-black leading-none tracking-tighter sm:text-[6rem] md:text-[9rem] lg:text-[12rem]", styles.outlineStrong)}>
              LET&apos;S TALK
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-teal-500/35 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-teal-100 transition-colors hover:border-teal-400/60 hover:bg-teal-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
              >
                Tell me what you need <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="font-mono text-xs text-zinc-400">Yuval Lavi — Lisbon</span>
            </div>
          </motion.div>
        </footer>
      </div>

      <aside
        aria-label="Prototype controls"
        className="fixed bottom-4 right-4 z-[60] w-64 rounded-lg border border-white/15 bg-zinc-950/90 p-3 font-mono text-[11px] text-zinc-200 backdrop-blur-sm"
      >
        <button
          type="button"
          aria-expanded={controlsOpen}
          onClick={() => setControlsOpen((open) => !open)}
          className="flex min-h-6 w-full items-center justify-between gap-4 text-left text-zinc-400 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
        >
          Prototype controls <span aria-hidden>{controlsOpen ? "Hide" : "Show"}</span>
        </button>
        <div className={cn("mt-2 space-y-2", !controlsOpen && "hidden")}>
          <Toggle label="Speed map" value={speeds} options={onOff} onChange={setSpeeds} />
          <Toggle label="Weighted scroll" value={weighted} options={onOff} onChange={setWeighted} />
          <Toggle
            label="Dots"
            value={dots}
            options={[{ value: "quiet", label: "Quiet" }, { value: "today", label: "Today" }]}
            onChange={setDots}
          />
          <Toggle
            label="Sheet"
            value={sheet}
            options={[{ value: "dark", label: "Dark" }, { value: "paper", label: "Paper" }]}
            onChange={setSheet}
          />
        </div>
      </aside>
    </div>
  )
}
