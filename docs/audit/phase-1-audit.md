# UI Design Audit — Phase 1

**Project:** kimi-beginner-guide-hub (Next.js 16, Tailwind, shadcn/ui new-york)
**Scope:** Hardcoded UI values + non-tokenized styles + motion values
**Date:** 2026-07-22
**Reviewer:** Trae AI Agent (ui-design-review skill)

---

## Executive Summary

Token system = **partial**. shadcn vars (`--primary`, `--card`, `--foreground`, etc.) drive base color/spacing. `--toc-*` tokens drive TOC gradients. Tailwind theme provides radius/spacing scale. Motion mostly hardcoded.

**Worst offenders:** borders, shadows, animations/durations, neon-button palette, white-alpha borders (`border-white/10`), `bg-card/60` card overlays.

---

## 1. Affected Files & Components

### Components with hardcoded colors / borders / shadows / motion

| File | Component | Category |
|---|---|---|
| [src/index.css](../../../src/index.css) | `.neon-button`, `.interactive-card`, `@keyframes` | **Critical** — neon palette + glow all hardcoded `hsl(220 100% 60%)` etc. |
| [src/features/home/components/Hero.tsx](../../../src/features/home/components/Hero.tsx) | "Claim your access" button L75, secondary btn L85 | Hardcoded primary btn styles |
| [src/features/home/components/RedeemInvitation.tsx](../../../src/features/home/components/RedeemInvitation.tsx) | L20 | neon-button + hardcoded btn |
| [src/features/home/components/ActivateInvitation.tsx](../../../src/features/home/components/ActivateInvitation.tsx) | L19 | neon-button + hardcoded btn |
| [src/features/home/components/Invite.tsx](../../../src/features/home/components/Invite.tsx) | L70, L80 | Hardcoded btns, custom shadow `shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]` |
| [src/features/home/components/MobileCta.tsx](../../../src/features/home/components/MobileCta.tsx) | L7, L18, L24 | Hardcoded btns + custom shadow `shadow-2xl shadow-black/35` |
| [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) | L27, L41, L44, L77 | `bg-[#111111]`, `text-[#f4f2ea]`, `bg-[#168cff]`, `shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)]` |
| [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) | L38, L58, L99, L158 | Hardcoded light-mode colors (`bg-white`, `bg-zinc-100`, `text-zinc-800`, `border-zinc-200`) inside dark theme — **token breach** |
| [src/features/home/components/Features.tsx](../../../src/features/home/components/Features.tsx) | L43, L45 | `border-white/5`, `bg-card/40` |
| [src/features/home/components/Install.tsx](../../../src/features/home/components/Install.tsx) | L46, L101 | `border-white/8`, custom shadow |
| [src/features/coming-soon/ComingSoonPage.tsx](../../../src/features/coming-soon/ComingSoonPage.tsx) | L50, L61 | Hardcoded btns |
| [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) | L17, L38 | `bg-[#0d0e10]`, `border-primary/20` |
| [src/features/coming-soon/components/WorkspaceComposer.tsx](../../../src/features/coming-soon/components/WorkspaceComposer.tsx) | L9 | `bg-white/[0.045]` etc |
| [src/features/coming-soon/components/WorkspaceSidebar.tsx](../../../src/features/coming-soon/components/WorkspaceSidebar.tsx) | L26, L27, L31, L37, L46, L58, L67 | `bg-white/[0.045]` etc |
| [src/features/coming-soon/components/StreamingAssistantResponse.tsx](../../../src/features/coming-soon/components/StreamingAssistantResponse.tsx) | L28, L33, L59 | Hardcoded rgba whites + `duration-500` |
| [src/features/beginner/BeginnerPage.tsx](../../../src/features/beginner/BeginnerPage.tsx) | L46, L56, L99 | Hardcoded btns + `duration-500` |
| [src/features/beginner/components/SafeBuildLoop.tsx](../../../src/features/beginner/components/SafeBuildLoop.tsx) | L86, L98, L155, L157, L168 | Custom shadows with `hsl(var(--primary) / 0.7)` + many `duration-300/500` |
| [src/features/beginner/components/StageSection.tsx](../../../src/features/beginner/components/StageSection.tsx) | L22, L127 | Hardcoded card + label btn |
| [src/components/CopyButton.tsx](../../../src/components/CopyButton.tsx) | L26-30 | Hardcoded `h-12 px-6`, `h-8 px-3` size variants |
| [src/components/consent/CookieConsent.tsx](../../../src/components/consent/CookieConsent.tsx) | L65, L75, L82 | `bg-background/95`, hardcoded btns |
| [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) | L14, L30, L38 | Hardcoded `bg-background/85`, `bg-background/95`, `shadow-2xl shadow-black/40` |
| [src/components/site/DesktopNav.tsx](../../../src/components/site/DesktopNav.tsx) | L18, L40, L43, L51, L58 | Hardcoded link styles + `bg-background`, `shadow-2xl shadow-black/35` |
| [src/components/site/MobileMenuDropdown.tsx](../../../src/components/site/MobileMenuDropdown.tsx) | L11, L27, L36, L58, L60 | Hardcoded colors + `shadow-2xl shadow-black/40` + `duration-200` |
| [src/components/site/Footer.tsx](../../../src/components/site/Footer.tsx) | L11, L30, L41, L52, L70 | `bg-primary/10`, `ring-1 ring-primary/25` |
| [src/components/site/SiteHeader.tsx](../../../src/components/site/SiteHeader.tsx) | L19 | `bg-primary/10`, `ring-1 ring-primary/25` |
| [src/components/site/PageShell.tsx](../../../src/components/site/PageShell.tsx) | L11 | Skip link hardcoded |
| [src/components/seo/EditorialByline.tsx](../../../src/components/seo/EditorialByline.tsx) | L5 | `bg-card/45`, `border-white/10` |
| [src/components/analytics/Analytics.tsx](../../../src/components/analytics/Analytics.tsx) | — | (skipped, low visual surface) |

### CSS files with hardcoded animation/motion values

| File | Issue |
|---|---|
| [src/index.css](../../../src/index.css) L260-266, L290, L329-371, L387-417 | `.neon-button` glow/shadow hardcoded; `@keyframes` durations `3s`, `8s`, `2.4s`, `2.8s`, `12s` magic numbers |
| [src/styles/home-motion.css](../../../src/styles/home-motion.css) | `12s` cycle hardcoded; `700ms`, `900ms`, `6500ms` delays |
| [src/styles/progressive.css](../../../src/styles/progressive.css) L8-9, L26-30, L61, L69, L121-124 | `rgb(255 255 255 / 0.05)`, `180ms`, `140ms`, `1.5rem` hardcoded |
| [src/features/coming-soon/coming-soon.css](../../../src/features/coming-soon/coming-soon.css) L14, L19, L36, L40, L44 | `420ms cubic-bezier(0.22, 1, 0.36, 1)`, `2.4s`, `9s` |
| [src/styles/toc.css](../../../src/styles/toc.css) L41-51 | Per-section gradients hardcoded `hsl()` — but use `--toc-*` tokens (good pattern, but each section uses unique hue = not tokenized) |

---

## 2. Exact Hardcoded Values (Critical)

### A. `.neon-button` palette (index.css L260-262, L274-281, L290, L318-321)
```css
box-shadow: 0 0 20px hsl(220 100% 60% / 0.25), 0 0 40px hsl(280 90% 65% / 0.15);
background: linear-gradient(90deg, transparent 0%, hsl(220 100% 60%) 35%, hsl(280 90% 65%) 50%, hsl(330 95% 65%) 65%, transparent 100%);
animation: neon-shine-sweep 3s linear infinite;
box-shadow (hover): 0 0 20px hsl(220 100% 60% / 0.9), 0 0 40px hsl(280 80% 65% / 0.35), 0 0 60px hsl(330 95% 65% / 0.1);
transition: transform 160ms ease-out, box-shadow 200ms ease-out;
```
No `--neon-blue`, `--neon-violet`, `--neon-pink` vars.

### B. `border-white/10` & friends (14+ files)
`border-white/5`, `border-white/8`, `border-white/10`, `border-white/15`, `border-white/20`, `border-white/25` — 6 different alpha values for "outline" style. Should be `--outline-alpha` or Tailwind `border-border`.

### C. `bg-card/60`, `bg-card/55`, `bg-card/45`, `bg-card/40`, `bg-card/70`
5 alpha variants for "elevated card background". No `--card-overlay` token.

### D. `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/[0.075]`, `bg-white/[0.085]`, `bg-white/[0.09]`, `bg-white/5`
Workspace/coming-soon UI uses raw white alpha — bypasses theme (would be wrong on light mode).

### E. Hex colors that bypass HSL token system
- [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L27: `bg-[#111111]`
- [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L41, L44: `border-[#168cff]`, `bg-[#168cff]`
- [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L77: `text-[#f4f2ea]`
- [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L38, L58, L67, L80, L99, L128, L158: `bg-white`, `text-zinc-800`, `text-zinc-600`, `border-zinc-200`, `bg-zinc-100`, `bg-zinc-50` — **light-mode values inside a dark-only project**
- [src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L17: `bg-[#0d0e10]`

### F. Custom shadows (arbitrary values)
- [src/features/home/components/Invite.tsx](../../../src/features/home/components/Invite.tsx) L28: `shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]`
- [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L27: `shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)]`
- [src/features/home/components/Install.tsx](../../../src/features/home/components/Install.tsx) L101: `shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]`
- [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L38: `shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)]`
- [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L158: `shadow-[0_2px_12px_rgba(0,0,0,0.04)]`
- [src/features/beginner/components/SafeBuildLoop.tsx](../../../src/features/beginner/components/SafeBuildLoop.tsx) L86, L98, L155, L157: `shadow-[0_18px_44px_-28px_hsl(var(--primary)/0.7)]` etc.
- 4× `shadow-2xl shadow-black/35|40` (MobileCta, DesktopNav, MobileMenuDropdown, MobileContentsBar)

### G. Border radius inconsistencies
`rounded-md` (button, input), `rounded-lg` (nav, links, card), `rounded-xl` (CTA btn), `rounded-2xl` (cards), `rounded-3xl` (Invite), `rounded-[2.5rem]` (Invite ambient) — 6 variants for similar surfaces.

### H. Heights / sizes
Button h: `h-8`, `h-9`, `h-10`, `h-11`, `h-12`. No `--btn-h-*` token.

### I. Hardcoded transition durations (in component className)
- `duration-150` (ReadingProgress)
- `duration-200` (5+ sites: MenuLink, TocLink, CopyButton, MobileContentsBar chevron, MobileMenuDropdown summary)
- `duration-300` (Features, SafeBuildLoop)
- `duration-500` (KimiDesktop, CliAnimation, SafeBuildLoop, StreamingAssistantResponse, Invite, BeginnerPage progress)

Plus in CSS: `140ms`, `160ms`, `180ms`, `200ms`, `420ms`, `700ms`, `900ms`, `6500ms`.

### J. Hardcoded easings
`ease-out` (most), `ease-in-out` (drift, pulse-soft, industryx-glow), `linear` (neon, flow-beam, site-header), `cubic-bezier(0.22, 1, 0.36, 1)` (coming-soon-enter). No `--ease-standard`, `--ease-emphasized` tokens.

### K. Orphan `neon-border-spin` keyframe + `@property --neon-angle`
[src/index.css](../../../src/index.css) L246-250, L363-371 — declared but unused after refactor. Dead code.

---

## 3. UI Styles Not Connected to Centralized CSS Tokens

| Value class | Count | Current | Should use |
|---|---|---|---|
| Border white-alpha | ~14 | `border-white/{5,8,10,15,20,25}` | `--outline-alpha` token or `border-border` |
| Card overlay | ~7 | `bg-card/{40,45,55,60,70}` | `--surface-overlay` token |
| Neon glow | 3 sites | `hsl(220 100% 60%)`, `hsl(280 90% 65%)`, `hsl(330 95% 65%)` | `--neon-blue`, `--neon-violet`, `--neon-pink` |
| Custom shadows | 9+ | Arbitrary `shadow-[...]` | `--shadow-elevated`, `--shadow-floating` tokens |
| Workspace white-alpha | 6+ | `bg-white/[0.045..0.09]` | `--workspace-surface` token |
| Light-mode hex | KimiDesktop, CliAnimation | `#111`, `#168cff`, `#f4f2ea`, zinc-* | Should derive from theme |
| Animation durations | 10+ | `3s`, `8s`, `12s`, `180ms`, etc. | `--motion-fast` (150ms), `--motion-base` (200ms), `--motion-slow` (300ms) |
| Easings | 4 distinct | `ease-out`, `ease-in-out`, `linear`, custom cubic | `--ease-standard`, `--ease-emphasized` |

---

## 4. Existing Tokens (Already Centralized — Reuse These)

In [src/index.css](../../../src/index.css) `:root`:
- **shadcn colors:** `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius: 0.75rem`
- **Sidebar:** `--sidebar-*`
- **TOC palette:** `--toc-accent-from`, `--toc-accent-to`, `--toc-glow`
- **Safe-area utilities** (`.pb-safe-2`, `.pt-safe-4` etc.)

Tailwind config:
- `border-border`, `bg-background`, `text-foreground`, etc. (mapped to vars)

**`<Button>` ([src/components/ui/button.tsx](../../../src/components/ui/button.tsx)) = good pattern** — uses cva variants, tokens via Tailwind. Currently unused in feature code (5 hand-coded duplicates).

---

## 5. Missing Tokens (Should Create)

| Token | Purpose | Replaces |
|---|---|---|
| `--outline-alpha: 0.1` | Subtle borders (cards, separators) | `border-white/10`, `border-white/5`, `border-white/8` |
| `--surface-overlay: 0.6` | Elevated card surface | `bg-card/{40,45,55,60,70}` |
| `--surface-elevated: 0.085` | Workspace panels | `bg-white/[0.045..0.09]` |
| `--neon-blue: 220 100% 60%` | Neon accent 1 | inline `hsl(220 100% 60%)` |
| `--neon-violet: 280 90% 65%` | Neon accent 2 | inline `hsl(280 90% 65%)` |
| `--neon-pink: 330 95% 65%` | Neon accent 3 | inline `hsl(330 95% 65%)` |
| `--shadow-elevated: 0 18px 44px -28px hsl(var(--primary) / 0.7)` | Featured card glow | arbitrary shadows |
| `--shadow-floating: 0 32px 90px -24px rgba(0,0,0,0.85)` | Hero preview card | arbitrary shadows |
| `--motion-fast: 150ms` | Hover/micro | `duration-150` |
| `--motion-base: 200ms` | Default state | `duration-200` |
| `--motion-slow: 300ms` | Card morph | `duration-300` |
| `--motion-cycle: 12s` | Looped animations | `12s` magic number |
| `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` | Default | `ease-out` |
| `--ease-emphasized: cubic-bezier(0.22, 1, 0.36, 1)` | Entry animations | custom cubic in coming-soon |
| `--btn-h-sm: 2.25rem` (h-9) | Small btn | `h-9`, `h-10`, `h-11`, `h-12` |
| `--btn-h-md: 2.75rem` (h-11) | Default btn | mixed |
| `--btn-h-lg: 3rem` (h-12) | Large btn | `h-12` |

---

## 6. Prioritized Refactoring Plan

### Phase 1 — Quick Wins (low risk, high impact)

1. **Add 4 outline/overlay tokens** (`--outline-alpha`, `--surface-overlay`, `--surface-elevated`, `--workspace-surface`) → migrate ~25 sites from `border-white/10` family + `bg-card/60` family to `border-outline` + `bg-surface-overlay` Tailwind utilities.
2. **Add 3 neon color tokens** (`--neon-blue`, `--neon-violet`, `--neon-pink`) → refactor `.neon-button` box-shadow + gradient to use vars.
3. **Remove dead code**: orphan `@property --neon-angle` + `neon-border-spin` keyframe in [src/index.css](../../../src/index.css).
4. **Consolidate transition durations**: add `--motion-fast/base/slow` tokens + audit `duration-{150,200,300,500}` → map to closest token.

### Phase 2 — Button System

5. **Add `neon` + `outline` variants to `<Button>`** ([src/components/ui/button.tsx](../../../src/components/ui/button.tsx)) using existing cva pattern.
6. **Migrate 5 hand-coded buttons** (Hero L75, Invite L70, MobileCta L18, CookieConsent L75, WorkspaceSidebar CTA) → `<Button variant="default" size="lg">`.
7. **Migrate 2 neon-buttons** (RedeemInvitation, ActivateInvitation) → `<Button variant="neon">`.
8. **Migrate 4 outline buttons** (Hero L85, Invite L80, MobileCta L24, CookieConsent L82) → `<Button variant="outline">`.
9. **Migrate Coming Soon btns** (L50, L61) + BeginnerPage (L46, L56) → `<Button>`.

### Phase 3 — Motion + Shadow Tokens

10. **Add motion tokens** (`--motion-cycle`, `--ease-standard`, `--ease-emphasized`) → replace magic durations in [src/styles/home-motion.css](../../../src/styles/home-motion.css), [src/styles/progressive.css](../../../src/styles/progressive.css), [src/features/coming-soon/coming-soon.css](../../../src/features/coming-soon/coming-soon.css).
11. **Add 2 shadow tokens** (`--shadow-elevated`, `--shadow-floating`) → replace 6 arbitrary `shadow-[...]` expressions (Invite, CliAnimation, Install, KimiDesktop).

### Phase 4 — Theme-Breaching Hex Values (highest risk)

12. **Extract CliAnimation hex** ([src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L27, L41, L44, L77) → add `--terminal-bg`, `--terminal-accent` tokens. Or mark component as intentionally non-themed (terminal mockup).
13. **Extract KimiDesktop zinc/white palette** ([src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L38, L58-158) → either add a `--desktop-mock-*` token set, or accept it as a "fake desktop screenshot" mockup (intentional brand violation).
14. **SimulatedAiDesktop bg-[#0d0e10]** ([src/features/coming-soon/components/SimulatedAiDesktop.tsx](../../../src/features/coming-soon/components/SimulatedAiDesktop.tsx) L17) → `--terminal-surface` token.

### Phase 5 — Radius + Height Tokens

15. **Add `--radius-sm/md/lg`** if project wants to enforce (current `--radius: 0.75rem` single var). Optional — Tailwind defaults may suffice.
16. **Add `--btn-h-{sm,md,lg}`** + migrate scattered `h-{9,10,11,12}` button heights.

---

## 7. Severity Heatmap

| Severity | Issue | Sites |
|---|---|---|
| Critical | Hardcoded hex/zinc in dark theme | 2 files (KimiDesktop, CliAnimation) |
| High | Neon palette not tokenized | 1 file (index.css), 3+ duplicate sites |
| High | Workspace `bg-white/[...]` bypasses theme | 3 files |
| Medium | `border-white/{5..25}` 6 variants | 14+ files |
| Medium | Custom arbitrary shadows | 9+ files |
| Medium | Button duplicates instead of `<Button>` | 5 files |
| Low | Animation durations scattered | 10+ files |
| Low | Border-radius inconsistencies | 6 variants |
| Low | Dead `neon-border-spin` code | 1 file |

---

## 8. Limitations of This Audit

- **Partial scope** — covered hardcoded UI values only. Not audited: typography (font sizes/weights/line-heights), spacing scale (gap/padding/margin values), layout dimensions (widths/max-widths), responsive breakpoint patterns, z-index values, icon sizes, asset/image dimensions, accessibility contrast ratios.
- **No live page inspection** — audit based on file contents only, no rendered output verified.
- **No runtime cost analysis** — token impact on bundle size or render perf not measured.