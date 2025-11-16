"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TextReveal } from "../text-reveal"
import { SkillFlipCard } from "../skill-flip-card"
import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"

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
          initial: { opacity: 0, y: 30 },
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
          initial: { opacity: 0, x: -40 },
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
          initial: { opacity: 0, x: 40 },
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
    <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen pt-32">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: baseTransition },
              })}
          className="mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center">
            <TextReveal text="WHERE CREATIVE" className="block text-white" />
            <TextReveal text="MEETS CODE" className="block text-transparent" delay={0.2} style={{
              WebkitTextStroke: "2px rgba(168, 85, 247, 0.4)",
            }} />
          </h1>
          <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto">
            Film composer turned full-stack developer. I bring artistic sensibility and technical precision to every project.
          </p>
        </motion.div>

        {/* About Section with Visual Split */}
        <motion.div className="mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative group"
              {...slideInLeftProps(0.1)}
            >
              <motion.div
                className="aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden relative"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px] animate-gradient">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900">
                    <Image
                      src="/portrait.webp"
                      alt="Yuval Lavi"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Enhanced decorative elements with animation */}
              <motion.div
                className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"
                animate={shouldReduceMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl"
                animate={shouldReduceMotion ? {} : {
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-1/2 -right-8 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"
                animate={shouldReduceMotion ? {} : {
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              {...slideInRightProps(0.15)}
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">The Story</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    My journey started in <span className="text-purple-400 font-semibold">film composition</span> and <span className="text-purple-400 font-semibold">audio engineering</span>, where I learned to craft experiences that evoke emotion and tell stories. That same creative precision now powers my approach to web development.
                  </p>
                  <p>
                    As a <span className="text-white font-semibold">full-stack developer</span>, I specialize in Next.js, React, TypeScript, and Firebase—building applications that are both functionally robust and visually compelling. My background gives me a unique edge: I understand user experience from an artistic perspective while delivering clean, efficient code.
                  </p>
                  <p>
                    Whether it's solving complex technical challenges, working within platform constraints, or crafting pixel-perfect interfaces, I bring the same dedication and attention to detail that I honed in music production.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section - Flip Cards */}
        <motion.div className="mb-24">
          <motion.h2
            className="text-3xl font-bold mb-8 text-white text-center"
            {...fadeUpProps(0)}
          >
            Tech Stack
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillFlipCard
              title="Frontend"
              skills={["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "p5.js"]}
              color="purple"
              delay={0.1}
            />
            <SkillFlipCard
              title="Backend & Services"
              skills={["Firebase Auth", "Firestore", "Node.js", "REST APIs", "Vercel", "Netlify"]}
              color="blue"
              delay={0.15}
            />
            <SkillFlipCard
              title="Tools & Deployment"
              skills={["Git", "GitHub", "Version Control", "Claude Code", "Figma UI/UX"]}
              color="green"
              delay={0.2}
            />
            <SkillFlipCard
              title="Creative Tech"
              skills={["React Native", "C++ (HISE/JUCE)", "LUA - KONTAKT DSP"]}
              color="orange"
              delay={0.25}
            />
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div>
          <motion.h2
            className="text-3xl font-bold mb-8 text-white text-center"
            {...fadeUpProps(0)}
          >
            Recent Work
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                {...(index % 2 === 0 ? slideInLeftProps(0.1 + index * 0.05) : slideInRightProps(0.1 + index * 0.05))}
              >
                <Card className={`h-full bg-gradient-to-br border transition-all duration-300 hover:shadow-lg ${
                  exp.isCreative
                    ? "from-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40 hover:from-orange-500/10"
                    : "from-white/5 to-transparent border-white/10 hover:border-purple-500/30 hover:from-purple-500/5"
                }`}>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className={`text-sm font-medium ${exp.isCreative ? "text-orange-400" : "text-purple-400"}`}>
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{exp.period}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className={`text-xs ${
                            exp.isCreative
                              ? "bg-orange-500/10 text-orange-300 border-orange-500/20"
                              : "bg-purple-500/10 text-purple-300 border-purple-500/20"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
