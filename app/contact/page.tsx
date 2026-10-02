"use client"

import type React from "react"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Globe, Linkedin, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

const springTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

const fieldClass =
  "min-h-11 border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-400 focus-visible:border-teal-300 focus-visible:ring-teal-300/30"

const panelOuter = "content-surface"

const panelInner = "p-6 sm:p-8"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const reduceMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)

    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || result?.success !== true) {
        throw new Error(
          typeof result?.error === "string" && result.error.trim()
            ? result.error
            : "Your message could not be confirmed. Please try again or email info@yuvallavi.com directly.",
        )
      }

      form.reset()
      toast({
        title: "Message sent",
        description: "Thanks for the note. I usually reply within a day or two on business days.",
      })
    } catch (error) {
      toast({
        title: "Message not confirmed",
        description:
          error instanceof Error
            ? error.message
            : "Could not send. Please try again or email info@yuvallavi.com directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const linkRow = (href: string, label: string, icon: React.ReactNode, external?: boolean) => (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  )

  return (
    <main className="relative z-10 min-h-[100dvh]">
      <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 md:pl-24 md:pr-8 lg:pl-28 lg:pr-10">
        <header className="mb-12 max-w-2xl text-left lg:mb-16">
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.05 }}
            className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]"
          >
            Discuss your project
          </motion.h1>
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.16 }}
            className="reading-surface mt-6 max-w-[65ch] p-4 text-pretty text-base leading-relaxed text-zinc-300"
          >
            Tell me about your business, your current website or tools, and what you would like to improve.
            A rough idea is enough to start a conversation.
          </motion.p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className={panelOuter}
          >
            <div className={panelInner}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Name
                  </Label>
                  <Input id="name" name="name" required placeholder="Your name" className={fieldClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="What does your business do? What website or tools do you use? What would you like to make easier?"
                    rows={6}
                    className={cn(fieldClass, "min-h-[100px] resize-y")}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-lg bg-teal-300 text-zinc-950 transition-colors duration-200 hover:bg-teal-200 focus-visible:ring-teal-300 disabled:bg-zinc-700 disabled:text-zinc-200 disabled:opacity-100"
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="size-4 shrink-0" strokeWidth={1.5} />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.26 }}
            className={panelOuter}
          >
            <div className={cn(panelInner, "flex flex-col space-y-8")}>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Prefer a direct message?</h2>
                <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
                  Email, LinkedIn, or Telegram work too. Share a link or describe the task you want to improve.
                </p>
              </div>

              <nav className="flex flex-col gap-3" aria-label="Contact links">
                {linkRow(
                  "mailto:info@yuvallavi.com",
                  "info@yuvallavi.com",
                  <Mail className="size-4" strokeWidth={1.5} />,
                )}
                {linkRow(
                  "https://www.linkedin.com/in/yuvallavi-dev/",
                  "linkedin.com/in/yuvallavi-dev",
                  <Linkedin className="size-4" strokeWidth={1.5} />,
                  true,
                )}
                {linkRow(
                  "https://www.yuvallavi.com",
                  "yuvallavi.com",
                  <Globe className="size-4" strokeWidth={1.5} />,
                  true,
                )}
                {linkRow(
                  "https://t.me/itsyuvallavi",
                  "Telegram: @itsyuvallavi",
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>,
                  true,
                )}
              </nav>

              <div className="border-t border-zinc-800/90 pt-6">
                <h3 className="text-sm font-semibold text-zinc-200">Response time</h3>
                <p className="mt-2 text-sm text-zinc-400">Usually within 24–48 hours on weekdays.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Toaster />
    </main>
  )
}
