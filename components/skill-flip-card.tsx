"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface SkillFlipCardProps {
  title: string
  skills: string[]
  color: "purple" | "blue" | "green" | "orange"
  delay?: number
}

const colorConfig = {
  purple: {
    gradient: "from-purple-500/5 to-transparent",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    text: "text-purple-400",
    badgeBg: "bg-purple-500/20",
    shadow: "shadow-purple-500/10",
  },
  blue: {
    gradient: "from-blue-500/5 to-transparent",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    text: "text-blue-400",
    badgeBg: "bg-blue-500/20",
    shadow: "shadow-blue-500/10",
  },
  green: {
    gradient: "from-green-500/5 to-transparent",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/40",
    text: "text-green-400",
    badgeBg: "bg-green-500/20",
    shadow: "shadow-green-500/10",
  },
  orange: {
    gradient: "from-orange-500/5 to-transparent",
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/40",
    text: "text-orange-400",
    badgeBg: "bg-orange-500/20",
    shadow: "shadow-orange-500/10",
  },
}

export function SkillFlipCard({ title, skills, color, delay = 0 }: SkillFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const colors = colorConfig[color]

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsFlipped(false)
    }, 800) // 0.8 second delay before flipping back
  }

  // Mobile: Simple card showing skills directly (no flip)
  if (isMobile) {
    return (
      <motion.div
        className="h-[200px]"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? {} : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
        }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} shadow-lg ${colors.shadow} p-4 flex flex-col backdrop-blur-sm`}>
          <h3 className={`font-bold mb-3 ${colors.text} text-xs uppercase tracking-wider`}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 flex-1 content-start overflow-y-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className={`${colors.badgeBg} text-white border-white/10 hover:border-white/20 transition-colors text-xs px-2 py-0.5`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  // Desktop: Flip card animation
  return (
    <motion.div
      className="h-[200px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={shouldReduceMotion ? {} : { rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front Face - Just the title */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} ${colors.hoverBorder} transition-all duration-300 shadow-lg ${colors.shadow} flex items-center justify-center backdrop-blur-sm`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className={`text-3xl font-black ${colors.text} tracking-tight text-center px-6`}>
            {title}
          </h3>
        </div>

        {/* Back Face - Skills list */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} transition-all duration-300 shadow-lg ${colors.shadow} p-4 flex flex-col backdrop-blur-sm`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <h3 className={`font-bold mb-3 ${colors.text} text-xs uppercase tracking-wider`}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 flex-1 content-start overflow-y-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className={`${colors.badgeBg} text-white border-white/10 hover:border-white/20 transition-colors text-xs px-2 py-0.5`}
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
