# IndustryX Footer Credit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an accessible IndustryX footer credit with a non-shifting color-glow pulse and brighter hover state.

**Architecture:** Store the credit label and URL in shared site configuration, render it in the existing shared footer, and define motion behavior in the global stylesheet. Protect the public link contract with a focused component test.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

### Task 1: Protect the footer credit

**Files:**
- Create: `src/components/site/Footer.test.tsx`
- Modify: `src/config/site.ts`
- Modify: `src/components/site/Footer.tsx`
- Modify: `src/index.css`

1. Add a test requiring the IndustryX label, configured URL, new-tab safety attributes, and glow class.
2. Run the focused test and confirm it fails because the credit does not exist.
3. Add the shared configuration, footer credit, and color-only animation.
4. Run the focused test and confirm it passes.
5. Run typecheck and lint for final verification.
