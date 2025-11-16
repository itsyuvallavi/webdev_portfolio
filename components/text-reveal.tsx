"use client"

import { motion } from "framer-motion"
import type { CSSProperties } from "react"

interface TextRevealProps {
  text: string
  className?: string
  style?: CSSProperties
  delay?: number
}

export function TextReveal({ text, className = "", style, delay = 0 }: TextRevealProps) {
  const words = text.split(" ")

  // Variants for the container to orchestrate the animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i + delay },
    }),
  }

  // Variants for each word to create a smoother smoke effect
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  }

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", ...style }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ marginRight: "0.15em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
