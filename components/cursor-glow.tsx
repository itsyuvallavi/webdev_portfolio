"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Smooth follow with easing
      currentX += (mouseX - currentX) * 0.1
      currentY += (mouseY - currentY) * 0.1

      glow.style.transform = `translate(${currentX}px, ${currentY}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none -z-10 hidden md:block"
      style={{
        width: "600px",
        height: "600px",
        marginLeft: "-300px",
        marginTop: "-300px",
      }}
    >
      <div
        className="w-full h-full rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  )
}
