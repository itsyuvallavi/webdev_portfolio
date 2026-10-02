import type { MetadataRoute } from "next"
import { projects } from "@/lib/data"

const baseUrl = "https://www.yuvallavi.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/projects", "/about", "/monochrome", "/contact"]

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
