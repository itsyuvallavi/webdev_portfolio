import type { Metadata } from "next"
import { ScrollFeelDemo } from "@/components/lab/scroll-feel-demo"

export const metadata: Metadata = {
  title: "Scroll feel prototype | Yuval Lavi",
  robots: { index: false, follow: false },
}

export default function ScrollLabPage() {
  return (
    <main>
      <ScrollFeelDemo />
    </main>
  )
}
