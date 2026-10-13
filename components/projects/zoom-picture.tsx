"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Held } from "@/components/motion/held"
import { cn } from "@/lib/utils"
import { ImageLightbox } from "./lightbox"

/** A project picture in a held frame. Selecting it opens the picture at full size. */
export function ZoomPicture({ src, alt, label, sizes, priority = false, className }: {
  src: string
  alt: string
  /** What the button does, for people who cannot see the picture. */
  label: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className="group block w-full cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
      >
        <Held travel={24} className={cn("rounded-lg border border-[var(--sheet-line)] transition-colors group-hover:border-teal-300/40", className)}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </Held>
      </button>
      <ImageLightbox src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)} onClosed={() => buttonRef.current?.focus()} />
    </>
  )
}
