"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/data"
import { TextReveal } from "../text-reveal"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

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
        "relative z-10 mx-auto min-h-[100dvh] max-w-[1400px] px-4 pb-24 pt-32 sm:pr-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10",
        "transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        shouldShow ? "opacity-100" : "opacity-0",
      )}
    >
      <header className="mb-14 max-w-3xl text-left lg:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400"
        >
          Portfolio
        </motion.span>

        <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]">
          <TextReveal text="Selected projects" className="block text-white" delay={0} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="mt-6 max-w-[65ch] text-pretty text-base leading-relaxed text-zinc-400"
        >
          Full-stack builds, frontend contracts, and side projects — concrete outcomes rather than generic case
          studies.
        </motion.p>
      </header>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-5"
      >
        {projects.map((project, index) => {
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
              <ProjectCard project={project} featured={featured} />
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
