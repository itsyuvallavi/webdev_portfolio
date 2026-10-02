# Portfolio Website

A modern, full-stack portfolio website showcasing web development projects, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Performance Aware**: Deferred Three.js particle effects with bounded mobile and desktop budgets
- **Custom Animations**: Framer Motion transitions with reduced-motion support
- **Responsive Design**: Fully responsive with mobile navigation
- **Dark Theme**: Elegant dark theme with custom color palette
- **Project Showcase**: Dynamic project pages with image lightboxes and carousels
- **Contact Form**: Validated Resend delivery with honest provider and configuration errors
- **SEO Optimized**: Page-specific metadata and Open Graph tags

## Tech Stack

- **Framework**: [Next.js 15.5.7](https://nextjs.org/)
- **UI Library**: React 19.2.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Fonts**: Geist Sans & Mono

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy `.env.example` to `.env.local` to enable contact delivery:
```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO_EMAIL=info@yuvallavi.com
CONTACT_FROM_EMAIL="Portfolio Contact <info@yuvallavi.com>"
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── contact/             # Contact page with form
│   ├── projects/            # Projects listing and detail pages
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form API endpoint
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── pages/               # Page-specific components
│   ├── transitions/         # Page transition animations
│   └── ...                  # Shared components
├── lib/                     # Utilities and data
│   ├── data.ts             # Project data
│   └── utils.ts            # Utility functions
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
└── styles/                  # Global styles
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run the TypeScript compiler without emitting files
- `pnpm check:content` - Reject known placeholder project URLs

## Environment Variables

### Contact form email service

- `RESEND_API_KEY` - API key for Resend email service
- `CONTACT_TO_EMAIL` - Verified destination for submissions
- `CONTACT_FROM_EMAIL` - Sender on a Resend-verified domain

To enable email functionality:
1. Sign up for [Resend](https://resend.com) (free tier available)
2. Get your API key
3. Add and verify `yuvallavi.com` in the same Resend account so the approved sender, `info@yuvallavi.com`, can send
4. Add all three values to `.env.local`
5. Restart the development server after saving the values. The deployed Netlify site requires these values in its own environment settings as well.

Without these variables the API returns `503` and the form directs visitors to email instead of claiming delivery.

## Features Overview

### Three.js Particle Background

Optimized particle effects with:
- Deferred WebGL startup after first paint
- Bounded particle budgets and capped device pixel ratio
- Visibility detection (pauses when tab is hidden)
- Custom sandstorm transition effects

### Custom Animations

- Framer Motion page transitions and component animations
- Respects `prefers-reduced-motion` preference

### Project Pages

- Dynamic routing with static generation
- Image lightbox with keyboard navigation
- Screenshot carousel with scroll-triggered animations
- Project navigation between projects

### Mobile Navigation

- Hamburger menu with Sheet component
- Accessible keyboard navigation
- Command menu (⌘K / Ctrl+K) for quick navigation

## Deployment

The live site is deployed on [Netlify](https://www.netlify.com/):

1. Push your code to GitHub
2. Connect the repository in Netlify
3. Add environment variables if needed
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Vercel
- AWS Amplify
- Railway
- Self-hosted with Docker

## Performance Optimizations

- Image optimization with Next.js Image component
- Responsive images with proper `sizes` props
- Code splitting and lazy loading
- Optimized Three.js rendering for mobile
- Static generation for project pages

## Accessibility

- Semantic HTML structure
- ARIA labels on icon buttons
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue or contact directly.

## License

Private - All rights reserved

## Contact

- **Email**: info@yuvallavi.com
- **Website**: [yuvallavi.com](https://www.yuvallavi.com)
- **LinkedIn**: [yuvallavi-dev](https://www.linkedin.com/in/yuvallavi-dev/)

---

Built with ❤️ by Yuval Lavi
