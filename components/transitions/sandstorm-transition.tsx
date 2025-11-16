"use client"

import { useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSandstormContext } from "./sandstorm-provider"

interface UseSandstormTransitionOptions {
  targetPath: string
  duration?: number // in ms, default 3000
  onComplete?: () => void
}

export function useSandstormTransition({
  targetPath,
  duration = 3000,
  onComplete,
}: UseSandstormTransitionOptions) {
  const router = useRouter()
  const { stormControls, setStormControls } = useSandstormContext()
  const isAnimatingRef = useRef(false)

  const triggerStorm = useCallback(() => {
    if (isAnimatingRef.current) return // Prevent double trigger

    console.log("🌪️ Sandstorm: Triggering transition to", targetPath)

    isAnimatingRef.current = true
    setStormControls({ isActive: true, intensity: 0 })

    const startTime = Date.now()
    const halfDuration = duration / 2

    // Easing function (ease-in-out)
    const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t)

    // Animation loop
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate intensity (0 → 1 → 0)
      let intensity: number
      if (progress < 0.5) {
        // Build up (0 → 1)
        intensity = easeInOutQuart(progress * 2)
      } else {
        // Settle down (1 → 0)
        intensity = easeInOutQuart(1 - (progress - 0.5) * 2)
      }

      setStormControls({ isActive: true, intensity })

      // Navigate at 50% mark
      if (elapsed >= halfDuration && elapsed < halfDuration + 100) {
        console.log("🔄 Sandstorm: Navigating to", targetPath)
        router.push(targetPath)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Complete
        console.log("✅ Sandstorm: Transition complete")
        setStormControls({ isActive: false, intensity: 0 })
        isAnimatingRef.current = false
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }, [targetPath, duration, router, onComplete, setStormControls])

  return {
    triggerStorm,
  }
}
