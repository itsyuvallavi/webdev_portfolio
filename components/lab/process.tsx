"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import styles from "./scroll-feel.module.css"

// Draft copy, written to plain-language rules: titles say what happens, sentences stay under
// twenty words, and there are no idioms, because many readers here have English as a second language.
// Each card lists what the client has at the end of that step.
const steps = [
  {
    title: "A short conversation",
    body: "You describe one task that takes too long or goes wrong. I ask questions and look at the tools you use today.",
    card: { label: "You leave with", lines: ["A clear answer on whether I can help", "What it would involve, in plain words", "No charge and no obligation"] },
  },
  {
    title: "One page with a fixed price",
    body: "I send one page. It says what I will build, what it costs and when it will be ready.",
    card: { label: "On the page", lines: ["What is included, and what is not", "One price, agreed before I start", "A date, and how we will check it works"] },
  },
  {
    title: "A working tool, handed over",
    body: "I build it and we test it together on your real cases. Then it is yours to run.",
    card: { label: "Yours to keep", lines: ["It runs on your own accounts", "A one-page guide for your team", "Your data stays with you"] },
  },
]

/** One step: its line draws, its numeral fills and its card settles as the scroll reaches it. */
function Step({ index, progress, enabled }: { index: number; progress: MotionValue<number>; enabled: boolean }) {
  const step = steps[index]
  // This step's share of the section's scroll, from 0 (not reached) to 1 (passed).
  const reach = useTransform(progress, (value) => (enabled ? Math.max(0, Math.min(1, value * steps.length - index)) : 1))
  const cardOpacity = useTransform(reach, [0, 1], [0.55, 1])
  const cardY = useTransform(reach, [0, 1], [18, 0])

  return (
    <li className="row-span-4 grid grid-rows-subgrid pb-14 lg:pb-0">
      <div>
        <span className="block h-px bg-[var(--sheet-line)]">
          <motion.span className="block h-px origin-left bg-[var(--sheet-accent)]" style={{ scaleX: reach }} />
        </span>
        <p className="relative mt-6 text-7xl font-black leading-none tracking-tighter sm:text-8xl" aria-hidden>
          <span className={styles.numeral}>0{index + 1}</span>
          <motion.span className="absolute inset-0" style={{ opacity: reach }}>0{index + 1}</motion.span>
        </p>
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-3 max-w-[38ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{step.body}</p>
      <motion.div className="mt-8 rounded-lg border border-[var(--sheet-line)] p-5" style={{ opacity: cardOpacity, y: cardY }}>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sheet-muted)]">{step.card.label}</p>
        <ul className="mt-4 space-y-2.5 text-sm">
          {step.card.lines.map((line) => (
            <li key={line} className="flex items-baseline gap-3">
              <span className="w-3 shrink-0 text-center text-[var(--sheet-accent)]" aria-hidden>✓</span>
              {line}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}

/** How a project runs, as three steps that respond to the scroll passing through them. */
export function ProcessSection({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] })

  return (
    <div ref={ref} className="mt-24 lg:mt-36">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sheet-muted)]">How a project runs</p>
      <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
        What happens after you get in touch
      </h2>
      <p className="mt-5 max-w-[52ch] text-pretty text-lg leading-relaxed text-[var(--sheet-muted)]">
        A first project is small on purpose: one task, done properly. It goes like this.
      </p>
      <ol className="-mb-14 mt-14 grid gap-x-10 lg:mb-0 lg:grid-cols-3 lg:gap-x-12">
        {steps.map((step, index) => (
          <Step key={step.title} index={index} progress={scrollYProgress} enabled={enabled} />
        ))}
      </ol>
    </div>
  )
}
