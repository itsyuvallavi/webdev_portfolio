"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { ImageLightbox } from "@/components/image-lightbox"
import { cn } from "@/lib/utils"

interface ScreenshotsCarouselProps {
  screenshots: string[]
  projectTitle: string
  /** Live site URL — shown in the browser chrome when present */
  demoUrl?: string
  slug: string
  /** Short context per screen (case-study style); index aligns with screenshots */
  screenshotCaptions?: string[]
}

function chromeUrl(demoUrl: string | undefined, slug: string) {
  if (demoUrl) {
    try {
      const u = new URL(demoUrl)
      return u.hostname + u.pathname.replace(/\/$/, "") || u.hostname
    } catch {
      return demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    }
  }
  return `${slug}.app`
}

export function ScreenshotsCarousel({
  screenshots,
  projectTitle,
  demoUrl,
  slug,
  screenshotCaptions,
}: ScreenshotsCarouselProps) {
  const id = useId()
  const prefersReducedMotion = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % screenshots.length)
  }

  const handlePrev = () => {
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length)
  }

  const captionFor = (i: number) => screenshotCaptions?.[i]?.trim()

  if (screenshots.length === 0) return null

  return (
    <section
      className="relative w-full"
      aria-labelledby={`${id}-gallery-heading`}
    >
      <div className="mx-auto max-w-3xl px-4 text-left md:px-6">
        <h2
          id={`${id}-gallery-heading`}
          className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
        >
          Product gallery
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
          Key screens from the build, framed for context.{" "}
          <span className="text-zinc-500">Open any shot for full size.</span>
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-4xl space-y-16 md:space-y-24 md:px-4">
        {screenshots.map((src, index) => {
          const caption = captionFor(index)
          return (
            <motion.article
              key={`${src}-${index}`}
              id={`${id}-shot-${index}`}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 28 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-12% 0px" },
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  })}
              className="scroll-mt-28"
            >
              <div className="mb-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400/90">
                  Figure {index + 1}
                  {caption ? <span className="sr-only"> — {caption}</span> : null}
                </p>
                {caption ? (
                  <p className="text-sm font-medium leading-snug text-zinc-200 sm:max-w-md sm:text-right">
                    {caption}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-500 sm:text-right">Interface detail</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block w-full cursor-zoom-in text-left outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Open full size: ${projectTitle} — screen ${index + 1}`}
              >
                {/* Browser chrome — portfolio / case-study convention */}
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-zinc-700/90 bg-zinc-900/95">
                  <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
                    <span className="flex gap-1.5" aria-hidden>
                      <span className="size-3 rounded-full bg-red-500/70" />
                      <span className="size-3 rounded-full bg-amber-400/70" />
                      <span className="size-3 rounded-full bg-emerald-500/70" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-md border border-zinc-800 bg-zinc-950/90 px-3 py-1.5 text-left">
                      <span className="block truncate font-mono text-[11px] text-zinc-500 sm:text-xs">
                        <span className="text-zinc-600">https://</span>
                        {chromeUrl(demoUrl, slug)}
                      </span>
                    </div>
                    <Maximize2
                      className="size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-teal-400"
                      aria-hidden
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "relative overflow-hidden rounded-b-xl border border-zinc-700/90 bg-zinc-950",
                    "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/[0.06]",
                    "transition-[box-shadow] duration-300 group-hover:shadow-teal-950/35",
                  )}
                >
                  <div className="w-full bg-zinc-950">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={
                        caption
                          ? `${projectTitle}: ${caption}`
                          : `${projectTitle} — product screen ${index + 1}`
                      }
                      width={1920}
                      height={1080}
                      className="h-auto w-full object-contain object-top"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                </div>
              </button>
            </motion.article>
          )
        })}
      </div>

      <ImageLightbox
        src={screenshots[activeIndex] || "/placeholder.svg"}
        alt={`${projectTitle} screenshot ${activeIndex + 1}`}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={activeIndex}
        totalImages={screenshots.length}
      />
    </section>
  )
}
