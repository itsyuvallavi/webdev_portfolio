# About page refresh

Status: independently reviewed and approved by the user on 2 October 2026; implemented locally. The explicitly requested small homepage “Explore services” link has been removed. The main Services button and its dot icon remain.

## Direction

Keep the existing portrait, typography, dark palette, teal accents and shared particle background. Make the page introduce Yuval as a person a prospective client can work with, while keeping his creative background central to the story.

Suggested opening copy:

> I'm Yuval. I build websites and practical tools.
>
> I work with websites, automations, and custom tools for small businesses and independent professionals. My background in film composition and audio engineering shapes how I think about detail, rhythm, and how an interface feels.

Page order:

1. Portrait beside a concise introduction, with clear typography and comfortable spacing.
2. A shorter creative-background narrative connecting the existing music and audio experience to development.
3. Visible skill groups replacing this page's flip cards and mobile carousel. Retain the existing listed capabilities in one responsive structure.
4. Compact experience rows retaining the existing dates, employers and roles, with shorter descriptions that do not strengthen claims.
5. A clear contact action and a link to selected work.

## Scope and approach

- `components/pages/about-content.tsx`: server-rendered content, existing portrait, semantic headings and lists, readable content surfaces, and narrow existing `ServicesReveal` wrappers for subtle motion.
- `app/about/page.tsx`: align metadata with the introduction.
- Add scoped About CSS only if Tailwind cannot express the small visual changes clearly.
- Keep the title directly over the shared background. Use subtle surfaces only where body text needs contrast.
- Remove the About page's old opacity-zero entrances and continuous portrait glows. Preserve reduced-motion support and visible keyboard focus.
- Do not modify shared particles, navigation, flip-card or experience-card components, service content, contact behavior, or dependencies.

A copy-only update would be smaller but would retain hidden skills, dense repeated cards and the missing next step. A full redesign would exceed the request to retain the site's identity. The focused layout and content refresh is the recommended middle ground.

## Evidence and unknowns

The user's stated capabilities support websites, automation, integrations and custom tools. The repository supplies the portrait, technical skills and career descriptions. Existing career dates include two “Present” roles and Los Angeles references; these are not independently verified as current. Preserve them pending confirmation rather than infer replacements. Do not add testimonials, client outcomes, service guarantees, availability claims, or imply personal projects were commissioned client work.

## Premortem and recovery

| Failure | Cause and impact | Likelihood / severity | Prevention, detection and recovery |
| --- | --- | --- | --- |
| Page loses its personal identity | Sales copy overwhelms the creative story | Medium / medium | Keep portrait and creative narrative; compare desktop screenshots; restore only this task's saved file baselines if direction is rejected. |
| Content is obscured or motion causes hydration problems | Busy particles, client-only initial visibility or differing motion preferences | Medium / medium | Use readable body surfaces and existing progressive reveal wrappers; inspect normal/reduced-motion console and server output; remove new motion if needed. |
| Mobile layout becomes difficult to scan | Dense skill lists, large headline or navigation overlap | Medium / medium | One responsive skills structure and bounded type sizes; check 320, 375, 768 and 1280px layouts, overflow and keyboard focus; simplify spacing/type at affected breakpoints. |
| Copy misrepresents experience | Shortening changes attribution or implies dates are newly verified | Low / high | Preserve factual fields and personal/client distinctions; compare revised copy to source and review independently; revert unsupported phrasing. |

## Execution and verification

1. After approval, save baselines of affected files and implement the content/layout refresh with existing primitives.
2. Check desktop and mobile appearance, image loading, CTA destinations, keyboard focus, reduced motion, hydration warnings and readable server-rendered content without JavaScript. No email will be sent.
3. Run `pnpm check:content`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and `git diff --check`; distinguish pre-existing warnings from new failures.
4. Obtain independent review of the change against its baselines. Resolve confirmed findings and rerun affected checks.
5. Share the localhost About page and screenshots. Keep the current branch; do not publish or deploy.

## Homepage removal verification

- `pnpm exec eslint components/pages/home-content.tsx`: passed.
- `git diff --check`: passed.
- Baseline comparison: exactly the six-line secondary Services link removed; no other homepage changes in this task.
- Localhost browser: small link absent, primary Services link still points to `/services`, original headline and both main actions remain.

## About implementation and verification

Implemented only in `components/pages/about-content.tsx` and `app/about/page.tsx`, using existing dependencies and motion wrappers. Exact pre-edit files are saved in `/private/tmp/about-refresh-baseline/`. No shared components or production settings changed. No deployment or email submission occurred.

- Introduction and existing portrait share a responsive layout; title/header backgrounds remain transparent.
- Creative background, visible skills and compact experience rows use a translucent reading surface.
- All four existing roles, companies, periods and technology arrays were preserved, along with every listed skill. Existing “Present” dates and Los Angeles references still need factual confirmation before publication.
- Independent review identified a shortened sentence that could imply the aerospace site used Next.js/Firebase. Corrected it to specify the aerospace company's Squarespace site separately from web application work.
- Independent review also identified low contrast in the small experience technology lists. Changed those lists to `text-zinc-300` and dates to `text-zinc-400`; verified the final computed colors in the browser. All review findings resolved.
- `pnpm check:content`: passed.
- `pnpm lint`: passed with seven pre-existing warnings in unrelated files.
- `pnpm typecheck`: passed.
- `pnpm build`: passed, including static generation of About; three existing lint warnings reported during build.
- `pnpm exec eslint components/pages/about-content.tsx app/about/page.tsx`: passed after both review corrections. The final contrast-only class change was checked with focused lint, diff review and browser computed styles; no repeat full build was needed.
- `git diff --check`: passed.
- CUA browser checks: 320, 375, 768 and 1280px layouts have no horizontal overflow or clipped text; portrait loaded; one H1; header transparent; all skill groups exposed as semantic lists.
- Keyboard: Work link displays a 2px focus outline and navigates to `/projects`; contact action navigates to `/contact` without submitting the form.
- Normal-motion About browser error/warning logs were empty during verification.
- Parsed generated `.next/server/app/about.html`: introduction, all four skill groups and career roles, and contact/work links present; no content hidden by inline styles or buttons requiring JavaScript.
- Limitation: the available CUA controls do not expose reduced-motion emulation or JavaScript disabling. This pass checked generated server HTML and reviewed the unchanged, previously tested reduced-motion-aware reveal wrapper; it did not repeat those two browser modes.
- Screenshots: `/private/tmp/about-refresh-desktop.png` and `/private/tmp/about-refresh-full.png`.

Preview: http://localhost:3000/about on `codex/services-first-website`.
