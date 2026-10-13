"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Held } from "@/components/motion/held"
import { cn } from "@/lib/utils"
import { ImageLightbox } from "./lightbox"

/** A case study's screens, stepping down the page on alternating sides. Selecting one opens it at full size. */
export function Screens({ title, screenshots, captions }: {
  title: string
  screenshots: readonly string[]
  /** One line per screen, in the same order. */
  captions?: readonly string[]
}) {
  const [active, setActive] = useState<number | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const opener = useRef(0)
  const count = screenshots.length
  const describe = (index: number) => captions?.[index]?.trim() || `Screen ${index + 1} of ${count} from ${title}`

  return (
    <>
      <ol className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
        {screenshots.map((src, index) => {
          const caption = captions?.[index]?.trim()
          return (
            <li key={src} className={cn("md:w-[82%]", index % 2 === 1 ? "md:ml-auto" : "md:mr-auto")}>
              <figure>
                <figcaption className="mb-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[var(--sheet-accent)]">{String(index + 1).padStart(2, "0")}</span>
                  {caption ? <span className="max-w-[60ch] text-pretty leading-relaxed text-[var(--sheet-muted)]">{caption}</span> : null}
                </figcaption>
                <button
                  ref={(node) => { buttons.current[index] = node }}
                  type="button"
                  onClick={() => { opener.current = index; setActive(index) }}
                  aria-label={`Open at full size: ${describe(index)}`}
                  className="group block w-full cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                >
                  <Held travel={24} className="screen-frame rounded-lg border border-[var(--sheet-line)] transition-colors group-hover:border-teal-300/40">
                    <Image src={src} alt={describe(index)} fill sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1399px) 70vw, 1040px" className="object-cover" />
                  </Held>
                </button>
              </figure>
            </li>
          )
        })}
      </ol>

      <ImageLightbox
        src={screenshots[active ?? 0]}
        alt={describe(active ?? 0)}
        isOpen={active !== null}
        onClose={() => setActive(null)}
        onClosed={() => buttons.current[opener.current]?.focus()}
        onNext={() => setActive((index) => ((index ?? 0) + 1) % count)}
        onPrev={() => setActive((index) => ((index ?? 0) - 1 + count) % count)}
        currentIndex={active ?? 0}
        totalImages={count}
      />
    </>
  )
}
