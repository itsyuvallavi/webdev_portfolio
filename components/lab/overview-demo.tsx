"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Held } from "./held"
import { Bars, RotaGrid, StockRows } from "./plates"
import {
  coveredWeekHours,
  covers,
  euro,
  hoursBudget,
  reorderNames,
  staffShare,
  toReorder,
  weekHours,
  weekTakings,
} from "./sample-data"
import styles from "./plates.module.css"

type Scene = "run" | "overview" | "rota" | "stock"

interface DemoState {
  scene: Scene
  /** Lines shown in the Monday run log. */
  runLines: number
  /** Overview build-up: 0 empty, 1 figures and chart, 2 the attention list as well. */
  revealed: 0 | 1 | 2
  /** `data-cue` name the pointer is heading for. */
  cursor: string | null
  clicks: number
  covered: boolean
  ordered: boolean
}

/** Shown without JavaScript and under reduced motion: the finished overview, nothing moving. */
const STILL: DemoState = { scene: "overview", runLines: 3, revealed: 2, cursor: null, clicks: 0, covered: false, ordered: false }
const START: DemoState = { scene: "run", runLines: 0, revealed: 0, cursor: null, clicks: 0, covered: false, ordered: false }

// The script: one Monday morning, in order. Times are milliseconds from the start.
const cues: { at: number; set?: Partial<DemoState>; click?: boolean }[] = [
  { at: 0 },
  { at: 500, set: { runLines: 1 } },
  { at: 1150, set: { runLines: 2 } },
  { at: 1800, set: { runLines: 3 } },
  { at: 3200, set: { scene: "overview" } },
  { at: 3400, set: { revealed: 1 } },
  { at: 4500, set: { revealed: 2 } },
  { at: 5800, set: { cursor: "attention" } },
  { at: 6800, click: true },
  { at: 7100, set: { scene: "rota" } },
  { at: 7700, set: { cursor: "gap" } },
  { at: 8700, click: true, set: { covered: true } },
  { at: 10100, set: { cursor: "nav-stock" } },
  { at: 10950, click: true },
  { at: 11200, set: { scene: "stock" } },
  { at: 11800, set: { cursor: "send" } },
  { at: 12750, click: true, set: { ordered: true } },
  { at: 14200, set: { cursor: "nav-overview" } },
  { at: 15050, click: true },
  { at: 15300, set: { scene: "overview" } },
  { at: 16400, set: { cursor: null } },
]
const TOTAL = 18600

const segments = [
  { label: "08:00", until: 3200 },
  { label: "Overview", until: 7100 },
  { label: "Rota", until: 11200 },
  { label: "Stock", until: 15300 },
  { label: "All clear", until: TOTAL },
]
const segmentColumns = segments.map((segment, index) => `${segment.until - (segments[index - 1]?.until ?? 0)}fr`).join(" ")

function stateAt(index: number): DemoState {
  let state = START
  for (let i = 0; i <= index; i++) {
    state = { ...state, ...cues[i].set, clicks: state.clicks + (cues[i].click ? 1 : 0) }
  }
  return state
}

function cueAt(time: number) {
  let index = 0
  while (index + 1 < cues.length && cues[index + 1].at <= time) index++
  return index
}

const runLines = [
  `Last week read from the till · ${covers.toLocaleString("en-GB")} covers`,
  "This week\u2019s rota and stock checked · 3 things to look at",
  "Summary sent to the owner",
]
const navItems: { name: string; scene?: Scene; cue?: string }[] = [
  { name: "Overview", scene: "overview", cue: "nav-overview" },
  { name: "Rota", scene: "rota" },
  { name: "Stock", scene: "stock", cue: "nav-stock" },
  { name: "Reports" },
  { name: "Automations" },
]
const topLabels: Record<Scene, string> = {
  run: "Automation · Monday 08:00",
  overview: "Overview · Monday 12 October",
  rota: "Rota · week 42",
  stock: "Stock · counted 07:40",
}

function OverviewScene({ state }: { state: DemoState }) {
  const clear = state.covered && state.ordered
  const hours = state.covered ? coveredWeekHours : weekHours
  const cards = [
    { value: euro(weekTakings), label: "Takings last week", change: "+6%" },
    { value: staffShare, label: "Staff cost of takings" },
    { value: String(state.ordered ? 0 : toReorder.length), label: "Items to reorder" },
    { value: `${hours} / ${hoursBudget}`, label: "Staff hours planned" },
  ]
  const notes = clear
    ? ["Saturday evening covered.", `Order sent for ${reorderNames.toLowerCase()}.`, `${hours} of ${hoursBudget} staff hours planned.`]
    : ["Saturday evening is one person short.", `${reorderNames} are below minimum.`, `${hours} of ${hoursBudget} staff hours planned.`]

  return (
    <>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <div
            key={card.label}
            className={cn(styles.card, styles.reveal, state.revealed >= 1 && styles.revealOn)}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <p className={styles.kpiValue}>
              {card.value}
              {card.change ? <span className={styles.up}>{card.change}</span> : null}
            </p>
            <p className={styles.kpiLabel}>{card.label}</p>
          </div>
        ))}
      </div>
      <div className={styles.panels}>
        <div className={styles.panel}>
          <p className={styles.kpiLabel}>Takings by day · last week</p>
          <Bars animated revealed={state.revealed >= 1} />
        </div>
        <div className={styles.panel}>
          <p className={styles.kpiLabel}>{clear ? "All clear" : "Needs attention"}</p>
          <div className={styles.notes}>
            {notes.map((note, index) => (
              <p
                key={note}
                data-cue={index === 0 ? "attention" : undefined}
                className={cn(styles.note, clear && styles.noteOk, styles.reveal, state.revealed >= 2 && styles.revealOn)}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * The first picture on the page, as a scripted walkthrough instead of a still:
 * the Monday run reports, the overview fills in, the short shift is covered,
 * the order is sent, and the overview comes back clear. Built from the same
 * sample data as the still plates, and driven by one clock so it can pause.
 */
export function OverviewDemoFigure({ holdEnabled }: { holdEnabled: boolean }) {
  const reduceMotion = useReducedMotion()
  const figureRef = useRef<HTMLElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const [cue, setCue] = useState(-1)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0, on: false })
  const [measured, setMeasured] = useState(0)

  const state = useMemo(() => (cue < 0 ? STILL : stateAt(cue)), [cue])
  const clear = state.covered && state.ordered
  const activeSegment = state.scene === "run" ? 0 : state.scene === "rota" ? 2 : state.scene === "stock" ? 3 : clear ? 4 : 1

  // Move to the first frame while the figure is still off screen.
  useEffect(() => {
    if (reduceMotion !== false) return
    setReady(true)
    setCue(0)
  }, [reduceMotion])

  useEffect(() => {
    const figure = figureRef.current
    if (!figure) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(figure)
    return () => observer.disconnect()
  }, [])

  // One clock drives everything, so pausing holds the exact frame and resuming carries on from it.
  const playing = ready && inView && !paused
  useEffect(() => {
    if (!playing) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const time = (timeRef.current + Math.min(now - last, 100)) % TOTAL
      last = now
      timeRef.current = time
      setCue(cueAt(time))
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${time / TOTAL})`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  useEffect(() => {
    const plate = plateRef.current
    if (!plate) return
    const observer = new ResizeObserver(() => setMeasured((count) => count + 1))
    observer.observe(plate)
    return () => observer.disconnect()
  }, [])

  // Point at the cued element. If it is not on screen yet, the pointer waits where it is.
  useLayoutEffect(() => {
    const plate = plateRef.current
    if (!plate) return
    if (!state.cursor) {
      setPointer((current) => (current.on ? { ...current, on: false } : current))
      return
    }
    const target = plate.querySelector<HTMLElement>(`[data-cue="${state.cursor}"]`)
    if (!target || target.offsetParent === null) return
    const box = target.getBoundingClientRect()
    const origin = plate.getBoundingClientRect()
    setPointer({ x: box.left - origin.left + box.width * 0.5, y: box.top - origin.top + box.height * 0.6, on: true })
  }, [state.cursor, state.scene, measured])

  return (
    <figure ref={figureRef} id="demo" className="scroll-mt-28">
      <Held enabled={holdEnabled} className="aspect-[4/5] w-full rounded-xl border border-white/10 sm:aspect-[16/9]">
        <div
          role="img"
          aria-label="Illustration with sample data: a Monday walkthrough in which a weekly run reports, the overview shows takings and three things needing attention, a short Saturday shift is covered, an order is sent, and the overview returns clear"
          className={styles.wrap}
        >
          <div ref={plateRef} aria-hidden className={cn(styles.plate, styles.wide, styles.demo)}>
            <div className={styles.top}>
              <span className={styles.label}>{topLabels[state.scene]}</span>
              <span className={cn(styles.label, styles.muted)}>Sample data</span>
            </div>

            {state.scene === "run" ? (
              <div className={cn(styles.run, styles.viewIn)}>
                <div className={styles.log}>
                  <p className={styles.logTop}>Monday 08:00 · weekly run</p>
                  <div className={styles.logBody}>
                    {runLines.map((line, index) => (
                      <p key={line} className={cn(styles.logLine, styles.reveal, index < state.runLines && styles.revealOn)}>
                        <span className={styles.check}>✓</span>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={cn(styles.app, styles.viewIn)}>
                <div className={styles.side}>
                  <p className={styles.brand}><span className={styles.brandMark} />Your business</p>
                  {navItems.map((item) => (
                    <span
                      key={item.name}
                      data-cue={item.cue}
                      className={cn(styles.navItem, item.scene === state.scene && styles.navActive)}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
                <div key={`${state.scene}${clear ? "-clear" : ""}`} className={cn(styles.main, styles.viewIn)}>
                  {state.scene === "overview" ? <OverviewScene state={state} /> : null}
                  {state.scene === "rota" ? (
                    <>
                      <div className={styles.viewHead}>
                        <p className={styles.viewTitle}>Rota</p>
                        <span className={cn(styles.label, styles.muted)}>12–18 Oct</span>
                      </div>
                      <div className={styles.viewBody}><RotaGrid covered={state.covered} cue="gap" /></div>
                    </>
                  ) : null}
                  {state.scene === "stock" ? (
                    <>
                      <div className={styles.viewHead}>
                        <p className={styles.viewTitle}>Stock</p>
                        <span data-cue="send" className={cn(styles.action, state.ordered && styles.actionDone)}>
                          {state.ordered ? "Order sent" : "Send order list"}
                        </span>
                      </div>
                      <div className={styles.viewBody}><StockRows ordered={state.ordered} /></div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            <span
              className={cn(styles.cursor, pointer.on && styles.cursorOn)}
              style={{ transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)` }}
            >
              <svg viewBox="0 0 16 22">
                <path d="M1 1v16.5l4.2-3.9 2.9 6.9 2.6-1.1-2.9-6.8H14L1 1z" fill="#fafafa" stroke="#09090b" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              {state.clicks > 0 ? <span key={state.clicks} className={styles.ripple} /> : null}
            </span>
          </div>
        </div>
      </Held>

      <figcaption className="mt-4 flex items-center gap-4 font-mono text-xs text-zinc-400">
        {ready ? (
          <>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Play walkthrough" : "Pause walkthrough"}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-200 transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
            >
              {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="hidden sm:grid" style={{ gridTemplateColumns: segmentColumns }}>
                {segments.map((segment, index) => (
                  <span key={segment.label} className={cn("truncate transition-colors duration-300", index === activeSegment ? "text-zinc-100" : "text-zinc-500")}>
                    {segment.label}
                  </span>
                ))}
              </div>
              <span className="text-zinc-100 sm:hidden">{segments[activeSegment].label}</span>
              <div className="mt-2 h-px bg-white/15">
                <div ref={progressRef} className="h-px origin-left bg-teal-300" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          </>
        ) : (
          <span className="flex-1">One place for the week</span>
        )}
        <span className="shrink-0">Illustration</span>
      </figcaption>
    </figure>
  )
}
