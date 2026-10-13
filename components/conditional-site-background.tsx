"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MonochromeDotsBackground } from "@/components/monochrome-dots-background"
import { useSandstormContext } from "@/components/transitions/sandstorm-provider"

/** Full-site particle layer is disabled on `/monochrome` and `/lab/*`, which own their canvas. */
export function ConditionalSiteBackground() {
  const pathname = usePathname()
  const ownsCanvas = pathname === "/monochrome" || pathname.startsWith("/lab/")
  const [enableWebGl, setEnableWebGl] = useState(false)
  const [backgroundVersion, setBackgroundVersion] = useState(0)
  const { setBackgroundReady } = useSandstormContext()
  const markBackgroundReady = useCallback(() => setBackgroundReady(true), [setBackgroundReady])
  const markBackgroundUnavailable = useCallback(() => setBackgroundReady(false), [setBackgroundReady])

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection

    if (reducedMotion || connection?.saveData) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const enable = () => setEnableWebGl(true)
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleId = idleWindow.requestIdleCallback(enable, { timeout: 1200 })
    } else {
      timeoutId = globalThis.setTimeout(enable, 650)
    }

    return () => {
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId)
      }
      if (idleId !== undefined) {
        idleWindow.cancelIdleCallback?.(idleId)
      }
    }
  }, [])

  useEffect(() => {
    if (!enableWebGl || ownsCanvas) {
      setBackgroundReady(false)
      return
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    const rebuildAfterResize = () => {
      if (resizeTimer !== undefined) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setBackgroundReady(false)
        setBackgroundVersion((version) => version + 1)
      }, 180)
    }

    window.addEventListener("resize", rebuildAfterResize)
    return () => {
      if (resizeTimer !== undefined) clearTimeout(resizeTimer)
      window.removeEventListener("resize", rebuildAfterResize)
      setBackgroundReady(false)
    }
  }, [enableWebGl, ownsCanvas, pathname, setBackgroundReady])

  if (ownsCanvas) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
      style={{
        backgroundImage:
          "radial-gradient(circle at 16% 12%, rgba(20,184,166,0.10), transparent 34%), radial-gradient(circle at 82% 78%, rgba(168,85,247,0.08), transparent 38%)",
      }}
    >
      {enableWebGl ? (
        <MonochromeDotsBackground
          key={backgroundVersion}
          onReady={markBackgroundReady}
          onUnavailable={markBackgroundUnavailable}
        />
      ) : null}
    </div>
  )
}
