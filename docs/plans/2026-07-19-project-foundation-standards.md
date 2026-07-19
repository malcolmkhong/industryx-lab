# Project Foundation Standards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish accurate project documentation, enforceable repository rules, feature-based source ownership, centralized configuration, and reusable SEO metadata without changing current UI content or behavior.

**Architecture:** Keep the Vite and React application shell small. Shared site behavior lives under `src/components/site`, route and external-link sources of truth live under `src/config`, and page-specific UI, content, hooks, and tests live under `src/features`. Generated artifacts remain generated and are documented as exceptions to authored-source limits.

**Tech Stack:** React 19, React Router 7, TypeScript, Vite, Tailwind CSS, shadcn/ui, Vitest, React Testing Library, ESLint.

---

### Task 1: Document the verified repository

**Files:**
- Replace: `README.md`
- Create: `AGENTS.md`

1. Document the product purpose, implemented routes, architecture, setup, npm workflow, testing, build commands, SEO approach, and deployment limitations.
2. Add project-wide rules for sources of truth, feature ownership, file-size limits, content preservation, SEO/GEO/AEO, testing, accessibility, and safe deletion.
3. Record that this workspace currently has no Git metadata and that secrets must stay outside source control.

### Task 2: Centralize routes and site configuration

**Files:**
- Create: `src/config/routes.ts`
- Create: `src/config/site.ts`
- Modify: `src/App.tsx`
- Delete: `src/config.ts`

1. Define implemented paths and planned navigation destinations once.
2. Move official URLs, invite URLs, install commands, site identity, and default metadata into typed configuration.
3. Update routing and consumers to import the centralized values.
4. Add regression coverage for route/config consistency.

### Task 3: Establish feature-based Home ownership

**Files:**
- Create: `src/features/home/HomePage.tsx`
- Move: `src/sections/*` home-only sections to `src/features/home/components/*`
- Move: `src/sections/Nav.tsx` and `Footer.tsx` to `src/components/site/*`
- Update: related imports and tests

1. Keep the shared shell under `components/site`.
2. Keep Home-only sections and the mobile CTA under the Home feature.
3. Preserve component markup, copy, styling, and behavior.

### Task 4: Split the Beginner content domain

**Files:**
- Create: `src/features/beginner/content/types.ts`
- Create: `src/features/beginner/content/page.ts`
- Create: `src/features/beginner/content/support.ts`
- Create: `src/features/beginner/content/stages.ts`
- Create: `src/features/beginner/content/index.ts`
- Delete: `src/content/beginner.ts`

1. Move types, page copy, supporting content, and eight stages into focused modules.
2. Preserve every string, command, URL, section ID, and content ordering.
3. Keep the public content barrel as the feature's stable import boundary.

### Task 5: Separate Beginner rendering from behavior

**Files:**
- Create: `src/features/beginner/BeginnerPage.tsx`
- Create: `src/features/beginner/components/StageSection.tsx`
- Create: `src/features/beginner/components/CodeCard.tsx`
- Create: `src/features/beginner/hooks/useGuideProgress.ts`
- Create: `src/features/beginner/seo.ts`
- Delete: `src/pages/Beginner.tsx`

1. Move stage rendering and code-card behavior into focused components.
2. Move progress state into a feature hook.
3. Derive Jump To entries and metadata from the content source of truth.
4. Preserve the current rendered guide and interactions.

### Task 6: Standardize page metadata

**Files:**
- Create: `src/hooks/usePageMetadata.ts`
- Modify: Home and Beginner feature pages
- Modify: `index.html`

1. Reuse one hook for title, description, canonical, Open Graph, Twitter, and JSON-LD management.
2. Give Home and Beginner unique, content-aligned metadata.
3. Keep headings, semantic regions, internal links, and answer-oriented stage content intact.

### Task 7: Remove confirmed obsolete duplicates

**Files:**
- Delete: `pnpm-lock.yaml`
- Delete: `src/components/ui/sidebar.tsx`
- Delete: `src/components/ui/chart.tsx`
- Create: `.gitignore`

1. Remove only files with no imports or current workflow ownership.
2. Retain `package-lock.json` as the npm source of truth.
3. Ignore build output, local environment files, editor state, and test artifacts.

### Task 8: Verify the foundation

1. Confirm every authored source file is under 300 lines.
2. Run focused route, navigation, shell, and Beginner tests.
3. Run TypeScript, ESLint, the full test suite, and production build.
4. Re-scan for stale imports, duplicate route strings, hardcoded metadata, and unused obsolete paths.

## Constraints

- Preserve the existing theme, fonts, images, content, routes, and interactions.
- Do not publish, commit, or deploy because this workspace is not a Git repository.
- Lockfiles and imported historical/reference documents are not manually line-wrapped; the 300-line rule applies to maintained source and active project documentation.
