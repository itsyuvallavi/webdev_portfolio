"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useMotionAllowed } from "./use-motion-allowed"

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

/**
 * Content below the first screen settles into place as it scrolls into view.
 *
 * The server sends it in its finished state. Anything already on screen when the page arrives is
 * left alone: moving it then reads as a flicker. Only content still off screen is given a
 * starting state, where the change cannot be seen, and animates when it enters.
 */
export function Reveal({ children, className, delay = 0, line = false }: {
  children?: ReactNode
  className?: string
  delay?: number
  line?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const motionAllowed = useMotionAllowed()

  useEffect(() => {
    const element = ref.current
    if (!element || !motionAllowed || !element.animate || typeof IntersectionObserver === "undefined") return

    const box = element.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) return

    const from = line ? { transform: "scaleX(0)" } : { opacity: "0.65", transform: "translate3d(0, 18px, 0)" }
    const to = line ? { transform: "scaleX(1)" } : { opacity: "1", transform: "translate3d(0, 0, 0)" }
    const rest = () => {
      element.style.opacity = ""
      element.style.transform = ""
    }
    Object.assign(element.style, from)

    let animation: Animation | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        // `backwards` holds the starting state through the delay; the inline styles can then go.
        animation = element.animate([from, to], { duration: line ? 800 : 650, delay: delay * 1000, easing: EASING, fill: "backwards" })
        rest()
      },
      { rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      animation?.cancel()
      rest()
    }
  }, [motionAllowed, delay, line])

  return <div ref={ref} className={className} aria-hidden={line || undefined}>{children}</div>
}
