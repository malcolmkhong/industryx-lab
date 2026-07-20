import type { CSSProperties } from 'react'

/**
 * Inline CSS custom-property overrides applied per-link. The visual rules
 * in styles/toc.css read these variables to draw the gradient + glow + border
 * without each component restating the same string literals.
 *
 * Cast to React.CSSProperties so TypeScript's strict type for inline style
 * objects accepts custom-property keys (which React doesn't enumerate).
 */
export const TOC_LINK_TOKENS = {
  '--toc-from': 'hsl(var(--toc-accent-from) / 0.18)',
  '--toc-to': 'hsl(var(--toc-accent-to) / 0.12)',
  '--toc-border': 'hsl(var(--toc-accent-from) / 0.45)',
  '--toc-shadow': '0 0 24px -6px hsl(var(--toc-glow) / 0.55)',
} as CSSProperties

/**
 * Shared size variants for TocLink and MenuLink. The visual contract is
 * documented on TocLink; MenuLink mirrors it because the two primitives
 * stay visually identical by design.
 */
export const TOC_LINK_SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm leading-snug',
  md: 'px-3 py-2.5 text-sm font-medium',
} as const