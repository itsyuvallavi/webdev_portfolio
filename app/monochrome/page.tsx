import type { Metadata } from "next"
import { MonochromePlayground } from "@/components/pages/monochrome-playground"

export const metadata: Metadata = {
  title: "Monochrome Particle — Yuval Lavi",
  description:
    "Live sandbox and install link for the Monochrome Particle Agent Skill: configurable Three.js particle wave background.",
  openGraph: {
    title: "Monochrome Particle",
    description: "Try parameters for the open Monochrome Particle Three.js background skill.",
    url: "/monochrome",
  },
}

export default function MonochromePage() {
  return <MonochromePlayground />
}
