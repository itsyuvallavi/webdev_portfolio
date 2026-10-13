import type { Metadata } from "next"
import Image from "next/image"
import { Held } from "@/components/motion/held"
import { PageSheet } from "@/components/site/page-sheet"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description:
    "Meet Yuval Lavi: a software engineer in Lisbon with a background in film composition and audio engineering, building software and websites for small businesses.",
}

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
    company: "Independent | Lisbon",
    description:
      "Built professional service websites and enhanced an aerospace company's Squarespace site with custom JavaScript interactions. Developed web applications using Next.js, React, TypeScript, and Firebase.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS", "JavaScript", "Squarespace"],
  },
  {
    period: "November 2024 - Present",
    title: "Web Developer & Technical Operations",
    company: "Sense & Sound",
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
  },
]

const part = "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
const divided = "mt-20 border-t border-[var(--sheet-line)] pt-20 lg:mt-28 lg:pt-28"

export default function AboutPage() {
  return (
    <main>
      <header className="page-gutters relative z-0 grid min-h-[100dvh] items-center gap-12 pb-20 pt-32 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
        <div>
          <p className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
            About
          </p>
          <h1 className="text-[clamp(2.75rem,11vw,9rem)] font-black leading-none tracking-tighter">
            <span className="block text-white">I&apos;M</span>
            <span className="text-outline block">YUVAL.</span>
          </h1>
          <p className="mt-10 max-w-[30ch] text-balance text-2xl font-medium leading-tight tracking-tight text-zinc-100 sm:text-3xl">
            I build software that takes routine work off small businesses.
          </p>
          <p className="mt-6 max-w-[55ch] text-pretty text-lg leading-relaxed text-zinc-300">
            I work with websites, automations, and custom tools for small businesses and independent professionals.
            My background in film composition and audio engineering shapes how I think about detail, rhythm,
            and how an interface feels.
          </p>
          <p className="mt-6 font-mono text-xs text-zinc-400">Based in {site.location}</p>
        </div>
        <Held travel={24} className="mx-auto aspect-[3/4] w-full max-w-sm rounded-lg border border-white/10 md:ml-auto md:mr-0">
          <Image
            src="/portrait.webp"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="(max-width: 767px) min(100vw, 384px), (max-width: 1279px) 35vw, 384px"
            className="object-cover"
          />
        </Held>
      </header>

      <PageSheet>
        <div className="page-gutters py-24 lg:py-32">
          <section aria-labelledby="background-title" className={part}>
            <div>
              <p className="font-mono text-xs text-[var(--sheet-accent)]">01 / Background</p>
              <h2 id="background-title" className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">
                From the studio to the screen.
              </h2>
            </div>
            <div className="max-w-[62ch] space-y-5 text-pretty text-lg leading-relaxed text-[var(--sheet-muted)]">
              <p>
                Film composition and audio engineering taught me to listen closely, shape a story, and work within
                technical constraints. Those habits carry into development: understanding what matters, making
                deliberate choices, and paying attention to the details.
              </p>
              <p>
                Today I build with Next.js, React, TypeScript, and Firebase. I bring that same attention to the way
                a website reads, a tool works, and an interface moves.
              </p>
            </div>
          </section>

          <section aria-labelledby="skills-title" className={`${part} ${divided}`}>
            <div>
              <p className="font-mono text-xs text-[var(--sheet-accent)]">02 / Skills</p>
              <h2 id="skills-title" className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">What I work with.</h2>
            </div>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="eyebrow">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 leading-relaxed text-[var(--sheet-fg)]">
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience-title" className={divided}>
            <p className="font-mono text-xs text-[var(--sheet-accent)]">03 / Experience</p>
            <h2 id="experience-title" className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">Work along the way.</h2>
            <ol className="mt-12 divide-y divide-[var(--sheet-line)] border-t border-[var(--sheet-line)]">
              {experiences.map((experience) => (
                <li key={experience.title} className={`${part} py-10`}>
                  <p className="font-mono text-xs leading-relaxed text-[var(--sheet-muted)] lg:pt-2">{experience.period}</p>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight">{experience.title}</h3>
                    <p className="mt-2 text-sm text-[var(--sheet-accent)]">{experience.company}</p>
                    <p className="mt-4 max-w-[65ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{experience.description}</p>
                    <ul aria-label={`Technologies used as ${experience.title}`} className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs leading-relaxed text-[var(--sheet-muted)]">
                      {experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </PageSheet>
    </main>
  )
}
