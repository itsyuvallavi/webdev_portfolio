import { notFound } from "next/navigation"
import { projects } from "@/lib/data"
import { ProjectDetailAnimated } from "@/components/project-detail-animated"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]

  if (!project) {
    notFound()
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <main className="min-h-screen pt-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectDetailAnimated project={project} prevProject={prevProject} nextProject={nextProject} />
      </section>
    </main>
  )
}
