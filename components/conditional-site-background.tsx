"use client"

import { usePathname } from "next/navigation"
import { MonochromeDotsBackground } from "@/components/monochrome-dots-background"

/** Full-site particle layer is disabled on `/monochrome` so the playground owns the canvas. */
export function ConditionalSiteBackground() {
  const pathname = usePathname()
  if (pathname === "/monochrome") return null
  return <MonochromeDotsBackground />
}
