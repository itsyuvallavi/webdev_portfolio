import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { site } from "@/content/site"

// The picture shown when a link to the site is shared in a message. Pages without their own inherit it.
export const alt = `${site.name}: software that takes routine work off small businesses`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans", file))

export default async function ShareImage() {
  const [black, medium] = await Promise.all([font("Geist-Black.ttf"), font("Geist-Medium.ttf")])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#000",
          backgroundImage: "radial-gradient(circle at 78% 30%, rgba(45, 212, 191, 0.16), transparent 55%)",
          color: "#fff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 500, letterSpacing: 4 }}>
          <span>{site.name.toUpperCase()}</span>
          <span style={{ color: "#5eead4", letterSpacing: 1 }}>{new URL(site.url).host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, fontWeight: 900, lineHeight: 1, letterSpacing: -5, whiteSpace: "nowrap" }}>
          <span>ROUTINE WORK,</span>
          {/* The image renderer draws no outline on transparent text, so the fill matches the background instead. */}
          <span style={{ color: "#020403", WebkitTextStroke: "3px #8c8c8c" }}>HANDLED.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, fontWeight: 500, color: "#d4d4d8" }}>
          <span>Software for small businesses. One task at a time, at a fixed price.</span>
          <span style={{ color: "#a1a1aa" }}>{site.location}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: black, weight: 900, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  )
}
