"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { useMotionAllowed } from "./use-motion-allowed"

/** Keep the server output readable; motion enhances content after it enters view. */
export function Reveal({ children, className, delay = 0, line = false }: {
  children?: ReactNode
  className?: string
  delay?: number
  line?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px 0px" })
  const reduceMotion = !useMotionAllowed()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView || reduceMotion || !element.animate) return

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
  const reduceMotion = !useMotionAllowed()

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
  const reduceMotion = !useMotionAllowed()
  return reduceMotion ? null : <ScrollProgress className={className} />
}
