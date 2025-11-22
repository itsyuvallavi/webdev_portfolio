"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  period: string
  title: string
  company: string
  description: string
  technologies: string[]
  isCreative?: boolean
}

interface CursorCardProps {
  experience: Experience
}

export function CursorCard({ experience }: CursorCardProps) {
  return (
    <Card
      className={`h-full bg-gradient-to-br border transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
        experience.isCreative
          ? "from-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40"
          : "from-white/5 to-transparent border-white/10 hover:border-purple-500/30"
      }`}
    >
      <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
            <p className={`text-sm font-medium ${experience.isCreative ? "text-orange-400" : "text-purple-400"}`}>
              {experience.company}
            </p>
          </div>
          <p className="text-xs text-gray-500 mb-4">{experience.period}</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{experience.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {experience.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`text-xs ${
                  experience.isCreative
                    ? "bg-orange-500/10 text-orange-300 border-orange-500/20"
                    : "bg-purple-500/10 text-purple-300 border-purple-500/20"
                }`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
    </Card>
  )
}
