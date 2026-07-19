# IndustryX Lab — Kimi Beginner Guide Hub

IndustryX Lab's independent learning hub for people new to Kimi Code and vibe coding. The site preserves the original Kimi-themed landing experience and adds an eight-stage guide for building a secure task manager from a Next.js and Supabase starter.

The Stage 1 starter lives separately at [malcolmkhong/supabase-next-vercel-starter](https://github.com/malcolmkhong/supabase-next-vercel-starter).

## Published experiences

| Route | Status | Search status |
| --- | --- | --- |
| `/` | Kimi Code overview and beginner entry point | Indexable |
| `/build-project/beginner` | Complete eight-stage beginner guide | Indexable |
| `/build-project/intermediate` | Intermediate Coming Soon workspace | `noindex` |
| `/build-project/advanced` | Advanced Coming Soon workspace | `noindex` |
| `/build-project/expert` | Expert Coming Soon workspace | `noindex` |
| `/explore-agent/kimi` | Kimi Coming Soon workspace | `noindex` |
| `/explore-agent/minimax` | MiniMax Coming Soon workspace | `noindex` |
| `/explore-agent/codex` | Codex Coming Soon workspace | `noindex` |
| `/github/skills` | Skills Coming Soon workspace | `noindex` |
| `/github/mcp` | MCP Coming Soon workspace | `noindex` |

The sitemap includes only completed pages. Unfinished routes preserve their URLs, use the shared header/footer, provide valid fallback navigation, and do not enter search indexes.

## Features

- Fully static Next.js App Router output for fast, crawlable HTML.
- Existing dark theme, typography, images, Kimi desktop simulation, and CLI animation.
- Keyboard-accessible desktop navigation, mobile drawer, and responsive layouts.
- Beginner guide with generated `Jump to` navigation, active headings, progress state, commands, prompts, checks, troubleshooting, and official references.
- Page metadata with canonical, Open Graph, Twitter, author, publisher, and robots rules.
- JSON-LD graphs connecting IndustryX, Malcolm, the website, each page, and relevant page entities.
- `robots.txt`, `sitemap.xml`, `llms.txt`, a real 404 page, Search Console/Bing verification support, schema checks, and Lighthouse CI.
- Optional, constrained GA4 events. Analytics is absent when `NEXT_PUBLIC_GA_ID` is not configured.
- WebP assets and visible author/review information.
- Hydration-safe motion preferences shared by reveal and CLI animations.

## Technology

- Next.js 16 App Router with static export
- React 19 and TypeScript 5.9
- Tailwind CSS 3.4 and shadcn/ui primitives
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

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run typecheck` | Run strict TypeScript checks. |
| `npm run lint` | Run ESLint. |
| `npm run test` | Run the Vitest suite. |
| `npm run build` | Generate the static site in `out/`. |
| `npm run start` | Serve the generated `out/` directory on port 3000. |
| `npm run preview` | Serve `out/` on port 3000. |
| `npm run schema:check` | Validate JSON-LD in generated HTML. |
| `npm run lighthouse` | Run local Lighthouse CI against Home and Beginner. |
| `npm run check` | Run types, lint, tests, build, and schema validation. |

## Architecture

```text
src/
├── app/                 Next.js layouts, route entries, metadata routes, and 404
├── components/
│   ├── analytics/       Optional GA rendering and click/referral tracking
│   ├── content/         Shared long-form layout and table of contents
│   ├── seo/             JSON-LD and visible editorial components
│   ├── site/            Persistent shell, header, navigation, and footer
│   └── ui/              Reusable shadcn/ui primitives
├── config/              Routes, navigation, site identity, URLs, and commands
├── features/
│   ├── beginner/        Guide UI, content contracts, stages, hooks, and schema
│   ├── coming-soon/     Shared unfinished-route experience and simulation
│   └── home/            Home sections, animation hooks, and schema
├── hooks/               Cross-feature hooks
├── lib/
│   ├── analytics/       Event allowlist, destination sanitizing, AI referral logic
│   └── seo/             Next metadata and structured-data builders
├── test/                Global test setup
└── index.css            Theme tokens, utilities, and animations
public/                   Root-served static assets such as social images
scripts/                  Schema validation and Lighthouse browser setup
.github/workflows/        Automated quality and Lighthouse checks
```

Next route files stay small: they select content/configuration, export static metadata, add JSON-LD, and render a feature page. Visitor-facing guide content belongs in `src/features/beginner/content`, while navigation and unfinished-route definitions belong in `src/config/routes.ts`.

## Rendering model

- App Router page files are Server Components unless browser interaction requires a client feature boundary.
- `output: 'export'` produces static HTML and client assets; this hub does not depend on a production Node.js server.
- The shared `PageShell` owns the persistent header, footer, background, and route content slot.
- Interactive feature components own timers, observers, progress state, menus, and animations.
- Browser preferences must use a stable server snapshot. `usePrefersReducedMotion` uses `useSyncExternalStore` so server HTML and the first client render remain identical.
- Do not branch initial rendered markup with `typeof window`, `Date.now()`, `Math.random()`, or locale-dependent values.

## Search and measurement

- `NEXT_PUBLIC_GA_ID` enables GA4. Without it, no GA script or tracker is rendered.
- Only CTA clicks, invitation clicks, outbound links, and normalized AI referral sources are permitted. Query strings, fragments, prompts, account details, and free-form user data are not collected.
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
5. Keep maintained source-code files below 300 lines and separate content/business logic from rendering. Documentation is exempt from the line limit.
6. Run `npm run check`; run `npm run lighthouse` for layout, metadata, or performance changes.

The GitHub quality workflow runs the same validation sequence on pull requests and pushes to `main`.

## Deployment

`npm run build` writes the deployable static site to `out/`. Vercel reads the Next.js configuration and serves the exported routes with clean URLs. Configure optional environment variables in the Vercel project, deploy, then validate the production sitemap, ownership tags, structured data, and search status.

Because this hub uses static export, do not add runtime API routes, Server Actions that require a server, request-time middleware, or built-in dynamic image optimization without changing the deployment architecture. Images are exported with `images.unoptimized: true`.

The canonical source repository is [malcolmkhong/industryx-lab](https://github.com/malcolmkhong/industryx-lab), with production work maintained on `main`.

## Independence notice

This is an independent educational resource and is not affiliated with, sponsored by, or endorsed by Moonshot AI. Product names and marks belong to their respective owners.
