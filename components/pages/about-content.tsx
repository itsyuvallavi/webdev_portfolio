"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"
import { TextReveal } from "../text-reveal"
import { SkillFlipCard } from "../skill-flip-card"
import { CursorCard } from "../cursor-card"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

export default function AboutContent() {
  const shouldReduceMotion = useReducedMotion()

  const baseTransition = useMemo(
    () => ({
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    }),
    [],
  )

  const fadeUpProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: {
            opacity: 1,
            y: 0,
            transition: { ...baseTransition, delay },
          },
          viewport: { once: true, margin: "-80px" as const },
        }

  const slideInLeftProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: -32 },
          whileInView: {
            opacity: 1,
            x: 0,
            transition: { ...baseTransition, delay },
          },
          viewport: { once: true, margin: "-80px" as const },
        }

  const slideInRightProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: 32 },
          whileInView: {
            opacity: 1,
            x: 0,
            transition: { ...baseTransition, delay },
          },
          viewport: { once: true, margin: "-80px" as const },
        }

  const experiences = [
    {
      period: "2024 - Present",
      title: "Freelance Web Developer",
      company: "Independent | Los Angeles, CA",
      description:
        "Built custom web applications for clients including AI-powered travel planning tools, professional service websites, and aerospace industry sites. Developed full-stack solutions using Next.js, React, TypeScript, and Firebase. Extended platform capabilities (Squarespace, custom frameworks) with JavaScript enhancements and custom animations.",
      technologies: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS", "JavaScript", "Squarespace"],
    },
    {
      period: "November 2024 - Present",
      title: "Web Developer & Technical Operations",
      company: "Sense & Sound | Los Angeles, CA",
      description:
        "Developed and maintained website features including frontend interfaces and backend functionality. Built and optimized scripts for automation and workflow improvements. Updated design systems and implemented UI/UX enhancements.",
      technologies: ["JavaScript", "HTML", "CSS", "Web Development", "UI/UX Design"],
    },
    {
      period: "2023 - 2024",
      title: "Full-Stack Development Projects",
      company: "Personal Portfolio | Los Angeles, CA",
      description:
        "Architected and deployed multiple full-featured web applications including NOMADAI (AI travel itinerary generator with GPT-4 integration), professional portfolio sites with custom design systems, and responsive client websites.",
      technologies: ["Next.js", "React", "TypeScript", "Firebase", "Vite", "shadcn/ui", "GPT-4"],
    },
    {
      period: "2019 - 2024",
      title: "Film Composer & Audio Developer",
      company: "Creative Background | Los Angeles, CA",
      description:
        "Composed original scores for film and media projects. Developed custom audio plugins and virtual instruments using C++, HISE, and LUA scripting. Engineered and produced music at professional studios including God Knows Studios and Backyard Industries. Studied Film Scoring at UCLA Extension and Music Production at Musicians Institute.",
      technologies: ["C++", "HISE/JUCE", "LUA", "Kontakt DSP", "Logic Pro", "Pro Tools", "Audio Engineering"],
      isCreative: true,
    },
  ]

  return (
    <section className="relative z-10 mx-auto min-h-[100dvh] max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-20 lg:pt-32">
      <header className="mb-12 max-w-3xl text-left lg:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400"
        >
          About
        </motion.span>

        <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]">
          <TextReveal text="Creative meets code" className="block text-white" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.18 }}
          className="mt-5 max-w-[65ch] text-pretty text-base leading-relaxed text-zinc-400"
        >
          Film scoring and audio engineering first; full-stack web work now. I care about clarity, rhythm in layout,
          and interfaces that feel intentional.
        </motion.p>
      </header>

      <motion.div className="mb-14 lg:mb-20">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <motion.div className="relative" {...slideInLeftProps(0.08)}>
            <div
              className={cn(
                "mx-auto w-full max-w-md rounded-[1.5rem] p-[3px]",
                "bg-gradient-to-b from-white/[0.14] to-white/[0.04] ring-1 ring-white/[0.07]",
                "shadow-[0_28px_72px_-28px_rgba(0,0,0,0.88)]",
              )}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[calc(1.5rem-3px)] bg-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Image
                  src="/portrait.webp"
                  alt="Portrait of Yuval Lavi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {!shouldReduceMotion && (
              <>
                <motion.div
                  className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full bg-teal-500/20 blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-teal-600/15 blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />
              </>
            )}
          </motion.div>

          <motion.div className="space-y-5" {...slideInRightProps(0.12)}>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Background</h2>
            <div className="space-y-3 text-pretty leading-relaxed text-zinc-400">
              <p>
                I started in{" "}
                <span className="font-medium text-teal-300/90">film composition</span> and{" "}
                <span className="font-medium text-teal-300/90">audio engineering</span>, learning how to shape emotion
                and pacing. That carries over into how I think about product UI and motion.
              </p>
              <p>
                Today I build mostly with{" "}
                <span className="font-medium text-zinc-200">Next.js, React, TypeScript, and Firebase</span> — apps that
                need to work reliably and read clearly on the screen.
              </p>
              <p>
                Tight technical constraints, client timelines, and pixel-level polish all feel familiar from years in
                the studio.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="mb-14 lg:mb-20">
        <motion.h2
          className="mb-6 max-w-2xl text-left text-2xl font-semibold tracking-tight text-white md:text-3xl"
          {...fadeUpProps(0)}
        >
          Tech stack
        </motion.h2>

        <div className="md:hidden -mx-4 overflow-x-auto pb-3 px-4">
          <div className="flex snap-x snap-mandatory gap-3">
            {[
              { title: "Frontend", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "p5.js"], d: 0.1 },
              { title: "Backend & Services", skills: ["Firebase Auth", "Firestore", "Node.js", "REST APIs", "Vercel", "Netlify"], d: 0.12 },
              { title: "Tools & Deployment", skills: ["Git", "GitHub", "Version Control", "Claude Code", "Figma UI/UX"], d: 0.14 },
              { title: "Creative Tech", skills: ["React Native", "C++ (HISE/JUCE)", "LUA - KONTAKT DSP"], d: 0.16 },
            ].map((block) => (
              <div key={block.title} className="w-[85vw] flex-shrink-0 snap-center">
                <SkillFlipCard title={block.title} skills={block.skills} delay={block.d} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <SkillFlipCard
            title="Frontend"
            skills={["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "p5.js"]}
            delay={0.1}
          />
          <SkillFlipCard
            title="Backend & Services"
            skills={["Firebase Auth", "Firestore", "Node.js", "REST APIs", "Vercel", "Netlify"]}
            delay={0.12}
          />
          <SkillFlipCard
            title="Tools & Deployment"
            skills={["Git", "GitHub", "Version Control", "Claude Code", "Figma UI/UX"]}
            delay={0.14}
          />
          <SkillFlipCard
            title="Creative Tech"
            skills={["React Native", "C++ (HISE/JUCE)", "LUA - KONTAKT DSP"]}
            delay={0.16}
          />
        </div>
      </motion.div>

      <motion.div>
        <motion.h2
          className="mb-6 max-w-2xl text-left text-2xl font-semibold tracking-tight text-white md:text-3xl"
          {...fadeUpProps(0)}
        >
          Recent work
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              {...(index % 2 === 0 ? slideInLeftProps(0.06 + index * 0.04) : slideInRightProps(0.06 + index * 0.04))}
            >
              <CursorCard experience={exp} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
