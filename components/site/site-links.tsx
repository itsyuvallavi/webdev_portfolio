import Link from "next/link"
import { site, socialLinks } from "@/content/site"
import { cn } from "@/lib/utils"

const link =
  "inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"

/** Email, social profiles and the privacy notice: the links every page ends with. */
export function SiteLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 font-mono text-xs text-zinc-400", className)}>
      <li>
        <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
      </li>
      {socialLinks.map((social) => (
        <li key={social.id}>
          <a href={social.url} target="_blank" rel="noopener noreferrer" className={link}>{social.name}</a>
        </li>
      ))}
      <li>
        <Link href="/privacy" className={link}>Privacy</Link>
      </li>
    </ul>
  )
}

/** The plain footer for short pages, where a full closing screen would be out of proportion. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--sheet-line)] bg-[var(--sheet-bg)]">
      <div className="page-gutters flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-zinc-400">{site.name} — {site.location}</p>
        <SiteLinks />
      </div>
    </footer>
  )
}
