"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

export type ParticleColorStops = {
  start?: string
  mid?: string
  end?: string
}

export type FlowDirection = {
  x?: number
  y?: number
}

export type MonochromeParticlePreviewProps = {
  colors?: ParticleColorStops
  speed?: number
  direction?: FlowDirection
  density?: number
  pointSize?: number
  opacity?: number
  /** Orthographic zoom: 1 = fit container; larger zooms in (center crop). */
  zoom?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = {
  start: "#14b8d2",
  mid: "#b066ec",
  end: "#ec599e",
}

const vertexShader = `
  uniform float uTime;
  uniform float uWaveLayer;
  uniform float uMaxDistance;
  uniform float uPointSizeMultiplier;
  uniform float uOpacityMultiplier;
  uniform vec2 uFlowDirection;
  attribute float delay;
  attribute float particleDist;
  varying float vAlpha;
  varying float vDistanceRatio;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    vec2 flow = length(uFlowDirection) < 0.001 ? vec2(1.0, 0.0) : normalize(uFlowDirection);
    float directionalDistance = dot(position.xy, flow);

    float layerSpeed = 2.0 + uWaveLayer * 0.3;
    float layerFreq = 0.008 + uWaveLayer * 0.002;

    float wave1 = sin(directionalDistance * layerFreq - uTime * layerSpeed + delay);
    float wave2 = sin(particleDist * (layerFreq * 1.5) - uTime * (layerSpeed * 1.2) + delay * 0.7);
    float wave3 = sin(directionalDistance * (layerFreq * 0.6) - uTime * (layerSpeed * 0.8) + delay * 1.3);
    float wave4 = cos(particleDist * (layerFreq * 1.8) - uTime * (layerSpeed * 0.7) + delay * 0.3);

    float pulse = wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.2 + wave4 * 0.1;

    float baseSize = 2.35 + uWaveLayer * 0.55;
    float size = (baseSize + pulse * 2.25) * uPointSizeMultiplier;
    gl_PointSize = max(size, 1.0);

    float baseAlpha = 0.35 + uWaveLayer * 0.07;
    vAlpha = (baseAlpha + (pulse + 1.5) * baseAlpha * 0.55) * uOpacityMultiplier;
    vDistanceRatio = clamp(particleDist / uMaxDistance, 0.0, 1.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColorStart;
  uniform vec3 uColorMid;
  uniform vec3 uColorEnd;
  varying float vAlpha;
  varying float vDistanceRatio;

  void main() {
    vec4 textureColor = texture2D(uTexture, gl_PointCoord);
    if (textureColor.a < 0.3) discard;

    vec3 gradientColor;
    if (vDistanceRatio < 0.5) {
      gradientColor = mix(uColorStart, uColorMid, vDistanceRatio * 2.0);
    } else {
      gradientColor = mix(uColorMid, uColorEnd, (vDistanceRatio - 0.5) * 2.0);
    }

    gl_FragColor = vec4(gradientColor, vAlpha) * textureColor;
  }
`

function createCircleTexture() {
  const textureCanvas = document.createElement("canvas")
  textureCanvas.width = 32
  textureCanvas.height = 32

  const ctx = textureCanvas.getContext("2d")
  if (!ctx) return new THREE.CanvasTexture(textureCanvas)

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)")
  gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.3)")
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)

  return new THREE.CanvasTexture(textureCanvas)
}

function clampMultiplier(value: number | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback
  return Math.min(max, Math.max(min, value))
}

/** Contained Three.js particle preview (sizes to parent; not the full-site background). */
export function MonochromeParticlePreview({
  colors,
  speed = 1.5,
  direction,
  density = 1,
  pointSize = 1,
  opacity = 1,
  zoom = 1.9,
  className,
  style,
}: MonochromeParticlePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoomRef = useRef(1)
  const renderPreviewRef = useRef<(() => void) | null>(null)
  const rebuildPreviewRef = useRef<(() => void) | null>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [webGlFailed, setWebGlFailed] = useState(false)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      // Prefer bounding rect when client box is 0 (flex/aspect timing) so WebGL still boots.
      const r = el.getBoundingClientRect()
      let w = Math.max(32, Math.ceil(el.clientWidth || r.width))
      let h = Math.max(32, Math.ceil(el.clientHeight || r.height))
      // When the parent is still laying out (or aspect-ratio was dropped), height can read ~0
      // while width is valid. A ~32px-tall WebGL canvas looks like an "empty" thin strip.
      if (h < 64 && w >= 64) {
        h = Math.max(200, Math.round((w * 10) / 16))
      }
      if (w < 64 && h >= 64) {
        w = Math.max(200, Math.round((h * 16) / 10))
      }
      setDims({ w, h })
    }

    let measureFrame = 0
    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrame)
      measureFrame = requestAnimationFrame(measure)
    }

    measure()
    scheduleMeasure()
    const ro = new ResizeObserver(scheduleMeasure)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(measureFrame)
      ro.disconnect()
    }
  }, [])

  const resolvedColors = useMemo(
    () => ({
      start: colors?.start ?? DEFAULT_COLORS.start,
      mid: colors?.mid ?? DEFAULT_COLORS.mid,
      end: colors?.end ?? DEFAULT_COLORS.end,
    }),
    [colors?.start, colors?.mid, colors?.end],
  )

  const flowDirection = useMemo(
    () => ({
      x: direction?.x ?? 1,
      y: direction?.y ?? 0.2,
    }),
    [direction?.x, direction?.y],
  )

  const runtimeConfig = useMemo(
    () => ({
      colors: resolvedColors,
      speed: clampMultiplier(speed, 1.5, 0.05, 10),
      direction: flowDirection,
      pointSize: clampMultiplier(pointSize, 1, 0.2, 5),
      opacity: clampMultiplier(opacity, 1, 0, 3),
      zoom: clampMultiplier(zoom, 1.9, 0.25, 4),
      density: clampMultiplier(density, 1, 0.05, 3),
    }),
    [resolvedColors, speed, flowDirection, pointSize, opacity, zoom, density],
  )
  const runtimeConfigRef = useRef(runtimeConfig)
  const previousDensityRef = useRef(runtimeConfig.density)

  useEffect(() => {
    runtimeConfigRef.current = runtimeConfig
    zoomRef.current = runtimeConfig.zoom
    const frame = requestAnimationFrame(() => renderPreviewRef.current?.())
    return () => cancelAnimationFrame(frame)
  }, [runtimeConfig])

  useEffect(() => {
    if (previousDensityRef.current === runtimeConfig.density) return
    previousDensityRef.current = runtimeConfig.density
    rebuildPreviewRef.current?.()
  }, [runtimeConfig.density])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dims.w < 32 || dims.h < 32) return

    const w = dims.w
    const h = dims.h
    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const edgeBuffer = Math.min(500, Math.max(120, Math.round(Math.min(w, h) * 0.35)))

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5000)
    camera.position.set(0, 0, 500)
    camera.lookAt(0, 0, 0)

    const applyOrthoZoom = () => {
      const z = zoomRef.current
      const hx = (w / 2 + edgeBuffer) / z
      const hy = (h / 2 + edgeBuffer) / z
      camera.left = -hx
      camera.right = hx
      camera.top = hy
      camera.bottom = -hy
      camera.updateProjectionMatrix()
    }

    applyOrthoZoom()

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: false,
        preserveDrawingBuffer: false,
      })
      setWebGlFailed(false)
    } catch {
      setWebGlFailed(true)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      return
    }

    const pr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)
    renderer.setPixelRatio(pr)
    renderer.setSize(w, h, false)

    const originX = -w / 2
    const originY = h / 2
    const maxDistance = Math.sqrt(
      Math.pow(w / 2 - originX, 2) + Math.pow(-h / 2 - originY, 2),
    )

    const isMobile = w < 768
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
    const isLowPerformance = isMobile || dpr < 2
    const layers = isMobile
      ? [
          { spacing: 6, density: 0.6, layer: 0 },
          { spacing: 10, density: 0.4, layer: 1 },
        ]
      : isLowPerformance
        ? [
            { spacing: 4, density: 0.8, layer: 0 },
            { spacing: 6, density: 0.6, layer: 1 },
            { spacing: 8, density: 0.4, layer: 2 },
          ]
        : [
            { spacing: 4, density: 0.9, layer: 0 },
            { spacing: 6, density: 0.6, layer: 1 },
            { spacing: 8, density: 0.4, layer: 2 },
          ]

    const particleSystems: { particles: THREE.Points; material: THREE.ShaderMaterial }[] = []
    const particleTexture = createCircleTexture()

    const buildParticleSystems = () => {
      particleSystems.forEach((system) => {
        system.particles.geometry.dispose()
        system.material.dispose()
        scene.remove(system.particles)
      })
      particleSystems.length = 0

      layers.forEach((config) => {
        const buffer = edgeBuffer
        const cols = Math.ceil((w + buffer * 2) / config.spacing)
        const rows = Math.ceil((h + buffer * 2) / config.spacing)
        const particleCount = cols * rows
        const keepProbability = Math.min(
          1,
          Math.max(0, config.density * runtimeConfigRef.current.density),
        )

        const positions = new Float32Array(particleCount * 3)
        const delays = new Float32Array(particleCount)
        const distances = new Float32Array(particleCount)

        let index = 0

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (Math.random() > keepProbability) continue

            const x = i * config.spacing - w / 2 - buffer
            const y = j * config.spacing - h / 2 - buffer
            const z = config.layer * -10

            positions[index * 3] = x
            positions[index * 3 + 1] = y
            positions[index * 3 + 2] = z

            distances[index] = Math.sqrt(Math.pow(x - originX, 2) + Math.pow(y - originY, 2))
            delays[index] = Math.random() * Math.PI * 0.5
            index++
          }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(0, index * 3), 3))
        geometry.setAttribute("delay", new THREE.BufferAttribute(delays.slice(0, index), 1))
        geometry.setAttribute("particleDist", new THREE.BufferAttribute(distances.slice(0, index), 1))

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uTexture: { value: particleTexture },
            uWaveLayer: { value: config.layer },
            uMaxDistance: { value: maxDistance },
            uPointSizeMultiplier: { value: runtimeConfigRef.current.pointSize },
            uOpacityMultiplier: { value: runtimeConfigRef.current.opacity },
            uFlowDirection: {
              value: new THREE.Vector2(
                runtimeConfigRef.current.direction.x,
                runtimeConfigRef.current.direction.y,
              ),
            },
            uColorStart: { value: new THREE.Color(runtimeConfigRef.current.colors.start) },
            uColorMid: { value: new THREE.Color(runtimeConfigRef.current.colors.mid) },
            uColorEnd: { value: new THREE.Color(runtimeConfigRef.current.colors.end) },
          },
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          depthWrite: false,
        })

        const particles = new THREE.Points(geometry, material)
        particles.frustumCulled = false
        scene.add(particles)
        particleSystems.push({ particles, material })
      })
    }

    buildParticleSystems()
    rebuildPreviewRef.current = () => {
      buildParticleSystems()
      renderPreviewRef.current?.()
    }

    let animationFrameId = 0
    let lastFrameTime = performance.now()
    let isAnimating = true
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const renderFrame = (deltaTime = 0) => {
      const runtime = runtimeConfigRef.current

      particleSystems.forEach((system) => {
        system.material.uniforms.uTime.value += deltaTime * runtime.speed
        system.material.uniforms.uPointSizeMultiplier.value = runtime.pointSize
        system.material.uniforms.uOpacityMultiplier.value = runtime.opacity
        system.material.uniforms.uFlowDirection.value.set(runtime.direction.x, runtime.direction.y)
        system.material.uniforms.uColorStart.value.set(runtime.colors.start)
        system.material.uniforms.uColorMid.value.set(runtime.colors.mid)
        system.material.uniforms.uColorEnd.value.set(runtime.colors.end)
      })

      applyOrthoZoom()
      renderer.render(scene, camera)
    }

    renderPreviewRef.current = () => renderFrame()

    function animate(currentTime: number) {
      if (!isAnimating) return

      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const deltaTime = (currentTime - lastFrameTime) / 1000
      lastFrameTime = currentTime
      const cappedDelta = Math.min(deltaTime, 0.1)

      renderFrame(cappedDelta)
    }

    if (shouldReduceMotion) {
      renderFrame()
    } else {
      animate(performance.now())
    }

    return () => {
      isAnimating = false
      cancelAnimationFrame(animationFrameId)
      renderPreviewRef.current = null
      rebuildPreviewRef.current = null
      document.removeEventListener("visibilitychange", handleVisibilityChange)

      particleSystems.forEach((system) => {
        system.particles.geometry.dispose()
        system.material.dispose()
        scene.remove(system.particles)
      })
      particleTexture.dispose()

      renderer.renderLists.dispose()
      renderer.dispose()
      scene.clear()
    }
  }, [dims.w, dims.h])

  return (
    <div
      ref={containerRef}
      className={cn(className, "relative h-full min-h-[280px] w-full min-w-0 overflow-hidden")}
      style={style}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 block h-full w-full min-w-0 rounded-[inherit]"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: 2000,
        }}
      />
      {webGlFailed ? (
        <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-zinc-400" role="status">
          WebGL preview unavailable in this browser.
        </p>
      ) : null}
    </div>
  )
}
