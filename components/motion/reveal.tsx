"use client"

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react"
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"

const motionPreference = "(prefers-reduced-motion: reduce)"
const getMotionPreference = () => window.matchMedia(motionPreference).matches
const getServerMotionPreference = () => true
const subscribeToMotionPreference = (notify: () => void) => {
  const query = window.matchMedia(motionPreference)
  query.addEventListener("change", notify)
  return () => query.removeEventListener("change", notify)
}

// The installed Motion hook snapshots the preference only on mount. Subscribe
// here so this page also stops its new effects when the preference changes.
function useServicesReducedMotion() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference)
}

/** Keep the server output readable; motion enhances content after it enters view. */
export function ServicesReveal({ children, className, delay = 0, line = false }: {
  children?: ReactNode
  className?: string
  delay?: number
  line?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px 0px" })
  const reduceMotion = useServicesReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView || reduceMotion !== false || !element.animate) return

    const animation = element.animate(
      line
        ? [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }]
        : [{ opacity: 0.65, transform: "translate3d(0, 18px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
      { duration: line ? 800 : 650, delay: delay * 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    )
    return () => animation.cancel()
  }, [inView, reduceMotion, delay, line])

  return <div ref={ref} className={className} aria-hidden={line || undefined}>{children}</div>
}

/** TextReveal's initial blur is applied only once JavaScript can animate it. */
export function ServicesTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduceMotion = useServicesReducedMotion()

  if (reduceMotion) return <div className={className}>{text}</div>
  return <TextReveal text={text} className={className} delay={delay} />
}

function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  const transform = useTransform(progress, (value) => `scaleX(${value})`)
  return <motion.div aria-hidden className={className} style={{ transform }} />
}

export function ServicesProgress({ className }: { className?: string }) {
  const reduceMotion = useServicesReducedMotion()
  return reduceMotion ? null : <ScrollProgress className={className} />
}
