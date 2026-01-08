import type { Metadata } from "next"
import ProjectsContent from "@/components/pages/projects-content"

export const metadata: Metadata = {
  title: "Projects | Yuval Lavi",
  description: "A collection of web applications, client sites, and creative projects showcasing full-stack development and design.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectsContent />
    </main>
  )
}
