# Project Rules for Coding Agents

## Purpose

IndustryX Lab Kimi Beginner Guide Hub: a statically generated Next.js learning site for people new to Kimi Code. Preserve the established visual identity and help beginners move from explanation to a working project safely.

`AGENTS.md` holds **rules and standards** agents must follow. Inventories (token values, route status, command list, env var names, event allowlist, cookie contract) live in `info.md`. User-facing setup and deployment live in `README.md`.

The home page at `src/features/home/` is the **primary reference example**. Its folder layout, file naming, and component organization are the standard every new feature must follow.

---

## Core Principles

1. **Mirror the home page structure.** New features replicate `src/features/home/` exactly: a single page entry, a `components/` folder sub-organized by purpose, a `content/` folder for copy, and a `seo.ts` for structured data.
2. **One folder, one concern.** Each top-level folder owns a single concern (site shell, long-form content, structured data, analytics, consent, UI primitives). Do not mix concerns inside one folder.
3. **Sub-organize by purpose, not file type.** Inside `components/`, group into `sections/`, `animations/`, `cta/`, or `stages/`. The choice is decided by what the component does.
4. **Tokens over arbitrary values.** Every visual primitive flows through a CSS token defined in `src/index.css` and exposed by `tailwind.config.js`. Arbitrary values (`text-[12px]`, `bg-white/8`) are forbidden.
5. **Reuse, don't duplicate.** Before adding anything new, locate the existing primitive (token, component, hook, utility) at its canonical layer. Extend it. If missing, add the primitive once at the canonical layer.
6. **Trace dependencies before editing.** Map every caller, importer, test, and route that touches a file before modifying it. See §4 Code Relationship Analysis Protocol.
7. **Static export is non-negotiable.** Every page must build with `output: 'export'`. No runtime API routes, middleware, or server actions.
8. **Hydration-safe by default.** Browser state that affects React markup uses `useSyncExternalStore`. Never call `setState` synchronously inside `useEffect`. Never use `typeof window` in render or `useState` initializers.
9. **Tests next to source.** Every behavior has a test in the same folder. TDD for changes and bug fixes.
10. **`npm run check` before delivery.** It runs `typecheck`, `lint`, `test`, `build`, and `schema:check` in order. All must pass.

---

## Implementation workflow

Use this sequence for every change:

1. **Inspect** — read the relevant feature source, `info.md`, and tests. Run the Code Relationship Analysis Protocol (§4).
2. **Find the existing pattern** — locate the file that owns the concern (see "Sources of truth" below). Read the closest analogous component.
3. **Implement** — extend the existing pattern. Add a failing test before fixing bugs or changing behavior.
4. **Verify** — run `npm run check`. Inspect rendered HTML in `out/` for SEO/visual changes. Read the actual code, not the plan file, before marking work done.
5. **Remove unused code** — if you replaced or moved anything, delete the obsolete path and update every caller. Re-run `npm run check`.

If a step reveals a missing primitive (token, component, hook, utility), add it at the canonical layer before duplicating it locally.

### Small-update shortcut

A change qualifies as a **small update** when it meets all of the following:

- Touches one file (or adds a one-line entry to an existing list).
- Does not change a public contract: same exports, same props, same routes, same event names, same token names.
- Does not require test changes (existing tests still pass unchanged).
- Does not require documentation changes outside the source-of-truth file itself.
- Affects no user-visible behavior — copy edits, comment updates, robots.txt allowlist entries, and config additions all qualify. Behavior changes do not.

For small updates, run `npm run lint` as the minimal gate (≈5s, catches import, syntax, type, and lint regressions). Then commit and push. Skip the per-step inspection and review of the Code Relationship Analysis Protocol because the change is already constrained to one file with no new dependencies.

If a small update turns out to require test changes, a second file, or a public-contract change, stop and use the full workflow with `npm run check`.

---

## §1. File Organization Framework

### 1.1 Folder hierarchy (mirrors the home page)

```
src/
├── app/                                 Route entries, layouts, metadata, sitemap, robots, llms.txt, 404
│   ├── _components/                     Route-shared components (ComingSoonRouteView, NotFoundTracker)
│   ├── <route>/page.tsx                 One file per route
│   ├── sitemap.ts, robots.ts            Static export routes
│   └── layout.tsx                       Root layout (PageShell + Analytics + CookieConsent)
├── config/                              Routes, navigation, site identity, URLs, install commands
├── components/                          Cross-feature shared components
│   ├── site/                            PageShell, Nav, SiteHeader, Footer, MoonMark, ProgressiveEnhancements
│   ├── content/                         GuideLayout, TableOfContents, MobileContentsBar, ReadingProgress, SectionHeading, Reveal
│   ├── seo/                             JsonLd, EditorialByline
│   ├── analytics/                       Analytics, DeferredGoogleAnalytics
│   ├── consent/                         CookieConsent
│   └── ui/                              Visual primitives (Button, EmptyState, CopyButton, linkStyles)
├── features/<feature>/                  One folder per page-sized feature
│   ├── <Feature>Page.tsx                Single page entry
│   ├── <Feature>Page.test.tsx           Page tests
│   ├── components/                      Sub-organized by purpose (see 1.3)
│   ├── content/                         Copy and stage data
│   ├── utils/                           Feature-only pure functions (optional)
│   └── seo.ts                           Structured-data builder
├── hooks/                               Hooks shared by 2+ features (e.g. useBuildLoop)
├── lib/                                 Framework adapters and pure logic
│   ├── analytics/                       Event allowlist, consent state, deferred loader
│   ├── browser/                         Progressive enhancements, dropdown/mobile navigation, guide progress
│   ├── seo/                             Page metadata, schema builders, coming-soon meta
│   └── utils.ts                         Class-name utilities
├── styles/                              Global and shared CSS
│   ├── components/                      progressive.css, toc.css
│   └── motion/                          home-motion.css
├── test/                                Global test setup
└── index.css                            Theme tokens, utilities, animations
```

### 1.2 Naming conventions

| Asset          | Convention                                                            | Example                              |
| -------------- | --------------------------------------------------------------------- | ------------------------------------ |
| Page entry     | `<Feature>Page.tsx` (PascalCase, "Page" suffix)                       | `HomePage.tsx`, `BeginnerPage.tsx`   |
| Page test      | `<Feature>Page.test.tsx` or `<Feature>Page.ssr.test.tsx` for SSR-only | `HomePage.ssr.test.tsx`              |
| Feature SEO    | `seo.ts` at feature root                                              | `src/features/home/seo.ts`           |
| Component      | PascalCase, no suffix                                                 | `Hero.tsx`, `SafeBuildLoop.tsx`      |
| Component test | `<Name>.test.tsx` co-located                                          | `Hero.test.tsx`                      |
| Hook           | `use<Name>.ts` + `use<Name>.test.tsx`                                 | `useBuildLoop.ts`                    |
| Utility        | camelCase                                                             | `formatContent.ts`                   |
| Content module | `<topic>.ts` under `content/`                                         | `cli.ts`, `desktop.ts`               |
| CSS variable   | `--<family>-<name>` in `src/index.css`                                | `--motion-base`, `--surface-overlay` |
| Tailwind alias | mirrors CSS variable                                                  | `duration-base`, `bg-primary`        |

### 1.3 Component categorization (mandatory when ≥ 6 components)

Inside `src/features/<feature>/components/`, group files by **purpose**, not by file type:

| Subfolder     | What goes here                                                                                    | Examples (home)                                                          | Examples (beginner)                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `sections/`   | Page sections composed in the page entry. Pure composition, minimal state, no async side effects. | `Hero`, `Stats`, `Desktop`, `Features`, `Install`, `Banner`, `MobileCta` | `BeginnerHero`, `BeginnerBreadcrumb`, `BeginnerProgress`, `BeginnerPrerequisites`, `BeginnerGlossary`, `BeginnerCompletion` |
| `animations/` | Self-contained, looping, or hook-driven visual simulations. May use `"use client"` and timers.    | `CliAnimation`, `KimiDesktop`                                            | —                                                                                                                           |
| `cta/`        | Conversion, invitation, and form-style components.                                                | `ActivateInvitation`, `RedeemInvitation`, `Invite`                       | —                                                                                                                           |
| `stages/`     | Multi-step interactive sequences. Each stage owns its detail panel and progress state.            | —                                                                        | `StageSection`, `SafeBuildLoop`, `CodeCard`                                                                                 |

Rules:

1. Place a file by what it does, not by size.
2. Tests stay next to source (`Hero.tsx` + `Hero.test.tsx` in the same subfolder).
3. Cross-folder imports use `../<group>/<Component>`. Feature-level imports (`content/`, `utils/`, `seo.ts`) use `../../`.
4. New subfolders must be documented here first.
5. Split a `components/` folder when it exceeds ~10 files.

### 1.4 Where to add code (decision table)

| Adding…                      | Put it in                                                                                                                   | Follow the pattern of                                        |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| A new finished route         | `src/app/<route>/page.tsx` (metadata in the same file)                                                                      | `src/app/build-project/beginner/page.tsx`                    |
| A finished route placeholder | `src/app/<route>/page.tsx` returning `ComingSoonRouteView`                                                                  | `src/app/build-project/intermediate/page.tsx`                |
| A page section on home       | `src/features/home/components/sections/<Name>.tsx`                                                                          | `src/features/home/components/sections/Features.tsx`         |
| A home animation             | `src/features/home/components/animations/<Name>.tsx`                                                                        | `src/features/home/components/animations/CliAnimation.tsx`   |
| A home CTA                   | `src/features/home/components/cta/<Name>.tsx`                                                                               | `src/features/home/components/cta/Invite.tsx`                |
| A beginner section           | `src/features/beginner/components/sections/<Name>.tsx`                                                                      | `src/features/beginner/components/sections/BeginnerHero.tsx` |
| A beginner interactive stage | `src/features/beginner/components/stages/<Name>.tsx`                                                                        | `src/features/beginner/components/stages/SafeBuildLoop.tsx`  |
| A shared hook                | `src/hooks/<name>.ts` with `.test.tsx` beside it                                                                            | `src/hooks/useBuildLoop.ts`                                  |
| A reusable primitive         | `src/components/ui/<Name>.tsx`                                                                                              | `src/components/ui/empty-state.tsx`                          |
| A new analytics event        | Add to `essentialEventNames` in `src/lib/analytics/events.ts` AND emit `data-analytics-event` from a component              | `src/lib/analytics/events.ts`                                |
| Browser-only behavior        | `src/lib/browser/<concern>.ts`, wired from `progressiveEnhancements.ts`                                                     | `src/lib/browser/dropdownNavigation.ts`                      |
| Structured data for a page   | `src/lib/seo/schema.ts` plus a feature builder `src/features/<feature>/seo.ts`                                              | `src/features/beginner/seo.ts`                               |
| Site-wide style or token     | `src/index.css` (CSS variables) and `tailwind.config.js` (utilities)                                                        | Existing tokens in `index.css`                               |
| Any change to GA4 wiring     | Read `docs/ga4-compliance.md` first; update `CookieConsent` and `deferredScript.ts` to keep the consent contract consistent | `docs/ga4-compliance.md`                                     |

---

## §2. CSS Token Design System

### 2.1 Architecture

Three layers, in this order of inheritance:

1. **CSS variables** in `src/index.css` under `@layer base { :root { ... } }`. Define raw values.
2. **Tailwind theme** in `tailwind.config.js`. Exposes CSS variables as utility classes.
3. **Components** consume Tailwind utilities. Never raw CSS values, never arbitrary Tailwind values.

```css
/* index.css — layer 1 */
:root {
  --motion-base: 200ms;
}

/* tailwind.config.js — layer 2 */
theme: { extend: { transitionDuration: { base: 'var(--motion-base)' } } }

/* component — layer 3 */
className="transition-opacity duration-base"
```

### 2.2 Token families

| Family            | CSS variable pattern                                                                                                                                                                                     | Tailwind aliases                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Color             | `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--card`, `--popover` | `bg-primary`, `text-muted-foreground`, `border-border`, etc.                                                           |
| Neon palette      | `--neon-blue`, `--neon-violet`, `--neon-violet-soft`, `--neon-pink`                                                                                                                                      | `text-neon-violet`, `bg-neon-blue`                                                                                     |
| Surface / outline | `--surface-overlay`, `--surface-overlay-soft`, `--surface-overlay-strong`, `--workspace-surface`, `--workspace-surface-strong`, `--outline-alpha`, `--outline-alpha-strong`                              | `bg-surface-overlay`                                                                                                   |
| Border radius     | `--radius` (base), `xs`, `sm`, `md`, `lg`, `xl` (calc-based)                                                                                                                                             | `rounded-sm`, `rounded-lg`, `rounded-xl`                                                                               |
| Box shadow        | `--shadow-xs`, `--shadow-elevated`, `--shadow-floating`, `--shadow-ambient`, `--shadow-deep`                                                                                                             | `shadow-elevated`, `shadow-floating`                                                                                   |
| Motion duration   | `--motion-fast` (150ms), `--motion-base` (200ms), `--motion-slow` (300ms), `--motion-slower` (500ms), `--motion-press`, `--motion-pop`                                                                   | `duration-fast`, `duration-base`, `duration-slow`, `duration-slower`, `duration-press`, `duration-pop`                 |
| Motion easing     | `--motion-ease-out`, `--motion-ease-in-out`                                                                                                                                                              | `ease-out`, `ease-in-out`                                                                                              |
| Tracking          | `--tracking-eyebrow-tight` (0.12em), `--tracking-eyebrow-default` (0.14em), `--tracking-eyebrow` (0.16em), `--tracking-eyebrow-loose` (0.18em), `--tracking-display` (-0.025em)                          | `tracking-eyebrow-tight`, `tracking-eyebrow-default`, `tracking-eyebrow`, `tracking-eyebrow-loose`, `tracking-display` |
| Mockup font size  | `--text-mockup-2xs` (10px), `--text-mockup-xs` (10.5px), `--text-mockup-sm` (11px), `--text-mockup-md` (11.5px), `--text-mockup-lg` (12px), `--text-mockup-xl` (12.5px)                                  | `text-mockup-2xs`, `text-mockup-xs`, `text-mockup-sm`, `text-mockup-md`, `text-mockup-lg`, `text-mockup-xl`            |
| Z-index           | `--z-base`, `--z-content`, `--z-header`, `--z-progress`, `--z-nav`, `--z-floating`, `--z-banner`, `--z-modal`, `--z-skiplink`                                                                            | `z-base`, `z-nav`, `z-banner`, `z-modal`, etc.                                                                         |
| TOC accent        | `--toc-accent-from`, `--toc-accent-to`, `--toc-glow`                                                                                                                                                     | (consumed by TableOfContents only)                                                                                     |

For the current token values (specific px, ms, em), see `info.md`.

### 2.3 Usage rules

1. **Never raw arbitrary values.** `text-[12px]`, `bg-white/8`, `border-white/13`, `duration-200`, `tracking-[0.14em]`, `z-[99]` are forbidden when a token exists.
2. **Border opacity is restricted to `{5, 10, 15, 20}`.** Other values are silently dropped by Tailwind.
3. **Disabled state** uses `disabled:opacity-50 disabled:cursor-not-allowed`.
4. **Focus ring** uses the `focus-visible-ring` utility class.
5. **Buttons** go through `<Button>` with one of `default`, `outline`, `ghost`, `secondary`, `neon`, `destructive`.
6. **Spacing** uses Tailwind's default scale (`p-4`, `gap-6`, `mt-12`). For shells and max-widths, see `tailwind.config.js`.

### 2.4 Extending the system

Adding a new token is a three-step contract:

1. **Add the variable** in `src/index.css` under `@layer base { :root { ... } }`. Pick a name in an existing family, or propose a new family if the value doesn't fit.
2. **Expose it** in `tailwind.config.js` under the matching `theme.extend` key. Use `var(--your-token)` not a raw value.
3. **Use the alias** in components. Do not reach for the CSS variable directly in components.

Document the new token in `info.md` (inventory) and reference it from `AGENTS.md` (rule).

---

## §3. UI/UX Standards

### 3.1 Visual consistency

- **Page chrome**: every page renders inside `PageShell` (header, footer, background). Pages do not add their own background, header, or footer.
- **Section rhythm**: page sections compose full-width `<section>` blocks with internal `max-w-6xl` + responsive horizontal padding (`px-5 sm:px-6`).
- **Section borders**: sections that need separation use `border-t border-white/10` or `border-t border-white/5 bg-card/20`.
- **Cards**: rounded-2xl or rounded-xl; border `border-white/10 bg-card/55` or `bg-card/70`; padding `p-5 sm:p-6`.
- **Buttons**: always via `<Button>` from `src/components/ui/button.tsx`. Default primary action uses `variant="default"`. Secondary uses `variant="outline"`. Destructive uses `variant="destructive"`.
- **Eyebrow text**: `font-mono text-xs font-semibold tracking-eyebrow text-primary` (or `text-mockup-2xs tracking-eyebrow text-muted-foreground` for muted).
- **Heading**: `text-2xl font-semibold tracking-tight text-foreground` or larger.

### 3.2 Interaction patterns

- **Primary action is always one button.** Place it leftmost; secondary action sits to its right.
- **Disabled controls** use `disabled:opacity-50 disabled:cursor-not-allowed`. Never `disabled:cursor-default` or arbitrary opacity.
- **Hover transitions** use `transition-[transform,border-color,background-color,box-shadow] duration-slow ease-out`. Never `transition-all`.
- **Animated reveal**: wrap interactive content in `<Reveal>` from `src/components/content/Reveal.tsx` for scroll-triggered entrance.
- **Copy-to-clipboard**: use `<CopyButton>` from `src/components/ui/CopyButton.tsx`. Pass `text`, `label`, `accessibleLabel`, and `analyticsLabel`.
- **Forms** use Radix primitives (`@radix-ui/react-label`, `@radix-ui/react-toggle`, etc.) wired through `src/components/ui/`.

### 3.3 Accessibility

- One `<h1>` per page. Logical `h2`/`h3` nesting.
- Every interactive element must be reachable by keyboard, with a visible `focus-visible-ring`.
- ARIA only when semantic HTML is not enough. Prefer `<button>`, `<a>`, `<nav>`, `<main>`, `<aside>`.
- Decorative icons use `aria-hidden="true"`. Functional icons have an `accessibleLabel` or visible text alternative.
- Color contrast must pass WCAG AA on the dark theme. Foreground on `--background` is the baseline.
- Reduced-motion users see the final state immediately: every animation declares `motion-reduce:transition-none` or `motion-reduce:hidden` and the final visual must be visible without animation.
- Touch targets are at least `min-h-11` (44px). Add `touch-manipulation` for tap responsiveness.
- `tap-target` utility class can wrap any element that needs the standard 44px minimum.

### 3.4 Responsive design

- Mobile-first. Base classes apply at the smallest viewport. Use `sm:`, `md:`, `lg:`, `xl:` for breakpoints.
- Common breakpoint usage in this project:
  - `sm:` — 640px. Most text-size and padding upgrades happen here.
  - `md:` — 768px. Multi-column layouts begin.
  - `lg:` — 1024px. Sidebars appear, sticky positioning activates.
  - `xl:` — 1280px. Desktop navigation visible.
- Use CSS `dvh` for viewport-relative sizing (`min-h-[100dvh]`) on full-bleed sections. Never `vh`.
- Hide below a breakpoint with `hidden md:flex` (not `md:hidden md:block`).
- Reserve safe area on floating UI with `pb-safe-2` (mobile bottom dock) and `pt-safe-2` (mobile top).

### 3.5 State management

- **Local UI state**: React `useState` for component-internal state.
- **Browser state affecting markup**: `useSyncExternalStore` (cookie consent, viewport detection, persisted UI). See `src/components/consent/CookieConsent.tsx` for the canonical pattern.
- **Cross-component state**: lift to the closest common parent. Do not reach for global state when local works.
- **Async data**: there is no runtime data fetching in this project (static export). All data is content in `content/` or `config/`.
- **Form state**: `react-hook-form` + `zod` via `@hookform/resolvers`. Validation schemas live next to the form.

### 3.6 Feedback mechanisms

- **Copy feedback**: `<CopyButton>` flips to a check icon for 1.5s on success.
- **Loading states**: only for client-side interactions (cookie consent). Use `LoaderCircle` from `lucide-react` with `animate-spin`.
- **Errors**: surface in-line near the input or action. Do not use modals for form errors.
- **Empty states**: use `<EmptyState>` from `src/components/ui/empty-state.tsx` for 404, Coming Soon, and "no content yet" surfaces.
- **Success messages**: short, inline, near the action. Do not redirect to a separate "thank you" route.

---

## §4. Code Relationship Analysis Protocol

**Mandatory before modifying or fixing any code.** Skipping this step is the most common cause of cascading failures.

### 4.1 Identify the change

- What is the user-visible behavior or component you are changing?
- Which file(s) own that behavior?

### 4.2 Trace the import graph

For every file you plan to touch, list:

1. **Direct importers** — who imports this file (use `grep` for the file path).
2. **Direct dependencies** — what does this file import.
3. **Test files** — co-located `.test.tsx` and any feature-level test that exercises it (e.g. `HomePage.test.tsx`, `seo-foundation.test.tsx`).
4. **Generated references** — files that reference symbols by string (`data-analytics-event` in templates, `content-hash` in build output).
5. **Content references** — content modules (`content/*.ts`) that pass strings or objects into the component.
6. **Route references** — if the component is rendered by `src/app/<route>/page.tsx` or `ComingSoonRouteView`.
7. **SEO references** — JSON-LD builders, sitemap entries, robots meta, structured data.
8. **Style references** — `index.css` tokens, Tailwind config utilities, motion CSS.
9. **Documentation references** — `info.md`, `README.md`, `AGENTS.md`, `docs/plans/`, `docs/audit/`.

### 4.3 Trace runtime behavior

For browser-only behavior, identify:

- **`'use client'` boundary** — is the component a Client Component or Server Component? Hydration mismatches happen at boundaries.
- **State sources** — `useState`, `useReducer`, `useSyncExternalStore`, `useContext`. Know where state originates and flows.
- **Effect dependencies** — every `useEffect` and `useSyncExternalStore.subscribe` callback. Cleanup functions. Timers, observers, listeners.
- **Event handlers** — `onClick`, `onChange`, `onSubmit`, `onKeyDown`. Any analytics calls (`data-analytics-event`).
- **Async paths** — even though this project has no runtime data fetching, the cookie consent wiring and progressive enhancements have async-ish flows.

### 4.4 Trace data flow

- **Source of truth** — which file defines the data (see "Sources of truth" below)?
- **Sanitization** — does the data pass through `sanitizeDestination` or similar? Are values trimmed, normalized, defaulted?
- **Validation** — is there a `zod` schema or runtime check?
- **Storage** — does data persist (`localStorage`, cookies)? What key?

### 4.5 Check external integrations

- **Google Analytics**: `src/components/analytics/`, `src/lib/analytics/`. Does the change touch event names? Update `essentialEventNames` AND `data-analytics-event` AND ensure `rendered-events.test.ts` still passes.
- **Cookie consent**: `src/components/consent/`, `src/lib/analytics/consent.ts`. Does the change affect when/how the banner appears? Does it touch `useSyncExternalStore`?
- **Vercel Web Analytics**: `src/components/analytics/Analytics.tsx`. Read-only; no event names involved.
- **Lighthouse CI**: `lighthouserc.cjs`. Only relevant for layout, asset, metadata, or performance changes.
- **Search Console / Bing verification**: only metadata in `src/app/layout.tsx`.

### 4.6 Confirm dependencies across layers

Walk up and down the dependency stack:

```
src/index.css (tokens)
  ↓
tailwind.config.js (aliases)
  ↓
src/components/ui/ (primitives)
  ↓
src/components/{site,content,seo,analytics,consent}/ (shared)
  ↓
src/features/<feature>/components/ (feature-local)
  ↓
src/features/<feature>/<Feature>Page.tsx (page entry)
  ↓
src/app/<route>/page.tsx (route)
  ↓
src/app/sitemap.ts, robots.ts (discoverability)
```

A change at any layer can cascade. Trace the full stack before editing.

### 4.7 Make the change in the right place

After tracing:

- **Fix the primitive** if the bug is in shared infrastructure.
- **Fix the local consumer** if the bug is in feature-specific usage.
- **Do not duplicate** — if the same logic appears in 2+ places, extract to a shared primitive and update both consumers.

### 4.8 Verify the change

1. Run `npm run check`. All 5 stages must pass.
2. Read the changed code, not the plan file. Confirm the implementation matches what you intended.
3. Inspect `out/` if the change affects SEO, layout, or metadata.
4. Confirm no orphaned files remain (old paths still importing from old locations).

---

## Sources of truth

Do not duplicate paths, URLs, commands, labels, section IDs, metadata, or reusable arrays anywhere else. Derive table-of-contents links, breadcrumbs, schema, and navigation from these authoritative files.

| Concern                                                                                                    | File                                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Routes, navigation, route status, fallback destinations                                                    | `src/config/routes.ts`                                                                                           |
| Site URL, identity, author, publisher, invitation links, external links, editorial dates, install commands | `src/config/site.ts`                                                                                             |
| Unfinished experience copy                                                                                 | `src/features/coming-soon/content.ts` + `src/config/routes.ts`                                                   |
| Beginner content and metadata                                                                              | `src/features/beginner/content`                                                                                  |
| Beginner ordering                                                                                          | `beginnerStages` from the Beginner content boundary                                                              |
| Home page copy                                                                                             | `src/features/home/content/*`                                                                                    |
| Page metadata construction                                                                                 | `src/lib/seo/metadata.ts`                                                                                        |
| Structured-data entities                                                                                   | `src/lib/seo/schema.ts`, `src/lib/seo/comingSoon.ts`, plus feature `seo.ts` builders                             |
| Analytics event allowlist and sanitization                                                                 | `src/lib/analytics/events.ts`                                                                                    |
| Cookie consent state and storage contract                                                                  | `src/lib/analytics/consent.ts`                                                                                   |
| Deferred GA4 loader                                                                                        | `src/lib/analytics/deferredScript.ts`                                                                            |
| Browser interaction enhancement                                                                            | `src/lib/browser/progressiveEnhancements.ts`, `dropdownNavigation.ts`, `mobileNavigation.ts`, `guideProgress.ts` |
| Global theme, tokens, typography                                                                           | `src/index.css`, `src/styles/`, `tailwind.config.js`                                                             |
| Current state inventories (tokens, routes, commands, env vars, allowlist)                                  | `info.md`                                                                                                        |

---

## Routing and rendering

- All public pages must be compatible with `output: 'export'` and static generation.
- Do not introduce runtime API routes, request-time middleware, server-dependent Server Actions, or dynamic image optimization while static export remains enabled.
- Next Image must remain compatible with `images.unoptimized: true`.
- Browser access belongs in effects, event handlers, or hydration-safe external-store snapshots. Never in render or `useState` initializers.
- For browser state that affects React markup (cookie consent, viewport, persisted UI), use `useSyncExternalStore` so the server snapshot is deterministic. See `src/components/consent/CookieConsent.tsx` for the canonical pattern. Never call `setState` synchronously inside a `useEffect` body.
- Use CSS `prefers-reduced-motion` for decorative motion.
- Published pages must be indexable and included intentionally in `src/app/sitemap.ts`.
- Unfinished routes render via `ComingSoonRouteView`, stay at their requested URL, and carry `noindex, follow`.
- Unknown routes reach `src/app/not-found.tsx`. Do not convert them to Coming Soon pages.
- Reuse `PageShell`; do not remount the global background for route-specific content.

## Cookie consent

- Use `CookieConsent` as the only consent UI.
- Read consent state via `useSyncExternalStore` (server snapshot always hidden; client snapshot shown only after hydration when the user has not decided and DNT is off).
- Never use `typeof window` branches inside React render or `useState` initializers to decide visibility.

**Mandatory:** before touching `CookieConsent.tsx`, `consent.ts`, or `deferredScript.ts`, read [`docs/ga4-compliance.md`](./docs/ga4-compliance.md). The document is the contract for consent state shape, region defaults, expiry (395 days), the revoke flow, and the storage payload `{ state, expiresAt }`. Do not break the contract.

For storage key, event names, and gtag wiring, see `info.md` and `src/components/consent/CookieConsent.tsx`.

## Analytics

- The allowlist in `src/lib/analytics/events.ts` (`essentialEventNames`) is the only source of truth for event names.
- New event names must be added to the allowlist **and** emitted as `data-analytics-event` from a component. The `rendered-events.test.ts` guard fails the build if any emitted value is not in the allowlist.
- Destinations are sanitized through `sanitizeDestination` (origin + pathname only, query and fragment stripped). Never log prompts, form values, email addresses, or free-form text.
- Reading milestones fire at 25 / 50 / 75 / 100 percent, deduped per page view.
- Stage tracking is owned by the Beginner feature and feeds `stage_complete` events.
- Every new page MUST emit at least one `data-analytics-event` on its primary call-to-action, or explicitly mark itself "untracked" in the page metadata comment.
- For SPA route changes (Next.js client-side navigation), the `PageViewTracker` mounted in `src/app/layout.tsx` automatically emits `page_view` for the new path. Do not add manual `trackPageView` calls inside page components unless bypassing the layout.

**Mandatory:** every GA4 wiring change must keep [`docs/ga4-compliance.md`](./docs/ga4-compliance.md) in sync. The document lists the required privacy parameters (`url_passthrough`, `ads_data_redaction`, `wait_for_update`), the EEA+UK+CH region override list, and the consent-expiry rule. Any drift between the implementation and the document fails code review.

For the current allowlist and AI referral domains, see `info.md`.

## Empty state

- Use `EmptyState` from `src/components/ui/empty-state.tsx` for 404, Coming Soon, and other "no content yet" surfaces.
- Reuse it rather than building ad-hoc banners.

## Clean code

- Maintained source files stay below 500 physical lines. Documentation, plans, generated files, and lockfiles are exempt.
- Separate visitor content, business rules, and data transformation from UI rendering.
- Use explicit names and named exports.
- Use `@/` imports across boundaries and relative imports within one feature.
- Group imports consistently: framework, external packages, shared modules, local modules.
- Clean up timers, observers, and listeners.
- Preserve semantic HTML, keyboard access, focus visibility, mobile behavior, contrast, and reduced-motion support.
- The first client render must be structurally identical to generated HTML. Add a hydration regression test when changing SSR-rendered client components.

## SEO and analytics standards

- One clear H1, logical H2/H3 nesting, direct answers near question headings, descriptive internal links.
- Every indexable page needs unique title, description, canonical, robots policy, social metadata, visible author/review information, and relevant JSON-LD.
- Cite official primary sources for product behavior, commands, benchmarks, and technical facts.
- Plain language. Never translate or alter commands, file paths, API names, env var names, or code symbols.
- Coming Soon pages must not appear in the sitemap and must carry `noindex, follow`.
- Update `docs/content-freshness-log.md` after material editorial reviews.

## Tests and release gates

- TDD for behavior changes and bug fixes: write a failing test, implement, rerun.
- Tests stay beside the behavior they protect.
- `npm run check` must pass before delivery. It runs `typecheck`, `lint`, `test`, `build`, and `schema:check` in order.
- Run `npm run lighthouse` for layout, asset, metadata, or performance changes.
- Inspect generated files in `out/` when changing canonical URLs, robots, sitemap, llms.txt, verification tags, GA configuration, or JSON-LD.
- This repository reads only the env vars documented in `info.md`. Supabase and Google OAuth credentials belong to the starter repository.
- Treat every env var as optional. Missing values disable that integration without breaking static generation.

## Safe removal

Before deletion, search imports, exports, routes, tests, styles, documentation, dynamic loading, and build ownership. Remove obsolete code only after confirming no runtime or generation path uses it, then run the relevant gates.

## Packages and documentation

- npm and `package-lock.json` are authoritative. Do not add another lockfile or hand-edit the lockfile.
- Update `README.md` when setup, commands, routes, architecture, deployment, env vars, or maintenance responsibilities change.
- Record major implementation designs under `docs/plans/<date>-<slug>.md`. Implementation audits live under `docs/audit/`.
- Active operating instructions stay in `README.md` and focused docs.
