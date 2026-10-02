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
  backgroundReady: boolean
  setBackgroundReady: (ready: boolean) => void
  stormIntensityRef: MutableRefObject<number>
  stormActiveRef: MutableRefObject<boolean>
}

const SandstormContext = createContext<SandstormContextType | undefined>(undefined)

export function SandstormProvider({ children }: { children: ReactNode }) {
  const stormIntensityRef = useRef(0)
  const stormActiveRef = useRef(false)
  const [backgroundReady, setBackgroundReadyState] = useState(false)
  const [stormControls, setStormControlsState] = useState<SandstormControls>({
    isActive: false,
    intensity: 0,
  })

  const setStormControls = useCallback((controls: SandstormControls) => {
    stormActiveRef.current = controls.isActive
    stormIntensityRef.current = controls.intensity
    setStormControlsState(controls)
  }, [])
  const setBackgroundReady = useCallback((ready: boolean) => {
    setBackgroundReadyState(ready)
  }, [])

  return (
    <SandstormContext.Provider
      value={{
        stormControls,
        setStormControls,
        backgroundReady,
        setBackgroundReady,
        stormIntensityRef,
        stormActiveRef,
      }}
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
