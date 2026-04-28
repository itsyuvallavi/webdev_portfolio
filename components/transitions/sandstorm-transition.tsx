"use client"

import { useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSandstormContext } from "./sandstorm-provider"

interface UseSandstormTransitionOptions {
  targetPath: string
  duration?: number // in ms, default 3000
  onComplete?: () => void
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

export function useSandstormTransition({
  targetPath,
  duration = 3200,
  onComplete,
}: UseSandstormTransitionOptions) {
  const router = useRouter()
  const { setStormControls, stormIntensityRef, stormActiveRef } = useSandstormContext()
  const isAnimatingRef = useRef(false)

  const triggerStorm = useCallback(() => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    stormIntensityRef.current = 0
    stormActiveRef.current = true
    setStormControls({ isActive: true, intensity: 0 })

    const startTime = performance.now()
    const halfDuration = duration / 2
    let navigated = false
    let contentReleased = false

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      let intensity: number
      if (progress < 0.5) {
        intensity = easeInOutSine(progress * 2)
      } else {
        intensity = easeInOutSine(1 - (progress - 0.5) * 2)
      }

      // WebGL + rAF readers: zero React batching delay
      stormIntensityRef.current = intensity

      if (!navigated && elapsed >= halfDuration) {
        navigated = true
        setStormControls({ isActive: true, intensity: 1 })
        router.push(targetPath)
      }

      if (navigated && !contentReleased && intensity < 0.3) {
        contentReleased = true
        setStormControls({ isActive: true, intensity })
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        stormIntensityRef.current = 0
        stormActiveRef.current = false
        setStormControls({ isActive: false, intensity: 0 })
        isAnimatingRef.current = false
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }, [targetPath, duration, router, onComplete, setStormControls, stormIntensityRef, stormActiveRef])

  return {
    triggerStorm,
  }
}
