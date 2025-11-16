"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"
import { projects, categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { TextReveal } from "../text-reveal"
import { useSandstormContext } from "../transitions/sandstorm-provider"
import { cn } from "@/lib/utils"

export default function ProjectsContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { stormControls } = useSandstormContext()

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Show content when storm is settling (intensity < 0.3) or when not active
  const shouldShow = !stormControls.isActive || stormControls.intensity < 0.3

  return (
    <section
      className={cn(
        "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen pt-32",
        "transition-opacity duration-500",
        shouldShow ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            <TextReveal text="SELECTED" className="block text-white" />
            <TextReveal text="WORK" className="block text-transparent" delay={0.2} style={{
              WebkitTextStroke: "2px rgba(168, 85, 247, 0.4)",
            }} />
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of web applications, client sites, and creative projects showcasing full-stack development and design.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category
                ? "bg-purple-500 hover:bg-purple-600 text-white border-purple-500"
                : "border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
