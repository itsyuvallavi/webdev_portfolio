"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Home, FolderOpen, User, Mail, Github, Linkedin, Send, Sparkles, Wrench, type LucideIcon } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { navigation, socialLinks, type NavigationLink, type SocialLink } from "@/content/site"

const pageIcons: Record<NavigationLink["id"], LucideIcon> = { home: Home, about: User, services: Wrench, projects: FolderOpen, contact: Mail }
const pageKeywords: Partial<Record<NavigationLink["id"], string[]>> = {
  services: ["automation", "bookings", "invoices", "offers"],
  projects: ["projects", "portfolio"],
}
const socialIcons: Record<SocialLink["id"], LucideIcon> = { linkedin: Linkedin, github: Github, telegram: Send }

declare global {
  interface Window {
    __openCommandMenu?: () => void
  }
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const router = useRouter()

  // Detect mobile device
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  // Expose the setOpen function globally for mobile trigger
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__openCommandMenu = () => setOpen(true)
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.__openCommandMenu
      }
    }
  }, [])

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="backdrop-blur-xl bg-black/80 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20"
    >
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-50 animate-gradient" />

        <div className="relative">
          <CommandInput
            placeholder={isMobile ? "Select an option below..." : "Type a command or search..."}
            autoFocus={!isMobile}
            readOnly={isMobile}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-6 text-center">
                <p className="text-sm text-gray-400">No results found.</p>
                <p className="text-xs text-gray-600 mt-1">Try searching for navigation or social</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Navigation">
              {navigation.map((link) => {
                const Icon = pageIcons[link.id]
                return (
                  <CommandItem key={link.id} keywords={pageKeywords[link.id]} onSelect={() => runCommand(() => router.push(link.path))}>
                    <Icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandGroup heading="Explore">
              <CommandItem keywords={["monochrome", "particle"]} onSelect={() => runCommand(() => router.push("/monochrome"))}>
                <Sparkles className="mr-2 h-4 w-4" />
                Particle playground
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Social">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.id]
                return (
                  <CommandItem key={link.id} onSelect={() => runCommand(() => window.open(link.url, "_blank"))}>
                    <Icon className="mr-2 h-4 w-4" />
                    {link.name}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandDialog>
  )
}
