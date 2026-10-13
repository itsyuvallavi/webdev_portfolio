import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteFooter } from "@/components/site/site-links"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
}

export default function NotFound() {
  return (
    <>
      <main className="page-gutters relative z-0 flex min-h-[100dvh] flex-col justify-center pb-20 pt-32">
        <p className="mb-6 inline-block self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          404
        </p>
        <h1 className="text-[clamp(2.75rem,12vw,10rem)] font-black leading-none tracking-tighter">
          <span className="block text-white">NOT</span>
          <span className="text-outline block">HERE.</span>
        </h1>
        <p className="mt-10 max-w-[48ch] text-pretty text-lg leading-relaxed text-zinc-300">
          This page does not exist, or it has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/" className="action">
            Go to the home page <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
          >
            See the work
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
