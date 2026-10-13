"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const SPACING = 16
/** The grid drifts at this fraction of scroll speed, so the stage has a speed of its own. */
const DRIFT = 0.08

const vertexShader = `
  uniform float uOffsetY;
  uniform float uRowShift;
  uniform float uVelocity;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uPixelRatio;
  attribute vec2 cell;
  varying float vAlpha;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // Identity follows the drifting grid, so wrapping the offset never pops.
    float seed = hash(vec2(cell.x, cell.y - uRowShift));
    vec3 p = position;
    p.y += uOffsetY;

    // Scroll sway: rows lean while the page moves and settle when it stops.
    float sway = sin(p.x * 0.006 + uTime + seed * 0.6);
    p.y += uVelocity * 10.0 * sway;

    vec2 away = p.xy - uPointer;
    float dist = length(away);
    float lift = uPointerStrength * smoothstep(180.0, 0.0, dist);
    p.xy += (away / max(dist, 0.001)) * lift * 6.0;

    float energy = abs(uVelocity);
    gl_PointSize = (1.7 + lift * 1.6 + energy * 0.9) * uPixelRatio;
    vAlpha = 0.5 * (0.4 + 0.6 * seed) + lift * 0.4 + energy * 0.18;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.3, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

/**
 * Prototype stage for `/lab/scroll`: a one-tone dot grid that is still at rest
 * and only draws while the page is scrolling or the pointer is moving.
 */
export function QuietDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, depth: false, stencil: false })
    } catch {
      return
    }
    const pixelRatio = Math.min(window.devicePixelRatio, finePointer ? 2 : 1.5)
    renderer.setPixelRatio(pixelRatio)
    renderer.setClearColor(0x000000, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10)
    camera.position.z = 1

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uOffsetY: { value: 0 },
        uRowShift: { value: 0 },
        uVelocity: { value: 0 },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(1e5, 1e5) },
        uPointerStrength: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uColor: { value: new THREE.Color(0.72, 0.84, 0.86) },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })
    const points = new THREE.Points(new THREE.BufferGeometry(), material)
    points.frustumCulled = false
    scene.add(points)

    let width = 0
    let height = 0
    const layout = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height, false)
      camera.left = -width / 2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = -height / 2
      camera.updateProjectionMatrix()

      // Spare rows above and below keep the drifting grid from showing an edge.
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 3
      const positions = new Float32Array(cols * rows * 3)
      const cells = new Float32Array(cols * rows * 2)
      let i = 0
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          positions[i * 3] = col * SPACING - width / 2
          positions[i * 3 + 1] = (row - 1) * SPACING - height / 2
          cells[i * 2] = col
          cells[i * 2 + 1] = row
          i++
        }
      }
      points.geometry.dispose()
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("cell", new THREE.BufferAttribute(cells, 2))
      points.geometry = geometry
    }

    const uniforms = material.uniforms
    const pointerGoal = new THREE.Vector2(1e5, 1e5)
    let pointerTarget = 0
    let velocity = 0
    let lastScrollY = window.scrollY
    let last = performance.now()
    let frame = 0

    const draw = (now: number) => {
      frame = 0
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const scrollY = window.scrollY
      const target = dt > 0 ? Math.max(-1, Math.min(1, (scrollY - lastScrollY) / dt / 2400)) : 0
      lastScrollY = scrollY
      velocity += (target - velocity) * (1 - Math.exp(-dt * 8))

      const pointer = uniforms.uPointer.value as THREE.Vector2
      pointer.lerp(pointerGoal, 1 - Math.exp(-dt * 10))
      uniforms.uPointerStrength.value += (pointerTarget - uniforms.uPointerStrength.value) * (1 - Math.exp(-dt * 6))

      const drift = scrollY * DRIFT
      uniforms.uRowShift.value = Math.floor(drift / SPACING)
      uniforms.uOffsetY.value = drift % SPACING
      uniforms.uVelocity.value = velocity
      uniforms.uTime.value += dt * (0.4 + Math.abs(velocity) * 2)
      renderer.render(scene, camera)

      const settled =
        Math.abs(velocity) < 0.002 &&
        target === 0 &&
        Math.abs(pointerTarget - uniforms.uPointerStrength.value) < 0.01 &&
        pointer.distanceTo(pointerGoal) < 0.5
      if (!settled) frame = requestAnimationFrame(draw)
    }
    // Drawing stops once everything has settled; any input starts it again.
    const wake = () => {
      if (frame) return
      last = performance.now() - 16
      frame = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerGoal.set(event.clientX - width / 2, height / 2 - event.clientY)
      pointerTarget = 1
      wake()
    }
    const handlePointerLeave = () => {
      pointerTarget = 0
      wake()
    }
    const handleResize = () => {
      layout()
      wake()
    }

    layout()
    draw(performance.now())

    window.addEventListener("resize", handleResize)
    if (!reducedMotion) {
      window.addEventListener("scroll", wake, { passive: true })
      if (finePointer) {
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", handlePointerLeave)
      }
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", wake)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      points.geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
