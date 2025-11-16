# Sandstorm Transition - Implementation Plan

**Date:** November 13, 2025
**Goal:** Replace the chaotic kaleidoscope/fragment transition with an elegant sandstorm effect using existing particle background

---

## Phase 1: Cleanup - Remove Kaleidoscope Components

### Files to DELETE:
1. ✅ `lib/shaders/kaleidoscope-shader.ts`
   - Complex GLSL shaders for kaleidoscope/fragment effects
   - ~80 lines of unnecessary code

2. ✅ `components/transitions/shatter-scene.tsx`
   - Three.js fragment scene with 30-50 individual meshes
   - ~290 lines of complex logic
   - Separate WebGL renderer (performance overhead)

3. ✅ `components/transitions/kaleidoscope-transition.tsx`
   - Current transition orchestrator
   - Will be replaced with simpler sandstorm version

### Files to MODIFY (cleanup):

**`components/pages/home-content.tsx`**
- Remove imports:
  - `KaleidoscopeTransition`
  - Complex transition state management
- Keep:
  - GSAP ScrollTrigger (works well)
  - Basic trigger logic
- Simplify to just set a single state flag

**`app/globals.css`**
- Remove: `@keyframes backdropBlur` (lines 142-155)
- Not needed for sandstorm effect

---

## Phase 2: Sandstorm Effect Architecture

### Core Concept:
**Enhance the existing `MonochromeDotsBackground` component instead of creating a separate scene.**

This approach:
- ✅ Uses the existing particle system (no duplication)
- ✅ Single WebGL renderer (better performance)
- ✅ Seamless integration with background
- ✅ More cohesive visual experience

### How It Works:

```
Timeline (4 seconds total):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0.0s  │ User scrolls to 70% or clicks "EXPLORE MY WORK"
      │ Trigger sandstorm mode

0.0-1.5s  │ STORM BUILD-UP PHASE
          │ - Particle speed increases 5x
          │ - Particle density increases 3x
          │ - Particles brighten
          │ - Turbulent movement begins
          │ - Particles rush toward camera (z-axis)

1.5-2.5s  │ PEAK STORM PHASE
          │ - Maximum intensity
          │ - Screen nearly covered in particles
          │ - At 2.0s: Navigate to /projects (background)

2.5-4.0s  │ STORM SETTLING PHASE
          │ - Intensity decreases
          │ - Particles slow down
          │ - Return to normal state
          │ - Projects page now visible underneath

4.0s  │ Complete - normal particle background on projects page
```

---

## Phase 3: Technical Implementation Details

### New/Modified Files:

#### 1. `components/transitions/sandstorm-transition.tsx` (NEW - ~60 lines)

**Purpose:** Lightweight orchestrator for sandstorm effect

**Exports:**
```typescript
export interface SandstormControls {
  isActive: boolean
  intensity: number // 0-1
}

export function useSandstormTransition(targetPath: string) {
  // Returns: { triggerStorm, stormControls }
  // Manages timing and router navigation
}
```

**Responsibilities:**
- Manage storm intensity over time (0 → 1 → 0)
- Trigger Next.js navigation at 50% (2s mark)
- Provide real-time intensity value to background
- Clean up on completion

---

#### 2. `components/monochrome-dots-background.tsx` (MODIFY)

**New Props:**
```typescript
interface MonochromeDotsBackgroundProps {
  stormControls?: {
    isActive: boolean
    intensity: number // 0-1
  }
}
```

**Shader Modifications:**

Add new uniforms to vertex shader:
```glsl
uniform float uStormIntensity;    // 0-1, overall storm effect
uniform float uStormTurbulence;   // Random movement multiplier
uniform float uStormSpeed;        // Wave speed multiplier
```

**Vertex Shader Logic:**
```glsl
// Base wave calculation (existing)
float wave1 = sin(distance * layerFreq - uTime * layerSpeed + delay);

// Add storm turbulence
if (uStormIntensity > 0.0) {
  float turbulence = sin(position.x * 0.1 + uTime * 3.0) *
                     cos(position.y * 0.1 + uTime * 2.0);
  wave1 += turbulence * uStormTurbulence * uStormIntensity;

  // Move particles forward (toward camera)
  mvPosition.z += uStormIntensity * 200.0 * (0.5 - fract(delay));
}
```

**Animation Loop Changes:**
```javascript
// In animate() function
const stormMultiplier = 1.0 + (stormIntensity * 4.0); // 1x to 5x speed

particleSystems.forEach((system) => {
  // Speed increases during storm
  system.material.uniforms.uTime.value += timeIncrement * stormMultiplier;

  // Update storm uniforms
  system.material.uniforms.uStormIntensity.value = stormIntensity;
  system.material.uniforms.uStormTurbulence.value = stormIntensity * 2.0;
});
```

**Temporary Layer Addition:**
During storm, add 2 extra dense particle layers:
```javascript
if (stormIntensity > 0.3 && !stormLayersAdded) {
  addStormLayers(); // Create temporary particle systems
  stormLayersAdded = true;
}

if (stormIntensity < 0.1 && stormLayersAdded) {
  removeStormLayers(); // Clean up temporary layers
  stormLayersAdded = false;
}
```

---

#### 3. `app/layout.tsx` (MINOR MODIFY)

**Current:**
```tsx
<MonochromeDotsBackground />
```

**New:**
```tsx
<SandstormProvider>
  <MonochromeDotsBackground />
  {children}
</SandstormProvider>
```

Or use context/state management to pass storm controls down.

---

#### 4. `components/pages/home-content.tsx` (SIMPLIFY)

**Remove:**
- `KaleidoscopeTransition` component
- Complex state management
- All Three.js imports

**Keep:**
- GSAP ScrollTrigger (works great)
- Link click handler

**Simplify to:**
```tsx
const { triggerStorm } = useSandstormTransition('/projects');

// ScrollTrigger
useEffect(() => {
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      if (self.progress >= 0.7 && !triggered) {
        triggerStorm();
        setTriggered(true);
      }
    },
  });
}, []);

// Link handler
const handleLinkClick = (e) => {
  e.preventDefault();
  triggerStorm();
};
```

---

## Phase 4: Storm Effect Parameters

### Visual Effects:

| Property | Normal | Storm Peak | Multiplier |
|----------|--------|------------|------------|
| Wave Speed | 0.016 | 0.08 | 5x |
| Particle Size | 2.35 | 4.0 | 1.7x |
| Particle Alpha | 0.30 | 0.55 | 1.8x |
| Layer Count | 3 | 5 | +2 temp |
| Turbulence | 0 | 2.0 | - |
| Z Movement | 0 | ±200 | - |

### Storm Curve (Easing):
```
Intensity over time (ease-in-out):

1.0 ┤           ╭───╮
    │         ╭─╯   ╰─╮
0.5 ┤       ╭─╯       ╰─╮
    │     ╭─╯           ╰─╮
0.0 ┼─────╯               ╰─────
    0s   1s   2s   3s   4s
         ↑         ↑
      build-up  settle
```

---

## Phase 5: Implementation Checklist

### Step 1: Cleanup
- [ ] Delete `lib/shaders/kaleidoscope-shader.ts`
- [ ] Delete `components/transitions/shatter-scene.tsx`
- [ ] Delete `components/transitions/kaleidoscope-transition.tsx`
- [ ] Remove `@keyframes backdropBlur` from `app/globals.css`
- [ ] Clean up imports in `home-content.tsx`

### Step 2: Create Sandstorm Hook
- [ ] Create `components/transitions/sandstorm-transition.tsx`
- [ ] Implement intensity animation curve
- [ ] Add router navigation at 50% mark
- [ ] Add cleanup logic

### Step 3: Modify Particle Background
- [ ] Add storm props to `MonochromeDotsBackground`
- [ ] Add storm uniforms to shader
- [ ] Modify vertex shader for turbulence
- [ ] Modify vertex shader for z-movement
- [ ] Add temporary layer creation/removal
- [ ] Update animation loop with storm multipliers

### Step 4: Integration
- [ ] Update `home-content.tsx` with sandstorm hook
- [ ] Update `layout.tsx` if needed for state passing
- [ ] Test scroll trigger (70%)
- [ ] Test link click trigger
- [ ] Test on mobile

### Step 5: Polish
- [ ] Fine-tune intensity curve
- [ ] Adjust turbulence amount
- [ ] Optimize particle count for performance
- [ ] Test on Safari
- [ ] Verify reduced-motion fallback
- [ ] Remove console.log statements

---

## Decisions Made ✅

1. **Storm Direction:**
   - [x] **Horizontal sweep (dust storm moving left/right)** ✅ SELECTED
   - [ ] Forward rush (particles coming at camera)
   - [ ] Vortex (particles swirling)

2. **Intensity Level:**
   - [x] **Subtle/artistic (doesn't fully obscure)** ✅ SELECTED
   - [ ] Medium (noticeable but still see some content)
   - [ ] Dramatic (completely white out at peak)

3. **Duration:**
   - [ ] 2 seconds (quick, snappy)
   - [x] **3 seconds (balanced)** ✅ SELECTED
   - [ ] 4 seconds (leisurely)

---

## Performance Considerations

**Before Storm:**
- 3 particle layers
- ~2000-3000 particles total
- 60 FPS target

**During Storm (Peak):**
- 5 particle layers
- ~4000-6000 particles total
- Should maintain 45+ FPS

**Mobile Optimization:**
- Reduce temp layers from 2 → 1
- Cap particle count at 2000
- Use 30 FPS instead of 60

---

## Fallbacks & Accessibility

**Reduced Motion:**
```javascript
if (prefersReducedMotion) {
  // Simple crossfade instead
  // 0.5s duration
  // No particle effects
}
```

**Low Performance Device:**
- Skip temporary layers
- Reduce turbulence intensity
- Faster transition (2s instead of 3-4s)

**No WebGL:**
- CSS-only fade transition
- Already handled by existing fallback

---

## Success Criteria

✅ Transition feels elegant and cohesive
✅ Uses existing particle system (no duplication)
✅ Maintains 45+ FPS on desktop, 30 FPS on mobile
✅ Visually impressive but not chaotic
✅ Duration feels right (not too fast/slow)
✅ Works with scroll trigger and link click
✅ Respects reduced-motion preferences

---

## Estimated Timeline

- **Cleanup:** 10 minutes
- **Sandstorm hook:** 20 minutes
- **Particle modifications:** 30 minutes
- **Integration:** 15 minutes
- **Polish & testing:** 20 minutes
- **Total:** ~1.5 hours

---

## Notes

- Keep all changes in components, don't modify `next.config` or build settings
- Test in both Chrome and Safari (Safari may render particles differently)
- Consider recording a video of the final effect for documentation
- This approach is much simpler than the kaleidoscope - ~150 lines of code instead of ~400
