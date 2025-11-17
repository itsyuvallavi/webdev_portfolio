"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useSandstormContext } from "./transitions/sandstorm-provider"

export function MonochromeDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { stormControls } = useSandstormContext()
  const stormIntensityRef = useRef(0)

  // Update ref whenever storm intensity changes
  useEffect(() => {
    stormIntensityRef.current = stormControls?.intensity || 0
  }, [stormControls])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const isMobile = window.innerWidth < 768
    const isLowPerformance = isMobile || window.devicePixelRatio < 2

    // Performance: pause animation when tab is hidden
    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Vertex Shader - Organic, flowing waves with storm effect
    const vertexShader = `
      #define PI 3.1415926535897932384626433832795
      uniform float uTime;
      uniform float uWaveLayer;
      uniform float uMaxDistance;
      uniform float uStormIntensity;  // 0-1, storm effect intensity
      attribute float delay;
      attribute float distance;
      varying float vAlpha;
      varying float vDistanceRatio;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        // Base wave parameters
        float layerSpeed = 2.0 + uWaveLayer * 0.3;
        float layerFreq = 0.008 + uWaveLayer * 0.002;

        // Storm effect: increase speed dramatically
        float stormSpeedMultiplier = 1.0 + uStormIntensity * 4.0; // 1x to 5x
        layerSpeed *= stormSpeedMultiplier;

        float wave1 = sin(distance * layerFreq - uTime * layerSpeed + delay);
        float wave2 = sin(distance * (layerFreq * 1.5) - uTime * (layerSpeed * 1.2) + delay * 0.7);
        float wave3 = sin(distance * (layerFreq * 0.6) - uTime * (layerSpeed * 0.8) + delay * 1.3);
        float wave4 = cos(distance * (layerFreq * 1.8) - uTime * (layerSpeed * 0.7) + delay * 0.3);

        float pulse = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.2 + wave4 * 0.1);

        // Storm effect: add horizontal turbulent movement (sandstorm sweeping horizontally)
        if (uStormIntensity > 0.0) {
          // Create turbulent horizontal movement
          float turbulence = sin(position.y * 0.005 + uTime * 2.0) *
                             cos(distance * 0.01 + uTime * 1.5);

          // Move particles horizontally (left to right sweep)
          float horizontalOffset = uStormIntensity * turbulence * 300.0;
          mvPosition.x += horizontalOffset;

          // Add subtle vertical turbulence too
          float verticalTurbulence = cos(position.x * 0.003 + uTime * 2.5);
          mvPosition.y += uStormIntensity * verticalTurbulence * 100.0;
        }

        // Storm effect: larger particles during storm
        float baseSize = 2.35 + uWaveLayer * 0.55;
        float stormSizeBoost = uStormIntensity * 1.5; // Add up to 1.5 to size
        float size = baseSize + pulse * 2.25 + stormSizeBoost;
        gl_PointSize = max(size, 1.5);

        // Storm effect: brighter particles
        float baseAlpha = 0.25 + uWaveLayer * 0.07;
        float stormAlphaBoost = uStormIntensity * 0.25; // Add up to 25% more opacity
        vAlpha = baseAlpha + (pulse + 1.0) * baseAlpha * 0.55 + stormAlphaBoost;

        // Pass normalized distance for color gradient
        vDistanceRatio = clamp(distance / uMaxDistance, 0.0, 1.0);

        gl_Position = projectionMatrix * mvPosition;
      }
    `

    // Fragment Shader
    const fragmentShader = `
      uniform sampler2D uTexture;
      varying float vAlpha;
      varying float vDistanceRatio;

      void main() {
        vec4 textureColor = texture2D(uTexture, gl_PointCoord);
        if (textureColor.a < 0.3) discard;

        // Create gradient from cyan (close) to purple/pink (far)
        // Balanced brightness for Chrome/Safari
        vec3 colorStart = vec3(0.08, 0.725, 0.825); // Cyan
        vec3 colorMid = vec3(0.70, 0.40, 0.925);   // Purple
        vec3 colorEnd = vec3(0.925, 0.35, 0.65);   // Pink

        // Smooth gradient transition
        vec3 gradientColor;
        if (vDistanceRatio < 0.5) {
          gradientColor = mix(colorStart, colorMid, vDistanceRatio * 2.0);
        } else {
          gradientColor = mix(colorMid, colorEnd, (vDistanceRatio - 0.5) * 2.0);
        }

        vec4 dotColor = vec4(gradientColor, vAlpha);
        vec4 color = dotColor * textureColor;

        gl_FragColor = color;
      }
    `

    // Create circular texture for particles
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

    // Setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      depth: false,
      preserveDrawingBuffer: false
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Calculate max distance for gradient normalization
    const originX = -window.innerWidth / 2
    const originY = window.innerHeight / 2
    const maxDistance = Math.sqrt(
      Math.pow(window.innerWidth / 2 - originX, 2) + Math.pow(-window.innerHeight / 2 - originY, 2)
    )

    // Create multiple wave layers with different properties
    // Reduce layers and increase spacing on mobile for better performance
    const layers = isMobile
      ? [
          { spacing: 6, density: 0.6, layer: 0 }, // Reduced density on mobile
          { spacing: 10, density: 0.4, layer: 1 }, // Sparser on mobile
        ]
      : isLowPerformance
        ? [
            { spacing: 4, density: 0.8, layer: 0 },
            { spacing: 6, density: 0.6, layer: 1 },
            { spacing: 8, density: 0.4, layer: 2 },
          ]
        : [
            { spacing: 4, density: 0.9, layer: 0 }, // Slightly less dense
            { spacing: 6, density: 0.6, layer: 1 }, // Medium layer
            { spacing: 8, density: 0.4, layer: 2 }, // Sparse outer layer
          ]

    const particleSystems: { particles: THREE.Points; material: THREE.ShaderMaterial }[] = []

    layers.forEach((config) => {
      const spacing = config.spacing
      // Increase buffer to ensure full screen coverage (especially during storm movement)
      const buffer = 500 // Larger buffer for storm effect horizontal movement
      const cols = Math.ceil((window.innerWidth + buffer * 2) / spacing)
      const rows = Math.ceil((window.innerHeight + buffer * 2) / spacing)
      const particleCount = cols * rows

      const positions = new Float32Array(particleCount * 3)
      const delays = new Float32Array(particleCount)
      const distances = new Float32Array(particleCount)

      // Origin point (top-left corner in screen space)
      const originX = -window.innerWidth / 2
      const originY = window.innerHeight / 2

      let index = 0

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Skip some particles based on density for sparser layers
          if (Math.random() > config.density) continue

          const x = i * spacing - window.innerWidth / 2 - buffer
          const y = j * spacing - window.innerHeight / 2 - buffer
          const z = config.layer * -10 // Slight depth variation per layer

          positions[index * 3] = x
          positions[index * 3 + 1] = y
          positions[index * 3 + 2] = z

          // Calculate distance from origin (top-left corner)
          const dist = Math.sqrt(Math.pow(x - originX, 2) + Math.pow(y - originY, 2))
          distances[index] = dist

          // Random delay for organic variation
          delays[index] = Math.random() * Math.PI * 0.5

          index++
        }
      }

      // Trim arrays to actual size
      const actualPositions = positions.slice(0, index * 3)
      const actualDelays = delays.slice(0, index)
      const actualDistances = distances.slice(0, index)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(actualPositions, 3))
      geometry.setAttribute("delay", new THREE.BufferAttribute(actualDelays, 1))
      geometry.setAttribute("distance", new THREE.BufferAttribute(actualDistances, 1))

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        // frustumCulled: true,
        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: createCircleTexture() },
          uWaveLayer: { value: config.layer },
          uMaxDistance: { value: maxDistance },
          uStormIntensity: { value: 0 }, // Storm effect intensity
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)
      // particles.frustumCulled = false // Disable on the mesh object instead
      particleSystems.push({ particles, material })
    })

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop with time-based updates for consistent speed
    let animationFrameId: number
    let lastFrameTime = performance.now()
    let isAnimating = true

    function animate(currentTime: number) {
      // Stop if cleanup was called
      if (!isAnimating) return

      animationFrameId = requestAnimationFrame(animate)

      // Skip frame if not visible (tab is hidden)
      if (!isVisible) return

      // Calculate actual time delta for consistent animation speed
      const deltaTime = (currentTime - lastFrameTime) / 1000 // Convert to seconds
      lastFrameTime = currentTime

      // Cap delta time to prevent huge jumps (e.g., when tab becomes visible again)
      const cappedDelta = Math.min(deltaTime, 0.1)

      // Get current storm intensity from ref (to avoid closure issues)
      const stormIntensity = stormIntensityRef.current

      // Update time and storm effect for all particle systems
      // Time-based animation ensures consistent speed at any frame rate
      // Multiply by speed factor for visible animation
      const animationSpeed = 1.5
      particleSystems.forEach((system) => {
        system.material.uniforms.uTime.value += cappedDelta * animationSpeed
        system.material.uniforms.uStormIntensity.value = stormIntensity
      })

      renderer.render(scene, camera)
    }

    animate(performance.now())

    // Cleanup
    return () => {
      // Stop animation loop
      isAnimating = false
      cancelAnimationFrame(animationFrameId)

      // Remove event listeners
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)

      // Dispose all resources properly
      particleSystems.forEach((system) => {
        // Dispose texture
        if (system.material.uniforms.uTexture.value) {
          system.material.uniforms.uTexture.value.dispose()
        }
        // Dispose geometry and material
        system.particles.geometry.dispose()
        system.material.dispose()
        // Remove from scene
        scene.remove(system.particles)
      })

      // Clear and dispose renderer
      renderer.renderLists.dispose()
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 2000
      }}
    />
  )
}
