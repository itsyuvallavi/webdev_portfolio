"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
  const creative = experience.isCreative === true

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden border bg-zinc-950/95 bg-gradient-to-br from-white/[0.05] to-transparent text-zinc-50 shadow-lg shadow-black/35 transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl active:scale-[0.99]",
        creative
          ? "border-zinc-700/80 hover:border-amber-500/40"
          : "border-zinc-700/80 hover:border-teal-500/40",
      )}
    >
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="mb-1 text-xl font-semibold tracking-tight text-zinc-50">{experience.title}</h3>
          <p
            className={cn(
              "text-sm font-medium",
              creative ? "text-amber-400/95" : "text-teal-400/95",
            )}
          >
            {experience.company}
          </p>
        </div>
        <p className="mb-4 text-xs text-zinc-500">{experience.period}</p>
        <p className="mb-4 text-sm leading-relaxed text-zinc-300">{experience.description}</p>
        <div className="flex flex-wrap gap-1.5 border-t border-zinc-800/80 pt-3">
          {experience.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className={cn(
                "text-xs",
                creative
                  ? "border-amber-500/30 bg-amber-500/15 text-amber-100/90"
                  : "border-teal-500/25 bg-teal-500/12 text-teal-100/90",
              )}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
