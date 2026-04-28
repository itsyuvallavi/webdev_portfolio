# Portfolio Website

A modern, full-stack portfolio website showcasing web development projects, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Performance Optimized**: Three.js particle effects with mobile optimization
- **Custom Animations**: GSAP scroll-triggered animations and Framer Motion transitions
- **Responsive Design**: Fully responsive with mobile navigation
- **Dark Theme**: Elegant dark theme with custom color palette
- **Project Showcase**: Dynamic project pages with image lightboxes and carousels
- **Contact Form**: Functional contact form with API route and validation
- **SEO Optimized**: Page-specific metadata and Open Graph tags

## Tech Stack

- **Framework**: [Next.js 15.5.7](https://nextjs.org/)
- **UI Library**: React 19.2.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion, GSAP 3.12.5
- **3D Graphics**: Three.js
- **Fonts**: Geist Sans & Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
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

3. Create a `.env.local` file (optional, for contact form):
```env
RESEND_API_KEY=your_resend_api_key_here
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

## Environment Variables

### Optional (for contact form email service)

- `RESEND_API_KEY` - API key for Resend email service

To enable email functionality:
1. Sign up for [Resend](https://resend.com) (free tier available)
2. Get your API key
3. Add it to `.env.local`
4. Uncomment the email sending code in `app/api/contact/route.ts`

## Features Overview

### Three.js Particle Background

Optimized particle effects with:
- Mobile performance tuning (30 FPS on mobile, 60 FPS on desktop)
- Adaptive particle density based on device
- Visibility detection (pauses when tab is hidden)
- Custom sandstorm transition effects

### Custom Animations

- GSAP scroll-triggered animations for project hero images
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

This project is configured for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import project on Vercel
3. Add environment variables if needed
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
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

