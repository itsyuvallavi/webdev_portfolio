"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like
            to work together!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required placeholder="Tell me about your project..." rows={6} />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-500 hover:bg-purple-600">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Whether you have a question, want to discuss a project, or just want to say hi, I'd love to hear from
                  you.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:info@yuvallavi.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>info@yuvallavi.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/yuval-lavi-4b9338180/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>linkedin.com/in/yuval-lavi</span>
                </a>
                <a
                  href="https://t.me/itsyuvallavi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  <span>Telegram: @itsyuvallavi</span>
                </a>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-gray-400">
                  I typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  )
}
