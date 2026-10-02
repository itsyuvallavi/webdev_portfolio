import type { Metadata } from "next"
import ProjectsContent from "@/components/pages/projects-content"

export const metadata: Metadata = {
  title: "Work | Yuval Lavi",
  description:
    "Explore client websites and custom tools by Yuval Lavi, with examples of business websites, tracking tools, and the work behind them.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-[100dvh]">
      <ProjectsContent />
    </main>
  )
}
