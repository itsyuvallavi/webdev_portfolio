# Architecture

Where files live and what may import what. Keep this file current when the structure changes.

## Structure

```
app/                      routes, metadata and the contact API; pages are thin and render on the server
components/
  ui/                     interface primitives (shadcn/ui)
  site/                   the layout's parts and anything two or more pages share
  samples/                the code-drawn pictures, the walkthrough and their styles
  motion/                 wrappers that only move what is inside them, and the motion hook
  <route>/                parts that belong to one page, in a folder named after its route
content/                  what the site says: site.ts, services.ts, projects.ts
hooks/  lib/              the toast hook; small helpers
public/  scripts/  docs/
```

A page with no parts of its own has no folder under `components/`.

## Rules

1. **Where a file goes: kind first, then owner.** A primitive goes in `ui`, a picture in `samples`, a wrapper that only moves its contents in `motion`. Anything else goes in its page's folder if one page uses it, and in `site` if two or more do or the layout mounts it.
2. **Direction of imports.** `app` → page folders → `site`, `samples` → `motion` → `ui`, `hooks` → `lib`. `content/` can be imported by anything and imports only types. One page folder never imports from another. No files that merely re-export a folder.
3. **Server by default.** Pages, and anything that only shows text or a still picture, render on the server. Only the smallest part that needs the browser carries `"use client"`.
4. **Finished state first.** What the server sends is the settled page, readable without scripts. Motion switches on after load through `useMotionAllowed` in `components/motion/`, which is false on the server and for visitors who ask for reduced motion.
5. **One source for facts.** Site name, address, navigation, social links and contact details live in `content/site.ts`. `content/` holds text and plain data with their types, never markup or icons: a component picks a picture or icon by id. Wording used once, or a list with a single reader, stays in its component. One exception: the email address written inside the contact form's submit handling and `app/api/contact/route.ts` stays where it is.
6. **Colour and surfaces are defined once**, in `app/globals.css`. A component's own stylesheet sits beside it.

## Checks

`pnpm check:content`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, then `pnpm check:routes`. CI runs all five.

`check:routes` starts the production build and, for every page in the sitemap, confirms that it answers, has exactly one `h1` and one `main`, and has nothing hidden by an inline `opacity:0` or a bare `opacity-0` class in what the server sends. It also confirms that the sitemap and robots file carry the address in `content/site.ts`. It reads HTML only, so it cannot see states set in a stylesheet.

## When adding a page

Add it to `navigation` in `content/site.ts` if it belongs in the menu (the navigation and the command menu read that list), and to `staticRoutes` in `app/sitemap.ts`.
