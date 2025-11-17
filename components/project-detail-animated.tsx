"use client"

import { useMemo, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectHeroScroll } from "@/components/project-hero-scroll"
import { ScreenshotsCarousel } from "@/components/screenshots-carousel"
import type { Project } from "@/lib/data"

interface ProjectDetailAnimatedProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export function ProjectDetailAnimated({ project, prevProject, nextProject }: ProjectDetailAnimatedProps) {
  const shouldReduceMotion = useReducedMotion()

  const baseTransition = useMemo(
    () => ({
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    }),
    [],
  )

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [project.slug])

  const fadeUpProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          whileInView: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { ...baseTransition, delay },
          },
          viewport: { once: true, margin: "-80px" as const },
        }

  const fadeUpAnimateProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { ...baseTransition, delay },
          },
        }

  return (
    <motion.main
      className="space-y-4"
      {...(shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, x: -24, filter: "blur(12px)" },
            animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { ...baseTransition } },
          })}
    >
      <motion.div {...fadeUpAnimateProps(0)}>
        <Button asChild variant="ghost" className="mb-8 hover:bg-purple-500/10 hover:text-purple-400">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </motion.div>

      {/* Project Header */}
      <motion.header className="max-w-4xl space-y-6" {...fadeUpAnimateProps(0.05)}>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">{project.title}</h1>
        <motion.div
          className="flex flex-wrap gap-2"
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { ...baseTransition, delay: 0.15, staggerChildren: 0.04 },
                },
              })}
        >
          {project.tags.map((tag) => (
            <motion.div
              key={tag}
              {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } })}
            >
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20">{tag}</Badge>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Button asChild className="bg-gray-700 hover:bg-gray-600 text-gray-400 opacity-50">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </motion.div>
          )}
          {project.githubUrl && (
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Button asChild variant="outline" className="border-gray-600 hover:bg-gray-800 hover:border-gray-500 text-gray-400 opacity-50">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Image with GSAP Scroll Effect */}
      <ProjectHeroScroll
        image={project.image || "/placeholder.svg"}
        title={project.title}
        description={project.longDescription}
        alt={project.title}
      />

      {/* Project Details */}
      <div className="max-w-4xl mx-auto space-y-12 mt-12 md:mt-0">
        {/* <motion.div className="grid md:grid-cols-2 gap-6" {...fadeUpProps(0.15)}>
          <Card className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
            <CardContent className="p-6">
              <motion.h2 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-wider" {...fadeUpProps(0.2)}>
                Role
              </motion.h2>
              <motion.p className="text-lg text-white" {...fadeUpProps(0.25)}>
                {project.role}
              </motion.p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
            <CardContent className="p-6">
              <motion.h2 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-wider" {...fadeUpProps(0.2)}>
                Category
              </motion.h2>
              <motion.p className="text-lg text-white" {...fadeUpProps(0.25)}>
                {project.category}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div> */}

        <motion.section className="space-y-4" {...fadeUpProps(0.2)}>
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{project.problem}</p>
        </motion.section>

        <motion.section className="space-y-4" {...fadeUpProps(0.25)}>
          <h2 className="text-3xl font-bold text-white">The Solution</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{project.solution}</p>
        </motion.section>

      </div>

      {/* Screenshots Carousel with Horizontal Scroll */}
      <ScreenshotsCarousel screenshots={project.screenshots} projectTitle={project.title} />

      {/* Project Navigation */}
      <motion.nav
        className="max-w-4xl mx-auto pt-12 border-t border-purple-500/10 flex flex-row items-center justify-between gap-4"
        {...fadeUpProps(0.35)}
      >
        {prevProject ? (
          <motion.div whileHover={shouldReduceMotion ? undefined : { x: -4 }} transition={{ duration: 0.2 }}>
            <Button asChild variant="ghost" className="group hover:bg-purple-500/10 hover:text-purple-400">
              <Link href={`/projects/${prevProject.slug}`}>
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="text-white group-hover:text-purple-400 transition-colors">{prevProject.title}</div>
                </div>
              </Link>
            </Button>
          </motion.div>
        ) : (
          <span />
        )}
        {nextProject ? (
          <motion.div whileHover={shouldReduceMotion ? undefined : { x: 4 }} transition={{ duration: 0.2 }}>
            <Button asChild variant="ghost" className="group hover:bg-purple-500/10 hover:text-purple-400">
              <Link href={`/projects/${nextProject.slug}`}>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next</div>
                  <div className="text-white group-hover:text-purple-400 transition-colors">{nextProject.title}</div>
                </div>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <span />
        )}
      </motion.nav>
    </motion.main>
  )
}
