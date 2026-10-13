import type { Metadata } from "next"
import { PageSheet } from "@/components/site/page-sheet"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `Privacy | ${site.name}`,
  description: "What this site collects when you get in touch, why, who receives it and how to have it deleted.",
}

// Draft. It describes what the site does today: keep it in step with the contact form and the hosting.
const updated = "13 October 2026"

const link =
  "rounded-sm text-[var(--sheet-accent)] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-[var(--sheet-line)] py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="max-w-[62ch] space-y-4 text-pretty leading-relaxed text-[var(--sheet-muted)]">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main>
      <header className="page-gutters relative z-0 pb-16 pt-32 lg:pb-24">
        <p className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          Privacy
        </p>
        <h1 className="text-[clamp(2.75rem,12vw,10rem)] font-black leading-none tracking-tighter">
          <span className="block text-white">YOUR</span>
          <span className="text-outline block">DETAILS.</span>
        </h1>
        <p className="mt-10 max-w-[56ch] text-pretty text-lg leading-relaxed text-zinc-300">
          This site collects very little. This page says what, why, who receives it and how to have it deleted.
        </p>
      </header>

      <PageSheet closing={false}>
        <div className="page-gutters py-16 lg:py-24">
          <Part title="Who is responsible">
            <p>
              {site.name}, a software engineer based in {site.location}, Portugal. For anything on this page, write to{" "}
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>.
            </p>
          </Part>

          <Part title="What is collected">
            <p>
              <strong className="font-medium text-[var(--sheet-fg)]">When you use the contact form:</strong> your name, your email
              address and your message. I use them to reply to you and, if we go on to work together, to do that work.
            </p>
            <p>
              <strong className="font-medium text-[var(--sheet-fg)]">To stop abuse of the form:</strong> the server notes the network
              address a message came from and counts messages from it. That note is held in memory for up to 15 minutes and is
              not written to a database.
            </p>
            <p>
              <strong className="font-medium text-[var(--sheet-fg)]">When you visit any page:</strong> the hosting company processes
              the technical details every web server needs to deliver a page, such as your network address, your browser and the
              time, and keeps its own server logs.
            </p>
          </Part>

          <Part title="What is not collected">
            <p>This site sets no cookies, has no analytics, shows no advertising and loads nothing from other companies&apos; servers.</p>
          </Part>

          <Part title="Who receives it">
            <p>
              Your message is delivered to my inbox by an email delivery service, Resend. The site is hosted by Netlify. Both are
              companies based in the United States and may process data there. Your message is not stored in a database on this site.
            </p>
            <p>I do not sell your details or pass them to anyone else.</p>
          </Part>

          <Part title="How long it is kept">
            <p>
              I keep an enquiry for as long as it takes to deal with it and with any work that follows, and delete it when it is no
              longer needed. You can ask me to delete yours sooner.
            </p>
          </Part>

          <Part title="Your rights">
            <p>
              You can ask to see the details I hold about you, to have them corrected or deleted, or to object to how they are used.
              Write to <a href={`mailto:${site.email}`} className={link}>{site.email}</a>.
            </p>
            <p>
              You can also complain to the data protection authority where you live. In Portugal that is the Comissão Nacional de
              Proteção de Dados, at{" "}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className={link}>cnpd.pt</a>.
            </p>
          </Part>

          <p className="border-t border-[var(--sheet-line)] pt-8 font-mono text-xs text-[var(--sheet-muted)]">Last updated {updated}.</p>
        </div>
      </PageSheet>
    </main>
  )
}
