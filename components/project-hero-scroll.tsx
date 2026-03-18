"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ImageLightbox } from "@/components/image-lightbox"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectHeroScrollProps {
  image: string
  title: string
  description: string
  alt: string
}

export function ProjectHeroScroll({ image, title, description, alt }: ProjectHeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference or mobile
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.matchMedia("(max-width: 768px)").matches

    if (prefersReducedMotion || isMobile || !containerRef.current || !imageRef.current || !overlayRef.current) {
      // If reduced motion or mobile, set final state immediately
      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1 })
      }
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    // Create GSAP timeline (desktop only)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 60%",
        scrub: 1,
        // markers: true, // Enable for debugging
      },
    })

    // Image zoom: 0.5 → 1.0 (desktop only)
    tl.fromTo(
      imageRef.current,
      { scale: 0.5 },
      { scale: 1.0, ease: "power2.out" },
      0
    )

    // Overlay fade in + slide up (desktop only)
    tl.fromTo(
      overlayRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power2.out" },
      0.3
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto md:h-[100vh] flex flex-col md:items-start md:justify-center pt-4 md:pt-20 overflow-hidden mb-0 md:-mb-16"
    >
      {/* Image Container with Zoom Effect */}
      <div
        ref={imageRef}
        className="relative w-full max-w-7xl mx-auto aspect-video rounded-2xl overflow-hidden ring-1 ring-purple-500/20 shadow-2xl shadow-purple-500/10 mb-0 cursor-pointer group"
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
        <div
          ref={overlayRef}
          className="hidden md:block absolute bottom-12 left-12 right-auto max-w-md opacity-0"
        >
          {/* Minimal Text Box */}
          <div className="bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/10 overflow-hidden">
            <p className="text-sm lg:text-base text-gray-200 leading-relaxed break-words">
              {description}
            </p>
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
