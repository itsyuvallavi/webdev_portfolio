"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/data"
import { TextReveal } from "../text-reveal"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

// Curate this index for prospective clients without changing case-study data or routes.
const featuredSlugs = ["eb-and-flow", "trackd", "frontier-aerospace"]
const orderedProjects = [
  ...featuredSlugs.flatMap((slug) => projects.filter((project) => project.slug === slug)),
  ...projects.filter((project) => !featuredSlugs.includes(project.slug)),
]
const projectContext: Record<string, { label: string; summary: string }> = {
  "eb-and-flow": {
    label: "Client website",
    summary: "A welcoming website for a therapy practice. I designed and built the responsive site and integrated its contact form.",
  },
  trackd: {
    label: "Application project · job tracking",
    summary: "Applications, statuses, and follow-ups in one place. I built the tracker with list, board, dashboard, and calendar views.",
  },
  "frontier-aerospace": {
    label: "Client website · custom features",
    summary: "Custom interactions within an existing platform. I extended an aerospace company's Squarespace website with JavaScript and animations.",
  },
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
}

export default function ProjectsContent() {
  const { stormControls } = useSandstormContext()

  const shouldShow = !stormControls.isActive || stormControls.intensity < 0.3

  return (
    <section
      className={cn(
        "relative z-10 mx-auto min-h-[100dvh] max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10",
        "transition-opacity duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
        shouldShow ? "opacity-100" : "opacity-0",
      )}
    >
      <header className="mb-14 max-w-3xl text-left lg:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300"
        >
          Work
        </motion.span>

        <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]">
          <TextReveal text="Selected projects" className="block text-white" delay={0} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="reading-surface mt-6 max-w-[65ch] p-4 text-pretty text-base leading-relaxed text-zinc-300"
        >
          Business websites, custom applications, and independent tools. Each project explains the problem,
          my contribution, and what was built.
        </motion.p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/services" className="inline-flex min-h-10 items-center gap-2 text-teal-200 transition-colors hover:text-teal-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
            Explore services <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <Link href="/monochrome" prefetch={false} className="inline-flex min-h-10 items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
            Particle playground <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </header>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-5"
      >
        {orderedProjects.map((project, index) => {
          const featured = index === 0
          return (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              className={cn(
                "flex h-full min-h-0 w-full flex-col self-stretch",
                featured && "lg:col-span-2",
              )}
            >
              <ProjectCard project={project} featured={featured} context={projectContext[project.slug]} />
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
