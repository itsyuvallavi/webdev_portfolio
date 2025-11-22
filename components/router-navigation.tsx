"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { id: "home", path: "/", label: "HOME", number: "01" },
  { id: "about", path: "/about", label: "ABOUT", number: "02" },
  { id: "projects", path: "/projects", label: "PROJECTS", number: "03" },
  { id: "contact", path: "/contact", label: "CONTACT", number: "04" },
]

export function RouterNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Gradient background that extends below navbar */}
      <div
        className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.3) 80%, transparent 100%)'
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-wider hover:text-gray-300 transition-colors"
          >
            YUVAL LAVI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={cn(
                  "text-xs font-mono transition-colors hover:text-white",
                  isActive(link.path) ? "text-white" : "text-gray-400",
                )}
              >
                <span className="text-gray-500">{link.number} / </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}
