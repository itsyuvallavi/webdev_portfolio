"use client"

import { useSyncExternalStore } from "react"

const query = "(prefers-reduced-motion: reduce)"

const subscribe = (notify: () => void) => {
  const preference = window.matchMedia(query)
  preference.addEventListener("change", notify)
  return () => preference.removeEventListener("change", notify)
}

/**
 * False on the server, during hydration, and for visitors who ask for reduced motion.
 * So a page is sent in its finished state, and motion switches on only after it has loaded.
 */
export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, () => !window.matchMedia(query).matches, () => false)
}
