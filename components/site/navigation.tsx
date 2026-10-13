"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const links = [
  { id: "home", path: "/", label: "HOME", number: "01" },
  { id: "about", path: "/about", label: "ABOUT", number: "02" },
  { id: "services", path: "/services", label: "SERVICES", number: "03" },
  { id: "projects", path: "/projects", label: "WORK", number: "04" },
  { id: "contact", path: "/contact", label: "CONTACT", number: "05" },
]

export function RouterNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && (pathname === path || pathname?.startsWith(`${path}/`))) return true
    return false
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
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

      <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Main navigation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="shrink-0 rounded-sm text-xl font-bold tracking-wider hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            YUVAL LAVI
          </Link>
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-sm text-[13px] font-mono transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  isActive(link.path) ? "text-white" : "text-zinc-300",
                )}
              >
                <span className="text-zinc-400">{link.number} / </span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] border-white/15 bg-zinc-950">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.path}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-base font-mono transition-colors px-4 py-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        isActive(link.path)
                          ? "bg-teal-500/10 text-teal-100"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white",
                      )}
                      aria-label={`Navigate to ${link.label} page`}
                    >
                      <span className="text-zinc-400">{link.number} / </span>
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <Link
                      href="/monochrome"
                      prefetch={false}
                      onClick={handleLinkClick}
                      aria-current={isActive("/monochrome") ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-4 py-2 text-sm font-mono transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        isActive("/monochrome") ? "text-white" : "text-gray-400",
                      )}
                    >
                      Particle playground
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </nav>
    </>
  )
}
