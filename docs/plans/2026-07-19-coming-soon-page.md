# Reusable Coming Soon Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give every configured unfinished route a useful, accessible Coming Soon experience with valid fallback navigation and the existing Kimi invitation action.

**Architecture:** Extend the central route configuration with typed availability and Coming Soon content. Map unfinished route entries into React Router, rendering one feature-owned page and one generic simulated AI desktop component. Reuse the shared shell, metadata hook, invitation configuration, theme, and completed routes.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS, Lucide icons, Vitest, React Testing Library.

---

### Task 1: Define expected route behavior

**Files:**
- Modify: `src/AppShell.test.tsx`

1. Add a test that opens an unfinished route directly.
2. Assert the dynamic page name, description, invitation action, referral disclosure, development status, and valid fallback link.
3. Run the focused test and confirm it fails because the route currently renders no content.

### Task 2: Add Coming Soon route contracts

**Files:**
- Modify: `src/config/routes.ts`

1. Define a `ComingSoonRoute` contract with path, page name, description, expected features, and completed fallback.
2. Configure Intermediate, Advanced, Expert, Kimi, MiniMax, Codex, Skills, and MCP.
3. Keep Home and Beginner as the only completed internal destinations.

### Task 3: Build the simulated desktop

**Files:**
- Create: `src/features/coming-soon/components/SimulatedAiDesktop.tsx`
- Create: `src/features/coming-soon/coming-soon.css`

1. Render a generic AI workspace with title bar, controls, sidebar, new-chat control, history placeholders, chat message, typing state, input, disabled send control, and status.
2. Mark purely decorative controls disabled or hidden from assistive technology as appropriate.
3. Collapse the sidebar on mobile and compact it on tablet.
4. Add transform/opacity animations with reduced-motion fallbacks and no layout animation.

### Task 4: Build the reusable page

**Files:**
- Create: `src/features/coming-soon/ComingSoonPage.tsx`
- Create: `src/features/coming-soon/seo.ts`

1. Render the dynamic heading and route description using configuration.
2. Use the existing configured invitation link in a new tab with permanent referral disclosure.
3. Link the secondary action and internal links only to completed routes.
4. Apply route-specific title, description, canonical, Open Graph, Twitter, and WebPage JSON-LD metadata.

### Task 5: Integrate unfinished routes

**Files:**
- Modify: `src/App.tsx`

1. Generate one route per Coming Soon configuration entry.
2. Preserve the requested URL and shared `PageShell`.
3. Run the focused tests and confirm the new behavior passes.

### Task 6: Handle unavailable invitation configuration

**Files:**
- Create: `src/features/coming-soon/ComingSoonPage.test.tsx`
- Modify: `src/features/coming-soon/ComingSoonPage.tsx`

1. Add a failing test for an empty invitation URL.
2. Hide the primary action without hiding the disclosure or breaking layout.
3. Confirm valid invitation URLs still open in a new tab.

### Task 7: Document and verify

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`

1. Document implemented Coming Soon route behavior and configuration ownership.
2. Run the responsive/UI quality review.
3. Run `npm run check` and confirm every maintained source file remains below 300 lines.

## Visual direction

- Preserve the existing near-black, indigo-accent theme and current typography.
- Treat the desktop as a restrained product surface, not a marketing illustration.
- Use familiar app geometry and generic icons without Kimi-specific trade dress.
- Keep the real page message and actions visually dominant on small screens.

## Constraints

- No redirect from unfinished routes.
- No broken controls or links.
- No copied proprietary Kimi interface, assets, or logo placement.
- No new invitation URL.
- No continuous animation when reduced motion is enabled.
- No maintained source file above 300 lines.
