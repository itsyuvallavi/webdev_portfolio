"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { id: "home", path: "/", label: "HOME", number: "01" },
  { id: "about", path: "/about", label: "ABOUT", number: "02" },
  { id: "projects", path: "/projects", label: "PROJECTS", number: "03" },
  { id: "contact", path: "/contact", label: "CONTACT", number: "04" },
]

export function RouterNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-wider hover:text-gray-300 transition-colors"
          >
            YUVAL LAVI
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Command Menu Trigger (mobile only) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).__openCommandMenu) {
                  (window as any).__openCommandMenu()
                }
              }}
              aria-label="Open command menu"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left font-mono tracking-wider">
                  NAVIGATION
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.path}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-left px-4 py-3 rounded-md transition-all font-mono text-sm",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive(link.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="text-xs opacity-60 mr-2">{link.number}</span>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
