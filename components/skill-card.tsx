"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useRef, useEffect } from "react"

interface Skill {
  name: string
  level: number // 0-100
}

interface SkillCardProps {
  title: string
  skills: Skill[]
  delay?: number
}

export function SkillCard({ title, skills, delay = 0 }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`transition-all duration-300 ${
          isHovered ? "bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20" : "bg-white/5 border-white/10"
        }`}
      >
        <CardContent className="p-6">
          <h3 className="font-bold mb-6 text-white text-lg">{title}</h3>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">{skill.name}</span>
                  <span className="text-sm text-cyan-400 font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      delay: delay + index * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
