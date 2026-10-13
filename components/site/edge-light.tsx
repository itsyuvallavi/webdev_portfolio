"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMotionAllowed } from "@/components/motion/use-motion-allowed"
import styles from "./edge-light.module.css"

/** A light that travels down the right screen edge, beside the scrollbar, with scroll position, then fades. */
function Light() {
  const edgeRef = useRef<HTMLDivElement>(null)
  const [viewportHeight, setViewportHeight] = useState(800)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, (progress) => (0.1 + progress * 0.8) * viewportHeight - 150)

  useEffect(() => {
    const measure = () => setViewportHeight(window.innerHeight)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
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
    }
  }, [scrollYProgress])

  return (
    <div ref={edgeRef} aria-hidden className={styles.edge}>
      <motion.div className={styles.light} style={{ y }} />
    </div>
  )
}

/** The one explicit sign that the page is responding to scroll. Absent without scripts or with motion off. */
export function EdgeLight() {
  return useMotionAllowed() ? <Light /> : null
}
