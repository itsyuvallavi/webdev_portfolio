import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { CommandMenu } from "@/components/site/command-menu"
import { SiteBackground } from "@/components/site/background"
import { EdgeLight } from "@/components/site/edge-light"
import { Navigation } from "@/components/site/navigation"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { SocialSidebar } from "@/components/site/social-sidebar"
import { site } from "@/content/site"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Software that takes work off your hands`,
  description:
    "Software for small businesses, built in Lisbon: enquiries answered, bookings and reminders, invoices chased, paperwork filed. Tell me the one task that takes too long.",
  openGraph: { siteName: site.name, type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-black text-white`}>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Suspense fallback={null}>
          <SiteBackground />
        </Suspense>
        <SmoothScroll />
        <EdgeLight />
        <Navigation />
        <SocialSidebar />
        <div id="main-content" tabIndex={-1} className="relative z-10 outline-none">
          {children}
        </div>
        <Suspense fallback={null}>
          <CommandMenu />
        </Suspense>
      </body>
    </html>
  )
}
