import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Held } from "@/components/motion/held"
import { PageSheet } from "@/components/site/page-sheet"
import { projects, type Project } from "@/content/projects"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: `Work | ${site.name}`,
  description:
    "Client websites and custom tools by Yuval Lavi. Each project says what the problem was, what I did, and what was built.",
}

// The three shown first, with wording for a prospective client. Case-study data and addresses are unchanged.
const lead: { slug: string; label: string; summary: string }[] = [
  {
    slug: "eb-and-flow",
    label: "Client website",
    summary: "A welcoming website for a therapy practice. I designed and built the responsive site and integrated its contact form.",
  },
  {
    slug: "trackd",
    label: "Application project · job tracking",
    summary: "Applications, statuses, and follow-ups in one place. I built the tracker with list, board, dashboard, and calendar views.",
  },
  {
    slug: "frontier-aerospace",
    label: "Client website · custom features",
    summary: "Custom interactions within an existing platform. I extended an aerospace company's Squarespace website with JavaScript and animations.",
  },
]

const bySlug = (slug: string) => projects.find((project) => project.slug === slug)
const leadProjects = lead.flatMap((entry) => {
  const project = bySlug(entry.slug)
  return project ? [{ ...entry, project }] : []
})
const otherProjects = projects.filter((project) => !lead.some((entry) => entry.slug === project.slug))

const number = (index: number) => String(index + 1).padStart(2, "0")

// The whole card is one link, named by the project's title.
const cardLink =
  "rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"

function Picture({ project, sizes, priority = false }: { project: Project; sizes: string; priority?: boolean }) {
  return (
    <Held travel={24} className="screen-frame rounded-lg border border-[var(--sheet-line)] transition-colors group-hover:border-teal-300/40">
      <Image src={project.image} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
    </Held>
  )
}

export default function ProjectsPage() {
  return (
    <main>
      <header className="page-gutters relative z-0 flex min-h-[100dvh] flex-col justify-center pb-20 pt-32">
        <p className="mb-6 inline-block self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          Work
        </p>
        <h1 className="text-[clamp(2.75rem,12vw,10rem)] font-black leading-none tracking-tighter">
          <span className="block text-white">SELECTED</span>
          <span className="text-outline block">WORK.</span>
        </h1>
        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="max-w-[56ch] text-pretty text-lg leading-relaxed text-zinc-300">
            Business websites, custom applications, and independent tools. Each project explains the problem,
            my contribution, and what was built.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/services" className="action">
              What I can build for you <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/monochrome"
              prefetch={false}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
            >
              Particle playground <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <PageSheet>
        <div className="page-gutters py-24 lg:py-32">
          {leadProjects.map(({ project, label, summary }, index) => (
            <article
              key={project.slug}
              className={cn("group relative", index > 0 && "mt-20 border-t border-[var(--sheet-line)] pt-20 lg:mt-28 lg:pt-28")}
            >
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <p className="font-mono text-xs text-[var(--sheet-accent)]">{number(index)} / {label}</p>
                  <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl lg:text-5xl">
                    <Link href={`/projects/${project.slug}`} className={cardLink}>{project.title}</Link>
                  </h2>
                  <p className="mt-5 max-w-[48ch] text-pretty text-lg leading-relaxed text-[var(--sheet-muted)]">{summary}</p>
                  <p className="mt-6 font-mono text-xs leading-relaxed text-[var(--sheet-muted)]">{project.tags.slice(0, 4).join(" · ")}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--sheet-accent)] transition-colors group-hover:text-white" aria-hidden>
                    Read the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
                <Picture project={project} sizes="(max-width: 1023px) calc(100vw - 32px), 600px" priority={index === 0} />
              </div>
            </article>
          ))}

          <section aria-labelledby="more-title" className="mt-24 border-t border-[var(--sheet-line)] pt-20 lg:mt-36 lg:pt-28">
            <p className="eyebrow">More projects</p>
            <h2 id="more-title" className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
              Tools and experiments
            </h2>
            <div className="mt-14 grid gap-x-16 gap-y-16 md:grid-cols-2 lg:mt-20 lg:gap-y-24">
              {otherProjects.map((project) => (
                <article key={project.slug} className="group relative">
                  <Picture project={project} sizes="(max-width: 767px) calc(100vw - 32px), 600px" />
                  <p className="mt-6 font-mono text-xs text-[var(--sheet-accent)]">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    <Link href={`/projects/${project.slug}`} className={cardLink}>{project.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 max-w-[52ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{project.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </PageSheet>
    </main>
  )
}
