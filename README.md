# IndustryX Lab — Kimi Beginner Guide Hub

IndustryX Lab's independent learning hub for people new to Kimi Code and vibe coding. The site preserves the original Kimi-themed landing experience and adds an eight-stage guide for building a secure task manager from a Next.js and Supabase starter.

The Stage 1 starter lives separately at [malcolmkhong/supabase-next-vercel-starter](https://github.com/malcolmkhong/supabase-next-vercel-starter).

## Published experiences

| Route                         | Status                                      | Search status     |
| ----------------------------- | ------------------------------------------- | ----------------- |
| `/`                           | Kimi Code overview and beginner entry point | Indexable         |
| `/build-project/beginner`     | Complete eight-stage beginner guide         | Indexable         |
| `/build-project/intermediate` | Intermediate Coming Soon workspace          | `noindex, follow` |
| `/build-project/advanced`     | Advanced Coming Soon workspace              | `noindex, follow` |
| `/build-project/expert`       | Expert Coming Soon workspace                | `noindex, follow` |
| `/explore-agent/kimi`         | Kimi Coming Soon workspace                  | `noindex, follow` |
| `/explore-agent/minimax`      | MiniMax Coming Soon workspace               | `noindex, follow` |
| `/explore-agent/codex`        | Codex Coming Soon workspace                 | `noindex, follow` |
| `/github/skills`              | Skills Coming Soon workspace                | `noindex, follow` |
| `/github/mcp`                 | MCP Coming Soon workspace                   | `noindex, follow` |

The sitemap includes only completed pages. Unfinished routes preserve their URLs, use the shared header and footer, provide valid fallback navigation, and do not enter search indexes. Unknown routes reach the dedicated 404 page (also `noindex`).

## Features

- Fully static Next.js App Router output for fast, crawlable HTML.
- Existing dark theme, typography, images, Kimi desktop simulation, and CLI animation.
- Keyboard-accessible desktop navigation, mobile drawer, and responsive layouts.
- Beginner guide with generated `Jump to` navigation, active headings, progress state, commands, prompts, checks, troubleshooting, and official references.
- Page metadata with canonical, Open Graph, Twitter, author, publisher, and robots rules.
- JSON-LD graphs connecting IndustryX, Malcolm, the website, each page, and relevant page entities.
- `robots.txt`, `sitemap.xml`, `llms.txt`, a real 404 page, Search Console and Bing verification support, schema checks, and Lighthouse CI.
- Vercel Web Analytics for privacy-conscious page-view measurement, plus optional constrained GA4 events when `NEXT_PUBLIC_GA_ID` is configured.
- Token-driven design system for color, surface, outline, motion, tracking, font size, z-index, and disabled state. No arbitrary Tailwind values.
- Reusable `EmptyState` primitive for 404 and Coming Soon surfaces.
- Hydration-safe cookie consent with consent-mode-aware GA4 wiring.
- WebP assets and visible author and review information.
- CSS-driven reveal, CLI, desktop, and scroll animations with reduced-motion fallbacks.

## Technology

- Next.js 16 App Router with static export
- React 19 and TypeScript 5.9
- Tailwind CSS 3.4 with a custom token layer
- Vitest, React Testing Library, and jsdom
- ESLint 9, Lighthouse CI, and Ajv

## Requirements and setup

- Node.js 20.19 or newer
- npm 10 or newer

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` only when optional integrations are needed:

```dotenv
NEXT_PUBLIC_GA_ID=
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
```

Blank or missing values are safe. Never commit analytics credentials, verification tokens, API keys, OAuth secrets, or Supabase service-role keys.

This content hub has no runtime database or user authentication. Supabase and Google Sign-In are taught in the Beginner guide and implemented in the separate starter repository.

## Commands

| Command                | Purpose                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Start the Next.js development server.                                  |
| `npm run typecheck`    | Run strict TypeScript checks.                                          |
| `npm run lint`         | Run ESLint.                                                            |
| `npm run test`         | Run the Vitest suite.                                                  |
| `npm run build`        | Generate the static site in `out/`.                                    |
| `npm run start`        | Serve the generated `out/` directory on port 3000.                     |
| `npm run preview`      | Serve `out/` on port 3000 (alias for `start`).                         |
| `npm run schema:check` | Validate JSON-LD in generated HTML.                                    |
| `npm run lighthouse`   | Run local Lighthouse CI against Home and Beginner.                     |
| `npm run check`        | Run `typecheck`, `lint`, `test`, `build`, and `schema:check` in order. |

## Architecture

```text
src/
├── app/                      Next.js layouts, route entries, metadata routes,
│   │                         sitemap, robots, llms.txt, 404, and _components/
│   │                         (ComingSoonRouteView, NotFoundTracker)
├── components/
│   ├── analytics/            Analytics + DeferredGoogleAnalytics
│   ├── consent/              CookieConsent (uses useSyncExternalStore)
│   ├── content/              GuideLayout, TableOfContents, MobileContentsBar,
│   │                         ReadingProgress, SectionHeading, Reveal
│   ├── seo/                  JsonLd, EditorialByline
│   ├── site/                 PageShell, SiteHeader, Nav, DesktopNav,
│   │                         MobileMenuDropdown, Footer, MoonMark,
│   │                         ProgressiveEnhancements
│   └── ui/                   Button, Input, Toggle, EmptyState, CopyButton,
│                             MenuLink, TocLink, linkStyles, ...
├── config/                   routes, navigation, site identity, URLs, commands
├── features/
│   ├── beginner/             Static guide UI, content contracts, stages,
│   │                         schema, beginner-specific CSS
│   │                         (components split into sections/ + stages/)
│   ├── coming-soon/          Shared unfinished-route experience and simulation
│   └── home/                 Home sections, static animations, schema
│                             (components split into sections/, animations/, cta/)
├── hooks/                    useBuildLoop, useDesktopAnimation, use-mobile
├── lib/
│   ├── analytics/            Event allowlist, sanitization, AI referral,
│   │                         deferred GA loader, consent state, reading
│   │                         milestones, stage tracking, rendered-events test
│   ├── browser/              Progressive enhancements, dropdown navigation,
│   │                         mobile navigation, guide progress
│   ├── seo/                  Next metadata, schema builders, coming-soon meta
│   └── utils.ts              Class-name utilities
├── styles/
│   ├── components/           progressive.css, toc.css
│   └── motion/               home-motion.css
├── test/                     Global test setup
└── index.css                 Theme tokens, utilities, animations
public/                       Root-served static assets such as social images
scripts/                      Schema validation and Lighthouse browser setup
.github/workflows/            Automated quality and Lighthouse checks
```

Next route files stay small: they select content and configuration, export static metadata, add JSON-LD, and render a feature page. Visitor-facing guide content belongs in `src/features/beginner/content`; home copy lives in `src/features/home/content/*`; navigation and unfinished-route definitions live in `src/config/routes.ts`.

## Rendering model

- App Router page files are Server Components unless browser interaction requires a client feature boundary.
- `output: 'export'` produces static HTML and client assets; this hub does not depend on a production Node.js server.
- The shared `PageShell` owns the persistent header, footer, background, and route content slot.
- Home, Beginner, navigation, guide progress, copy controls, and the table of contents remain server-rendered. One small post-hydration client boundary installs their browser behavior without hydrating those sections.
- The Coming Soon simulation keeps its focused client boundary because its repeated streaming sequence requires timed state.
- Motion preferences use CSS `prefers-reduced-motion`, keeping generated HTML and initial presentation deterministic.
- For browser state that affects React markup (cookie consent visibility, viewport detection, persisted UI state), use `useSyncExternalStore` so the server snapshot is deterministic and the client snapshot is read post-hydration.
- Do not branch initial rendered markup with `typeof window`, `Date.now()`, `Math.random()`, or locale-dependent values.

## Design tokens

Every visual primitive is token-driven. The current token families live in `src/index.css` and `tailwind.config.js`:

- Surface and outline: `--surface-overlay`, `--surface-overlay-soft`, `--surface-overlay-strong`, `--workspace-surface`, `--workspace-surface-strong`, `--outline-alpha`, `--outline-alpha-strong`.
- Neon palette: `--neon-blue`, `--neon-violet`, `--neon-violet-soft`, `--neon-pink`.
- Motion durations: `--motion-fast` (150 ms), `--motion-base` (200 ms), `--motion-slow` (300 ms), `--motion-slower` (500 ms), `--motion-press`, `--motion-pop`. Tailwind aliases: `duration-fast/base/slow/slower/press/pop`.
- Motion easings: `--motion-ease-out`, `--motion-ease-in-out`.
- Tracking: `--tracking-eyebrow-tight` (0.12 em), `--tracking-eyebrow-default` (0.14 em), `--tracking-eyebrow` (0.16 em), `--tracking-eyebrow-loose` (0.18 em), `--tracking-display` (-0.025 em).
- Mockup font sizes: `text-mockup-2xs` (10 px), `text-mockup-xs` (10.5 px), `text-mockup-sm` (11 px), `text-mockup-md` (11.5 px), `text-mockup-lg` (12 px), `text-mockup-xl` (12.5 px).
- Z-index scale: `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-modal`, `--z-popover`, `--z-toast`, `--z-banner`, `--z-nav`, `--z-floating`, `--z-skip-link`.

Use these tokens (and the matching Tailwind aliases) instead of arbitrary `text-[Npx]`, `tracking-[N.NNem]`, `z-[N]`, `duration-N`, `disabled:opacity-NN`, or `border-white/N` (where N is not in `{5, 10, 15, 20}`).

## Search and measurement

- Vercel Web Analytics is integrated through `@vercel/analytics`. Enable Web Analytics for the `industryx-lab` project in the Vercel dashboard after the first deployment; it requires no environment variable.
- `NEXT_PUBLIC_GA_ID` enables GA4. Without it, no GA script or tracker is rendered.
- The GA4 event allowlist (the only names emitted to the tracker) is defined in `src/lib/analytics/events.ts`: `cta_click`, `invitation_click`, `outbound_link`, `ai_referral`, `stage_complete`, `reading_milestone`, `404_view`, `page_view`. Destinations are sanitized to `origin + pathname` (no query or fragment). No prompts, form values, account details, or free-form user data are collected. AI referral allowlist excludes `kimi.com` to avoid self-referral.
- Reading milestones fire at 25 / 50 / 75 / 100 percent and are deduped per page view.
- `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` add optional ownership metadata.
- The canonical production origin is `https://industryx-lab.vercel.app`.
- Complete setup, event definitions, submission steps, and reporting cadence are in [docs/measurement.md](docs/measurement.md).

These are the only environment variables read by this repository. Supabase credentials, Google OAuth client settings, and authentication callback configuration belong to the separate starter application.

## Content maintenance

- Review external citations monthly.
- Review the full [content inventory](docs/content-inventory.md) quarterly.
- Record material checks and changes in the [content freshness log](docs/content-freshness-log.md).
- Update the central editorial date only when public content materially changes.

## Development workflow

1. Read `AGENTS.md` and the relevant feature source.
2. Trace the existing source of truth and callers before moving or deleting code.
3. Add a failing test for behavior changes or bug fixes.
4. Preserve existing content and UI unless the request explicitly changes them.
5. Keep maintained source-code files below 500 physical lines and separate content and business logic from rendering. Documentation, plans, generated files, and lockfiles are exempt.
6. Reuse existing primitives (`Button`, `EmptyState`, `CopyButton`, `CookieConsent`, design tokens) instead of building parallel implementations.
7. Run `npm run check`; run `npm run lighthouse` for layout, metadata, or performance changes.

The GitHub quality workflow runs the same validation sequence on pull requests and pushes to `main`.

## Deployment

`npm run build` writes the deployable static site to `out/`. Vercel reads the Next.js configuration and serves the exported routes with clean URLs. Configure optional environment variables in the Vercel project, deploy, then validate the production sitemap, ownership tags, structured data, and search status.

Because this hub uses static export, do not add runtime API routes, Server Actions that require a server, request-time middleware, or built-in dynamic image optimization without changing the deployment architecture. Images are exported with `images.unoptimized: true`.

The canonical source repository is [malcolmkhong/industryx-lab](https://github.com/malcolmkhong/industryx-lab), with production work maintained on `main`.

## Independence notice

This is an independent educational resource and is not affiliated with, sponsored by, or endorsed by Moonshot AI. Product names and marks belong to their respective owners.
