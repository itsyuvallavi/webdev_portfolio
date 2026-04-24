import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact | Yuval Lavi",
  description:
    "Email, phone, LinkedIn, or Telegram — or use the form. I usually reply within a day or two on business days.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

