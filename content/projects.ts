/** Append to Trackd image URLs when you replace files under `public/trackd` (busts next/image + browser cache). */
const trackdImg = (n: 1 | 2 | 3) => `/trackd/${n}.png?v=2`
const elgarImg = (n: 1 | 2 | 3) => `/elgar/${n}.png`
const cipherQueryImg = (n: 1 | 2 | 3) => `/cipherquery/${n}.jpg`

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
  /** Optional one-line context per screenshot (same order as `screenshots`) */
  screenshotCaptions?: string[]
}

export const projects: Project[] = [
  {
    slug: "cipherquery",
    title: "CipherQuery",
    description:
      "Lets a buyer test a private dataset without seeing the raw data. Samples are processed in memory only, with one verified request per evaluation.",
    longDescription:
      "CipherQuery lets buyers ask plain-language questions about a seller's private structured dataset without receiving the raw records. CSV, JSONL, NDJSON, and flat Parquet samples travel over encrypted transport, are parsed only in memory, and are evaluated through one private 0G request. Eight paid synthetic evaluations matched their known expected scores and returned TEE-verified execution metadata.",
    image: cipherQueryImg(1),
    tags: [
      "TypeScript",
      "Next.js",
      "0G",
      "Supabase",
      "Private Compute",
      "TEE",
      "Vitest",
    ],
    category: "Full-stack",
    demoUrl: "https://cipherquery.vercel.app",
    githubUrl: "https://github.com/itsyuvallavi/blindsample",
    role: "Full-stack Developer & Designer",
    problem:
      "Dataset buyers need evidence that private data can answer their questions, while sellers cannot safely expose the underlying rows. A useful evaluation also has to distinguish protected execution from whether the model's answer is accurate.",
    solution:
      "Built separate buyer and seller capability flows, bounded in-memory parsers for four file formats, one atomic 0G Private Computer request per evaluation, and strict fail-closed validation. TEE metadata confirms the protected execution path; accuracy is checked separately against known expected results. Raw datasets and raw 0G responses are intentionally not retained.",
    screenshots: [cipherQueryImg(1), cipherQueryImg(2), cipherQueryImg(3)],
    screenshotCaptions: [
      "CipherQuery's public overview — private dataset questions in, TEE-verified answers out, with zero raw rows exposed to the buyer.",
      "The documentation maps the workflow from plain-language buyer questions to a bounded seller sample and verified question-level results.",
      "The 0G and TEE boundary is explicit: protected execution is verified separately from the accuracy of a model judgement.",
    ],
  },
  {
    slug: "elgar",
    title: "Elgar",
    description:
      "Local-first Rust agent harness with a controller-owned action lifecycle, permissioned shell and file operations, a terminal interface, and no-network regression checks.",
    longDescription:
      "Elgar is a local-first Rust agent harness built around a strict execution boundary: the controller owns truth, the model suggests, the user approves, the filesystem confirms, and the UI reports. The current v0.2 build includes a controller-backed action lifecycle, permissioned file and shell actions, terminal TUI rendering, LM Studio provider support, context accounting, and no-network smoke/performance checks.",
    image: elgarImg(1),
    tags: [
      "Rust",
      "CLI",
      "Terminal UI",
      "Agent Systems",
      "Permission Model",
      "LM Studio",
      "Testing",
    ],
    category: "Developer Tools",
    githubUrl: "https://github.com/itsyuvallavi/elgar-cli",
    role: "Systems Developer",
    problem:
      "Agent tools can blur the line between model text and verified system state, especially when file writes or shell commands are involved. That makes local automation hard to trust.",
    solution:
      "Built a Rust controller that records proposed actions before execution, requires explicit approval for shell and filesystem work, verifies results after execution, and reports the state through both CLI and terminal TUI paths backed by no-network regression tests.",
    screenshots: [elgarImg(1), elgarImg(2), elgarImg(3)],
    screenshotCaptions: [
      "Actual TUI startup and exit path from the local binary.",
      "Actual TUI pending-action state before approval.",
      "Actual TUI approval flow after the controller executes and verifies the shell command.",
    ],
  },
  {
    slug: "trackd",
    title: "Trackd",
    description:
      "Job application tracker with pipeline views, AI-assisted search, email sync, CV coaching, and interview practice — Next.js on PostgreSQL with Supabase auth.",
    longDescription:
      "Trackd is a job application tracker that brings roles, status, documents, and follow-ups into one place. It supports manual entry plus optional AI-assisted job search (external APIs, deduplication, OpenAI fit scoring), IMAP email integration with classification and status updates, CV advisor and interview prep sessions, a browser extension to save listings, and admin-style cron routes for sync and bot runs. Built with Next.js 16 App Router, React 19, Tailwind CSS 4, Prisma on PostgreSQL, and Supabase Auth.",
    image: trackdImg(1),
    tags: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "OpenAI",
      "shadcn/ui",
    ],
    category: "Full-stack",
    demoUrl: "https://trackd-eight.vercel.app/",
    role: "Full-stack Developer",
    problem:
      "Job seekers juggle spreadsheets, inboxes, and multiple sites — they lose track of where they applied, what stage each role is in, and which follow-ups matter next.",
    solution:
      "Shipped a unified app with list, Kanban, dashboard, and calendar views; bot-driven discovery with AI scoring; email sync that ties messages to applications; and AI tools for CVs and interviews, all backed by a clear Prisma data model and Supabase-authenticated accounts.",
    screenshots: [trackdImg(1), trackdImg(2), trackdImg(3)],
    screenshotCaptions: [
      "Pipeline and applications — status, sources, and next actions in one view.",
      "AI-assisted job search and bot queue — scoring, deduplication, and review.",
      "Account depth — profile, integrations, and tooling around the core tracker.",
    ],
  },
  {
    slug: "nomadai",
    title: "NOMADAI",
    description: "AI travel itinerary generator with live data and a Firebase backend. Alpha, still in development.",
    longDescription:
      "A web application, still in alpha, that generates personalised travel itineraries using GPT-4o-mini and brings in live data from several APIs. Some features may not work as expected.",
    image: "/nomadai/1.webp",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "Firebase", "ChatGPT"],
    category: "Full-stack",
    role: "Full-stack Developer",
    problem:
      "Travellers needed a simpler way to plan trips, with personalised recommendations based on their preferences, their budget and what is available at the time.",
    solution:
      "Built a web app with AI itinerary generation, live API data, Firebase authentication and database, and a README so it can be maintained.",
    screenshots: ["/nomadai/1.webp", "/nomadai/2.webp", "/nomadai/3.webp", "/nomadai/4.webp"],
  },
  {
    slug: "eb-and-flow",
    title: "EB & FLOW",
    description: "A custom-designed website for a marriage therapy practice, with a working contact form.",
    longDescription:
      "Client website built with React and Vite, with one design system across every page and component. It works on phones and tablets, and its contact form sends enquiries by email through EmailJS.",
    image: "/ebnflow/1.webp",
    tags: ["JavaScript", "React", "Vite", "Tailwind CSS", "EmailJS", "Netlify"],
    category: "Frontend",
    role: "Frontend Developer & Designer",
    problem: "Marriage therapist needed a professional, calming web presence that reflected their practice's values while making it easy for potential clients to reach out.",
    solution: "Built a custom static site with Vite, styled with Tailwind, with a contact form that emails the practice through EmailJS. It works on phones, tablets and desktops.",
    screenshots: ["/ebnflow/1.webp", "/ebnflow/2.webp", "/ebnflow/3.webp", "/ebnflow/4.webp"],
  },
  {
    slug: "film-composer-portfolio",
    title: "Film Composer Portfolio",
    description: "My own website as a film composer: original compositions, film scoring work and audio plugins.",
    longDescription:
      "My own portfolio website for film composition work, with a cinematic look and a forest backdrop. Showcases selected works including experimental compositions, film soundtracks, and solo instrumental pieces. Includes dedicated sections for music compositions (The Duel, En Paix, The Fisherman's Wife, Quality Control, Zagori Imperia, Limbo, From Dust, Backseat Driver) and audio plugins (Hang Dream, FrozenReverb). Built with clean navigation and elegant grid layout for optimal presentation of creative work.",
    image: "/filmcomposer/1.webp",
    tags: ["HTML", "CSS", "JavaScript", "Web Design", "Portfolio", "UX/UI"],
    category: "Frontend",
    role: "Frontend Developer & Designer",
    problem: "Needed a professional online presence to showcase film composition portfolio, selected musical works spanning 2023-2024, and custom audio plugins to attract film directors, producers, and music licensing opportunities.",
    solution: "Designed and developed an immersive, cinematic portfolio website with atmospheric forest imagery, organised sections for selected works with metadata (year, type, genre), dedicated audio plugins showcase, and clean navigation. Focused on visual storytelling and minimalist design that complements the artistic nature of the work.",
    screenshots: ["/filmcomposer/1.webp", "/filmcomposer/2.webp", "/filmcomposer/3.webp", "/filmcomposer/4.webp"],
  },
  {
    slug: "frontier-aerospace",
    title: "Frontier Aerospace",
    description: "An aerospace company's Squarespace website, extended with custom JavaScript and animations.",
    longDescription:
      "Client website for an aerospace company, built on Squarespace and extended with custom JavaScript for animations and interactive text. The custom code adds interactions the standard templates do not offer, while the client can still edit the content.",
    image: "/frontier/1.webp",
    tags: ["JavaScript", "Squarespace", "CSS", "Custom Animations", "Web Design"],
    category: "Frontend",
    role: "Frontend Developer",
    problem: "Aerospace client needed a professional website with custom interactive features and animations, but was limited to Squarespace's template-based platform with restrictive customisation options.",
    solution: "Used custom JavaScript to extend Squarespace, adding smooth animations and richer text interactions. The site stays within the platform, so the client can keep editing its content.",
    screenshots: ["/frontier/1.webp", "/frontier/2.webp", "/frontier/3.webp", "/frontier/4.webp"],
  },
  /*
  {
    slug: "hang-dream",
    title: "Hang Dream",
    description: "Premium digital recreation of the Hang Drum recorded at God Knows Studios with studio-grade microphones.",
    longDescription:
      "A beautifully captured digital recreation of the Hang Drum, recorded at God Knows Studios with premium microphones including the Coles 4038 and AKG C414 XLS. Features versatile mic positioning and tonal adjustment controls, perfect for ambient soundscapes and cinematic scores.",
    image: "/hangdrum/1.webp",
    tags: ["Lua", "Kontakt", "Audio DSP", "VST3", "AU", "AAX"],
    category: "Audio Plugins",
    role: "Audio Plugin Developer",
    problem: "Composers needed a high-quality, playable Hang Drum instrument with studio-quality sound and flexible tonal control.",
    solution: "Created a detailed Kontakt instrument using Lua scripting with premium studio recordings, versatile mic positioning controls, and tonal adjustments optimised for ambient and cinematic production.",
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
  */
]
