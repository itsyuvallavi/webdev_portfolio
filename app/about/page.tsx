import type { Metadata } from "next"
import AboutContent from "@/components/pages/about-content"

export const metadata: Metadata = {
  title: "About | Yuval Lavi",
  description:
    "Meet Yuval Lavi: a developer with a background in film composition and audio engineering, building websites and practical tools for small businesses and independent professionals.",
}

export default function AboutPage() {
  return (
    <main className="min-h-[100dvh]">
      <AboutContent />
    </main>
  )
}
