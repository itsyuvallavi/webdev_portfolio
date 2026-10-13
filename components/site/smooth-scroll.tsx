"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

/**
 * Weighted scrolling for mouse and trackpad. Touch devices keep native scrolling,
 * and so does anyone who asks for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lenis: Lenis | undefined

    const sync = () => {
      const wanted = finePointer.matches && !reducedMotion.matches
      if (wanted && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.085,
          wheelMultiplier: 0.9,
          // Links to a section on the same page scroll there with the same weight.
          anchors: true,
          // Panels that scroll on their own (menus, the playground's settings) keep doing so.
          allowNestedScroll: true,
          // Momentum from the old page must not carry into the new one. The page is not forced to the top, so back and forward keep their place.
          stopInertiaOnNavigate: true,
          // Dialogs lock the page by marking the body; stand down while one is open.
          virtualScroll: () => !document.body.hasAttribute("data-scroll-locked"),
        })
      } else if (!wanted && lenis) {
        lenis.destroy()
        lenis = undefined
      }
    }

    sync()
    finePointer.addEventListener("change", sync)
    reducedMotion.addEventListener("change", sync)
    return () => {
      finePointer.removeEventListener("change", sync)
      reducedMotion.removeEventListener("change", sync)
      lenis?.destroy()
    }
  }, [])

  return null
}
