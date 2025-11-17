"use client"

import { useRef } from "react"
import { TextReveal } from "../text-reveal"
import { Typewriter } from "../typewriter"
import { useSandstormTransition } from "../transitions/sandstorm-transition"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const sectionRef = useRef<HTMLElement>(null)

  // Sandstorm context and transition hook
  const { stormControls } = useSandstormContext()
  const { triggerStorm } = useSandstormTransition({
    targetPath: "/projects",
    duration: 3000, // 3 seconds
  })

  const handleLinkClick = () => {
    triggerStorm()
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-between py-20",
        "transition-opacity duration-1000 ease-out",
        stormControls.isActive ? "opacity-0" : "opacity-100"
      )}
    >
        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-[3.5rem] xs:text-[4.5rem] sm:text-[6rem] md:text-[12rem] lg:text-[14rem] font-black leading-none tracking-tighter">
            <TextReveal text="CREATIVE" className="block text-white" />
            <TextReveal
              text="DEVELOPER"
              className="block text-transparent"
              delay={0.3}
              style={{
                WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
              }}
            />
          </h1>
        </div>

        <div className="mt-8 md:mt-12 text-center md:text-left">
          <p className="text-xs sm:text-sm font-mono text-gray-400">
            <Typewriter text="// CREATIVE ROOTS. TECHNICAL PRECISION." delay={50} />
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative pb-12">
        {/* Centered Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleLinkClick}
            className="group px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-gray-400 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2 sm:gap-3"
          >
            <span>EXPLORE MY WORK</span>
            <svg
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Bottom Right Text */}
        <div className="max-w-md mx-auto md:ml-auto md:mx-0 text-center md:text-right">
          <p className="text-xs text-gray-500 leading-relaxed mb-2">
            Full-Stack Web Developer with strong creative roots in film composition. Proficient with Next.js, React,
            TailwindCSS, TypeScript, and Firebase. Fast learner, extremely dedicated, delivering polished interfaces
            with attention to UX and performance.
          </p>
          <p className="text-xs font-mono text-gray-400">Yuval Lavi / Full-Stack Developer</p>
        </div>
      </div>
    </section>
  )
}
