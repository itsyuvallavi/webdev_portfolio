# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern portfolio website built with Next.js 15 and React 19, featuring a single-page application architecture with client-side navigation, 3D particle effects using Three.js, and a comprehensive shadcn/ui component library.

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **React**: 19 (latest)
- **TypeScript**: Full TypeScript implementation
- **Package Manager**: pnpm
- **Styling**: TailwindCSS 4.x with custom CSS variables (oklch color space)
- **UI Components**: shadcn/ui (57 components installed) using "new-york" style
- **Fonts**: Geist Sans & Geist Mono
- **3D Graphics**: Three.js for particle effects
- **Animations**: Framer Motion, tw-animate-css
- **Forms**: react-hook-form with Zod validation
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Development Commands

```bash
pnpm dev              # Start development server (default: http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Architecture

### Single-Page Application Pattern

The site uses a client-side navigation system without Next.js routing:

- `app/page.tsx` - Main entry point managing page state with `useState<PageType>`
- Navigation is handled via the `<Navigation>` component with `onNavigate` callbacks
- Page transitions animated with `<PageTransition>` wrapping page content
- Page types: "home" | "projects" | "about" | "contact"

**Important**: This is a single-page app using state-based navigation, not Next.js App Router navigation. To add new pages:
1. Add the page type to `PageType` in `components/single-page-app.tsx`
2. Create content component in `components/pages/`
3. Add case to switch statement in `app/page.tsx`
4. Update navigation links in `components/navigation.tsx`

### Component Organization

```
components/
├── pages/                    # Page content components
│   ├── home-content.tsx
│   ├── about-content.tsx
│   ├── projects-content.tsx
│   └── contact-content.tsx
├── ui/                       # shadcn/ui components (57 components)
├── navigation.tsx            # Top navigation with page state
├── page-transition.tsx       # Animation wrapper for page changes
├── three-particle-wave.tsx   # Three.js background effect
├── command-menu.tsx          # Keyboard shortcut menu
└── theme-provider.tsx        # next-themes integration
```

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to project root
- Example: `@/components`, `@/lib/utils`, `@/hooks`

### shadcn/ui Configuration

- Style: "new-york"
- RSC enabled
- CSS variables mode with "neutral" base color
- Lucide icons
- Components in `@/components/ui`
- Utils in `@/lib/utils`

### Styling System

- TailwindCSS 4.x with PostCSS
- CSS variables using oklch color space for better color accuracy
- Custom dark mode variant: `@custom-variant dark (&:is(.dark *))`
- Theme provider defaults to dark mode with system theme disabled
- Utility function: `cn()` combines clsx and tailwind-merge

## Build Configuration

The `next.config.mjs` has relaxed settings for development:
- ESLint errors don't block builds
- TypeScript errors don't block builds
- Image optimization disabled

These should be re-enabled before production deployment.

## Key Technical Notes

- All page components should be client components (`"use client"`) due to the interactive navigation pattern
- The main background effect (`ThreeParticleWave`) renders behind all content
- Navigation bar has backdrop blur and fixed positioning
- Framer Motion used for smooth page transitions
- Command menu (Cmd+K) available globally for keyboard navigation
