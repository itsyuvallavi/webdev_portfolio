"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Held } from "@/components/motion/held"
import { useMotionAllowed } from "@/components/motion/use-motion-allowed"
import { BookingObject, EnquiryObject, PaidObject, PaperObject, ReviewsObject, ShopObject } from "./service-plates"
import styles from "./plates.module.css"

interface Job {
  time: string
  title: string
  result: string
  /** Ends with something a person still has to do. */
  needsYou?: boolean
  layout: "phone" | "panel"
  Mockup: ComponentType
}

// One day, in time order.
const jobs: Job[] = [
  { time: "22:47", title: "Enquiry after closing", result: "Answered and booked", layout: "phone", Mockup: EnquiryObject },
  { time: "08:10", title: "Appointment cancelled", result: "Slot refilled from the waiting list", layout: "panel", Mockup: BookingObject },
  { time: "09:00", title: "Invoice 12 days late", result: "Reminder sent", layout: "panel", Mockup: PaidObject },
  { time: "10:14", title: "Supplier invoice photographed", result: "Filed · due date needs a look", needsYou: true, layout: "panel", Mockup: PaperObject },
  { time: "15:21", title: "Order from the online shop", result: "Paid, ready to collect at 16:00", layout: "phone", Mockup: ShopObject },
  { time: "17:10", title: "Two new reviews", result: "One reply ready · one needs you", needsYou: true, layout: "panel", Mockup: ReviewsObject },
]

// Milliseconds. Each job holds the stage for SCENE; its result appears under its name at RESULT_AT.
const SCENE = 3500
const RESULT_AT = 2400
const SUMMARY = 3500
const TOTAL = jobs.length * SCENE + SUMMARY
/** Two steps per job (playing, then resolved), and one final step for the summary. */
const LAST_STEP = jobs.length * 2

const stepAt = (time: number) =>
  time >= jobs.length * SCENE ? LAST_STEP : Math.floor(time / SCENE) * 2 + (time % SCENE >= RESULT_AT ? 1 : 0)

/**
 * The first picture on the page, as a scripted walkthrough instead of a still:
 * a run of jobs that arrive and are dealt with, ending on what was
 * handled and what still needs a person. One clock drives it, so it can pause.
 */
export function Walkthrough() {
  const motionAllowed = useMotionAllowed()
  const figureRef = useRef<HTMLElement>(null)
  const timeRef = useRef(0)
  const rewindRef = useRef(false)
  // Until the clock starts (and without JavaScript or motion) the finished day is shown.
  const [step, setStep] = useState(LAST_STEP)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)

  const scene = Math.floor(step / 2)
  const resolved = Math.ceil(step / 2)
  const job = jobs[scene]
  const flagged = jobs.filter((entry) => entry.needsYou).length

  // Move to the first frame while the figure is still off screen. With motion off it stays on the finished day.
  useEffect(() => {
    setReady(motionAllowed)
    setStep(motionAllowed ? 0 : LAST_STEP)
    timeRef.current = 0
  }, [motionAllowed])

  useEffect(() => {
    const figure = figureRef.current
    if (!figure) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // The mockups restart their own sequence when they come back on screen, so the clock goes back to the start of the job with them.
        if (!entry.isIntersecting) rewindRef.current = true
        setInView(entry.isIntersecting)
      },
      { threshold: 0.4 },
    )
    observer.observe(figure)
    return () => observer.disconnect()
  }, [])

  const playing = ready && inView && !paused
  useEffect(() => {
    if (!playing) return
    if (rewindRef.current) {
      rewindRef.current = false
      if (timeRef.current < jobs.length * SCENE) timeRef.current = Math.floor(timeRef.current / SCENE) * SCENE
    }
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const time = (timeRef.current + Math.min(now - last, 100)) % TOTAL
      last = now
      timeRef.current = time
      setStep(stepAt(time))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  return (
    <figure ref={figureRef} id="demo" className="relative scroll-mt-28">
      {ready ? (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play walkthrough" : "Pause walkthrough"}
          className="absolute bottom-3 right-3 z-10 flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-zinc-300 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
        >
          {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
        </button>
      ) : null}
      <Held className="aspect-[4/5] w-full rounded-xl border border-white/10 sm:aspect-[16/9]">
        <div
          role="img"
          aria-label={`Illustration with sample data: ${jobs.length} jobs dealt with automatically, in time order. ${jobs.map((entry) => `${entry.time}, ${entry.title.toLowerCase()}: ${entry.result.toLowerCase()}`).join(". ")}.`}
          className={styles.wrap}
        >
          <div aria-hidden data-paused={paused} className={cn(styles.plate, styles.wide, styles.demo)}>
            <div className={cn(styles.scene, styles.dayStage, !job && styles.dayEnd)}>
              <span className={cn(styles.corner, styles.cornerTop)}>Sample data</span>
              {job ? (
                <>
                  <div key={`caption-${scene}`} className={cn(styles.dayCaption, styles.viewIn)}>
                    <p className={styles.marginTime}>{job.time}</p>
                    <p className={styles.dayTitle}>{job.title}</p>
                    <p className={cn(styles.dayResult, resolved > scene && styles.dayResultOn, job.needsYou && styles.dayResultWarn)}>
                      {job.result}
                    </p>
                  </div>
                  <div
                    key={`object-${scene}`}
                    className={cn(styles.stage, styles.dayObject, job.layout === "phone" ? styles.dayPhone : styles.dayPanel, styles.viewIn)}
                  >
                    <job.Mockup />
                  </div>
                </>
              ) : (
                <div className={cn(styles.summary, styles.viewIn)}>
                  <p className={styles.bigLabel}>By {jobs[jobs.length - 1].time}</p>
                  <p className={styles.summaryBig}>{jobs.length} handled.<br />{flagged} {flagged === 1 ? "needs" : "need"} you.</p>
                  <div className={styles.notes}>
                    {jobs.filter((entry) => entry.needsYou).map((entry) => (
                      <p key={entry.time} className={styles.note}>{entry.title}: {entry.result.split(" · ")[1]}.</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Held>

    </figure>
  )
}
