import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { services, collaborationSteps } from "@/lib/services"
import { ServicesProgress, ServicesReveal, ServicesTitle } from "@/components/services-motion"
import { cn } from "@/lib/utils"
import styles from "./services.module.css"

export const metadata: Metadata = {
  title: "Services | Yuval Lavi",
  description:
    "Websites, automations, integrations, and custom tracking tools for small businesses and independent professionals. Start with a clear problem and an agreed scope.",
}

function ServiceExample({ serviceId }: { serviceId: typeof services[number]["id"] }) {
  const example = {
    websites: { href: "/projects/eb-and-flow", src: "/ebnflow/1.webp", width: 3456, height: 1994, title: "EB & Flow", label: "Client website", alt: "EB & Flow therapy website with navigation, service introduction, and contact actions" },
    automations: { href: "/projects/trackd", src: "/trackd/2.png?v=2", width: 3440, height: 1910, title: "Trackd · Scheduled job search", label: "Application project · automation", alt: "Trackd's scheduled job-search automation with a queue of results for review" },
    "custom-tools": { href: "/projects/trackd", src: "/trackd/1.png?v=2", width: 3442, height: 1910, title: "Trackd", label: "Application project · job tracking", alt: "Trackd application showing a list of job applications and their statuses" },
  }[serviceId]

  return (
    <Link href={example.href} className="group mt-7 block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
      <figure>
        <Image
          src={example.src}
          alt={example.alt}
          width={example.width}
          height={example.height}
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1399px) 42vw, 560px"
          className="h-auto w-full rounded-lg border border-white/10"
        />
        <figcaption className="reading-surface mt-3 flex items-center justify-between gap-4 px-4 py-3">
          <span>
            <span className="block font-mono text-xs leading-relaxed text-zinc-400">{example.label}</span>
            <span className="mt-1 block text-sm font-medium text-zinc-200 transition-colors group-hover:text-teal-200">{example.title}</span>
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-teal-200" aria-hidden />
        </figcaption>
      </figure>
    </Link>
  )
}

export default function ServicesPage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10">
      <ServicesProgress className={styles.progress} />
      <header className="flex min-h-[calc(100dvh-8rem)] flex-col justify-center pb-16 lg:pb-24">
        <ServicesReveal>
          <p className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Services</p>
        </ServicesReveal>
        <h1 className="text-[clamp(2.75rem,7.8vw,7.5rem)] font-black leading-none tracking-tighter">
          <ServicesTitle text="BUILD BETTER." className="text-white" />
          <ServicesTitle text="WORK SIMPLER." className={styles.outline} delay={0.2} />
        </h1>
        <ServicesReveal delay={0.12} className="mt-8 flex flex-col items-start gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="reading-surface max-w-[54ch] p-5 text-pretty text-base leading-relaxed text-zinc-300 sm:p-6 sm:text-lg">
            I help small businesses and independent professionals build clear websites,
            connect their tools, and keep track of their work. We start with what you need
            and agree on a scope that makes sense.
          </p>
          <Link href="/contact" className={cn(styles.action, "inline-flex min-h-12 shrink-0 items-center gap-3 rounded-lg border border-teal-500/35 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-teal-100 backdrop-blur-sm hover:border-teal-400/60 hover:bg-teal-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300")}>
            Discuss your project <ArrowRight className={cn(styles.arrow, "size-4")} aria-hidden />
          </Link>
        </ServicesReveal>
        <ServicesReveal delay={0.18} className="mt-12">
          <nav aria-label="Service categories" className="reading-surface flex flex-wrap gap-x-8 gap-y-2 p-5 sm:p-6">
            {services.map((service) => (
              <Link key={service.id} href={`#${service.id}`} className={cn(styles.action, "inline-flex min-h-11 items-center gap-3 font-mono text-xs text-zinc-400 hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300")}>
                <span className="text-teal-300/70">{service.number} /</span> {service.title}
              </Link>
            ))}
          </nav>
        </ServicesReveal>
      </header>

      <div>
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            className="scroll-mt-28 pb-12 lg:pb-20"
          >
            <ServicesReveal line className={styles.divider} />
            <div className="grid gap-7 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start md:gap-10 lg:gap-16 lg:pt-12">
              <ServicesReveal className={cn("md:pt-5", index % 2 === 1 && "md:order-2")}>
                <p className="mb-5 font-mono text-xs text-teal-300/70" aria-hidden>{service.number} /</p>
                <h2 id={`${service.id}-title`} className="max-w-md text-3xl font-semibold leading-tight tracking-tighter text-white sm:text-4xl lg:text-5xl">{service.title}</h2>
                <p className="reading-surface mt-5 max-w-md p-5 text-pretty leading-relaxed text-zinc-300">{service.summary}</p>
                <ServiceExample serviceId={service.id} />
              </ServicesReveal>
              <ServicesReveal delay={0.06}>
                <div className={cn(styles.panel, "content-surface p-6 sm:p-8")}>
                  <p className="max-w-[58ch] text-pretty leading-relaxed text-zinc-300">{service.description}</p>
                  <ul className="mt-7 space-y-4 text-sm text-zinc-300">
                    {service.examples.map((example) => (
                      <li key={example} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-teal-400/70" aria-hidden />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-l border-teal-500/40 pl-4 text-sm leading-relaxed text-zinc-400">{service.startingPoint}</p>
                </div>
              </ServicesReveal>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="process-title" className="reading-surface my-12 p-6 sm:p-8 lg:my-20 lg:p-10">
        <ServicesReveal className="mb-10 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Working together</p>
          <h2 id="process-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Clear scope, from the start.</h2>
          <p className="mt-4 text-pretty leading-relaxed text-zinc-400">
            A project can be a few useful improvements or a new build. The quote follows
            the problem, the tools involved, and the work we agree to deliver.
          </p>
        </ServicesReveal>
        <ServicesReveal line className={styles.divider} />
        <ol className="grid gap-8 pt-8 lg:grid-cols-3 lg:gap-10">
          {collaborationSteps.map((step, index) => (
            <li key={step.number}>
              <ServicesReveal delay={index * 0.06}>
                <p className="mb-4 font-mono text-xs text-teal-300/80" aria-hidden>{step.number}</p>
                <h3 className="text-lg font-medium text-zinc-100">{step.title}</h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </ServicesReveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="services-contact-title">
        <ServicesReveal className={cn(styles.panel, "content-surface flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10")}>
          <div className="max-w-xl">
            <h2 id="services-contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Tell me what you want to improve.</h2>
            <p className="mt-4 text-pretty leading-relaxed text-zinc-400">
              Send a little about your business, a link or example of your current setup,
              and what you would like to make easier. We can work out a useful first step.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-5">
            <Link href="/contact" className={cn(styles.action, "inline-flex min-h-12 items-center gap-3 rounded-lg border border-teal-500/35 bg-teal-500/10 px-5 py-3 text-sm font-medium text-teal-100 hover:border-teal-400/60 hover:bg-teal-500/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300")}>
              Discuss your project <ArrowRight className={cn(styles.arrow, "size-4")} aria-hidden />
            </Link>
            <Link href="/projects" className={cn(styles.action, "inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300")}>
              See related work <ArrowUpRight className={cn(styles.arrow, "size-4")} aria-hidden />
            </Link>
          </div>
        </ServicesReveal>
      </section>
    </main>
  )
}
