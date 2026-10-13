"use client"

import { useRef, type FocusEvent, type ReactNode } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMotionAllowed } from "@/components/motion/use-motion-allowed"
import { site } from "@/content/site"

/**
 * The opaque sheet a page's content sits on, and the closing screen it uncovers at the end.
 * The sheet slides over the dot field; the closing waits underneath and settles as the sheet lifts off it.
 *
 * It needs room to work: no ancestor may clip or scroll, and the sheet should be at least a screen tall.
 * Short pages use a plain footer instead.
 */
export function PageSheet({ children }: { children: ReactNode }) {
  const motionAllowed = useMotionAllowed()
  const sheetRef = useRef<HTMLDivElement>(null)
  // 0 when the sheet's bottom edge reaches the bottom of the screen, 1 when it leaves the top.
  const { scrollYProgress: uncovered } = useScroll({ target: sheetRef, offset: ["end end", "end start"] })
  const settle = useTransform(uncovered, (progress) => (motionAllowed ? Math.min(progress / 0.6, 1) : 1))
  const opacity = useTransform(settle, [0, 1], [0.4, 1])
  const filter = useTransform(settle, (value) => `blur(${(1 - value) * 10}px)`)
  const y = useTransform(settle, (value) => (1 - value) * 120)

  // The closing is always inside the screen's rectangle, so the browser will not scroll to it by
  // itself when the keyboard reaches its link; without this the sheet would cover the focus ring.
  const reveal = (event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(":focus-visible")) window.scrollTo({ top: document.documentElement.scrollHeight })
  }

  return (
    <div className="relative">
      <div ref={sheetRef} className="relative z-10 border-t border-[var(--sheet-line)] bg-[var(--sheet-bg)] text-[var(--sheet-fg)]">
        {children}
      </div>

      <footer className="sticky bottom-0 z-0 h-[100dvh] overflow-clip">
        <motion.div className="page-gutters flex h-full flex-col justify-center" style={{ opacity, filter, y }}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Have something in mind?</p>
          <p className="text-outline-strong mt-6 text-[3.5rem] font-black leading-none tracking-tighter sm:text-[6rem] md:text-[9rem] lg:text-[12rem]">
            LET&apos;S TALK
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              onFocus={reveal}
              className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-teal-500/35 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-teal-100 transition-colors hover:border-teal-400/60 hover:bg-teal-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
            >
              Tell me what you need <ArrowRight className="size-4" aria-hidden />
            </Link>
            <span className="font-mono text-xs text-zinc-400">{site.name} — {site.location}</span>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
