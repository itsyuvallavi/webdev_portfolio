"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const fieldClass =
  "min-h-11 border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-400 focus-visible:border-teal-300 focus-visible:ring-teal-300/30"

/** The contact form. Its limits match what the server accepts, so a message is never rejected for length after it is sent. */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  // A signed note of when the form opened. The server refuses messages that arrive without one.
  const tokenRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/api/contact/token", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (!cancelled && typeof result?.token === "string") tokenRef.current = result.token
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)

    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
      token: tokenRef.current,
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
        description: "Thanks for the note. I usually reply within two working days.",
      })
    } catch (error) {
      toast({
        title: "Message not sent",
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* People never see or reach this field; automated senders fill it in, and the server drops what they send. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            Name
          </Label>
          <Input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={fieldClass} />
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
            autoComplete="email"
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
            maxLength={2000}
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
        <p className="text-pretty text-sm leading-relaxed text-[var(--sheet-muted)]">
          Your message goes to my inbox. I use it to reply to you.{" "}
          <Link href="/privacy" className="rounded-sm text-[var(--sheet-accent)] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
            Privacy notice
          </Link>
        </p>
      </form>
      <Toaster />
    </>
  )
}
