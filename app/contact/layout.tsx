import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Discuss Your Project | Yuval Lavi",
  description:
    "Tell me about your business, current website or tools, and what you want to improve. Discuss a website, automation, integration, or custom business tool.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
