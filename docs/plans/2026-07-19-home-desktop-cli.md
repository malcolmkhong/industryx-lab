# Home Desktop and CLI Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a staged Kimi CLI simulation to the hero and move the existing desktop simulation into a new explanatory Home section.

**Architecture:** Keep page ordering in `HomePage`, visitor copy in Home content modules, animation state in a focused hook, and visual rendering in small components. Reuse `KimiDesktop` without duplicating its animation.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

### Task 1: Protect the new Home composition

**Files:**
- Create: `src/features/home/HomePage.test.tsx`
- Modify: `src/features/home/HomePage.tsx`

1. Add a test asserting that Desktop content appears after Stats and before Why Kimi Code.
2. Run the focused test and confirm it fails because the Desktop section does not exist.
3. Add `Desktop` between `Stats` and `Features`.
4. Rerun the focused test and confirm it passes.

### Task 2: Build the Desktop content section

**Files:**
- Create: `src/features/home/content/desktop.ts`
- Create: `src/features/home/components/Desktop.tsx`
- Test: `src/features/home/HomePage.test.tsx`

1. Assert the section heading, explanation, and existing desktop window are rendered.
2. Confirm the assertions fail.
3. Add beginner-focused content and render it beside `KimiDesktop`.
4. Confirm the focused test passes.

### Task 3: Replace the hero desktop with a CLI simulation

**Files:**
- Create: `src/features/home/content/cli.ts`
- Create: `src/features/home/hooks/useCliAnimation.ts`
- Create: `src/features/home/components/CliAnimation.tsx`
- Create: `src/features/home/components/Hero.test.tsx`
- Modify: `src/features/home/components/Hero.tsx`

1. Test the Kimi CLI window, setup-and-coding sequence, fixed-height activity region, and timer progression.
2. Confirm the test fails because `CliAnimation` does not exist in the hero.
3. Implement staged animation state with timer cleanup and reduced-motion-safe transitions.
4. Render `CliAnimation` in the hero and remove the hero's `KimiDesktop` import.
5. Confirm the focused tests pass.

### Task 4: Review and verify

**Files:**
- Review all changed Home feature files.

1. Run the React best-practices review for the edited TSX components.
2. Confirm maintained files remain below 300 lines.
3. Run `npm run check` and require typecheck, lint, tests, and build to pass.
