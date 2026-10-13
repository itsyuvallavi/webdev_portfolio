import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Held } from "@/components/motion/held"
import { ServicePicture } from "@/components/samples/service-picture"
import { PageSheet } from "@/components/site/page-sheet"
import { ProcessSteps } from "@/components/site/process-steps"
import { services } from "@/content/services"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: `Services | ${site.name}`,
  description:
    "Six pieces of software for small businesses: enquiries answered, bookings and reminders, invoice reminders, paperwork filed, an online shop, and reviews. One task at a time, at a fixed price.",
}

const number = (index: number) => String(index + 1).padStart(2, "0")
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"

function Details({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-3 text-pretty text-[0.95rem] leading-relaxed">{children}</dd>
    </div>
  )
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-[var(--sheet-accent)]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ServicesPage() {
  return (
    <main>
      <header className="page-gutters relative z-0 flex min-h-[100dvh] flex-col justify-center pb-20 pt-32">
        <p className="mb-6 inline-block self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          Services
        </p>
        <h1 className="text-[clamp(2.25rem,9.5vw,8.5rem)] font-black leading-none tracking-tighter">
          <span className="block text-white">ROUTINE WORK,</span>
          {/* A thinner outline while the type is small, so the letters stay open. */}
          <span className="text-outline block [-webkit-text-stroke-width:1px] sm:[-webkit-text-stroke-width:2px]">HANDLED.</span>
        </h1>
        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="max-w-[56ch] text-pretty text-lg leading-relaxed text-zinc-300">
            I am a software engineer in {site.location}. I build small tools that do one repetitive task for you and
            your team: answering enquiries, taking bookings, sending invoice reminders, filing paperwork. Each project
            starts with one task and a fixed price.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact"
              className="action"
            >
              Tell me about one task <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="#process" className={cn("inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white", focusRing)}>
              How a project runs
            </Link>
          </div>
        </div>
        <nav aria-label="Services on this page" className="mt-14 border-t border-white/10 pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {services.map((service, index) => (
              <li key={service.id}>
                <Link href={`#${service.id}`} className={cn("inline-flex min-h-11 items-center gap-2 rounded-sm font-mono text-xs text-zinc-400 transition-colors hover:text-teal-200", focusRing)}>
                  <span className="text-teal-300/70">{number(index)} /</span> {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <PageSheet>
        <div className="page-gutters py-24 lg:py-32">
          <p className="mb-16 max-w-[62ch] border-l border-[var(--sheet-line)] pl-4 text-pretty text-sm leading-relaxed text-[var(--sheet-muted)] lg:mb-24">
            The pictures on this page are illustrations with invented data. Each tool is built around the programs you already use.
          </p>
          {services.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className={cn("scroll-mt-28", index > 0 && "mt-20 border-t border-[var(--sheet-line)] pt-20 lg:mt-28 lg:pt-28")}
            >
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <p className="font-mono text-xs text-[var(--sheet-accent)]">{number(index)} / {service.name}</p>
                  <h2 id={`${service.id}-title`} className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl lg:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-[48ch] text-pretty text-lg leading-relaxed text-[var(--sheet-muted)]">{service.summary}</p>
                </div>
                <Held className="aspect-[4/5] rounded-lg border border-[var(--sheet-line)] sm:aspect-[16/10]">
                  <ServicePicture id={service.id} />
                </Held>
              </div>
              <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
                <Details label="What it does"><List items={service.does} /></Details>
                <Details label="What I need from you"><List items={service.needs} /></Details>
                <Details label="Works with">{service.worksWith}</Details>
                <Details label="Limits and safeguards">
                  <span className="block border-l border-[var(--sheet-accent)] pl-4 text-[var(--sheet-muted)]">{service.limit}</span>
                </Details>
              </dl>
            </section>
          ))}

          <div id="process" className="scroll-mt-28">
            <ProcessSteps />
          </div>

          <div className="mt-24 grid gap-x-16 gap-y-16 border-t border-[var(--sheet-line)] pt-20 lg:mt-36 lg:grid-cols-2 lg:pt-28">
            <section aria-labelledby="data-title">
              <p className="eyebrow">Your data</p>
              <h2 id="data-title" className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">
                Your customers&apos; details stay yours.
              </h2>
              <div className="mt-6 max-w-[52ch] space-y-4 text-pretty leading-relaxed text-[var(--sheet-muted)]">
                <p>Before I see any of them, we agree in writing what I receive, where it is kept, who else can reach it and when it is deleted.</p>
                <p>Wherever possible the tool runs on your own accounts, so the data does not leave them.</p>
                <p>I ask for the least I need. A first look can happen on your screen, with nothing sent to me.</p>
              </div>
            </section>

            <section aria-labelledby="who-title">
              <p className="eyebrow">Who you would work with</p>
              <div className="mt-5 flex items-start gap-6">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-[var(--sheet-line)] bg-zinc-900 sm:size-28">
                  <Image src="/portrait.webp" alt={`Portrait of ${site.name}`} fill sizes="112px" className="object-cover" />
                </div>
                <div>
                  <h2 id="who-title" className="text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">{site.name}</h2>
                  <p className="mt-2 font-mono text-xs text-[var(--sheet-muted)]">Software engineer, {site.location}</p>
                </div>
              </div>
              <div className="mt-6 max-w-[52ch] space-y-4 text-pretty leading-relaxed text-[var(--sheet-muted)]">
                <p>You deal with me from the first conversation to the hand-over. Nothing is passed on to someone else.</p>
                <p>I usually reply within two working days.</p>
              </div>
              <Link href="/about" className="text-link mt-4">
                More about me <ArrowRight className="size-4" aria-hidden />
              </Link>
            </section>
          </div>

          <section aria-labelledby="websites-title" className="mt-20 border-t border-[var(--sheet-line)] pt-12 lg:mt-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div>
                <p className="eyebrow">Also</p>
                <h2 id="websites-title" className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Need a website as well?</h2>
                <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">
                  I build websites too. Two I made for clients:
                </p>
              </div>
              <ul className="flex shrink-0 flex-wrap gap-x-8 gap-y-1">
                <li>
                  <Link href="/projects/eb-and-flow" className="text-link">EB &amp; FLOW <ArrowUpRight className="size-4" aria-hidden /></Link>
                </li>
                <li>
                  <Link href="/projects/frontier-aerospace" className="text-link">Frontier Aerospace <ArrowUpRight className="size-4" aria-hidden /></Link>
                </li>
                <li>
                  <Link href="/projects" className="text-link">All work <ArrowUpRight className="size-4" aria-hidden /></Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </PageSheet>
    </main>
  )
}
