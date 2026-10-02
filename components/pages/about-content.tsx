import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ServicesReveal as AboutReveal } from "@/components/services-motion"

const skillGroups = [
  { title: "Frontend", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "p5.js"] },
  { title: "Backend & Services", skills: ["Firebase Auth", "Firestore", "Node.js", "REST APIs", "Vercel", "Netlify"] },
  { title: "Tools & Deployment", skills: ["Git", "GitHub", "Version Control", "Claude Code", "Figma UI/UX"] },
  { title: "Creative Tech", skills: ["React Native", "C++ (HISE/JUCE)", "LUA - KONTAKT DSP"] },
]

const experiences = [
  {
    period: "2024 - Present",
    title: "Freelance Web Developer",
    company: "Independent | Los Angeles, CA",
    description:
      "Built professional service websites and enhanced an aerospace company's Squarespace site with custom JavaScript interactions. Developed web applications using Next.js, React, TypeScript, and Firebase.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS", "JavaScript", "Squarespace"],
  },
  {
    period: "November 2024 - Present",
    title: "Web Developer & Technical Operations",
    company: "Sense & Sound | Los Angeles, CA",
    description:
      "Developed frontend and backend website features, built scripts for workflow automation, and updated design systems and interfaces.",
    technologies: ["JavaScript", "HTML", "CSS", "Web Development", "UI/UX Design"],
  },
  {
    period: "2023 - 2024",
    title: "Full-Stack Development Projects",
    company: "Personal Portfolio | Los Angeles, CA",
    description:
      "Built and deployed personal applications including NOMADAI, an AI travel itinerary generator with GPT-4 integration, alongside portfolio websites and responsive client sites.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase", "Vite", "shadcn/ui", "GPT-4"],
  },
  {
    period: "2019 - 2024",
    title: "Film Composer & Audio Developer",
    company: "Creative Background | Los Angeles, CA",
    description:
      "Composed film and media scores, built audio plugins and virtual instruments, and engineered music at God Knows Studios and Backyard Industries. Studied Film Scoring at UCLA Extension and Music Production at Musicians Institute.",
    technologies: ["C++", "HISE/JUCE", "LUA", "Kontakt DSP", "Logic Pro", "Pro Tools", "Audio Engineering"],
    isCreative: true,
  },
]

export default function AboutContent() {
  return (
    <section className="relative z-10 mx-auto min-h-[100dvh] max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10">
      <header className="grid items-center gap-10 pb-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.8fr)] md:gap-12 lg:gap-20 lg:pb-20">
        <div>
          <AboutReveal>
            <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
              About
            </span>
          </AboutReveal>
          <h1 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl lg:text-7xl">
            I&apos;m Yuval.
          </h1>
          <AboutReveal delay={0.06} className="mt-6">
            <p className="max-w-lg text-balance text-2xl font-medium leading-tight tracking-tight text-zinc-100 sm:text-3xl lg:text-4xl">
              I build websites and practical tools.
            </p>
            <p className="reading-surface mt-6 max-w-[55ch] p-4 text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              I work with websites, automations, and custom tools for small businesses and independent professionals.
              My background in film composition and audio engineering shapes how I think about detail, rhythm,
              and how an interface feels.
            </p>
          </AboutReveal>
        </div>
        <AboutReveal delay={0.12} className="mx-auto w-full max-w-sm md:ml-auto md:mr-0">
          <div className="rounded-[1.5rem] bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-[3px] shadow-[0_28px_72px_-28px_rgba(0,0,0,0.88)] ring-1 ring-white/[0.07]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(1.5rem-3px)] bg-zinc-900">
              <Image
                src="/portrait.webp"
                alt="Portrait of Yuval Lavi"
                fill
                className="object-cover"
                sizes="(max-width: 767px) min(100vw, 384px), (max-width: 1279px) 35vw, 384px"
                priority
              />
            </div>
          </div>
        </AboutReveal>
      </header>

      <div className="reading-surface px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <section aria-labelledby="creative-background-title" className="grid gap-5 pb-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-10 lg:pb-14">
          <AboutReveal>
            <p className="mb-4 font-mono text-xs text-teal-300/80">01 / Background</p>
            <h2 id="creative-background-title" className="max-w-xs text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              From the studio to the screen.
            </h2>
          </AboutReveal>
          <AboutReveal delay={0.06} className="space-y-4 text-pretty leading-relaxed text-zinc-300">
            <p>
              Film composition and audio engineering taught me to listen closely, shape a story, and work within
              technical constraints. Those habits carry into development: understanding what matters, making
              deliberate choices, and paying attention to the details.
            </p>
            <p>
              Today I build with Next.js, React, TypeScript, and Firebase. I bring that same attention to the way
              a website reads, a tool works, and an interface moves.
            </p>
          </AboutReveal>
        </section>

        <section aria-labelledby="skills-title" className="border-t border-white/15 py-10 lg:py-14">
          <AboutReveal className="mb-8">
            <p className="mb-4 font-mono text-xs text-teal-300/80">02 / Skills</p>
            <h2 id="skills-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">What I work with.</h2>
          </AboutReveal>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <AboutReveal key={group.title} delay={index * 0.04}>
                <h3 className="mb-4 text-base font-medium text-zinc-100">{group.title}</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm leading-relaxed text-zinc-400">
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </AboutReveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-title" className="border-t border-white/15 pt-10 lg:pt-14">
          <AboutReveal className="mb-8">
            <p className="mb-4 font-mono text-xs text-teal-300/80">03 / Experience</p>
            <h2 id="experience-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Work along the way.</h2>
          </AboutReveal>
          <ol className="divide-y divide-white/10">
            {experiences.map((experience, index) => (
              <li key={experience.title} className="py-7 first:pt-0 last:pb-0">
                <AboutReveal delay={index * 0.04} className="grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-10">
                  <p className="pt-1 font-mono text-xs leading-relaxed text-zinc-400">{experience.period}</p>
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium tracking-tight text-zinc-100 sm:text-xl">{experience.title}</h3>
                    <p className="mt-2 text-sm text-teal-200/80">{experience.company}</p>
                    <p className="mt-4 max-w-[65ch] text-pretty text-sm leading-relaxed text-zinc-400">{experience.description}</p>
                    <ul aria-label={`Technologies used as ${experience.title}`} className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs leading-relaxed text-zinc-300">
                      {experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </AboutReveal>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="about-contact-title" className="mt-14 flex flex-col items-start gap-6 border-t border-white/15 pt-8 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pt-10">
        <AboutReveal>
          <h2 id="about-contact-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Have something in mind?</h2>
          <p className="mt-3 max-w-lg text-pretty leading-relaxed text-zinc-400">Tell me what you want to build or improve. We can work out a useful first step.</p>
        </AboutReveal>
        <AboutReveal delay={0.06} className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-teal-500/35 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-teal-100 transition-colors hover:border-teal-400/60 hover:bg-teal-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
            Discuss your project <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
            Explore work <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </AboutReveal>
      </section>
    </section>
  )
}
