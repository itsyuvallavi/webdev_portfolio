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
  context?: { label: string; summary: string }
}

export function ProjectCard({ project, featured = false, context }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex min-h-0 flex-1 flex-col rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
      <div
        className={cn(
          "content-surface flex min-h-0 flex-1 flex-col overflow-hidden transition-colors duration-200",
          "group-hover:border-teal-300/40",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Fixed preview height so wide (2-col) and narrow cards share the same vertical band */}
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-teal-500/[0.07] to-transparent sm:h-[220px] lg:h-[240px]">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} — preview`}
              fill
              priority={featured}
              className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]"
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
            {context && <p className="mb-3 font-mono text-xs leading-relaxed text-teal-200">{context.label}</p>}
            <div className="mb-2 flex shrink-0 items-start justify-between gap-3">
              <h2
                className={cn(
                  "font-semibold tracking-tight text-zinc-50 transition-colors duration-300 group-hover:text-teal-200",
                  featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h2>
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
              title={context?.summary ?? project.description}
              className={cn(
                "mb-8 shrink-0 text-pretty leading-relaxed text-zinc-300",
                !context && "line-clamp-4",
                featured ? "text-sm sm:text-base" : "text-sm",
              )}
            >
              {context?.summary ?? project.description}
            </p>
            <div className="mt-auto flex shrink-0 flex-wrap gap-1.5 border-t border-zinc-800/80 pt-5">
              {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-md border border-teal-500/20 bg-teal-500/10 text-xs font-medium text-teal-100"
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
