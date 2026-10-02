# Service launch plan

Prepared 2 October 2026. This is a working strategy and website brief, reviewed independently. The services website update is implemented on `codex/services-first-website` and available for local review. Publication is pending.

## Start here

The first objective is one small paid project, delivered well, with a client who can explain how it helped. Build the offer and start customer conversations alongside a short website update. A complete redesign is not a prerequisite for a conversation.

Proposed positioning:

> I build websites and practical tools that help small businesses get enquiries, organise their work, and reduce repetitive admin.

For the first campaign, test **a website improvement project** as the initial offer: fix a few specific obstacles to understanding the business or getting in touch. Use the first owner conversation to decide whether a bounded automation or tracker addresses a more important problem.

Start with former clients, creative collaborators, independent professionals, and business owners you can actually reach. Your creative background can help you understand studios and creative businesses. This is a proposed starting audience, not a validated niche. Local shops are also candidates when the problem is a website, enquiry path, or administrative workflow; ecommerce implementation needs a separate scope and capability check.

## What we know

- You said you can confidently build websites, forms, integrations, automations, custom features and tracking tools. Data analysis tools are a possible further direction. You need income as soon as possible and are willing to devote most of your time to this.
- You know the owner of House of EORS and want her perspective on industry needs. She is the first identified discovery contact, not a presumed customer. Other nearby shops, cafes and restaurants are possible prospects; their needs and willingness to pay are unverified.
- The portfolio describes EB & FLOW and Frontier Aerospace as client website work and includes your composer portfolio. These are relevant examples for business buyers. Their attribution, permission, current live links, and business results need confirmation before adding new claims or endorsements.
- Source in this repository implements a Next.js/React website, a validated contact endpoint, project pages, metadata, image tooling and motion controls. Source inspection does not establish live contact delivery, performance improvements, or delivery speed.
- Trackd and other complex projects provide portfolio descriptions and screenshots. Their full application implementations were not verified in this repository. Use accurate project labels and demonstrate the particular capability you are selling.
- Your income target, strongest reachable customer group, supported client platforms, and estimated delivery times are still unknown. Do not infer them from availability or portfolio breadth.

Web design, frontend development and scripting/automation appear in [Upwork's 2026 demand report](https://investors.upwork.com/node/12681/pdf). Its evidence comes from completed U.S. marketplace jobs and freelancer earnings during 2025. This supports testing these service categories; it does not establish local demand, a suitable price, or likely earnings for you.

## Three services to test

| Service | Example customer problem | First paid scope | Completion evidence |
| --- | --- | --- | --- |
| Website improvements | Visitors struggle with mobile layout, unclear services, or finding a contact action | One or two pages, up to three agreed improvements, on a platform you can maintain | Before/after screenshots, agreed mobile and contact checks, client acceptance |
| Simple automation | An enquiry has to be copied manually into a spreadsheet | One defined input, output and trigger, using named supported systems and representative test data | Demonstrated expected output, failure behavior and handover |
| Small tracking tool | Jobs, leads or project status are scattered across spreadsheets | One user workflow with agreed fields and views; prove it first with sample data | An agreed set of tasks completed correctly, documented ownership and maintenance |

A new brochure or creative portfolio website is a natural larger project when improvement of an existing site is insufficient. Start with a small page count, client-approved content, an enquiry method or existing booking link, and a manageable handover. Custom accounts, checkout and booking engines require separate estimates and review.

For an automation quote, define the input, output, systems, access, trigger, typical volume, handling of failures, and acceptance check. A workflow can contain several integrations; its business label alone does not bound the work. Customer-data writes and unattended operations need explicit scope and independent review.

After a successful delivery, offer optional ongoing care with a monthly work cap, named tasks and an agreed response window. Confirm a recurring need before building a retainer around it.

## Make a paid project concrete

Use a short written scope that states:

1. The customer's problem and the exact deliverables.
2. What is excluded, which platforms are supported, and the client's required content/access.
3. Acceptance checks and the number of revision rounds.
4. The delivery window, beginning when required inputs and the agreed initial payment are received.
5. Price, payment milestones, ownership, handover and the support period.
6. How additional requests are priced and approved.

Estimate discovery, implementation, revisions, testing, communication and handover. Use total expected hours and expenses to calculate a price you can sustain. Keep this separate from the buyer's willingness to pay; validate both in real conversations. No public starting price is proposed yet because the scope and buyer are not known.

Agree payment before starting delivery. Track payment received separately from a proposal being accepted. A clear enquiry path is a deliverable; a guaranteed increase in enquiries or revenue is not.

## Proposed website changes

Keep the current visual identity while making the offer visible immediately. Proposed copy:

> **Websites and tools that make your business easier to run.**
>
> I help small businesses and independent professionals build clear websites, connect their tools, and keep track of their work.

Primary action: **Tell me what you need**. Secondary action: **See relevant work**.

Recommended page order:

1. Audience, useful problems and contact action.
2. Three short service descriptions with concrete examples.
3. Two or three relevant projects, each explaining the problem, your contribution and what was delivered.
4. A simple process: understand the problem, agree a scope, build and hand over.
5. Clear contact details and what a prospect should send: their business, existing site/tool, and the task they want to improve.

For website buyers, feature EB & FLOW and Frontier alongside a suitable creative portfolio example. For tracking/automation, use Trackd as a clearly labelled project demonstration. Preserve existing project URLs and the full project collection. Keep the particle playground available with secondary emphasis.

Do not invent testimonials, conversion results, client logos or production-readiness claims. The composer case-study link shares the domain used by this site's metadata; check its current destination before presenting it as a separate live site.

Affected files for the later implementation:

- `components/pages/home-content.tsx`: positioning, services, primary contact action and featured proof.
- `lib/data.ts` and `components/pages/projects-content.tsx`: accurate descriptions and relevant featured selection without discarding technical projects or breaking URLs.
- `app/contact/page.tsx`: buyer-oriented prompt and contact confirmation repair.
- `components/pages/contact-content.tsx`: keep the reusable contact implementation consistent where applicable.
- `app/layout.tsx`: service-oriented metadata.
- `components/router-navigation.tsx` and `components/command-menu.tsx`: update only if a new top-level Services route is chosen. A homepage section is sufficient initially.

### Contact readiness finding

Independent source review found both contact handlers called `e.currentTarget.reset()` after awaiting the request. React clears `currentTarget` after dispatch, so the reset could throw after a success response and enter the error handler. Both handlers now capture the form element before awaiting and reset that reference only after an HTTP success with `success: true`. Browser checks verified delayed success, failure, malformed responses and retry behavior on the active contact page. Inbox receipt has not been tested.

## First seven days

These are activity targets, not a forecast of a sale within seven days. Adapt the sequence when buyer responses or delivery commitments change it.

Begin with the House of EORS owner using [the restaurant discovery guide](restaurant-discovery-guide.md). Ask about her actual recent experiences and what she hears from other owners. Record concrete workflows, their frequency and consequences, tools already used, and what owners have paid or tried to fix. Ask for introductions where appropriate. An old-looking site or system alone does not establish a paid need.

| When | Action | Concrete output |
| --- | --- | --- |
| Day 1 | Ask the restaurant owner for a short conversation at a convenient time. Prepare the website improvement hypothesis and supported platforms. Write down ten real prospects, starting with people who know your work. | First discovery conversation arranged, one draft offer paragraph, ten names with a reason the offer may fit |
| Day 2 | Begin personal conversations. Use an accurately labelled existing example. Prepare the minimum website update alongside this. | First three contacts approached by you; proposed homepage copy and two relevant examples |
| Days 3–4 | Complete the agreed website pass and readiness checks. Continue individual outreach and short discovery conversations. | Site ready to share; notes on buyers' actual problems, urgency, existing tools and budget |
| Days 5–7 | Propose a small paid project where there is a clear fit. Agree scope, inputs and payment; schedule delivery after agreement. | Aim for ten total contacts, three conversations and one scoped proposal; record acceptance and payment separately |

Useful discovery questions: What is frustrating you now? Can you show me one example? What happens when it goes wrong? What would a useful result look like? Who will use or update it? Is solving it a priority with a budget?

Conversation opener for a warm direct message, for you to personalise and send:

> I'm offering website improvements and small workflow tools for businesses. Is there anything on your website, or a repeated admin task, that's been frustrating you? If you show me one example, I can suggest a small project with a clear scope and price.

For a less familiar prospect, replace the general question with one specific issue you have actually observed. No messages have been sent as part of preparing this plan.

## If the experiment stalls

| Failure mode | Likelihood / severity | Early sign and detection | Prevention and recovery |
| --- | --- | --- | --- |
| Buyers do not see a priority worth paying for | Medium / high for an urgent income goal | Little engagement, or conversations reveal low urgency; review responses after the first ten targeted contacts | Choose reachable buyers and ask about existing problems. Change one variable—audience or offer—and test another small cohort. Keep broader paid-work/referral options open if finances require it. |
| The project consumes unpaid time | Medium / high | Missing access, hidden integrations or repeated extra requests during diagnosis | Inspect before quoting, collect client inputs and agree acceptance/payment. Pause additions, rescope them, or decline an unsuitable platform. Keep a backup or staging path for website changes. |
| A prospect cannot trust the proof or contact path | Medium / high | Wrong live links, unclear project status, or contradictory submission feedback | Verify links and attribution, repair/test the contact UI, and use evidence of delivered work. Revert a faulty website release and provide a working direct contact option. |

## Verification and next decision

The original planning review checked repository source and challenged offer scope, payment milestones and website readiness. A second independent review approved the original written plan. The later restaurant discovery additions are a small planning update and have not received another independent review. `git diff --no-index --check /dev/null docs/service-launch-plan.md` produced no whitespace diagnostics; its exit status was 1 because the new file differs from `/dev/null`. No live submissions or application tests were run during this planning task.

Before the later website launch, run `pnpm check:content`, `pnpm lint`, `pnpm typecheck` and `pnpm build`. Check mobile and keyboard navigation, reduced motion, service/contact actions, existing project URLs, and mocked contact success/failure/retry paths. Confirm actual contact delivery separately with an authorised test; provider acceptance alone does not establish inbox receipt. Preserve existing working-tree changes and review only the task's additions.

### Website implementation record

Following visual feedback, the homepage retains the original CREATIVE / outlined DEVELOPER composition, tagline, Work button and Mono lab link. Only its lower-right description and a small Services link introduce the offer. Navigation reads Home, About, Services, Work, Contact. The dedicated `/services` page uses transparent display typography, asymmetric translucent detail panels, brief scroll reveals, hover arrows and a decorative scroll-progress line. New motion respects preference changes, and server-rendered service text stays clear without JavaScript. The full project collection and its URLs remain available. No public prices or new client-result claims were added.

The correction followed `ui-skills-root`, `redesign-existing-projects` and `emil-design-eng` guidance, with independent plan and implementation review. Browser checks uncovered an existing reduced-motion hydration warning in the original homepage. A local hydration guard repairs it while preserving the composition, original title animation and keyboard focus; shared particle and transition code was not changed.

Checks run after implementation:

- `pnpm check:content`: passed.
- `pnpm lint`: passed with seven existing warnings in files outside this update.
- `pnpm typecheck`: passed.
- `pnpm build`: passed; the build reports three of the existing lint warnings.
- `node /private/tmp/verify-services-preview.cjs`: 26 checks passed for the first implementation, including all seven project routes and contact confirmation/retries. All 19 contact submissions were intercepted; no test email was sent.
- `node /private/tmp/verify-style-correction.cjs`: 20 checks passed for the visual correction at 320, 375, 768 and 1280px. Covered restored composition, navigation order, keyboard/mobile navigation, service anchors, disabled JavaScript, reduced motion, changing motion preferences, scroll/hover effects, Work transition and history navigation. A delayed-script test verified that homepage title height and early keyboard focus survive hydration. No console or hydration errors were recorded. These checks did not submit the contact form.
- `git diff --check`: passed. The task's source changes were also inspected against the saved pre-update baseline, preserving unrelated work already in the checkout.

Independent implementation review found no blocking issues. Live email delivery and project attribution beyond existing portfolio descriptions remain unverified. The local review URL is `http://localhost:3000`; it depends on the development server remaining running.

The immediate step is the conversation with the restaurant owner. Then identify four more people or businesses you can contact personally. Their problems will help select the first paid scope and refine the site's wording. The longer-term income target can be set once project effort and willingness to pay are clearer.
