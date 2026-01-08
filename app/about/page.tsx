import type { Metadata } from "next"
import AboutContent from "@/components/pages/about-content"

export const metadata: Metadata = {
  title: "About | Yuval Lavi",
  description: "Learn about my background as a Full-Stack Web Developer with creative roots in film composition. Explore my journey from music to code.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutContent />
    </main>
  )
}
