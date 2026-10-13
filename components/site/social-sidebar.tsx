import { Github, Linkedin, Send, type LucideIcon } from "lucide-react"
import { socialLinks, type SocialLink } from "@/content/site"

const icons: Record<SocialLink["id"], LucideIcon> = { linkedin: Linkedin, github: Github, telegram: Send }

export function SocialSidebar() {
  return (
    <div className="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-6 md:flex">
      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => {
          const Icon = icons[link.id]
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="rounded-sm text-gray-400 transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95 motion-reduce:transform-none"
            >
              <Icon className="h-5 w-5" />
            </a>
          )
        })}
      </div>
      <div className="h-24 w-[1px] bg-gradient-to-b from-gray-400 to-transparent" />
    </div>
  )
}
