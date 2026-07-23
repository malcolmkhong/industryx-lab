# UI Design Audit — Phase 3

**Project:** kimi-beginner-guide-hub
**Scope:** Inline styles, transition-property usage, focus-ring patterns, max-width consistency, disabled states, loading/empty patterns, form states, semantic color usage, icon sizes, aspect ratios, accessibility contrast, breakpoint patterns
**Date:** 2026-07-22
**Reviewer:** Trae AI Agent

---

## Executive Summary

Phase 3 surfaces **interactive-state inconsistencies** (focus rings, hover patterns), **no loading/empty patterns**, **no skeleton system**, **ad-hoc transition-property choices**, **icon-size inconsistency within same context**, and **max-width values chosen ad-hoc**. Inline style usage = minimal (4 sites, all justified). Disabled-state styling = inconsistent. Form error/success styling = missing outside `ui/` primitives.

---

## 1. Inline Styles

| File:Line                                                                                                             | Inline value              | Justified? | Note                                                             |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- | ---------------------------------------------------------------- |
| [src/components/ui/TocLink.tsx](../../../src/components/ui/TocLink.tsx) L34                                           | `style={TOC_LINK_TOKENS}` | Yes        | CSS custom props for per-element gradient direction (documented) |
| [src/components/ui/MenuLink.tsx](../../../src/components/ui/MenuLink.tsx) L26                                         | `style={TOC_LINK_TOKENS}` | Yes        | Same as TocLink                                                  |
| [src/features/beginner/BeginnerPage.tsx](../../../src/features/beginner/BeginnerPage.tsx) L99                         | `style={{ width: '0%' }}` | Yes        | Initial JS-controlled width on progress fill                     |
| [src/components/Reveal.tsx](../../../src/components/Reveal.tsx) L21                                                   | `style={style}`           | Yes        | Pass-through prop (delay/duration for scroll animation)          |
| [src/features/beginner/components/SafeBuildLoop.tsx](../../../src/features/beginner/components/SafeBuildLoop.tsx) L78 | `style={pointerStyle}`    | Yes        | Per-step CSS custom props for animated pointer position          |

**All inline styles justified.** No leaky layout values.

---

## 2. Transition-Property Choices (Inconsistent)

### Inventory of `transition-*` classes used

| Class                                                             | Sites | Purpose                                         |
| ----------------------------------------------------------------- | ----- | ----------------------------------------------- |
| `transition-all`                                                  | 13    | One-size-fits-all (costly: animates everything) |
| `transition-colors`                                               | 12    | Color changes only                              |
| `transition-transform`                                            | 3     | Transform only (rotation, scale)                |
| `transition-opacity`                                              | 2     | Opacity only                                    |
| `transition-[width]`                                              | 1     | Custom property                                 |
| `transition-[transform,border-color,background-color,box-shadow]` | 1     | Custom multi-prop                               |
| `transition-[color,box-shadow]`                                   | 2     | Custom multi-prop                               |

**Files using `transition-all` (broad, paints everything):**

- [src/components/ui/button.tsx](../../../src/components/ui/button.tsx) L8
- [src/components/CopyButton.tsx](../../../src/components/CopyButton.tsx) L45
- [src/features/home/components/Hero.tsx](../../../src/features/home/components/Hero.tsx) L75 (primary btn)
- [src/features/home/components/MobileCta.tsx](../../../src/features/home/components/MobileCta.tsx) L18, L24
- [src/features/home/components/Invite.tsx](../../../src/features/home/components/Invite.tsx) L70
- [src/features/home/components/Features.tsx](../../../src/features/home/components/Features.tsx) L43
- [src/features/home/components/CliAnimation.tsx](../../../src/features/home/components/CliAnimation.tsx) L64, L77
- [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L95, L106, L128
- [src/features/coming-soon/components/StreamingAssistantResponse.tsx](../../../src/features/coming-soon/components/StreamingAssistantResponse.tsx) L28, L33, L59

**Issues:**

- `transition-all` is wasteful when only color or transform changes (forces compositor to repaint everything)
- `Features.tsx` L43 uses `transition-all` but only modifies `transform/border/bg/color` on hover
- Buttons (5 sites) use `transition-all` but only modify `bg-color` + `active:scale`

---

## 3. Focus-Ring Pattern Inconsistency

### Two patterns in use:

**Pattern A — Utility class `.focus-visible-ring`** (from [src/index.css](../../../src/index.css) L156-157):

```css
.focus-visible-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
}
```

**Used by:** Most components (Footer, DesktopNav, MenuLink, TocLink, CookieConsent, Hero btns, Invite btns, MobileCta, ComingSoonPage, BeginnerPage, SimulatedAiDesktop, WorkspaceSidebar, CopyButton, all neon-buttons, all secondary btns)

**Pattern B — Inline `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`** (raw Tailwind):

- [src/components/content/MobileContentsBar.tsx](../../../src/components/content/MobileContentsBar.tsx) L14 (the `<details>` summary)
- [src/components/ui/dialog.tsx](../../../src/components/ui/dialog.tsx) L70 (close button)
- [src/features/home/components/Features.tsx](../../../src/features/home/components/Features.tsx) L45, L72 (icon containers + link)

**Pattern C — shadcn primitives** (`focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`):

- [src/components/ui/button.tsx](../../../src/components/ui/button.tsx) L8
- [src/components/ui/input.tsx](../../../src/components/ui/input.tsx) L12
- [src/components/ui/textarea.tsx](../../../src/components/ui/textarea.tsx) L10

**Issues:**

- 3 distinct ring widths: `ring-2` (Pattern A), `ring-2` (Pattern B), `ring-[3px]` (Pattern C)
- 3 distinct ring opacities: `ring-ring` (full), `ring-ring/50` (50%)
- 3 distinct offsets: `ring-offset-2` (A, B), none (C)

**Decision needed:** pick one canonical focus-ring pattern. shadcn's `ring-3 ring-ring/50` is unique to form controls (intentional). Surface-level controls should use `focus-visible-ring` utility.

---

## 4. Hover / Active State Coverage

| Component                                                                                      | Hover?                                                 | Active?                                   | Disabled?                                              |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------ |
| `<Button>` shadcn                                                                              | yes (`hover:bg-primary/90`)                            | no                                        | yes (`disabled:opacity-50`)                            |
| Hand-coded primary btns (Hero, Invite, MobileCta, CookieConsent, ComingSoonPage, BeginnerPage) | yes (`hover:bg-primary/90`)                            | yes (`active:scale-[0.97]`)               | **missing**                                            |
| Neon-buttons (RedeemInvitation, ActivateInvitation)                                            | yes (via `.neon-button:hover` box-shadow)              | yes (via `.neon-button:active` transform) | missing                                                |
| Outline btns (Hero L85, Invite L80, etc.)                                                      | yes (`hover:border-white/20`, `hover:text-foreground`) | no                                        | **missing**                                            |
| CookieBanner btns (CookieConsent.tsx)                                                          | yes                                                    | no                                        | missing                                                |
| WorkspaceSidebar disabled buttons                                                              | N/A                                                    | N/A                                       | yes (`disabled:opacity-75`, `disabled:cursor-default`) |
| WorkspaceComposer disabled inputs/buttons                                                      | N/A                                                    | N/A                                       | yes (`disabled:cursor-not-allowed`)                    |

**Issue:** Hand-coded buttons skip `disabled:` styles entirely. Will render as fully interactive if accidentally not disabled.

---

## 5. Disabled State Coverage

**Components with disabled styles:**

- shadcn `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `toggle.tsx` — uniform `disabled:opacity-50 disabled:pointer-events-none` (or `disabled:cursor-not-allowed`).
- [src/features/coming-soon/components/WorkspaceSidebar.tsx](../../../src/features/coming-soon/components/WorkspaceSidebar.tsx) — ad-hoc `disabled:opacity-75`, `disabled:cursor-default`
- [src/features/coming-soon/components/WorkspaceComposer.tsx](../../../src/features/coming-soon/components/WorkspaceComposer.tsx) — ad-hoc `disabled:cursor-not-allowed`, `disabled:opacity-65`

**Inconsistencies:**

- 3 different disabled-opacity values: `0.5`, `0.65`, `0.75`
- 2 different disabled-cursor values: `not-allowed`, `default`

**Recommendation:** extract `.btn-disabled` utility (or apply shadcn pattern uniformly).

---

## 6. Loading / Empty / Skeleton Patterns

**Searched for `Skeleton` / `skeleton`:** No matches. No `<Skeleton>` component, no skeleton utility.

**Loading indicators in code:**

- [src/features/home/components/KimiDesktop.tsx](../../../src/features/home/components/KimiDesktop.tsx) L173: `<LoaderCircle className="h-3 w-3 animate-spin" />` (one-off, ad-hoc)
- All other loading states use `transition-all` to fade-in content once data arrives
- No `<Skeleton>` primitive from shadcn installed (although `cmdk`, `sonner`, `vaul` are installed)

**Empty state patterns:**

- [src/app/not-found.tsx](../../../src/app/not-found.tsx) — bespoke 404 page (good)
- No reusable `<EmptyState>` component
- No empty state pattern for Beginners page (e.g., when stages complete)

**Recommendation:** Add shadcn `<Skeleton>`, `<Empty>`, or build site-specific components.

---

## 7. Form States (Error/Success)

**`aria-invalid` ring:**

- Only in [src/components/ui/button.tsx](../../../src/components/ui/button.tsx), [input.tsx](../../../src/components/ui/input.tsx), [textarea.tsx](../../../src/components/ui/textarea.tsx) — `aria-invalid:ring-destructive/20`

**Form components used in features:**

- [src/components/CopyButton.tsx](../../../src/components/CopyButton.tsx) — has success state via `[data-copied='true']` (good pattern)
- No actual `<form>` elements with `useForm` + Zod validation in any feature (despite `react-hook-form` + `zod` being installed)

**Gap:** No form component composition examples in feature code.

---

## 8. Semantic Color Usage

### `bg-primary/10`, `bg-primary/15`, `bg-primary/20`, `bg-primary/25`, `bg-primary/35`, `bg-primary/40`, `bg-primary/45`, `bg-primary/65`, `bg-primary/70`, `bg-primary/75`, `bg-primary/90`, `bg-primary/100`

Used for: hover backgrounds, active states, focused borders, muted primary, primary borders.

**Distinct alpha values:** 12+ (for same brand color, representing subtle visual states)

**Recommendations:**
| Alpha | Intent | Token |
|---|---|---|
| `bg-primary/10` | Hover background (subtle) | `--surface-hover` |
| `bg-primary/15` | Hover background (subtle+) | `--surface-hover` |
| `bg-primary/20` | Border / hover (medium) | `--surface-active-border` |
| `bg-primary/25` | Badge background | `--surface-badge` |
| `bg-primary/35` | Active border | `--surface-active-border-strong` |
| `bg-primary/45` | Strong active border | `--surface-focus-ring` |

But too many specific tokens may add complexity. Alternative: enforce 3 buckets: `bg-primary/10` (subtle), `bg-primary/25` (medium), `bg-primary/45` (strong).

---

## 9. Max-Width Consistency

### Inventory

| Class                              | Sites                          | Purpose                                           |
| ---------------------------------- | ------------------------------ | ------------------------------------------------- |
| `max-w-3xl`                        | 9+                             | Reading text width (768px)                        |
| `max-w-4xl`                        | 2 (BeginnerPage L36, L64)      | Hero/byline width (896px)                         |
| `max-w-6xl`                        | 9+                             | Container max width (1152px) — site-wide standard |
| `max-w-2xl`                        | 1 (SectionHeading)             | Heading width (672px)                             |
| `max-w-xl`                         | 3                              | Sub-heading / sub-text (576px)                    |
| `max-w-lg`                         | 3 (Hero, Invite, dialog)       | Paragraph width (512px)                           |
| `max-w-md`                         | 1 (CookieConsent)              | Compact width (448px)                             |
| `max-w-sm`                         | 1 (Invite card)                | Card width (384px)                                |
| `max-w-[68ch]`, `[65ch]`, `[66ch]` | 3 (ComingSoonPage)             | Reading-width text                                |
| `max-w-[85%]`                      | 1 (KimiDesktop)                | Chat bubble width                                 |
| `max-w-[88%]`                      | 1 (StreamingAssistantResponse) | Chat bubble width                                 |
| `max-w-[calc(100%-2rem)]`          | 1 (dialog)                     | Responsive modal                                  |

**Distinct values:** 12

**Pattern observed:**

- `max-w-6xl` = standard page container (consistent)
- `max-w-3xl` / `max-w-4xl` = reading content width (consistent in BeginnerPage)
- `max-w-lg` / `max-w-xl` / `max-w-2xl` = body copy / sub-headings (3 different for similar purposes)

**Gap:** No token for "body copy max-width". Pick one canonical value.

---

## 10. Icon Sizes

### lucide-react sizes used

| Size                      | Sites | Typical use                                                          |
| ------------------------- | ----- | -------------------------------------------------------------------- |
| `h-3 w-3` (12px)          | ~10   | Micro icons (KimiDesktop internals)                                  |
| `h-3.5 w-3.5` (14px)      | ~5    | Small UI icons (ChevronDown, Sparkles, ExternalLink)                 |
| `h-4 w-4` (16px)          | ~12   | Standard UI icons (ArrowRight, ArrowUpRight, Plus, Github)           |
| `h-5 w-5` (20px)          | ~3    | Feature icons (Features.tsx L48, Desktop.tsx L24, MobileCta ArrowUp) |
| `h-3 w-3.5` (rectangular) | 0     | —                                                                    |

**Issues:**

- Inconsistent sizing within same context: e.g., Footer chevron + Hero Sparkles both use `h-3.5`, but Footer uses `h-4` for arrows in other places
- `[&_svg]:size-4` is shadcn default (button.tsx L8) — implicit 16px in buttons
- Banner image used `h-4 w-4` (Invite L74, L82) for icon — but Features uses `h-5 w-5` for feature icon

**Recommendation:** standardize on 3 sizes: `xs (12px)`, `sm (16px)`, `md (20px)` for lucide icons. Use `h-3.5` only for chevrons (intentional smaller chevron pattern).

---

## 11. Aspect Ratios / Image Sizing

### Image sizing patterns

| File:Line                                                                                          | Class                                            | Intent                    |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------- |
| [src/features/beginner/BeginnerPage.tsx](../../../src/features/beginner/BeginnerPage.tsx) L72      | `aspect-[16/8] w-full object-cover`              | Hero diagram (16:8 ratio) |
| [src/features/home/components/Install.tsx](../../../src/features/home/components/Install.tsx) L101 | `w-full rounded-3xl object-cover`                | Free aspect               |
| [src/features/home/components/Invite.tsx](../../../src/features/home/components/Invite.tsx) L28    | `w-full rounded-3xl object-cover`                | Free aspect               |
| [src/features/home/components/Banner.tsx](../../../src/features/home/components/Banner.tsx) L11    | `h-full w-full object-cover object-[center_68%]` | Free aspect               |

**Only 1 explicit aspect ratio** (`16/8`). Other images rely on intrinsic sizing — risk of CLS (Cumulative Layout Shift). No fixed `aspect-ratio` token.

---

## 12. Breakpoint Usage Patterns

### Tailwind breakpoints observed

| Breakpoint               | Sites | Purpose                                   |
| ------------------------ | ----- | ----------------------------------------- |
| (default / mobile-first) | all   | Base styles                               |
| `sm:` (≥640px)           | ~12   | Padding adjustments, reveal switches      |
| `md:` (≥768px)           | ~6    | Typography scaling, grid switches         |
| `lg:` (≥1024px)          | ~3    | Desktop nav visibility, grid switches     |
| `xl:` (≥1280px)          | ~5    | TOC visibility (`xl:block` / `xl:hidden`) |

**Custom breakpoints in `tailwind.config.js`:** Not checked. Verify project defaults.

**Issues:**

- `MobileContentsBar.tsx` L9 uses `xl:hidden`; `TableOfContents.tsx` L11 uses `xl:block` — clean pairing.
- Most sites use `sm:` then `md:` then `lg:` (Tailwind default order). Some skip `lg:` and jump to `xl:` (e.g., ContentSidebar uses `xl:block` directly). Consistent.

---

## 13. Accessibility Contrast (Not Measured)

Not measured — would require browser tooling. Likely issues:

- `text-muted-foreground/70` (StreamingAssistantResponse L40), `/75` (ComingSoonPage L36), `/80` (multiple) — reduced opacity on body text = potential WCAG AA fail (4.5:1 minimum for normal text).
- `text-foreground/80` (Hero L85) — 80% foreground on dark bg may fail AA for small text.
- `bg-card/40` text contrast (Features.tsx L43) — depends on underlying bg.

**Recommendation:** run Lighthouse or axe-core for actual contrast ratios.

---

## 14. Missing Tokens (Should Create)

| Token                                              | Purpose                    | Replaces                                  |
| -------------------------------------------------- | -------------------------- | ----------------------------------------- |
| `--transition-fast: 150ms`                         | Default micro transition   | magic `150ms`                             |
| `--transition-base: 200ms`                         | Default state transition   | magic `200ms`                             |
| `--focus-ring-width: 2px`                          | Surface focus ring         | `ring-2` (A,B), `ring-[3px]` (C)          |
| `--focus-ring-offset: 2px`                         | Focus ring offset          | `ring-offset-2`                           |
| `--disabled-opacity: 0.5`                          | Disabled state             | `0.5`, `0.65`, `0.75`                     |
| `--max-w-prose: 48rem` (max-w-3xl)                 | Body text width            | `max-w-3xl` (768px) — confirm with design |
| `--max-w-container: 72rem` (max-w-6xl)             | Page container             | `max-w-6xl` (1152px)                      |
| `--max-w-card: 24rem` (max-w-sm)                   | Card width                 | `max-w-sm`                                |
| `--surface-hover: hsl(var(--primary) / 0.1)`       | Hover background           | `bg-primary/{10,15}`                      |
| `--surface-active: hsl(var(--primary) / 0.25)`     | Active background          | `bg-primary/{20,25}`                      |
| `--surface-focus-ring: hsl(var(--primary) / 0.45)` | Focus ring + active border | `bg-primary/{35,40,45}`                   |

---

## 15. Prioritized Refactoring Plan (Phase 3)

### Phase 3.1 — Transition Simplification (15 min, low risk)

1. Replace `transition-all` in 13 sites with narrowest matching class (`transition-colors`, `transition-transform`, `transition-opacity`, or `transition-[color,background-color,border-color]`).

### Phase 3.2 — Focus Ring Unification (10 min, medium risk)

2. Migrate 5 sites using inline `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` → `.focus-visible-ring` utility.
3. Document that shadcn primitives keep their unique `ring-3 ring-ring/50` (form-control specific).

### Phase 3.3 — Disabled State Standardization (10 min, low risk)

4. Migrate WorkspaceSidebar/Composer ad-hoc `disabled:opacity-{65,75}` → `disabled:opacity-50` for consistency with shadcn.

### Phase 3.4 — Max-Width Tokens (10 min, low risk)

5. Add `--max-w-prose`, `--max-w-container`, `--max-w-card` CSS vars + Tailwind config aliases.
6. Migrate 9+ `max-w-3xl` → `max-w-prose`.

### Phase 3.5 — Icon Size Standardization (30 min, medium risk)

7. Document: lucide icons use `size-3` (12px, micro), `size-4` (16px, default), `size-5` (20px, feature).
8. Migrate `h-3.5 w-3.5` (5 sites) → `h-3 w-3` for non-chevron icons.

### Phase 3.6 — Surface Hover/Active Tokens (20 min, medium risk)

9. Add 3 surface tokens: `--surface-hover`, `--surface-active`, `--surface-focus-ring`.
10. Migrate `bg-primary/{10,15,20,25,35,40,45}` → `bg-surface-{hover,active,focus-ring}`.

### Phase 3.7 — Loading/Empty Patterns (1-2 hours, feature work)

11. Install shadcn `<Skeleton>` + `<Empty>` (or build custom).
12. Replace KimiDesktop L173 ad-hoc spinner with reusable component.
13. Document empty-state pattern for Beginners flow.

---

## 16. Severity Heatmap

| Severity | Issue                                            | Sites               |
| -------- | ------------------------------------------------ | ------------------- |
| Medium   | `transition-all` overuse (forces broad repaints) | 13                  |
| Medium   | Focus-ring pattern split (3 distinct)            | 5 non-utility sites |
| Medium   | Surface alpha scale (12+ variants)               | 20+                 |
| Medium   | Icon size inconsistency                          | 8                   |
| Low      | Disabled opacity inconsistency                   | 2 files             |
| Low      | Max-width values ad-hoc                          | 12                  |
| Low      | No loading/empty/skeleton patterns               | whole project       |
| Low      | No aspect-ratio token                            | 1 site              |

---

## 17. Limitations

- No contrast measurement performed (would need browser tooling).
- No breakpoint config audit performed (only Tailwind defaults assumed).
- No real-component interaction audit (e.g., focus trap in dialogs, keyboard navigation).
- Skeleton/empty/loading patterns mostly absence-of-feature, not bugs.
- Inline styles all justified — no remediation needed.
