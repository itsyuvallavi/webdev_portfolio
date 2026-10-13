import type { Metadata } from "next"
import { Github, Linkedin, Mail, Send, type LucideIcon } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { PageSheet } from "@/components/site/page-sheet"
import { site, socialLinks, type SocialLink } from "@/content/site"

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description:
    "Tell me about your business, the tools you use, and the one task you would like to hand over. A rough idea is enough to start a conversation.",
}

const icons: Record<SocialLink["id"], LucideIcon> = { linkedin: Linkedin, github: Github, telegram: Send }

const directLink =
  "group flex min-h-11 items-center gap-3 rounded-lg text-[var(--sheet-muted)] transition-colors hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
const directIcon =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--sheet-line)] bg-white/[0.04] transition-colors group-hover:border-teal-500/35 group-hover:bg-teal-500/10"

export default function ContactPage() {
  return (
    <main>
      <header className="page-gutters relative z-0 pb-16 pt-32 lg:pb-24">
        <p className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          Contact
        </p>
        <h1 className="text-[clamp(2.75rem,12vw,10rem)] font-black leading-none tracking-tighter">
          <span className="block text-white">LET&apos;S</span>
          <span className="text-outline block">TALK.</span>
        </h1>
        <p className="mt-10 max-w-[56ch] text-pretty text-lg leading-relaxed text-zinc-300">
          Tell me about your business, the tools you use, and the one task you would like to hand over.
          A rough idea is enough to start a conversation.
        </p>
      </header>

      <PageSheet closing={false}>
        <div className="page-gutters grid gap-x-16 gap-y-16 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:py-28">
          <section aria-labelledby="form-title">
            <p className="eyebrow">Send a message</p>
            <h2 id="form-title" className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">Describe the task</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <section aria-labelledby="direct-title">
            <p className="eyebrow">Or write directly</p>
            <h2 id="direct-title" className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-4xl">Email works too</h2>
            <p className="mt-5 max-w-[44ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">
              Share a link, or describe the task you want to improve.
            </p>
            <ul className="mt-8 space-y-2">
              <li>
                <a href={`mailto:${site.email}`} className={directLink}>
                  <span className={directIcon}><Mail className="size-4" strokeWidth={1.5} aria-hidden /></span>
                  <span className="text-sm font-medium">{site.email}</span>
                </a>
              </li>
              {socialLinks.map((social) => {
                const Icon = icons[social.id]
                return (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className={directLink}>
                      <span className={directIcon}><Icon className="size-4" strokeWidth={1.5} aria-hidden /></span>
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-10 border-t border-[var(--sheet-line)] pt-6">
              <h3 className="eyebrow">Reply time</h3>
              <p className="mt-3 text-[var(--sheet-muted)]">Usually within two working days.</p>
            </div>
          </section>
        </div>
      </PageSheet>
    </main>
  )
}
