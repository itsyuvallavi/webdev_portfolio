import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact | Yuval Lavi",
  description: "Get in touch with me to discuss new projects and opportunities. I typically respond within 24-48 hours during business days.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

