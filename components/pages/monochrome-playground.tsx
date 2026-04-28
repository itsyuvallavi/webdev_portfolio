"use client"

import * as Popover from "@radix-ui/react-popover"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import * as Slider from "@radix-ui/react-slider"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronsUpDown, ExternalLink, RotateCcw, Copy, Check } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import { MonochromeParticlePreview } from "@/components/monochrome-particle-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const DEFAULT = {
  colors: { start: "#a1a1aa", mid: "#52525b", end: "#fafafa" },
  speed: 1.05,
  direction: { x: 0.55, y: 0.2 },
  density: 1,
  pointSize: 1,
  opacity: 1,
  zoom: 1,
}

const COLOR_PALETTES: { id: string; label: string; colors: { start: string; mid: string; end: string } }[] = [
  { id: "default", label: "Neon drift", colors: { start: "#14b8d2", mid: "#b066ec", end: "#ec599e" } },
  { id: "aurora", label: "Aurora", colors: { start: "#34d399", mid: "#22d3ee", end: "#a78bfa" } },
  { id: "ice", label: "Ice", colors: { start: "#e0f2fe", mid: "#38bdf8", end: "#0284c7" } },
  { id: "royal", label: "Royal", colors: { start: "#c4b5fd", mid: "#6366f1", end: "#312e81" } },
  { id: "rose", label: "Rose", colors: { start: "#fce7f3", mid: "#f472b6", end: "#be185d" } },
  { id: "mono", label: "Silver mist", colors: { start: "#a1a1aa", mid: "#52525b", end: "#fafafa" } },
  { id: "lavender", label: "Lavender", colors: { start: "#ddd6fe", mid: "#a78bfa", end: "#5b21b6" } },
  { id: "copper", label: "Copper", colors: { start: "#fdba74", mid: "#ea580c", end: "#7c2d12" } },
]

const INSTALL_CMD = "npx skills add itsyuvallavi/monochrome-particle"
const REPO = "https://github.com/itsyuvallavi/monochrome-particle"

/** Shared preview / params height on lg so both columns align. */
const LG_PREVIEW_HEIGHT = "lg:h-[min(55vh,520px)] lg:min-h-0 lg:max-h-[min(55vh,520px)]"

/** Content inside Radix ScrollArea viewport (native OS scrollbars can’t be “always on” on macOS). */
const PARAMS_SCROLL_CONTENT = "space-y-3 pr-0 lg:space-y-2.5 lg:pr-1"

const HEX_BAR_BASE =
  "flex h-9 w-full shrink-0 items-center justify-center rounded-md border border-white/15 bg-zinc-900/90 px-2 text-center shadow-sm"

const HEX_INPUT_CLASS = cn(
  HEX_BAR_BASE,
  "font-mono text-xs uppercase tracking-wide text-white outline-none focus-visible:border-teal-500/40 focus-visible:ring-2 focus-visible:ring-teal-500/25",
)

function normalizeHex6(raw: string): string | null {
  let s = raw.trim()
  if (!s.startsWith("#")) s = `#${s}`
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase()
  return null
}

type StopKey = "start" | "mid" | "end"

function GradientStopPicker({
  stopKey,
  color,
  onColor,
}: {
  stopKey: StopKey
  color: string
  onColor: (hex: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [hexDraft, setHexDraft] = useState(color)

  useEffect(() => {
    if (open) setHexDraft(color)
  }, [open, color])

  const pickerColor = normalizeHex6(hexDraft) ?? color

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="group/stop relative block h-9 w-full max-w-[44px] min-w-9 cursor-pointer rounded-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-black/40 transition-[box-shadow,transform] duration-200 ease-out hover:scale-[1.04] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_0_1px_rgba(45,212,191,0.3),0_0_10px_rgba(45,212,191,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 sm:h-7 sm:max-w-[36px] sm:min-w-[28px]"
          aria-label={`${stopKey === "start" ? "Start" : stopKey === "mid" ? "Mid" : "End"} color`}
        >
          <span className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ backgroundColor: color }} aria-hidden />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="center"
          sideOffset={8}
          collisionPadding={16}
          className={cn(
            "z-[250] w-[min(calc(100vw-32px),260px)] rounded-xl border border-white/10 bg-zinc-950 p-3 shadow-2xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          <div className="w-full [&_.react-colorful]:h-[140px] [&_.react-colorful]:w-full">
            <HexColorPicker
              color={pickerColor}
              onChange={(hex) => {
                const next = hex.toLowerCase()
                setHexDraft(next)
                onColor(next)
              }}
            />
          </div>
          <div className="mt-3 flex w-full flex-col gap-2">
            <Input
              value={hexDraft}
              spellCheck={false}
              onChange={(e) => {
                const v = e.target.value
                setHexDraft(v)
                const n = normalizeHex6(v)
                if (n) onColor(n)
              }}
              onBlur={() => {
                const n = normalizeHex6(hexDraft)
                if (n) {
                  setHexDraft(n)
                  onColor(n)
                } else {
                  setHexDraft(color)
                }
              }}
              className={HEX_INPUT_CLASS}
              aria-label="Hex color"
            />
            <div
              className={cn(
                HEX_BAR_BASE,
                "cursor-default gap-2 border-teal-500/30 font-sans text-[10px] font-medium tracking-[0.22em] text-zinc-300",
              )}
              aria-hidden
            >
              <span>HEX</span>
              <ChevronsUpDown className="size-3.5 shrink-0 text-zinc-500" strokeWidth={2} aria-hidden />
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function RangeRow({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2 lg:space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-xs font-medium text-zinc-300">
          {label}
        </Label>
        <span className="font-mono text-[11px] tabular-nums text-zinc-500">
          {value.toFixed(step < 0.1 ? 2 : 1)}
        </span>
      </div>
      <Slider.Root
        id={id}
        className="relative flex w-full touch-none select-none items-center py-2 lg:py-0.5"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
      >
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-800/90 lg:h-1.5">
          <Slider.Range className="absolute h-full rounded-full bg-zinc-600/35" />
        </Slider.Track>
        <Slider.Thumb
          aria-label={label}
          className={cn(
            "block size-4 shrink-0 cursor-grab rounded-full border-0 bg-teal-400 shadow-[0_0_0_1px_rgba(45,212,191,0.12)] outline-none lg:size-3",
            "transition-[background-color,box-shadow,transform] duration-200 ease-out",
            "hover:scale-105 hover:bg-teal-200 hover:shadow-[0_0_10px_rgba(153,246,228,0.65),0_0_18px_rgba(45,212,191,0.42)]",
            "focus-visible:ring-2 focus-visible:ring-teal-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
            "active:cursor-grabbing disabled:pointer-events-none disabled:opacity-40",
          )}
        />
      </Slider.Root>
      {hint ? <p className="text-[11px] leading-snug text-zinc-500">{hint}</p> : null}
    </div>
  )
}

export function MonochromePlayground() {
  const [colors, setColors] = useState({ ...DEFAULT.colors })
  const [speed, setSpeed] = useState(DEFAULT.speed)
  const [direction, setDirection] = useState({ ...DEFAULT.direction })
  const [density, setDensity] = useState(DEFAULT.density)
  const [pointSize, setPointSize] = useState(DEFAULT.pointSize)
  const [opacity, setOpacity] = useState(DEFAULT.opacity)
  const [zoom, setZoom] = useState(DEFAULT.zoom)
  const [copiedJson, setCopiedJson] = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)

  const propsPayload = useMemo(
    () => ({
      colors,
      speed,
      direction,
      density,
      pointSize,
      opacity,
      zoom,
    }),
    [colors, speed, direction, density, pointSize, opacity, zoom],
  )

  const copyJson = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(propsPayload, null, 2))
      setCopiedJson(true)
      setTimeout(() => setCopiedJson(false), 2000)
    } catch {
      /* ignore */
    }
  }, [propsPayload])

  const copyInstall = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopiedInstall(true)
      setTimeout(() => setCopiedInstall(false), 2000)
    } catch {
      /* ignore */
    }
  }, [])

  const reset = useCallback(() => {
    setColors({ ...DEFAULT.colors })
    setSpeed(DEFAULT.speed)
    setDirection({ ...DEFAULT.direction })
    setDensity(DEFAULT.density)
    setPointSize(DEFAULT.pointSize)
    setOpacity(DEFAULT.opacity)
    setZoom(DEFAULT.zoom)
  }, [])

  return (
    <div className="min-h-[100dvh] pb-12 pt-24 sm:pb-16 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">Open skill</p>
        <h1 className="max-w-[11ch] text-3xl font-semibold leading-none tracking-tight text-white sm:max-w-none sm:text-3xl">
          Monochrome Particle
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-xs leading-relaxed text-zinc-400 sm:text-sm">
          Three.js particle wave — same contract as the public skill. Tweak the live preview, then install or paste{" "}
          <code className="rounded bg-zinc-900 px-1 py-0.5 font-mono text-[10px]">SKILL.md</code>.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-6xl px-4 sm:mt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,320px)] lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-6 lg:gap-y-4">
          <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:col-start-1 lg:row-start-1">
            <button
              type="button"
              onClick={copyInstall}
              className={cn(
                "group flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-2.5 text-left shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)] sm:min-h-11",
                "transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-white/18 hover:bg-zinc-900/95 hover:shadow-[0_22px_54px_-26px_rgba(20,184,166,0.22)] active:scale-[0.995]",
              )}
              aria-label="Copy install command"
            >
              <span className="font-mono text-sm text-zinc-500" aria-hidden>
                $
              </span>
              <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-zinc-300">
                {INSTALL_CMD}
              </code>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 transition-colors group-hover:text-zinc-200 sm:inline">
                {copiedInstall ? "Copied" : "Copy"}
              </span>
              {copiedInstall ? (
                <Check className="size-4 shrink-0 text-teal-300" aria-hidden />
              ) : (
                <Copy className="size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" aria-hidden />
              )}
            </button>
            <Button
              variant="outline"
              size="sm"
              className="h-11 w-full shrink-0 border-teal-500/30 px-3 text-xs text-teal-100 sm:h-8 sm:w-auto"
              asChild
            >
              <a href={REPO} target="_blank" rel="noreferrer">
                GitHub <ExternalLink className="ml-1 size-3 opacity-70" aria-hidden />
              </a>
            </Button>
          </div>

          <Card
            className={cn(
              "flex min-h-0 min-w-0 flex-col overflow-hidden border-teal-500/20 bg-zinc-950/60 py-0 shadow-none backdrop-blur-sm lg:col-start-1 lg:row-start-2",
              LG_PREVIEW_HEIGHT,
            )}
          >
            <div className="relative aspect-[4/3] min-h-[240px] max-h-[42dvh] w-full min-w-0 flex-1 bg-black sm:aspect-[16/10] sm:min-h-[280px] sm:max-h-none lg:aspect-auto lg:min-h-0">
              <MonochromeParticlePreview
                colors={colors}
                speed={speed}
                direction={direction}
                density={density}
                pointSize={pointSize}
                opacity={opacity}
                zoom={zoom}
                className="relative h-full min-h-[240px] w-full min-w-0 sm:min-h-[280px] lg:min-h-0"
              />
            </div>
          </Card>

          <Card
            className={cn(
              "flex min-h-0 w-full min-w-0 flex-col overflow-visible border-white/10 bg-zinc-950/70 py-0 shadow-none backdrop-blur-sm lg:col-start-2 lg:row-start-2 lg:overflow-hidden",
              LG_PREVIEW_HEIGHT,
            )}
          >
            <CardHeader className="shrink-0 space-y-0.5 px-4 pb-2 pt-3 sm:px-5">
              <CardTitle className="text-sm font-medium text-white">Parameters</CardTitle>
              <CardDescription className="text-xs leading-snug text-zinc-400">
                Density rebuilds geometry (brief hitch is normal).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-col overflow-visible px-4 pb-4 sm:px-5 lg:flex-1 lg:overflow-hidden lg:pb-2.5">
              <ScrollArea.Root
                type="always"
                className="relative min-h-0 min-w-0 overflow-visible lg:flex-1 lg:overflow-hidden"
              >
                <ScrollArea.Viewport className="h-auto max-h-none w-full max-w-full rounded-[inherit] pb-0.5 pr-0 lg:h-full lg:max-h-full lg:pr-1 [&>div]:!block">
                  <div className={PARAMS_SCROLL_CONTENT}>
            <div>
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400">Palettes</p>
              <div className="flex flex-wrap gap-1">
                {COLOR_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    title={p.label}
                    onClick={() => setColors({ ...p.colors })}
                    className={cn(
                      "min-h-9 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:min-h-0 sm:px-2 sm:py-1",
                      colors.start === p.colors.start && colors.mid === p.colors.mid && colors.end === p.colors.end
                        ? "border-teal-500/50 bg-teal-500/15 text-teal-100"
                        : "border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-white/25 hover:bg-zinc-800/90 hover:text-white",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-1">
              <div className="flex items-end justify-center gap-2">
                {(["start", "mid", "end"] as const).map((key) => (
                  <div key={key} className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                      {key === "start" ? "S" : key === "mid" ? "M" : "E"}
                    </span>
                    <GradientStopPicker
                      stopKey={key}
                      color={colors[key]}
                      onColor={(hex) => setColors((c) => ({ ...c, [key]: hex }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-2">
              <RangeRow id="speed" label="Speed" min={0.15} max={4} step={0.05} value={speed} onChange={setSpeed} />
              <RangeRow
                id="dirx"
                label="Dir X"
                min={-2}
                max={2}
                step={0.05}
                value={direction.x}
                onChange={(v) => setDirection((d) => ({ ...d, x: v }))}
              />
              <RangeRow
                id="diry"
                label="Dir Y"
                min={-2}
                max={2}
                step={0.05}
                value={direction.y}
                onChange={(v) => setDirection((d) => ({ ...d, y: v }))}
              />
              <RangeRow
                id="density"
                label="Density"
                hint="More dots"
                min={0.35}
                max={2.5}
                step={0.05}
                value={density}
                onChange={setDensity}
              />
              <RangeRow
                id="pointSize"
                label="Size"
                min={0.35}
                max={3}
                step={0.05}
                value={pointSize}
                onChange={setPointSize}
              />
              <RangeRow
                id="opacity"
                label="Opacity"
                min={0.15}
                max={2.5}
                step={0.05}
                value={opacity}
                onChange={setOpacity}
              />
              <RangeRow
                id="zoom"
                label="Zoom"
                hint="Orthographic crop — larger = tighter view (no geometry rebuild)"
                min={1}
                max={2.5}
                step={0.05}
                value={zoom}
                onChange={setZoom}
              />
            </div>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="ml-1.5 hidden w-[5px] shrink-0 touch-none select-none rounded-full border border-white/10 bg-zinc-900/90 p-px transition-colors hover:border-white/15 hover:bg-zinc-800/90 lg:flex"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-full bg-zinc-500 before:absolute before:left-1/2 before:top-1/2 before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 hover:bg-zinc-400" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

            <div className="flex shrink-0 flex-col gap-2 border-t border-white/5 pt-3 sm:flex-row sm:flex-wrap sm:gap-1.5 lg:pt-2">
              <Button type="button" variant="outline" size="sm" className="h-10 border-white/12 px-2.5 text-xs sm:h-8" onClick={reset}>
                <RotateCcw className="mr-1 size-3.5" aria-hidden />
                Reset
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-10 border-white/12 px-2.5 text-xs sm:h-8" onClick={copyJson}>
                {copiedJson ? <Check className="mr-1 size-3" /> : <Copy className="mr-1 size-3" />}
                JSON
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
