"use client"

import { Linkedin, Github, Send } from "lucide-react"
import { motion } from "framer-motion"

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yuval-lavi-4b9338180/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/itsyuvallavi",
    icon: Github,
  },
  {
    name: "Telegram",
    url: "https://t.me/itsyuvallavi",
    icon: Send,
  },
]

export function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-8 bottom-0 z-40 hidden md:flex flex-col items-center gap-6"
    >
      {/* Social Icons */}
      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => {
          const Icon = link.icon
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-gray-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          )
        })}
      </div>

      {/* Vertical Line */}
      <div className="w-[1px] h-24 bg-gradient-to-b from-gray-400 to-transparent" />
    </motion.div>
  )
}
