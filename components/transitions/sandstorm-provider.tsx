"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface SandstormControls {
  isActive: boolean
  intensity: number // 0-1
}

interface SandstormContextType {
  stormControls: SandstormControls
  setStormControls: (controls: SandstormControls) => void
}

const SandstormContext = createContext<SandstormContextType | undefined>(undefined)

export function SandstormProvider({ children }: { children: ReactNode }) {
  const [stormControls, setStormControls] = useState<SandstormControls>({
    isActive: false,
    intensity: 0,
  })

  return (
    <SandstormContext.Provider value={{ stormControls, setStormControls }}>
      {children}
    </SandstormContext.Provider>
  )
}

export function useSandstormContext() {
  const context = useContext(SandstormContext)
  if (!context) {
    throw new Error("useSandstormContext must be used within SandstormProvider")
  }
  return context
}
