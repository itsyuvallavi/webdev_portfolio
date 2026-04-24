import type { Metadata } from "next"
import ProjectsContent from "@/components/pages/projects-content"

export const metadata: Metadata = {
  title: "Projects | Yuval Lavi",
  description:
    "Full-stack and frontend work: shipped apps, client sites, and experiments — with notes on problem, solution, and product screens.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-[100dvh]">
      <ProjectsContent />
    </main>
  )
}
