import type { Metadata } from "next"
import AboutContent from "@/components/pages/about-content"

export const metadata: Metadata = {
  title: "About | Yuval Lavi",
  description:
    "Film scoring and audio engineering background, now full-stack with Next.js and TypeScript — how that shapes the way I build interfaces.",
}

export default function AboutPage() {
  return (
    <main className="min-h-[100dvh]">
      <AboutContent />
    </main>
  )
}
