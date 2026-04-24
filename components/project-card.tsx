import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  /** Wider tile in first row (2/3 width); same vertical rhythm as other cards */
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex min-h-0 flex-1 flex-col">
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col rounded-[1.5rem] p-[3px] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "bg-gradient-to-b from-white/[0.14] to-white/[0.04] ring-1 ring-white/[0.07]",
          "shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)]",
          "hover:shadow-[0_28px_72px_-20px_rgba(15,118,110,0.12)] hover:ring-teal-400/25",
          "active:scale-[0.99]",
        )}
      >
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-3px)]",
            "bg-zinc-950/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
          )}
        >
          {/* Fixed preview height so wide (2-col) and narrow cards share the same vertical band */}
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-teal-500/[0.07] to-transparent sm:h-[220px] lg:h-[240px]">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} — preview`}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />
          </div>

          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col p-6",
              featured && "sm:p-8",
            )}
          >
            <div className="mb-2 flex shrink-0 items-start justify-between gap-3">
              <h3
                className={cn(
                  "font-semibold tracking-tight text-zinc-50 transition-colors duration-300 group-hover:text-teal-200",
                  featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:border-teal-500/30 group-hover:bg-teal-500/10 group-hover:text-teal-200",
                )}
                aria-hidden
              >
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </div>
            <p
              title={project.description}
              className={cn(
                "mb-8 line-clamp-4 shrink-0 text-pretty leading-relaxed text-zinc-400",
                featured ? "text-sm sm:text-base" : "text-sm",
              )}
            >
              {project.description}
            </p>
            <div className="mt-auto flex shrink-0 flex-wrap gap-1.5 border-t border-zinc-800/80 pt-5">
              {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-md border border-teal-500/20 bg-teal-500/10 text-[11px] font-medium text-teal-100/90"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > (featured ? 5 : 3) && (
                <Badge
                  variant="secondary"
                  className="rounded-md border border-zinc-700/80 bg-zinc-900/80 text-xs text-zinc-400"
                >
                  +{project.tags.length - (featured ? 5 : 3)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
