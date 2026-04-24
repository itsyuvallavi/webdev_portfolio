# Tutorial: Monochrome particle wave background — context for AI (Cursor & Claude Code)

This document captures **implementation context** for the full-viewport Three.js particle background used in this repo, and explains how to **reuse or regenerate** it with Cursor or Claude Code (skills, prompts, and repo conventions).

---

## 1. What you are porting

### Visual behavior

- **Full-screen fixed canvas** behind all UI (`fixed inset-0`, negative z-index).
- **Black scene**; particles are **soft circular sprites** (radial gradient baked into a 32×32 canvas texture).
- **Additive blending** so overlapping dots glow subtly.
- **Layered sine/cosine waves** in the vertex shader displace apparent motion; each particle has a **random phase delay**.
- **Distance-based color** in the fragment shader: normalized distance from a **top-left origin** drives a **cyan → purple → pink** gradient (RGB values are explicit in the shader).
- **Optional “storm” mode**: when `uStormIntensity` goes from `0` to `1`, waves speed up (up to ~5×), particles get extra horizontal/vertical turbulence, larger `gl_PointSize`, and higher alpha.

### Performance behavior

- **Pixel ratio** capped with `Math.min(devicePixelRatio, 2)`.
- **Mobile** (`innerWidth < 768`): fewer layers, lower density, wider spacing.
- **Low performance** (mobile **or** `devicePixelRatio < 2`): three layers with intermediate density; desktop “high” path uses three layers with slightly higher density.
- **Tab hidden**: `visibilitychange` skips rendering (animation frame still scheduled but returns early before render).
- **Resize**: camera aspect + renderer size updated on `resize`.
- **Cleanup**: cancel rAF, remove listeners, dispose geometries, materials, textures, renderer, clear scene.

### Stack (this repository)


| Piece               | Role                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `three`             | `WebGLRenderer`, `Scene`, `PerspectiveCamera`, `Points`, `BufferGeometry`, `ShaderMaterial` |
| Next.js App Router  | `"use client"` component; mounted from root layout                                          |
| React               | `useEffect` + `useRef` for lifecycle-safe WebGL setup/teardown                              |
| Tailwind            | Canvas positioning classes                                                                  |
| `SandstormProvider` | React context supplying `stormControls.intensity` (0–1) read by the background              |


**Dependencies to install in a new project**

```bash
pnpm add three
pnpm add -D @types/three
```

(Versions in this repo at time of writing: `three@0.181.1`, `@types/three@^0.181.0`.)

---

## 2. Canonical source files in this repo


| File                                            | Purpose                                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `components/monochrome-dots-background.tsx`     | Full implementation: shaders, grid generation, layers, animation loop, storm uniforms                                   |
| `components/transitions/sandstorm-provider.tsx` | Context: `stormControls: { isActive, intensity }`                                                                       |
| `app/layout.tsx`                                | Wraps app with `SandstormProvider`, renders `<MonochromeDotsBackground />` before content; content uses `relative z-10` |


**Layout integration pattern**

- Provider wraps children that need storm API (including the background).
- Background canvas is **not** inside the z-10 wrapper; UI is **above** the canvas.

---

## 3. Technical reference (for AI and humans)

### 3.1 Canvas element

- Classes: `fixed inset-0 w-full h-full -z-10`
- Inline style hints: `willChange: 'transform'`, `translateZ(0)`, `backfaceVisibility: 'hidden'`, `perspective: 2000`

### 3.2 Camera and scene

- `PerspectiveCamera(75, width/height, 0.1, 2000)`, `camera.position.z = 500`
- `scene.background = new THREE.Color(0x000000)`

### 3.3 Renderer options

```text
antialias: true
powerPreference: "high-performance"
alpha: false
stencil: false
depth: false
preserveDrawingBuffer: false
```

### 3.4 Particle grid and layers

- **Origin for distance** (gradient): top-left of the plane in camera space — `originX = -innerWidth/2`, `originY = innerHeight/2`.
- **maxDistance**: diagonal from that origin to bottom-right corner (used as `uMaxDistance` for `vDistanceRatio`).
- **Buffer** around viewport: `500` px (extra margin so storm horizontal motion does not expose empty edges).
- **Per layer**: `spacing`, `density` (probability to keep a grid point), `layer` index.
- **Z separation**: `z = layer * -10` for mild depth between layers.
- **Attributes**: `position` (vec3), `delay` (float, random), `distance` (float, from origin).

**Layer presets (abbreviated)**

- Mobile: 2 layers, spacing 6 / 10, density 0.6 / 0.4.
- Low-performance desktop: 3 layers, spacing 4 / 6 / 8, density 0.8 / 0.6 / 0.4.
- Default desktop: spacing 4 / 6 / 8, density 0.9 / 0.6 / 0.4.

### 3.5 Shader uniforms


| Uniform           | Type      | Role                                                    |
| ----------------- | --------- | ------------------------------------------------------- |
| `uTime`           | float     | Accumulated time (scaled by delta and `animationSpeed`) |
| `uTexture`        | sampler2D | Soft circle alpha mask                                  |
| `uWaveLayer`      | float     | Layer index — modulates speed/frequency/size/alpha base |
| `uMaxDistance`    | float     | Normalizes `distance` attribute → `vDistanceRatio`      |
| `uStormIntensity` | float     | 0–1 storm visual multiplier                             |


### 3.6 Material flags

- `transparent: true`
- `blending: THREE.AdditiveBlending`
- `depthTest: false`, `depthWrite: false`

### 3.7 Animation loop

- Delta time from `performance.now()`, capped at `0.1` s to avoid jumps after tab focus.
- `animationSpeed = 1.5` multiplies `uTime` increment.
- Storm intensity read from `stormIntensityRef.current` (updated in a separate `useEffect` from context) to avoid stale closures.

### 3.8 Fragment shader colors (default palette)

Linear blend in two segments (`vDistanceRatio < 0.5` vs else):

- **Start (cyan)**: `vec3(0.08, 0.725, 0.825)`
- **Mid (purple)**: `vec3(0.70, 0.40, 0.925)`
- **End (pink)**: `vec3(0.925, 0.35, 0.65)`

Texture alpha below `0.3` discards fragment (crisp soft circle edge).

---

## 4. Standalone variant (no page transitions / no storm)

`useSandstormContext()` **throws** if there is no `SandstormProvider`. For a minimal integration you can:

**Option A — Keep provider**  
Copy `SandstormProvider` and wrap the app; leave `intensity` at `0` forever.

**Option B — Decouple component**  
Replace context with a prop or module-level ref, for example:

- `stormIntensity?: number` default `0`, or
- `useRef(0)` only, and expose `forwardRef` / imperative handle if something else should drive storm.

When instructing an AI, say explicitly which option you want so it does not leave a dangling `useSandstormContext` call.

---

## 5. How to implement with **Cursor**

### 5.1 One-shot prompt (Composer / Agent)

Paste a short spec and point to this doc:

```text
Add a full-viewport Three.js particle background like docs/monochrome-particle-background-ai-tutorial.md:
- Client component, three.js ShaderMaterial on Points, additive blending, black scene.
- Layers/spacing/density and shaders as in section 3 of that doc.
- Mount in root layout behind content (z-10 on main content).
- Include resize + visibility pause + full WebGL disposal on unmount.
Use storm intensity 0 only OR add a minimal React context with intensity 0–1 (specify).
```

### 5.2 Project Skill (reusable across chats)

1. Create a folder: `.cursor/skills/monochrome-particle-background/` (commit it so teammates get it).
2. Add `SKILL.md` with YAML frontmatter:
  - `**name**`: lowercase, hyphens, ≤64 chars.
  - `**description**`: third-person; list **what** (Three.js point field, wave vertex shader, distance gradient, optional storm) and **when** (particle background, WebGL hero, portfolio backdrop).
3. Body: link to **this tutorial** or embed sections **3–4** (shader contract, layers, cleanup checklist).
4. Optional: `reference.md` with only the two shader strings and layer table — keeps `SKILL.md` short.

Cursor loads skills from user + project locations; **do not** put custom skills in `~/.cursor/skills-cursor/`.

### 5.3 Rules (always-apply hints)

If you want every agent in this repo to remember the pattern, add or extend `.cursor/rules` (or project rules in Cursor settings) with: “Background WebGL lives in a client component; content stays `z-10`; always dispose Three.js resources on unmount.”

---

## 6. How to implement with **Claude Code**

### 6.1 Use `CLAUDE.md`

This repo already has `CLAUDE.md`. Add a subsection, for example **“Particle background”**, with:

- File paths: `components/monochrome-dots-background.tsx`, `sandstorm-provider.tsx`.
- Non-negotiables: client-only, disposal on unmount, z-index stacking.

Then in Claude Code you can say: “Follow CLAUDE.md particle background section.”

### 6.2 Copy-paste context

Claude Code benefits from **file references**. Prefer:

```text
Implement the background described in @docs/monochrome-particle-background-ai-tutorial.md
by adapting @components/monochrome-dots-background.tsx into <target path>.
```

### 6.3 Skills / plugins

If you use Claude’s project skills or custom instructions, mirror the same content as Cursor’s `SKILL.md`: triggers in the description, implementation checklist, link to this doc.

---

## 7. Verification checklist (for AI or manual QA)

After implementation:

1. **Visual**: Black background, colored dots, smooth motion, gradient from top-left outward.
2. **Scroll**: Fixed canvas; page scrolls normally; UI remains readable.
3. **Resize**: No stretched aspect or blank bands; particles still cover viewport.
4. **Tab switch**: No runaway CPU when returning (delta cap + visibility skip).
5. **Navigation** (if SPA): No duplicate canvases — effect cleanup runs on unmount; only one instance if layout is persistent.
6. **Storm** (if enabled): Intensity `0` matches baseline; intensity `1` shows faster, larger, brighter, turbulent motion.
7. **Memory**: Hot reload / route changes do not leak WebGL contexts (dispose in `useEffect` cleanup).

---

## 8. Common pitfalls


| Issue                                                       | Cause                               | Fix                                                                                   |
| ----------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| “useSandstormContext must be used within SandstormProvider” | Background mounted outside provider | Wrap app root with `SandstormProvider` or remove context from component               |
| Invisible particles                                         | Wrong z-index or camera             | Canvas `fixed` + negative z-index; content `relative z-10`; check `camera.position.z` |
| Pink/green webgl errors                                     | Shader compile mismatch             | Ensure `attribute`/`uniform`/`varying` names match; Three version consistent          |
| Janky after tab return                                      | Large uncapped delta                | Keep delta cap (e.g. `0.1`)                                                           |
| Performance on laptop                                       | DPR 2 + many points                 | Keep pixel ratio cap; reduce layers on `< 768` width                                  |


---

## 9. Summary

The effect is **not** a CSS gradient; it is **custom GLSL** on **THREE.Points** with a **procedural sprite texture**, **multi-layer grid**, and **optional storm uniforms** fed from React context. To make AI tools reproduce it reliably, give them **this document** plus **either** the real source file **or** a explicit standalone variant without `SandstormProvider`. Cursor users should prefer a **project skill** under `.cursor/skills/`; Claude Code users should extend `**CLAUDE.md`** and reference `**@docs/...**` and `**@components/...**` in prompts.