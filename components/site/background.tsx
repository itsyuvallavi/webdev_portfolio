"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

// Loaded on its own, after the page, so the 3D library is not part of any page's first download.
const QuietDots = dynamic(() => import("./quiet-dots").then((m) => m.QuietDotsBackground), { ssr: false })

/** The quiet dot field behind every page. The playground at `/monochrome` draws its own. */
export function SiteBackground() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined
    const start = () => setReady(true)
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1200 })
    } else {
      timeoutId = setTimeout(start, 650)
    }
    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId)
    }
  }, [])

  if (pathname === "/monochrome") return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-black">
      {ready ? <QuietDots /> : null}
    </div>
  )
}
