# Next.js SEO, GEO, and AEO Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the existing Kimi beginner guide hub to statically generated Next.js App Router pages and meet the repository's SEO, GEO, AEO, analytics, schema, performance, and maintenance requirements.

**Architecture:** Keep feature content and presentational components under `src/features`, but replace the Vite/React Router entry layer with Next.js App Router server pages. Central site, route, author, metadata, and schema configuration will drive static pages, navigation, sitemap, robots, `llms.txt`, JSON-LD, and analytics labels. Interactive components remain client components and are rendered inside server-generated page HTML.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 3, Vitest, React Testing Library, GA4, Lighthouse CI, Schema.org JSON-LD.

---

### Task 1: Define the SEO and route contracts

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/config/routes.ts`
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/schema.ts`
- Test: `src/lib/seo/seo.test.ts`

1. Write failing tests for production URLs, metadata limits, noindex routes, complete graph types, authorship, and safe canonical construction.
2. Run the focused test and confirm failures describe missing contracts.
3. Add Malcolm, IndustryX, production origin, publication dates, social image, page metadata, and reusable graph builders.
4. Run the focused test and confirm it passes.

### Task 2: Replace Vite routing with Next.js App Router

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/build-project/beginner/page.tsx`
- Create: static route pages for all Coming Soon routes
- Create: `src/app/not-found.tsx`
- Modify: `src/components/site/PageShell.tsx`
- Modify: `src/components/site/SiteHeader.tsx`
- Modify: `src/components/site/Nav.tsx`
- Remove after verification: `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts`, `vercel.json`

1. Write route rendering tests for Home, Beginner, Coming Soon, and Not Found content.
2. Confirm the tests fail before Next route modules exist.
3. Add the App Router shell and convert React Router links/location state to Next equivalents.
4. Retain the current feature UI and mark only interactive boundaries with `use client`.
5. Confirm route tests pass.

### Task 3: Generate crawler and answer-engine discovery resources

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/llms.txt/route.ts`
- Test: `src/app/discovery.test.ts`

1. Write failing tests for canonical sitemap entries, excluded unfinished routes, live-retrieval crawler access, documented training-bot policy, and priority links in `llms.txt`.
2. Add metadata routes driven by central site and route configuration.
3. Confirm discovery tests pass and generated build artifacts exist.

### Task 4: Render complete metadata and structured data statically

**Files:**
- Modify: all route `page.tsx` files
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/components/seo/EditorialByline.tsx`
- Remove after verification: `src/hooks/usePageMetadata.ts`, feature-local obsolete SEO builders

1. Add failing tests for server metadata, Open Graph/Twitter images, canonical URLs, Article dates, Person author, Organization, WebSite, WebPage, breadcrumbs, HowTo, and noindex Coming Soon routes.
2. Implement Next metadata exports and one visible JSON-LD `@graph` per page.
3. Add a visible Malcolm/IndustryX byline with publication and review dates.
4. Run focused metadata/schema tests.

### Task 5: Improve factual and answer-oriented content

**Files:**
- Modify: `src/features/home/components/Stats.tsx`
- Remove: `src/features/home/components/Quote.tsx`
- Modify: `src/features/home/HomePage.tsx`
- Modify: `src/features/beginner/content/stages.ts`
- Modify: `src/features/beginner/BeginnerPage.tsx`

1. Write failing tests requiring official source URLs, visible source years/review dates, removal of the testimonial, 40-60 word answer capsules, and visible editorial dates.
2. Keep only current statistics supported by official Kimi documentation.
3. Expand each Beginner answer without padding or jargon.
4. Add internal next-step links and retain all existing guide instructions.
5. Run content tests.

### Task 6: Optimize images

**Files:**
- Convert: `src/assets/beginner-build-journey.png` to `.webp`
- Modify image imports/usages in Home and Beginner features

1. Add an asset test that rejects the old PNG and requires the optimized WebP.
2. Convert the asset without changing its visual content.
3. Use `next/image` with intrinsic dimensions and appropriate priority/lazy behavior.
4. Verify build output and image sizes.

### Task 7: Add privacy-limited GA4 measurement

**Files:**
- Create: `src/components/analytics/Analytics.tsx`
- Create: `src/components/analytics/AnalyticsLink.tsx`
- Create: `src/lib/analytics/events.ts`
- Modify relevant invitation, CTA, and outbound links
- Test: `src/lib/analytics/events.test.ts`

1. Write failing tests proving analytics is disabled without `NEXT_PUBLIC_GA_ID` and accepts only predefined event names and non-sensitive fields.
2. Load GA4 only when the public environment variable exists.
3. Track CTA, invitation, outbound-link, and AI-referral events without user identifiers or free-form content.
4. Confirm tests pass.

### Task 8: Add release gates and operational documentation

**Files:**
- Modify: `package.json`
- Create: `lighthouserc.json`
- Create: `scripts/validate-schema.mjs`
- Create: `.env.example`
- Modify: `README.md`
- Create: `docs/measurement.md`
- Create: `docs/content-inventory.md`
- Create: `docs/content-freshness-log.md`

1. Add failing validation fixtures for invalid JSON-LD and metadata limits.
2. Add schema validation and Lighthouse CI commands.
3. Document GA4, Search Console, Bing verification, Vercel environment variables, monthly citation review, quarterly inventory, and freshness logging.
4. Run typecheck, lint, unit tests, schema checks, Next production build, and inspect generated route HTML.

