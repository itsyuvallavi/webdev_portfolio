"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillFlipCardProps {
  title: string
  skills: string[]
  delay?: number
}

const faceBase =
  "rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.06] to-transparent shadow-lg shadow-black/50 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-teal-400/35"

export function SkillFlipCard({ title, skills, delay = 0 }: SkillFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseLeave = () => {
    setTimeout(() => setIsFlipped(false), 800)
  }

  if (isMobile) {
    return (
      <motion.div
        className="h-[200px]"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={
          shouldReduceMotion
            ? {}
            : {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
              }
        }
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className={cn("flex h-full w-full flex-col p-4", faceBase)}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300/90">{title}</h3>
          <div className="flex flex-1 flex-wrap content-start gap-1.5 overflow-y-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="border border-white/10 bg-teal-500/15 px-2 py-0.5 text-xs text-zinc-100 transition-colors hover:border-white/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="h-[200px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={
        shouldReduceMotion
          ? {}
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
            }
      }
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={shouldReduceMotion ? {} : { rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn("absolute inset-0 flex h-full w-full items-center justify-center", faceBase)}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="px-6 text-center text-2xl font-semibold tracking-tight text-teal-100 sm:text-3xl">{title}</h3>
        </div>

        <div
          className={cn("absolute inset-0 flex h-full w-full flex-col p-4", faceBase)}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300/90">{title}</h3>
          <div className="flex flex-1 flex-wrap content-start gap-1.5 overflow-y-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="border border-white/10 bg-teal-500/15 px-2 py-0.5 text-xs text-zinc-100 transition-colors hover:border-white/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
