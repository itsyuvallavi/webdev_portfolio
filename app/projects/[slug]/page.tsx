import type { Metadata } from "next"
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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found | Yuval Lavi",
    }
  }

  return {
    title: `${project.title} | Projects | Yuval Lavi`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  }
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
    <main className="min-h-[100dvh] pt-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectDetailAnimated project={project} prevProject={prevProject} nextProject={nextProject} />
      </section>
    </main>
  )
}
