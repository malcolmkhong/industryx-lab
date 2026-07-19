# Project Rules for Coding Agents

## Purpose

This repository is the IndustryX Lab Kimi Beginner Guide Hub: a statically generated Next.js learning site for people new to Kimi Code and vibe coding. Preserve the established visual identity and help beginners move from explanation to a working project safely.

These rules apply repository-wide unless a deeper `AGENTS.md` overrides them.

## Before changing code

1. Read `README.md`, `package.json`, `src/app/layout.tsx`, and the relevant feature.
2. Trace imports, callers, tests, route ownership, content ownership, and generated output before moving or deleting anything.
3. Reuse existing components, hooks, utilities, types, content, configuration, and patterns.
4. Preserve unrelated work. This workspace may not have Git recovery history.
5. Never expose secrets or include sensitive visitor data in analytics.

## Architecture boundaries

- `src/app`: framework route entries, layouts, metadata routes, and 404. Keep page files focused on composition and metadata.
- `src/config`: shared routes, navigation, external URLs, site identity, installation commands, and editorial configuration.
- `src/features/<feature>`: page-specific UI, content, hooks, utilities, schema builders, and tests.
- `src/components/site`: persistent site shell, header, footer, and navigation.
- `src/components/content`: reusable long-form layouts and in-page navigation.
- `src/components/seo`: reusable structured-data and editorial presentation.
- `src/components/analytics`: optional integration boundary and browser event tracker.
- `src/components/ui`: visual primitives only; no feature content or business rules.
- `src/hooks`: hooks shared by multiple features.
- `src/lib`: framework adapters and reusable pure logic grouped by domain.
- `src/test`: global test setup only.
- `public`: assets that must retain a stable root URL, including the social preview image.
- `scripts`: release-time validation and Lighthouse setup; no visitor-facing business logic.
- `.github/workflows`: CI orchestration only; commands must reuse `package.json` scripts.

Shared modules must not import feature modules. Features may import shared modules and configuration. Keep client boundaries narrow; do not add `'use client'` to route files when a feature component can own browser interaction.

## Sources of truth

- Routes, navigation, route status, fallback destinations: `src/config/routes.ts`.
- Site URL, identity, author, publisher, invitation links, external links, editorial dates: `src/config/site.ts`.
- Unfinished experience copy: `src/features/coming-soon/content.ts` plus route configuration.
- Beginner content and metadata: `src/features/beginner/content`.
- Beginner ordering: `beginnerStages` from the Beginner content boundary.
- Metadata construction: `src/lib/seo/metadata.ts`.
- Structured-data entities: `src/lib/seo/schema.ts` plus feature schema builders.
- Analytics event names and sanitization: `src/lib/analytics/events.ts`.
- Browser motion preference: `src/hooks/usePrefersReducedMotion.ts`.
- Global theme and typography: `src/index.css` and `tailwind.config.js`.

Do not duplicate paths, URLs, commands, labels, section IDs, metadata, or reusable arrays. Derive table-of-contents links, breadcrumbs, schema, and navigation from their authoritative data.

## Routing and rendering

- All public pages must be compatible with `output: 'export'` and static generation.
- Do not introduce runtime API routes, request-time middleware, server-dependent Server Actions, or dynamic image optimization while static export remains enabled.
- Next Image must remain compatible with `images.unoptimized: true`, or the hosting architecture must be deliberately changed first.
- Do not read `window` or `document` during server/static rendering. Browser access belongs in effects, event handlers, or hydration-safe external-store snapshots.
- Never use a `typeof window` branch, browser media query, timestamp, random value, or locale-dependent value to produce different initial server and client markup.
- Shared browser preferences must follow `usePrefersReducedMotion`: use `useSyncExternalStore` with a deterministic server snapshot, then update after hydration.
- Published pages must be indexable and included intentionally in `src/app/sitemap.ts`.
- Unfinished routes must render the reusable Coming Soon page, remain at their requested URL, and be `noindex`.
- Unknown routes must reach `src/app/not-found.tsx`; do not convert them to Coming Soon pages.
- Reuse `PageShell`; do not remount the global background for route-specific content.

## Clean code standards

- Keep maintained source-code files below 300 physical lines. Documentation, plans, generated files, and lockfiles are exempt.
- Separate visitor content, business rules, and data transformation from UI rendering.
- Use explicit names and named exports for reusable modules.
- Use `@/` imports across boundaries and relative imports within one feature.
- Group imports consistently: framework, external packages, shared modules, local modules.
- Handle failures intentionally and clean up timers, observers, and listeners.
- Preserve semantic HTML, keyboard access, focus visibility, mobile behavior, contrast, and reduced-motion support.
- Keep the first client render structurally identical to generated HTML. Add a hydration regression test when changing SSR-rendered client components.

## Search, answer, and analytics standards

- Use one clear H1, logical H2/H3 nesting, direct answers near question headings, and descriptive internal links.
- Every indexable page needs a unique title, description, canonical, robots policy, social metadata, visible author/review information, and relevant JSON-LD.
- Cite official primary sources for changing product behavior, commands, benchmarks, and technical facts.
- Use plain language. Never translate or alter commands, file paths, API names, environment variable names, or code symbols.
- Coming Soon pages must not appear in the sitemap and must carry `noindex, follow`.
- Do not create analytics events outside the allowlist. Destinations must exclude queries and fragments; never send PII, prompts, form values, or free-form text.
- Update `docs/content-freshness-log.md` after material editorial reviews.

## Tests and release gates

- Use TDD for behavior changes and bug fixes: make the relevant test fail, implement, then rerun it.
- Keep tests beside the behavior they protect and prefer user-observable assertions.
- `npm run check` must pass before delivery: types, lint, tests, build, and generated JSON-LD validation.
- Run `npm run lighthouse` for changes that affect layout, assets, metadata, or runtime performance.
- Inspect generated files in `out/` when changing canonical URLs, robots, sitemap, llms.txt, verification tags, GA configuration, or JSON-LD.
- Keep the hub and starter environment boundaries separate. This repository reads only the three variables documented in `.env.example`; Supabase and Google OAuth credentials belong to the starter repository.
- Treat every environment variable as optional in this hub. Missing analytics or ownership-verification values must disable that integration without breaking static generation.

## Safe removal

Before deletion, search imports, exports, routes, tests, styles, documentation, dynamic loading, and build ownership. Remove obsolete code only after confirming no runtime or generation path uses it, then run the relevant gates.

## Packages and documentation

- npm and `package-lock.json` are authoritative; do not add another lockfile or hand-edit the lockfile.
- Update `README.md` when setup, commands, routes, architecture, deployment, environment variables, or maintenance responsibilities change.
- Record major implementation designs under `docs/plans`; keep active operating instructions in README and focused docs.
