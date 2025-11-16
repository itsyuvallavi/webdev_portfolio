export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  role: string
  problem: string
  solution: string
  screenshots: string[]
}

export const projects: Project[] = [
  {
    slug: "nomadai",
    title: "NOMADAI",
    description: "AI-powered travel itinerary generator with real-time data integration and Firebase backend.",
    longDescription:
      "Full-featured web application that generates personalized travel itineraries using GPT-4o-mini, integrating multiple APIs to import real-time data. Built with modern architecture focusing on clean code organization and optimal performance.",
    image: "/nomadai/1.webp",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "Firebase", "GPT-4o-mini"],
    category: "Full Stack",
    demoUrl: "https://nomadai.example.com",
    githubUrl: "https://github.com/yourusername/nomadai",
    role: "Full Stack Developer",
    problem:
      "Travelers needed a streamlined way to plan trips with personalized recommendations based on their preferences, budget, and real-time availability.",
    solution:
      "Developed a fully optimized web app with AI-powered itinerary generation, real-time API data integration, Firebase authentication and database, organized component structure with ReadMe documentation for easy maintenance.",
    screenshots: ["/nomadai/1.webp", "/nomadai/2.webp", "/nomadai/3.webp", "/nomadai/4.webp"],
  },
  {
    slug: "eb-and-flow",
    title: "EB & FLOW",
    description: "Custom-designed static website for marriage therapy practice with seamless EmailJS integration.",
    longDescription:
      "Client website built with React and Vite featuring a cohesive, unique design system across all pages and components. Fully responsive with mobile and tablet optimizations, integrated with EmailJS for easy client contact.",
    image: "/ebnflow/1.webp",
    tags: ["JavaScript", "React", "Vite", "Tailwind CSS", "EmailJS", "Netlify"],
    category: "Frontend",
    demoUrl: "https://ebandflow.example.com",
    githubUrl: "https://github.com/yourusername/ebandflow",
    role: "Frontend Developer & Designer",
    problem: "Marriage therapist needed a professional, calming web presence that reflected their practice's values while making it easy for potential clients to reach out.",
    solution: "Built a custom static site with Vite for optimal performance, Tailwind for cohesive styling, and EmailJS integration for seamless client communication. Ensured full responsiveness across all devices.",
    screenshots: ["/ebnflow/1.webp", "/ebnflow/2.webp", "/ebnflow/3.webp", "/ebnflow/4.webp"],
  },
  {
    slug: "film-composer-portfolio",
    title: "Film Composer Portfolio",
    description: "Cinematic portfolio website showcasing original compositions, film scoring work, and audio plugin development.",
    longDescription:
      "A professionally designed portfolio website for film composition work, featuring a stunning cinematic aesthetic with forest backdrop. Showcases selected works including experimental compositions, film soundtracks, and solo instrumental pieces. Includes dedicated sections for music compositions (The Duel, En Paix, The Fisherman's Wife, Quality Control, Zagori Imperia, Limbo, From Dust, Backseat Driver) and audio plugins (Hang Dream, FrozenReverb). Built with clean navigation and elegant grid layout for optimal presentation of creative work.",
    image: "/filmcomposer/1.webp",
    tags: ["HTML", "CSS", "JavaScript", "Web Design", "Portfolio", "UX/UI"],
    category: "Frontend",
    demoUrl: "https://www.yuvallavi.com",
    role: "Frontend Developer & Designer",
    problem: "Needed a professional online presence to showcase film composition portfolio, selected musical works spanning 2023-2024, and custom audio plugins to attract film directors, producers, and music licensing opportunities.",
    solution: "Designed and developed an immersive, cinematic portfolio website with atmospheric forest imagery, organized sections for selected works with metadata (year, type, genre), dedicated audio plugins showcase, and clean navigation. Focused on visual storytelling and minimalist design that complements the artistic nature of the work.",
    screenshots: ["/filmcomposer/1.webp", "/filmcomposer/2.webp", "/filmcomposer/3.webp", "/filmcomposer/4.webp"],
  },
  {
    slug: "frontier-aerospace",
    title: "Frontier Aerospace",
    description: "Professional aerospace company website built on Squarespace with custom JavaScript enhancements and animations.",
    longDescription:
      "Client website developed for an aerospace company using Squarespace as the foundation, enhanced with custom JavaScript for animations and interactive text elements. Overcame platform limitations through creative coding solutions to deliver polished, professional functionality beyond the standard template capabilities. Focused on clean design and smooth user interactions tailored to the aerospace industry.",
    image: "/frontier/1.webp",
    tags: ["JavaScript", "Squarespace", "CSS", "Custom Animations", "Web Design"],
    category: "Frontend",
    role: "Frontend Developer",
    problem: "Aerospace client needed a professional website with custom interactive features and animations, but was limited to Squarespace's template-based platform with restrictive customization options.",
    solution: "Leveraged custom JavaScript to extend Squarespace's capabilities, implementing smooth animations and enhanced text box interactions. Worked within platform constraints to deliver a polished, professional site that exceeded standard template functionality while maintaining ease of client content management.",
    screenshots: ["/frontier/1.webp", "/frontier/2.webp", "/frontier/3.webp", "/frontier/4.webp"],
  },
  {
    slug: "hang-dream",
    title: "Hang Dream",
    description: "Premium digital recreation of the Hang Drum recorded at God Knows Studios with studio-grade microphones.",
    longDescription:
      "A beautifully captured digital recreation of the Hang Drum, recorded at God Knows Studios with premium microphones including the Coles 4038 and AKG C414 XLS. Features versatile mic positioning and tonal adjustment controls, perfect for ambient soundscapes and cinematic scores.",
    image: "/hangdrum/1.webp",
    tags: ["LUA", "Kontakt", "Audio DSP", "VST3", "AU", "AAX"],
    category: "Audio Plugins",
    role: "Audio Plugin Developer",
    problem: "Composers needed a high-quality, playable Hang Drum instrument with studio-quality sound and flexible tonal control.",
    solution: "Created a detailed Kontakt instrument using LUA scripting with premium studio recordings, versatile mic positioning controls, and tonal adjustments optimized for ambient and cinematic production.",
    screenshots: ["/hangdrum/1.webp", "/hangdrum/2.webp", "/hangdrum/3.webp"],
  },
  {
    slug: "frozen-reverb",
    title: "FrozenReverb",
    description: "Sophisticated reverb and shimmer plugin with intuitive controls for creating lush, atmospheric soundscapes.",
    longDescription:
      "A sophisticated reverb and shimmer plugin featuring intuitive controls for creating lush, atmospheric soundscapes with precise parameter control. Built with HISE/JUCE using C++ for optimal performance and professional-grade audio processing.",
    image: "/frozenreverb/Screenshot 2025-11-13 at 10.39.48.webp",
    tags: ["C++", "HISE", "JUCE", "Audio DSP", "VST3", "AU", "AAX"],
    category: "Audio Plugins",
    role: "Audio Plugin Developer",
    problem: "Musicians and producers needed a reverb plugin with shimmer effects and MIDI-controllable parameters for live performance and studio use.",
    solution: "Developed an advanced reverb engine with size, width, and damping controls, built-in shimmer effect for ethereal textures, and MIDI-controllable parameters using C++ with HISE/JUCE framework.",
    screenshots: ["/frozenreverb/Screenshot 2025-11-13 at 10.39.48.webp", "/frozenreverb/Screenshot 2025-11-13 at 10.42.08.webp"],
  },
]

export const categories = ["All", "Full Stack", "Frontend", "Audio Plugins"]
