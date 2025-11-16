import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CommandMenu } from "@/components/command-menu"
import { MonochromeDotsBackground } from "@/components/monochrome-dots-background"
import { SandstormProvider } from "@/components/transitions/sandstorm-provider"
import { RouterNavigation } from "@/components/router-navigation"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Yuval Lavi - Full-Stack Developer",
  description: "Full-Stack Web Developer with creative roots in film composition. Proficient with Next.js, React, TypeScript, and Firebase.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SandstormProvider>
            <MonochromeDotsBackground />
            <RouterNavigation />
            <div className="relative z-10">
              {children}
            </div>
            <Suspense fallback={null}>
              <CommandMenu />
            </Suspense>
            <Analytics />
          </SandstormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
