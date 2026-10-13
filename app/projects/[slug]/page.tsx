import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Screens } from "@/components/projects/screens"
import { ZoomPicture } from "@/components/projects/zoom-picture"
import { PageSheet } from "@/components/site/page-sheet"
import { projects } from "@/content/projects"

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
      title: "Page not found | Yuval Lavi",
    }
  }

  return {
    title: `${project.title} | Work | Yuval Lavi`,
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

  const inProgress = project.description.includes("Alpha") || project.description.includes("In Development")

  return (
    <main>
      <header className="page-gutters relative z-0 pb-14 pt-32 lg:pb-20">
        <Link href="/projects" className="text-link">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
          {project.role}
        </p>
        <h1 className="mt-5 break-words text-[clamp(2.25rem,8.5vw,7.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
          {project.title}
        </h1>
        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="max-w-[60ch] text-pretty text-lg leading-relaxed text-zinc-300">{project.description}</p>
            <p className="mt-5 max-w-[60ch] font-mono text-xs leading-relaxed text-zinc-400">{project.tags.join(" · ")}</p>
          </div>
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="action">
                  Live demo <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action border-white/15 text-zinc-100 hover:border-white/35 hover:bg-white/[0.06]">
                  View code <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
        {inProgress && (
          <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-amber-200">
            <AlertTriangle className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
            Alpha. Some features may not work as expected.
          </p>
        )}
      </header>

      <section className="page-gutters relative z-10 pb-28 lg:pb-40">
        <ZoomPicture
          src={project.image}
          alt={`${project.title}: main screen`}
          label={`Open at full size: ${project.title}, main screen`}
          sizes="(max-width: 1399px) calc(100vw - 32px), 1250px"
          priority
          className="screen-frame rounded-xl"
        />
      </section>

      <PageSheet>
        <div className="page-gutters py-24 lg:py-32">
          <section aria-labelledby="overview-title" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <h2 id="overview-title" className="eyebrow pt-2">Overview</h2>
            <p className="max-w-[62ch] text-pretty text-lg leading-relaxed text-[var(--sheet-fg)] sm:text-xl sm:leading-relaxed">
              {project.longDescription}
            </p>
          </section>

          <div className="mt-20 grid gap-x-16 gap-y-14 border-t border-[var(--sheet-line)] pt-20 lg:mt-28 lg:grid-cols-2 lg:pt-28">
            <section aria-labelledby="problem-title">
              <p className="eyebrow">Problem</p>
              <h2 id="problem-title" className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">What was needed</h2>
              <p className="mt-6 max-w-[56ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{project.problem}</p>
            </section>
            <section aria-labelledby="solution-title">
              <p className="eyebrow">Solution</p>
              <h2 id="solution-title" className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">What I built</h2>
              <p className="mt-6 max-w-[56ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{project.solution}</p>
            </section>
          </div>

          {project.screenshots.length > 0 && (
            <section aria-labelledby="screens-title" className="mt-20 border-t border-[var(--sheet-line)] pt-20 lg:mt-28 lg:pt-28">
              <p className="eyebrow">Screens</p>
              <h2 id="screens-title" className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">A closer look</h2>
              <p className="mt-5 max-w-[52ch] text-pretty text-lg leading-relaxed text-[var(--sheet-muted)]">Select any picture to see it at full size.</p>
              <Screens title={project.title} screenshots={project.screenshots} captions={project.screenshotCaptions} />
            </section>
          )}

          <nav aria-label="Other projects" className="mt-20 grid gap-x-16 gap-y-2 border-t border-[var(--sheet-line)] pt-10 sm:grid-cols-2 lg:mt-28">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="group flex min-h-16 items-center gap-4 rounded-sm py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
                <ArrowLeft className="size-5 shrink-0 text-[var(--sheet-muted)] transition-transform group-hover:-translate-x-1 group-hover:text-teal-200" aria-hidden />
                <span>
                  <span className="eyebrow block">Previous</span>
                  <span className="mt-1 block text-xl font-semibold tracking-tight transition-colors group-hover:text-teal-200">{prevProject.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="group flex min-h-16 items-center justify-end gap-4 rounded-sm py-3 text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
                <span>
                  <span className="eyebrow block">Next</span>
                  <span className="mt-1 block text-xl font-semibold tracking-tight transition-colors group-hover:text-teal-200">{nextProject.title}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-[var(--sheet-muted)] transition-transform group-hover:translate-x-1 group-hover:text-teal-200" aria-hidden />
              </Link>
            ) : null}
          </nav>
        </div>
      </PageSheet>
    </main>
  )
}
