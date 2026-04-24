"use client"

import { useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSandstormContext } from "./sandstorm-provider"

interface UseSandstormTransitionOptions {
  targetPath: string
  duration?: number // in ms, default 3000
  onComplete?: () => void
}

/** Gentler than cubic — less snap at peak and endpoints */
function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
}

export function useSandstormTransition({
  targetPath,
  duration = 3200,
  onComplete,
}: UseSandstormTransitionOptions) {
  const router = useRouter()
  const { setStormControls, stormIntensityRef, stormActiveRef } = useSandstormContext()
  const isAnimatingRef = useRef(false)
  const lastUiSyncRef = useRef(0)

  const triggerStorm = useCallback(() => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    stormIntensityRef.current = 0
    stormActiveRef.current = true
    setStormControls({ isActive: true, intensity: 0 })

    const startTime = performance.now()
    const halfDuration = duration / 2
    let navigated = false

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      let intensity: number
      if (progress < 0.5) {
        intensity = easeInOutQuint(progress * 2)
      } else {
        intensity = easeInOutQuint(1 - (progress - 0.5) * 2)
      }

      // WebGL + rAF readers: zero React batching delay
      stormIntensityRef.current = intensity

      // Throttle React state (~20Hz) for any component that still reads stormControls.intensity
      if (now - lastUiSyncRef.current > 48) {
        lastUiSyncRef.current = now
        setStormControls({ isActive: true, intensity })
      }

      if (!navigated && elapsed >= halfDuration) {
        navigated = true
        router.push(targetPath)
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
