"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Home, FolderOpen, User, Mail, Github, Linkedin, Twitter } from "lucide-react"
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
  const router = useRouter()

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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
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
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/yourusername", "_blank"))}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://linkedin.com/in/yourusername", "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://twitter.com/yourusername", "_blank"))}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
