"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || !containerRef.current || !imageRef.current || !overlayRef.current) {
      // If reduced motion, set final state immediately
      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1 })
      }
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 60%",
        scrub: 1,
        // markers: true, // Enable for debugging
      },
    })

    // Image zoom: 0.7 → 1.0 (no cropping)
    tl.fromTo(
      imageRef.current,
      { scale: 0.5 },
      { scale: 1.0, ease: "power2.out" },
      0
    )

    // Overlay fade in + slide up (starts at 30% of timeline - appears earlier)
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
      className="relative w-full h-[100vh] flex items-start justify-center pt-20 overflow-hidden -mb-16"
    >
      {/* Image Container with Zoom Effect */}
      <div
        ref={imageRef}
        className="relative w-full max-w-7xl mx-auto aspect-video rounded-2xl overflow-hidden ring-1 ring-purple-500/20 shadow-2xl shadow-purple-500/10 mb-0"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Description Overlay - Bottom Left */}
        <div
          ref={overlayRef}
          className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-md opacity-0"
        >
          {/* Minimal Text Box */}
          <div className="bg-black/40 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-lg border border-white/10">
            <p className="text-xs md:text-sm lg:text-base text-gray-200 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
