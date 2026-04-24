"use client"

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type MutableRefObject,
} from "react"

export interface SandstormControls {
  isActive: boolean
  intensity: number
}

interface SandstormContextType {
  stormControls: SandstormControls
  setStormControls: (controls: SandstormControls) => void
  stormIntensityRef: MutableRefObject<number>
  stormActiveRef: MutableRefObject<boolean>
}

const SandstormContext = createContext<SandstormContextType | undefined>(undefined)

export function SandstormProvider({ children }: { children: ReactNode }) {
  const stormIntensityRef = useRef(0)
  const stormActiveRef = useRef(false)
  const [stormControls, setStormControlsState] = useState<SandstormControls>({
    isActive: false,
    intensity: 0,
  })

  const setStormControls = useCallback((controls: SandstormControls) => {
    stormActiveRef.current = controls.isActive
    stormIntensityRef.current = controls.intensity
    setStormControlsState(controls)
  }, [])

  return (
    <SandstormContext.Provider
      value={{ stormControls, setStormControls, stormIntensityRef, stormActiveRef }}
    >
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
