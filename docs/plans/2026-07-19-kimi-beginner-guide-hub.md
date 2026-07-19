# Kimi Beginner Guide Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the Kimi Code referral landing page into a bilingual beginner guide hub whose main conversion is building the ProjectFlow starter project.

**Architecture:** Keep the existing Vite + React app as the content hub. Add locale-prefixed React Router pages driven by typed English and Simplified Chinese content. Long-form pages share a desktop right-side table of contents and mobile contents drawer. Create `projectflow-starter` as a separate Next.js + Supabase repository, then link it from the guide.

**Tech Stack:** React 19, React Router, TypeScript, Vite, Tailwind CSS, shadcn/ui, Vercel; separate starter: Next.js App Router, Supabase, Google OAuth, dnd-kit.

---

## Decisions already locked

- Audience: people new to Kimi Code and vibe coding.
- Languages: English and Simplified Chinese, with `/en/...` and `/zh/...` URLs.
- Hub routes: Home, Start Here, ProjectFlow, Reference, Explore Kimi.
- Primary CTA: `Build ProjectFlow`; invite link stays secondary.
- Navigation: top header plus sticky right-side in-page contents on long pages; mobile uses collapsible contents.
- First project: ProjectFlow, a responsive task manager with Google OAuth, Supabase, projects/tasks, filters, Kanban, and Vercel deployment.
- Starter location: a new standalone `projectflow-starter` repository.
- Hub hosting: Vercel.

## Task 1: Establish route and content contracts

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/en.ts`
- Create: `src/content/zh.ts`
- Create: `src/lib/locales.ts`

1. Define `Locale = 'en' | 'zh'`, page slugs, translated navigation labels, page metadata, section IDs, and table-of-contents item types.
2. Create English content for all five routes. Each long-form section must have stable ID, heading, short body, and optional prompt/checklist/code block.
3. Translate the complete content into Simplified Chinese. Do not fall back to English for any visitor-facing guide text.
4. Add locale helpers: validate locale, build locale-aware paths, map a path to its translated equivalent, and return `/en/` for unknown locales.
5. Keep product facts linked to official Kimi sources. Use plain language; define Kimi-specific terms before using them.

**Verify:** TypeScript accepts content objects and locale helpers. Every translated page has same section IDs and ordering.

## Task 2: Add locale-aware routing and deep-link support

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Modify: `vite.config.ts`
- Create: `vercel.json`
- Create: `src/pages/StartHere.tsx`
- Create: `src/pages/ProjectFlow.tsx`
- Create: `src/pages/Reference.tsx`
- Create: `src/pages/Explore.tsx`
- Create: `src/pages/NotFound.tsx`

1. Change Vite `base` from `./` to `/` so absolute localized URLs resolve assets correctly.
2. Redirect `/` to `/en/`; define parallel locale routes for all five page slugs.
3. Route unsupported locale/slug combinations to localized not-found content with a link back to `/en/`.
4. Add Vercel SPA rewrite to serve `index.html` for non-file routes, preserving direct refreshes of `/en/projectflow` and `/zh/reference`.
5. Make each route set document title, description, canonical URL, and document `lang` from its locale metadata.

**Verify:** `npm run build` passes. Preview direct navigation and refresh for every English and Chinese route.

## Task 3: Create shared shell, organized header, and language toggle

**Files:**
- Create: `src/components/site/SiteHeader.tsx`
- Create: `src/components/site/SiteFooter.tsx`
- Create: `src/components/site/LanguageToggle.tsx`
- Create: `src/components/site/PageShell.tsx`
- Modify: `src/sections/Nav.tsx`
- Modify: `src/sections/Footer.tsx`

1. Replace current hash-only header with page links: Home, Start Here, Build ProjectFlow, Reference, Explore Kimi, GitHub.
2. Make `Build ProjectFlow` the only primary header CTA. Keep invite link in the final home conversion block and footer only.
3. Build language toggle that uses the current route's translated path. Preserve section hash when that section exists in the other locale.
4. Use accessible labels, visible current-page state, keyboard navigation, and a mobile menu that closes after internal navigation.
5. Retain independent-resource disclaimer and official Kimi/Docs/GitHub links in shared footer.

**Verify:** Navigate between every page in both languages. Toggle language from every route. Test header and mobile menu at narrow width.

## Task 4: Build reusable right-side table of contents

**Files:**
- Create: `src/components/content/TableOfContents.tsx`
- Create: `src/components/content/GuideLayout.tsx`
- Create: `src/hooks/useActiveHeading.ts`
- Modify: `src/index.css`

1. Render desktop table of contents as a sticky right rail only on Start Here, ProjectFlow, Reference, and Explore pages.
2. Generate entries from localized content contracts; do not hand-maintain duplicate navigation arrays inside pages.
3. Use `IntersectionObserver` to mark current heading and update `aria-current`.
4. Support hash deep links with scroll margin below fixed header.
5. Replace desktop rail below tablet width with a compact, keyboard-accessible `On this page` disclosure.

**Verify:** Click every contents item, refresh with a hash URL, use keyboard controls, and test mobile disclosure.

## Task 5: Restructure the home page around beginner learning

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/sections/Hero.tsx`
- Modify: `src/sections/Stats.tsx`
- Modify: `src/sections/Features.tsx`
- Create: `src/sections/BeginnerPath.tsx`
- Create: `src/sections/ProjectFlowPromo.tsx`

1. Keep visual identity, hero art, selected feature cards, quote, and invitation card.
2. Keep current hero headline and copy unchanged. Add a short beginner bridge directly below the hero: learn vibe coding by building a real app with Kimi Code.
3. Place the three-path section after that bridge: Start Here, Build ProjectFlow, Explore Kimi. Each card links to its localized route.
4. Move statistics after the plain-language explanation of Kimi Code; retain only claims that have official-source links.
5. Add ProjectFlow promotion before final invitation section: feature checklist, starter-repository link placeholder, and `Build ProjectFlow` CTA.
6. Remove redundant early invite calls-to-action; final invite remains secondary.

**Verify:** New user can identify Kimi Code, see their first path, and reach ProjectFlow in one click without encountering referral pressure first.

## Task 6: Write Start Here and ProjectFlow teaching flow

**Files:**
- Modify: `src/pages/StartHere.tsx`
- Modify: `src/pages/ProjectFlow.tsx`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`

1. Start Here sections: what vibe coding is, safe work loop (describe, review, test, improve), install, `/login`, first task, and next step to ProjectFlow.
2. Use official Kimi CLI installation commands and explain every command in one sentence. Include Windows-specific prerequisites only where relevant.
3. ProjectFlow has seven ordered stages: clone/start, Supabase setup, Google OAuth, database/RLS, projects/tasks, dashboard/search/filters, Kanban/responsive/deploy.
4. Every stage contains a short goal, copyable Kimi prompt, expected result, verification step, common beginner problem, and reference link.
5. Keep code snippets exact, copyable, and localized only in surrounding explanation; never translate commands, API names, file paths, or code symbols.

**Verify:** A reader can follow Start Here without prior coding-agent knowledge, then complete every ProjectFlow stage in order.

## Task 7: Write aligned Reference and Explore Kimi pages

**Files:**
- Modify: `src/pages/Reference.tsx`
- Modify: `src/pages/Explore.tsx`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`

1. Reference page mirrors ProjectFlow stages: setup, prompts, authentication, Supabase, task data, filtering, Kanban, deployment, and troubleshooting.
2. Each reference item links back to relevant ProjectFlow stage, preventing disconnected documentation.
3. Explore Kimi introduces skills, MCP, plugins, Zed/ACP, and next learning paths. Distinguish beginner-safe actions from advanced configuration.
4. Link official Kimi documentation for all product behavior and time-sensitive installation/configuration details.

**Verify:** Every reference topic has a ProjectFlow guide link. Every Explore claim has official source link or is labeled as this site's recommendation.

## Task 8: Create separate `projectflow-starter` repository

**Location:** `A:\kimi\projectflow-starter` before publishing as `projectflow-starter`.

1. Scaffold Next.js App Router with TypeScript, Tailwind CSS, shadcn/ui, ESLint, and a production build script.
2. Add Supabase SSR clients, Google OAuth login, callback route, middleware/session protection, and sign-out action.
3. Add migration for `projects` and `tasks` tables. `projects` fields: ID, owner ID, name, description, timestamps. `tasks` fields: ID, project ID, owner ID, title, description, status, priority, due date, timestamps.
4. Enable Row Level Security. Every read/write policy checks authenticated user owns the row; task access also requires owning its parent project.
5. Create responsive dashboard: project selector, task create/edit/delete, search, status/priority/due-date filters, summary cards, and empty states.
6. Add accessible drag-and-drop Kanban using `@dnd-kit`; status change persists to Supabase and rolls back visually on failure.
7. Add `.env.example`, Supabase setup instructions, Google OAuth redirect URLs for localhost and Vercel, and Vercel deployment README.
8. Publish repository, then set central hub content constant to its final GitHub URL.

**Verify:** New Google user signs in, sees only their data, creates/filters/moves tasks, refreshes, and deploys successfully to Vercel.

## Task 9: Add automated checks and acceptance coverage

**Hub:**

1. Add Vitest and React Testing Library.
2. Test locale-path mapping, localized page rendering, header route navigation, language toggle, active table-of-contents state, and mobile contents behavior.
3. Run `npm run build` and production preview smoke tests for all ten localized routes.

**Starter:**

1. Add unit tests for task validation, filtering, status transition, and ownership-safe query helpers.
2. Add browser tests for Google-authenticated dashboard flow using Supabase test credentials or supported test mocks.
3. Smoke-test Vercel deployment: auth callback, protected route redirect, task creation, Kanban persistence, and mobile layout.

## Delivery checklist

- All five pages work in `/en` and `/zh` with no untranslated visitor-facing copy.
- Right-side contents works for every long page and mobile fallback works.
- Home centers learning ProjectFlow, not referral conversion.
- ProductFlow guide and reference docs stay synchronized by shared content IDs.
- Starter repository works independently and its final URL is connected to guide CTA.
- Hub and starter both build successfully before release.

## Assumptions

- Simplified Chinese is correct for the Chinese experience.
- Site remains independent and keeps product-mark disclaimer.
- User supplies Google Cloud OAuth credentials and Supabase/Vercel projects; secrets stay outside Git.
- Current workspace is not a Git repository, so commits/pushes occur only after repository ownership/remotes are established.
