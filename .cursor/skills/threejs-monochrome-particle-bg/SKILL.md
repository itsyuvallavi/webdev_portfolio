---
name: threejs-monochrome-particle-bg
description: >-
  Build or port the full-viewport Three.js layered particle wave background (Points +
  ShaderMaterial, GLSL waves, soft sprite texture, cyan–purple–pink distance gradient,
  additive blending, mobile/desktop density tiers). Use for Next.js/React canvas
  backgrounds, Three.js Points shaders, or “monochrome dots” style hero backdrops.
  Does NOT cover page transitions, SandstormProvider, sandstorm hooks, or any
  button-triggered navigation or storm orchestration—only the static/ambient background.
---

# Three.js monochrome particle background (background only)

## Scope

**In scope:** One client component that owns a fixed full-viewport canvas, `WebGLRenderer`, `Points` layers, buffer geometry with `delay` / `distance` attributes, vertex + fragment shaders, circular sprite texture, animation loop, resize + visibility + disposal.

**Out of scope (do not implement or document as part of this skill):**

- `SandstormProvider`, `sandstorm-transition`, `stormIntensityRef`, or syncing storm intensity to routes
- “Explore work” (or any) **button** driving the background or navigation
- `contentOpacityFromStormIntensity` or fading page chrome with storm
- Any Next.js **transition** tied to clicking a CTA

If the canonical repo file still contains storm uniforms in GLSL, keep them but drive **`uStormIntensity` with a constant `0`** (or a local `useRef(0)` never updated) so the effect matches the ambient default. Do not add context providers for storm.

## Canonical reference in this repo

- Full technical detail: `@docs/monochrome-particle-background-ai-tutorial.md` — use for numbers (camera, layers, spacing, shader strings), but **skip** layout/integration bullets that require `SandstormProvider` or storm-driven UI.
- Implementation reference: `@components/monochrome-dots-background.tsx` — when copying, **strip** `useSandstormContext` and read storm from ref; bind `uStormIntensity` to `0` in the animation loop.

## Integration (minimal)

- Mount the component once (e.g. root layout) with a **fixed** canvas behind content (`-z-10`); main content **`relative z-10`**.
- Dependencies: `three`, `@types/three` (dev).

## Verification

- Resize and tab hide/show behave; no console WebGL errors; dispose runs on unmount (geometries, materials, textures, renderer).
