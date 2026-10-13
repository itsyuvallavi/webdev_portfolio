"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error)
    }
  }, [error])

  return (
    <main className="page-gutters relative z-0 flex min-h-[100dvh] flex-col justify-center pb-20 pt-32">
      <p className="mb-6 inline-block self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
        Error
      </p>
      <h1 className="text-[clamp(2.75rem,12vw,10rem)] font-black leading-none tracking-tighter">
        <span className="block text-white">THAT</span>
        <span className="text-outline block">BROKE.</span>
      </h1>
      <p className="mt-10 max-w-[48ch] text-pretty text-lg leading-relaxed text-zinc-300">
        Something went wrong while loading this page. Try again, or go back to the home page.
      </p>
      {error.digest && <p className="mt-4 font-mono text-xs text-zinc-400">Error ID: {error.digest}</p>}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="button" onClick={reset} className="action">
          Try again <ArrowRight className="size-4" aria-hidden />
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
        >
          Go to the home page
        </Link>
      </div>
    </main>
  )
}
