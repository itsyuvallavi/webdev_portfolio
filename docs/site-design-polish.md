# Site design polish — 2 October 2026

User approved execution of six recommendations: background readability, visual consistency, project emphasis, Services examples, faster motion, and legible small text. Work stays on the current local branch; no publication or email delivery is part of this task.

## Reviewed plan

1. Introduce two opt-in surfaces for body copy and bordered content. Keep the shared particle canvas and headings unchanged; do not add a title backdrop. Align Contact with the other inner pages.
2. Present EB & FLOW, Trackd and Frontier first on Work, using plain descriptions of the problem and contribution. Derive the order without modifying the source project collection or detail routes.
3. Add existing EB & FLOW and Trackd screenshots to Services, plus a semantic, static automation workflow labelled illustrative. Use “Application project · job tracking” for Trackd because personal/client ownership is not verified.
4. Change the homepage storm from 3000 to 900ms, and Home/Work container fades to 200ms. Leave the transition hook, state provider and shaders intact: the Home callback must continue after midpoint navigation to reset shared state.
5. Improve small labels, navigation and form placeholders. Give the Contact submit button sufficient contrast in normal, hover and disabled styles. Preserve all form behavior.
6. Verify the final changes against saved baselines, run content/lint/type/build checks, inspect responsive layouts and navigation, then obtain independent review.

The planner checked storm dependencies. The reviewer approved the approach with amendments covering Trackd attribution, coordinated fade durations, explicit removal of superseded surface rules, preservation of all projects, and accessibility checks. User explicitly requested immediate execution, so no additional approval is pending.

## Premortem

| Risk | Likelihood / severity | Impact and early warning | Prevention, detection and recovery |
| --- | --- | --- | --- |
| Larger labels overflow mobile/navigation | Medium / medium | Clipping, wrapping controls, horizontal scrolling | Check 320/375/768/1280 widths and mobile navigation; shorten spacing or adjust sizes if needed. |
| Faster storm leaves content hidden | Low / high | Work remains transparent after navigation | Keep lifecycle unchanged, coordinate fades; verify warm/cold route loads and back navigation; restore the duration changes if needed. |
| Examples imply unsupported client work/results | Medium / medium | Copy claims an illustrative flow is deployed or Trackd is commissioned work | Explicit labels, source-backed screenshots and descriptions; review against project data; correct or remove unsupported text. |
| Style edits disrupt contact or unrelated work | Low / high | Submission handler changes or unrelated diff | Preserve handler exactly, scoped opt-in CSS, saved baselines and independent review; restore only this task's changes. Do not send test emails. |

Baselines: `/private/tmp/site-design-polish-baseline/` contains the ten existing files in scope. New example components and this document are task additions. No new dependencies are planned.

## Verification

Implemented on `codex/services-first-website`. Independent final review approved the task diff without source blockers. The browser identified the newly featured EB & FLOW screenshot as an LCP candidate; its existing Image now uses `priority={featured}`. The final build includes that correction.

Commands and results:

- `pnpm check:content`: passed.
- `pnpm lint`: passed with seven pre-existing warnings in unrelated files.
- `pnpm typecheck`: passed.
- `pnpm build`: passed, all 20 static pages generated; three pre-existing lint warnings during build.
- `pnpm exec eslint components/project-card.tsx`: passed after the image priority correction.
- `git diff --check`: passed.
- Baseline comparison: Contact's submission handler is byte-for-byte unchanged; `lib/services.ts` unchanged. No email was sent.
- Generated HTML check: Services contains all three figures, the illustrative label and workflow steps, both case-study links and existing anchors, without inline-hidden content or forms. Work contains all seven active projects exactly once in the requested order. The two commented-out audio projects stay commented out.

CUA browser verification:

- Home, About, Services, Work and Contact checked at 320, 375, 768 and 1280px: no horizontal overflow or clipped headings. Inner-page headers remain transparent.
- Desktop navigation fits at 768px with 13px link text. Mobile menu preserves Home, About, Services, Work, Contact order and closes after navigation.
- Home retains its original title and nine-dot Services icon; the small secondary Services link remains removed.
- Canvas-ready double activation of Explore Work reached `/projects` in approximately 621ms, including tool overhead. Work and Back-to-Home opacity both returned to 1. Home → Services → Home → Work also succeeded with keyboard activation. These are local warm-route observations, not production performance guarantees.
- Both new Services project links verified with keyboard Enter and a completed URL wait. The automation example stacks on mobile and its anchor clears the navigation.
- Reading and content surface computed colors match their two shared definitions. Contact placeholders and normal button colors match the higher-contrast palette. Hover/disabled colors were reviewed in source; no submission was used to trigger sending state.
- No browser errors observed. Existing Next.js 16 migration warnings for Trackd query-string image URLs and the existing mobile sheet description warning remain.

Limits: the available CUA interface does not expose reduced-motion emulation, JavaScript disabling or network request mocking. Reduced-motion fallback/lifecycle were checked in source; generated server HTML was checked for the new examples. Those browser modes and mocked email success/failure were not rerun. The actual Contact handler remains unchanged from the previously delivered and inbox-confirmed version.

Screenshots: `/private/tmp/site-polish-services.png`, `/private/tmp/site-polish-work.png`. The full-page capture was discarded as evidence because it distorted viewport-relative hero spacing; normal viewport screenshots and measured page geometry were used instead. Local preview remains running at http://localhost:3000/; nothing was committed, pushed or deployed.

## Follow-up: consistent automation image

At the user's request, replaced the illustrative automation workflow with the existing `/trackd/2.png?v=2` screenshot of Trackd's scheduled job-search queue. All three service examples now use the same Image, caption and case-study link markup. The automation caption identifies it as an application project, without implying commissioned client work. No asset generation or changes to the source screenshot were needed.

Verified all three images appear, the automation image loads, and the section fits a 375px viewport without overflow. Targeted ESLint, type checking and diff checks passed. Preview screenshot: `/private/tmp/services-automation-photo.png`.
