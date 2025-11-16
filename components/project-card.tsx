import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden transition-all bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-purple-500/30 hover:from-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-500/10 to-transparent">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
            <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/20">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-white/5 text-gray-400">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
