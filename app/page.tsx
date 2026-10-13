import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/hero"
import { Held } from "@/components/motion/held"
import { ServicePicture } from "@/components/samples/service-picture"
import { Walkthrough } from "@/components/samples/walkthrough"
import { PageSheet } from "@/components/site/page-sheet"
import { ProcessSteps } from "@/components/site/process-steps"
import { featuredServices } from "@/content/services"
import { cn } from "@/lib/utils"

// Each service sits on the opposite side from the one before and starts part-way down it.
// On a wide screen that is two columns offset by one row; below that, alternate left and right.
const stagger = [
  "md:mr-auto xl:col-start-1 xl:row-start-1",
  "md:ml-auto xl:col-start-2 xl:row-start-2",
  "md:mr-auto xl:col-start-1 xl:row-start-3",
  "md:ml-auto xl:col-start-2 xl:row-start-4",
].map((placement) => `${placement} xl:mx-0`)

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="page-gutters relative z-10 pb-28 lg:pb-40">
        <Walkthrough />
      </section>

      <PageSheet>
        <div className="page-gutters py-24 lg:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sheet-muted)]">What I do</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
            Software that does your routine work.
          </h2>

          <div className="mt-16 grid gap-x-16 gap-y-20 lg:mt-24 lg:gap-y-28 xl:grid-cols-2">
            {featuredServices.map((service, index) => (
              <article key={service.id} className={cn("md:w-[72%] xl:row-span-2 xl:w-auto", stagger[index % stagger.length])}>
                <p className="font-mono text-xs text-[var(--sheet-accent)]">
                  {String(index + 1).padStart(2, "0")} / {service.name}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{service.title}</h3>
                <p className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{service.summary}</p>
                <Link href={`/services#${service.id}`} className="text-link mt-4">
                  How it works<span className="sr-only">: {service.name}</span> <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Held className="mt-8 aspect-[4/5] rounded-lg border border-[var(--sheet-line)] sm:aspect-[16/10]">
                  <ServicePicture id={service.id} />
                </Held>
              </article>
            ))}
          </div>

          <p className="mt-20 border-t border-[var(--sheet-line)] pt-8 lg:mt-28">
            <Link href="/services" className="text-link">
              All six services, in detail <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>

          <ProcessSteps />
        </div>
      </PageSheet>
    </main>
  )
}
