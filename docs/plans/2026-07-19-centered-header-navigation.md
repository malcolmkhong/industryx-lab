# Centered Header Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Center the desktop navigation within the shared header while preserving all current navigation behavior.

**Architecture:** Change only the header layout classes in `Nav`. Use equal flexible outer columns around the auto-width navigation and keep mobile controls in the right column.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

### Task 1: Center the navigation

**Files:**
- Modify: `src/components/site/Nav.test.tsx`
- Modify: `src/components/site/Nav.tsx`

1. Add a failing test for the three-column layout and centered desktop navigation.
2. Run the focused test and confirm the alignment assertion fails.
3. Replace the flex header row with the approved grid classes.
4. Run the focused navigation tests, typecheck, and lint.
