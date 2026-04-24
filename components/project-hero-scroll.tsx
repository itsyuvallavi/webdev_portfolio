"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ImageLightbox } from "@/components/image-lightbox"

interface ProjectHeroScrollProps {
  image: string
  title: string
  description: string
  alt: string
}

export function ProjectHeroScroll({ image, title, description, alt }: ProjectHeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Overlay fade in + slide up
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1])
  const overlayY = useTransform(scrollYProgress, [0.3, 1], [30, 0])

  return (
    <div
      ref={containerRef}
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

        {/* Description Overlay - Desktop Only */}
        <motion.div
          className="hidden md:block absolute bottom-12 left-12 right-auto max-w-md"
          style={prefersReducedMotion ? undefined : { opacity: overlayOpacity, y: overlayY }}
        >
          {/* Minimal Text Box */}
          <div className="bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/10 overflow-hidden">
            <p className="text-sm lg:text-base text-gray-200 leading-relaxed break-words">
              {description}
            </p>
          </div>
        </motion.div>
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

