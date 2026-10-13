import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { site } from "@/content/site"

const baseUrl = site.url

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/projects", "/about", "/monochrome", "/contact", "/privacy"]

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
