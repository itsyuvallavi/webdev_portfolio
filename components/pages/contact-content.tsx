"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get in Touch</h1>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to
          work together!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Let's Connect</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Whether you have a question, want to discuss a project, or just want to say hi, I'd love to hear from
                you.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:info@yuvallavi.com"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@yuvallavi.com</span>
              </a>
              <a
                href="tel:+18188603168"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (818) 860-3168</span>
              </a>
              <a
                href="https://www.yuvallavi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span>www.yuvallavi.com</span>
              </a>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <h3 className="font-semibold mb-2 text-white">Response Time</h3>
              <p className="text-sm text-gray-400">I typically respond within 24-48 hours during business days.</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
