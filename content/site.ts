/** Facts about the site that more than one file reads. Change them here and nowhere else. */

export const site = {
  name: "Yuval Lavi",
  /** The address the site is served from; `www.` redirects here. */
  url: "https://yuvallavi.com",
  location: "Lisbon",
  email: "info@yuvallavi.com",
} as const

export interface NavigationLink {
  id: "home" | "about" | "services" | "projects" | "contact"
  path: string
  label: string
}

/** Top-level pages, in menu order. */
export const navigation: readonly NavigationLink[] = [
  { id: "home", path: "/", label: "Home" },
  { id: "about", path: "/about", label: "About" },
  { id: "services", path: "/services", label: "Services" },
  { id: "projects", path: "/projects", label: "Work" },
  { id: "contact", path: "/contact", label: "Contact" },
]

export interface SocialLink {
  id: "linkedin" | "github" | "telegram"
  name: string
  url: string
}

export const socialLinks: readonly SocialLink[] = [
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/yuvallavi-dev/" },
  { id: "github", name: "GitHub", url: "https://github.com/itsyuvallavi" },
  { id: "telegram", name: "Telegram", url: "https://t.me/itsyuvallavi" },
]
