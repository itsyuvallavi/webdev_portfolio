"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Experience {
  period: string
  title: string
  company: string
  description: string
  current?: boolean
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="relative"
        >
          <div className="flex gap-6">
            {/* Timeline dot and line */}
            <div className="relative flex flex-col items-center">
              <motion.div
                className={`w-4 h-4 rounded-full z-10 ${
                  exp.current ? "bg-cyan-500" : hoveredIndex === index ? "bg-cyan-400" : "bg-gray-600"
                }`}
                animate={{
                  scale: hoveredIndex === index ? 1.5 : 1,
                  boxShadow:
                    hoveredIndex === index || exp.current
                      ? "0 0 20px rgba(6, 182, 212, 0.6)"
                      : "0 0 0px rgba(6, 182, 212, 0)",
                }}
                transition={{ duration: 0.3 }}
              />
              {index !== experiences.length - 1 && (
                <div
                  className={`w-0.5 flex-1 mt-2 ${
                    hoveredIndex === index || hoveredIndex === index + 1 ? "bg-cyan-500/50" : "bg-gray-700"
                  } transition-colors duration-300`}
                  style={{ minHeight: "60px" }}
                />
              )}
            </div>

            {/* Content card */}
            <div className="flex-1 pb-8">
              <Card
                className={`transition-all duration-300 ${
                  hoveredIndex === index
                    ? "bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-sm text-gray-400 mb-2 font-mono">{exp.period}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-cyan-400 mb-3 font-medium">{exp.company}</p>
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {exp.description}
                  </motion.p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
