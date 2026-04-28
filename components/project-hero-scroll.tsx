"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageLightbox } from "@/components/image-lightbox"

interface ProjectHeroScrollProps {
  image: string
  title: string
  description: string
  alt: string
}

export function ProjectHeroScroll({ image, title, description, alt }: ProjectHeroScrollProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <div
      className="relative mb-0 flex h-auto min-h-0 flex-col overflow-hidden pt-4 md:min-h-[100dvh] md:-mb-16 md:items-start md:justify-center md:pt-20"
    >
      {/* Image Container with Zoom Effect removed (per user request) */}
      <div
        className="group relative mx-auto mb-0 aspect-video w-full max-w-7xl cursor-pointer overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-teal-500/20"
        style={{ isolation: 'isolate' }}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="100vw"
          priority
        />

        {/* Gradient Overlay - Desktop Only */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Description overlay — full opacity while hero is in view (scroll-driven fade removed; it read too late). */}
        <div className="pointer-events-none absolute bottom-12 left-12 right-auto hidden max-w-md md:block">
          <div className="bg-black/80 px-6 py-4 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <p className="text-sm text-gray-200 leading-relaxed break-words lg:text-base">{description}</p>
          </div>
        </div>
      </div>

      {/* Description Below Image - Mobile Only */}
      <div className="md:hidden w-full max-w-4xl mx-auto mt-8 px-4 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white break-words">Overview</h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed break-words text-justify">
          {description}
        </p>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        src={image || "/placeholder.svg"}
        alt={alt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  )
}

