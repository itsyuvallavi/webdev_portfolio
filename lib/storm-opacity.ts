/** Maps storm intensity (0→1→0) to page content opacity for coordinated fades. */

function smoothstep01(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

export function contentOpacityFromStormIntensity(intensity: number): number {
  const i = intensity
  if (i <= 0.08) return 1
  if (i < 0.4) {
    const t = smoothstep01((i - 0.08) / (0.4 - 0.08))
    return 1 - t
  }
  if (i <= 0.6) return 0
  if (i < 0.92) {
    const t = smoothstep01((i - 0.6) / (0.92 - 0.6))
    return t
  }
  return 1
}
