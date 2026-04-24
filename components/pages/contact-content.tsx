"use client"

import type React from "react"
import { useState } from "react"
import { Globe, Linkedin, Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

const fieldClass =
  "border-zinc-700/90 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-teal-500/50 focus-visible:ring-teal-500/30"

const panelOuter = cn(
  "rounded-[1.5rem] p-[3px]",
  "bg-gradient-to-b from-white/[0.14] to-white/[0.04] ring-1 ring-white/[0.07]",
  "shadow-[0_28px_72px_-32px_rgba(0,0,0,0.9)]",
)

const panelInner =
  "rounded-[calc(1.5rem-3px)] bg-zinc-950/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8"

/** Kept in sync with `app/contact/page.tsx` for reuse in SPA or docs. */
export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
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

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: "Message sent",
        description: "Thanks for the note. I usually reply within a day or two on business days.",
      })

      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Could not send. Try again or email directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative z-10 mx-auto min-h-[100dvh] max-w-[1400px] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl text-left lg:mb-16">
        <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
          Contact
        </span>
        <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl">Get in touch</h1>
        <p className="mt-5 max-w-[65ch] text-pretty text-base leading-relaxed text-zinc-400">
          New freelance builds, collaborations, or questions about past work — send a short note and I will respond
          when I am back at the desk.
        </p>
      </header>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={panelOuter}>
          <div className={panelInner}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-zinc-300">
                  Name
                </Label>
                <Input id="contact-name" name="name" required placeholder="Your name" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-zinc-300">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-zinc-300">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Project scope, timeline, links — whatever helps."
                  rows={4}
                  className={cn(fieldClass, "min-h-[100px] resize-y")}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-teal-600 text-white shadow-[0_16px_40px_-18px_rgba(20,184,166,0.45)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-teal-500 active:scale-[0.98]"
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
        </div>

        <div className={panelOuter}>
          <div className={cn(panelInner, "flex flex-col space-y-8")}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Direct lines</h2>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
                Prefer email or a quick call — same details I give clients before a kickoff.
              </p>
            </div>
            <div className="flex flex-col gap-3">
            <a
              href="mailto:info@yuvallavi.com"
              className="group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors hover:text-teal-200"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
                <Mail className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">info@yuvallavi.com</span>
            </a>
            <a
              href="tel:+18188603168"
              className="group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors hover:text-teal-200"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
                <Phone className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">+1 (818) 860-3168</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yuval-lavi-4b9338180/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors hover:text-teal-200"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
                <Linkedin className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">linkedin.com/in/yuval-lavi</span>
            </a>
            <a
              href="https://www.yuvallavi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors hover:text-teal-200"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
                <Globe className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">yuvallavi.com</span>
            </a>
            <a
              href="https://t.me/itsyuvallavi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg py-1 text-zinc-400 transition-colors hover:text-teal-200"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-[border-color,background-color,color] group-hover:border-teal-500/35 group-hover:bg-teal-500/10 group-hover:text-teal-200">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </span>
              <span className="text-sm font-medium">Telegram: @itsyuvallavi</span>
            </a>
            </div>
            <div className="border-t border-zinc-800/90 pt-6">
              <h3 className="text-sm font-semibold text-zinc-200">Response time</h3>
              <p className="mt-2 text-sm text-zinc-500">Usually within 24–48 hours on weekdays.</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
