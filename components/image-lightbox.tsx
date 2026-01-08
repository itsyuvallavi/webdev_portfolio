"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  currentIndex?: number
  totalImages?: number
}

export function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalImages
}: ImageLightboxProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && onNext) onNext()
      if (e.key === "ArrowLeft" && onPrev) onPrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  const showNavigation = onNext && onPrev && currentIndex !== undefined && totalImages !== undefined

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[98vh] w-[98vw] h-[98vh] p-0 overflow-hidden bg-black/95 border-none" showCloseButton={false}>
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="size-6" />
        </Button>

        {/* Image Counter */}
        {showNavigation && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm font-mono text-white">
              {currentIndex + 1} / {totalImages}
            </span>
          </div>
        )}

        {/* Previous Button */}
        {showNavigation && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 size-12"
            onClick={onPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-8" />
          </Button>
        )}

        {/* Next Button */}
        {showNavigation && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 size-12"
            onClick={onNext}
            aria-label="Next image"
          >
            <ChevronRight className="size-8" />
          </Button>
        )}

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="98vw"
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
