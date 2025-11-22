"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Home, FolderOpen, User, Mail, Github, Linkedin, Send } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

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
      (window as any).__openCommandMenu = () => setOpen(true)
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__openCommandMenu
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
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
            <FolderOpen className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
            <User className="mr-2 h-4 w-4" />
            About
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Social">
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/itsyuvallavi", "_blank"))}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/yuval-lavi-4b9338180/", "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://t.me/itsyuvallavi", "_blank"))}>
            <Send className="mr-2 h-4 w-4" />
            Telegram
          </CommandItem>
        </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandDialog>
  )
}
