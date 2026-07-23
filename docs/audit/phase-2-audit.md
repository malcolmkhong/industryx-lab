# UI Design Audit — Phase 2

**Project:** kimi-beginner-guide-hub
**Scope:** Typography (font sizes, weights, line-heights, tracking), spacing scale (gap/padding/margin), z-index layering, layout dimensions
**Date:** 2026-07-22
**Reviewer:** Trae AI Agent

---

## Executive Summary

Tailwind defaults provide the type scale (`text-xs` through `text-6xl`) and spacing scale (`gap-1` through `gap-12`, `p-*`, `m-*`). However, **arbitrary font sizes (`text-[10px]`, `text-[11px]`, `text-[12.5px]`, `text-[2.75rem]`) and arbitrary tracking (`tracking-[0.14em]`, `tracking-[0.16em]`, `tracking-[0.18em]`, `tracking-[0.2em]`, `tracking-[0.25em]`, `tracking-[-0.025em]`, `tracking-[-0.035em]`) bypass the design system**. Z-index uses 7 distinct values without a layering convention. Spacing mostly uses Tailwind scale — only minor inconsistencies.

---

## 1. Affected Files

| File | Issue |
|---|---|
| [src/components/SectionHeading.tsx](../../../src/components/SectionHeading.tsx) L15 | `md:text-[2.75rem] md:leading-[1.1]` arbitrary |
| [src/components/content/TableOfContents.tsx](../../../src/components/content/TableOfContents.tsx) L18 | `text-[10px]`, `tracking-[0.18em]` |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L19, L40 | `text-xs`, `tracking-[0.14em]`, `text-[10px]`, `tracking-[0.18em]` |
| [src/components/site/Footer.tsx](../../../src/components/site/Footer.tsx) L14 | `tracking-widest` (token) but eyebrow pattern |
| [src/app/not-found.tsx](../../../src/app/not-found.tsx) L18 | `tracking-[0.2em]` |
| [src/features/coming-soon/ComingSoonPage.tsx](../../../src/features/coming-soon/ComingSoonPage.tsx) L30 | `tracking-[-0.035em]` (display heading) |
| [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L47-48 | `text-xs`, `tracking-[0.18em]`, `tracking-[-0.025em]` |
| [src/features/coming-soon/components/StreamingAssistantResponse.tsx](../../../src/features/coming-soon/components/StreamingAssistantResponse.tsx) L40 | `text-[11px]` arbitrary |
| [src/features/coming-soon/components/WorkspaceSidebar.tsx](../../../src/features/coming-soon/components/WorkspaceSidebar.tsx) L55 | `text-[11px]` arbitrary |
| [src/features/coming-soon/components/WorkspaceComposer.tsx](../../../src/features/coming-soon/components/WorkspaceComposer.tsx) L10 | `text-[11px]` arbitrary |
| [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L34 | `text-xs` (OK) but pattern of micro-labels |
| [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L98 | `text-[10px] sm:text-[11px]` arbitrary |
| [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L99, L141 | `text-[12.5px]` arbitrary (×2) |
| [src/features/home/components/Stats.tsx](../../../src/features/home/components/Stats.tsx) L44 | `text-[11px]` arbitrary |
| [src/features/home/components/Hero.tsx](../../../src/features/home/components/Hero.tsx) L36 | `leading-[1.08]` arbitrary (display heading) |
| [src/features/home/components/Hero.tsx](../../../src/features/home/components/Hero.tsx) L29 | `text-xs` + `font-mono` (eyebrow pattern) |
| [src/features/beginner/BeginnerPage.tsx](../../../src/features/beginner/BeginnerPage.tsx) L37, L88, L106, L149 | Multiple eyebrow labels with `tracking-[0.16em]` |
| [src/components/seo/EditorialByline.tsx](../../../src/components/seo/EditorialByline.tsx) L13-14 | `leading-6`, `leading-5` |

---

## 2. Exact Hardcoded Typography Values

### A. Arbitrary font sizes (not in Tailwind scale)

| File:Line | Class | Actual size |
|---|---|---|
| [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L98 | `text-[10px] sm:text-[11px]` | 10px / 11px |
| [src/features/coming-soon/components/StreamingAssistantResponse.tsx](../../../src/features/coming-soon/components/StreamingAssistantResponse.tsx) L40 | `text-[11px]` | 11px |
| [src/features/coming-soon/components/WorkspaceSidebar.tsx](../../../src/features/coming-soon/components/WorkspaceSidebar.tsx) L55 | `text-[11px]` | 11px |
| [src/features/coming-soon/components/WorkspaceComposer.tsx](../../../src/features/coming-soon/components/WorkspaceComposer.tsx) L10 | `text-[11px]` | 11px |
| [src/features/home/components/Stats.tsx](../../../src/features/home/components/Stats.tsx) L44 | `text-[11px]` | 11px |
| [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L99, L141 | `text-[12.5px]` | 12.5px |
| [src/components/content/TableOfContents.tsx](../../../src/components/content/TableOfContents.tsx) L18 | `text-[10px]` | 10px |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L40 | `text-[10px]` | 10px |
| [src/components/SectionHeading.tsx](../../../src/components/SectionHeading.tsx) L15 | `md:text-[2.75rem]` | 44px |

**Total arbitrary size sites: 13**

### B. Arbitrary line-height

| File:Line | Class | Value |
|---|---|---|
| [src/features/home/components/Hero.tsx](../../../src/features/home/components/Hero.tsx) L36 | `leading-[1.08]` | 1.08 |
| [src/components/SectionHeading.tsx](../../../src/components/SectionHeading.tsx) L15 | `md:leading-[1.1]` | 1.1 |

Standard Tailwind: `leading-none (1)`, `tight (1.25)`, `snug (1.375)`, `normal (1.5)`, `relaxed (1.625)`, `loose (2)`. Both custom values are below `leading-tight` for display headings.

### C. Arbitrary tracking (letter-spacing)

| File:Line | Class | Value | Pattern |
|---|---|---|---|
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L19 | `tracking-[0.14em]` | 0.14em | Eyebrow |
| [src/features/beginner/BeginnerPage.tsx](../../../src/features/beginner/BeginnerPage.tsx) L37, L88, L106, L149 | `tracking-[0.16em]` | 0.16em | Eyebrow |
| [src/components/content/TableOfContents.tsx](../../../src/components/content/TableOfContents.tsx) L18 | `tracking-[0.18em]` | 0.18em | Eyebrow |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L40 | `tracking-[0.18em]` | 0.18em | Eyebrow |
| [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L47 | `tracking-[0.18em]` | 0.18em | Eyebrow |
| [src/app/not-found.tsx](../../../src/app/not-found.tsx) L18 | `tracking-[0.2em]` | 0.2em | Eyebrow |
| [src/components/SectionHeading.tsx](../../../src/components/SectionHeading.tsx) L14 | `tracking-[0.25em]` | 0.25em | Eyebrow |
| [src/features/coming-soon/ComingSoonPage.tsx](../../../src/features/coming-soon/ComingSoonPage.tsx) L30 | `tracking-[-0.035em]` | -0.035em | Display heading |
| [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L48 | `tracking-[-0.025em]` | -0.025em | Display heading |

**Total arbitrary tracking sites: 13** (5 different eyebrow values + 2 display values)

**Missing token:** `--tracking-eyebrow` (a single value should govern all eyebrow labels — currently 5 different values).

### D. Font weights in use

`font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`, plus `font-mono` (eyebrow labels).

Pattern observed:
- Display headings: `font-semibold`
- Section headings: `font-semibold`
- Body: default (`font-normal`)
- Buttons / labels: `font-medium`
- Eyebrows: `font-semibold` + `font-mono`

No outliers. Weight scale = good.

### E. Line-height in use

`leading-none`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-5`, `leading-6`, `leading-7`, `leading-[1.08]`, `leading-[1.1]`.

Body paragraphs: `leading-relaxed` (1.625) — optimal.
Display: `leading-[1.08]`, `leading-[1.1]` — fine but magic numbers.

---

## 3. Exact Hardcoded Spacing Values

### A. Standard Tailwind spacing scale (no issue)

Used throughout: `gap-1`, `gap-1.5`, `gap-2`, `gap-2.5`, `gap-3`, `gap-4`, `gap-6`, `gap-12`, `p-1`, `p-2`, `p-3`, `p-4`, `p-5`, `p-6`, `p-7`, `m-1`, `m-2`, `m-3`, `m-4`, `m-5`, `m-6`, `m-8`, `m-10`, `mt-1`, `mt-2`, etc.

All on Tailwind 4px scale. Consistent.

### B. Arbitrary spacing (rare)

No widespread arbitrary spacing found. Some uses:
- [src/features/coming-soon/components/StreamingAssistantResponse.tsx](../../../src/features/coming-soon/components/StreamingAssistantResponse.tsx) L28: `rounded-2xl rounded-br-md` — corner override pattern (acceptable)
- [src/components/SectionHeading.tsx](../../../src/components/SectionHeading.tsx) L15: `md:text-[2.75rem]` — see typography
- [src/features/coming-soon/ComingSoonPage.tsx](../../../src/features/coming-soon/ComingSoonPage.tsx) L33, L36, L68: `max-w-[68ch]`, `max-w-[65ch]`, `max-w-[66ch]` — `ch`-based reading width (good practice, not arbitrary)

### C. Layout dimensions

| File:Line | Value | Purpose |
|---|---|---|
| [src/components/content/GuideLayout.tsx](../../../src/components/content/GuideLayout.tsx) L7 | `xl:grid-cols-[minmax(0,1fr)_14rem]` | Sidebar width 14rem (224px) |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L9, L38 | `w-[min(calc(100vw-2.5rem),18rem)]` | Width capped 18rem |
| [src/components/site/MobileMenuDropdown.tsx](../../../src/components/site/MobileMenuDropdown.tsx) L27 | `w-[min(calc(100vw-1.5rem),20rem)]` | Width capped 20rem |
| [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L27 | `h-[430px]` | Terminal mockup height |

Sidebar widths (`14rem`, `18rem`, `20rem`) = 3 distinct values. Could be tokenized as `--sidebar-w-narrow/w-wide`.

---

## 4. Exact Hardcoded Z-Index Values

| File:Line | z-index | Purpose |
|---|---|---|
| [src/features/beginner/components/SafeBuildLoop.tsx](../../../src/features/beginner/components/SafeBuildLoop.tsx) L163 | `-z-10` | Decorative sweep behind card |
| [src/components/ui/MenuLink.tsx](../../../src/components/ui/MenuLink.tsx) L36 | `z-10` | Label above background fill |
| [src/components/ui/TocLink.tsx](../../../src/components/ui/TocLink.tsx) L44 | `z-10` | Label above background fill |
| [src/components/site/DesktopNav.tsx](../../../src/components/site/DesktopNav.tsx) L31 | `z-[60]` | Nav dropdown group above header |
| [src/components/site/DesktopNav.tsx](../../../src/components/site/DesktopNav.tsx) L46 | `z-[60]` | Nav dropdown menu |
| [src/components/site/MobileMenuDropdown.tsx](../../../src/components/site/MobileMenuDropdown.tsx) L11 | `z-[70]` | Hamburger button above header |
| [src/components/site/MobileMenuDropdown.tsx](../../../src/components/site/MobileMenuDropdown.tsx) L16 | `z-[60]` | Mobile menu backdrop |
| [src/components/content/ReadingProgress.tsx](../../../src/components/content/ReadingProgress.tsx) L6 | `z-[55]` | Reading progress bar |
| [src/components/site/SiteHeader.tsx](../../../src/components/site/SiteHeader.tsx) L11 | `z-50` | Header (Tailwind default scale) |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L9 | `z-40` | Sticky contents bar |
| [src/components/ui/dialog.tsx](../../../src/components/ui/dialog.tsx) L39 | `z-50` | Dialog overlay |
| [src/components/ui/dialog.tsx](../../../src/components/ui/dialog.tsx) L61 | `z-50` | Dialog content |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L38 | `z-50` | TOC dropdown menu |
| [src/features/home/components/MobileCta.tsx](../../../src/features/home/components/MobileCta.tsx) L7 | `z-40` | Mobile CTA bar |
| [src/components/consent/CookieConsent.tsx](../../../src/components/consent/CookieConsent.tsx) L65 | `z-[80]` | Cookie banner (highest) |
| [src/components/site/PageShell.tsx](../../../src/components/site/PageShell.tsx) L11 | `z-[100]` | Skip link (absolute top) |

**Distinct z values: 8** (`-10`, `10`, `40`, `50`, `55`, `60`, `70`, `80`, `100`)

**Stacking issues:**
- `MobileContentsBar` dropdown uses `z-50` (same as SiteHeader) — could overlap incorrectly
- `DesktopNav` dropdown uses `z-[60]` — bypasses Tailwind scale
- `CookieConsent` uses `z-[80]` — bypasses Tailwind scale
- `ReadingProgress` uses `z-[55]` — bypasses Tailwind scale
- `Skip link` uses `z-[100]` — bypasses Tailwind scale

No central `--z-*` token system. Each surface invented its own value.

---

## 5. Missing Tokens (Should Create)

| Token | Purpose | Replaces |
|---|---|---|
| `--font-size-micro: 0.6875rem` (11px) | Micro labels in mockups, headers | `text-[11px]` (×4) |
| `--font-size-nano: 0.625rem` (10px) | Terminal labels | `text-[10px]` (×2) |
| `--font-size-compact: 0.78125rem` (12.5px) | Compact UI labels | `text-[12.5px]` (×2) |
| `--font-size-display-lg: 2.75rem` (44px) | Section display heading | `md:text-[2.75rem]` |
| `--leading-display: 1.1` | Display heading line-height | `leading-[1.08]`, `leading-[1.1]` |
| `--tracking-eyebrow: 0.18em` | Section eyebrow label | `tracking-[0.14em..0.25em]` (5 distinct values) |
| `--tracking-display: -0.03em` | Display heading tracking | `tracking-[-0.025em]`, `tracking-[-0.035em]` |
| `--z-progress: 55` | Reading progress bar | `z-[55]` |
| `--z-nav: 60` | Navigation surfaces | `z-[60]` (×3) |
| `--z-floating: 70` | Floating action surfaces | `z-[70]` |
| `--z-banner: 80` | Cookie/consent banner | `z-[80]` |
| `--z-skiplink: 100` | Skip-to-content link | `z-[100]` |
| `--sidebar-w-narrow: 14rem` | Narrow sidebar | `14rem` |
| `--sidebar-w-wide: 18rem` | Wide sidebar / dropdown | `18rem`, `20rem` |

---

## 6. Existing Tokens (Already Centralized — Reuse)

- **shadcn `--radius: 0.75rem`** (single radius token — underused; many surfaces override with arbitrary `rounded-*`)
- Tailwind type scale: `text-xs` (12px) → `text-6xl` (60px) used everywhere
- Tailwind spacing scale: full 4px grid used
- **No motion token yet** (see Phase 1 audit)

---

## 7. Prioritized Refactoring Plan

### Phase 2.1 — Eyebrow + Display Tracking (5 min, low risk)

1. **Add `--tracking-eyebrow: 0.18em`** (most common value) → migrate all 9 eyebrow sites.
2. **Add `--tracking-display: -0.03em`** → migrate 2 display sites.
3. **Optional**: expose as Tailwind `tracking-eyebrow` + `tracking-display` utilities via theme.extend.

### Phase 2.2 — Arbitrary Font Sizes (15 min, medium risk)

4. **Add 4 micro font sizes** to Tailwind config (`text-[11px]`, `text-[10px]`, `text-[12.5px]`, `text-[2.75rem]`) OR add CSS vars (`--font-size-micro/nano/compact/display-lg`) → migrate 13 sites.

### Phase 2.3 — Display Line-Height (5 min)

5. **Add `--leading-display: 1.1`** → migrate 2 sites (Hero, SectionHeading).

### Phase 2.4 — Z-Index System (30 min, medium risk)

6. **Add z-index scale to Tailwind config**: `z-progress (55)`, `z-nav (60)`, `z-floating (70)`, `z-banner (80)`, `z-skiplink (100)`.
7. **Migrate 8 arbitrary z-index sites**.
8. **Verify stacking order**: progress (55) < header (50 = wrong) → swap. Reading progress should be above header or below. Currently `z-[55]` > `z-50` (header) so bar covers header — confirm intent.

### Phase 2.5 — Sidebar Width Tokens (10 min)

9. **Add `--sidebar-w-narrow: 14rem`, `--sidebar-w-wide: 18rem`** (or 20rem for mobile menu) → migrate 3 sites.

---

## 8. Severity Heatmap

| Severity | Issue | Sites |
|---|---|---|
| Medium | Arbitrary tracking values (5 distinct eyebrow + 2 display) | 13 |
| Medium | Arbitrary font sizes (`text-[10px..12.5px]`) | 13 |
| Medium | Z-index scale not tokenized (8 distinct values) | 16 |
| Low | Arbitrary line-height for display headings | 2 |
| Low | Sidebar widths not tokenized | 3 |

---

## 9. Limitations

- No accessibility contrast ratio audit performed
- No responsive breakpoint pattern audit
- No icon-size audit (lucide-react sizes: h-3 w-3, h-4 w-4, h-5 w-5, h-3.5 w-3.5 — covered by Tailwind scale)
- No image/asset dimension audit
- Layout dimensions limited to sidebar widths and one terminal mockup height