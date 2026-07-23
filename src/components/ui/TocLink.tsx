import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { TOC_LINK_SIZE_CLASSES, TOC_LINK_TOKENS } from './linkStyles'

export type TocLinkSize = keyof typeof TOC_LINK_SIZE_CLASSES

export interface TocLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> {
  /** Section id used both as `href="#{id}"` and as the `data-toc-link` value. */
  id: string
  label: ReactNode
  size?: TocLinkSize
  className?: string
}

/**
 * In-page TOC entry. Renders as `<a href="#{id}">` with the `data-toc-link`
 * attribute used by the scroll observer in lib/browser/progressiveEnhancements
 * to flip `data-active="true"` as the reader scrolls past the section.
 *
 * Visual contract:
 *   - Muted text by default.
 *   - Gradient + glow + border tint per section, applied by the central
 *     CSS rule in styles/toc.css — colors read from --toc-* tokens in
 *     index.css so future palette tweaks land in one place.
 *   - Two sizes: `sm` for grouped items, `md` for top-level entries.
 *
 * Route-bound links (mobile menu HOME, group headers) use MenuLink instead,
 * since they navigate between pages rather than scroll inside one.
 */
export function TocLink({ id, label, size = 'sm', className = '', ...rest }: TocLinkProps) {
  return (
    <a
      href={`#${id}`}
      data-toc-link={id}
      style={TOC_LINK_TOKENS}
      className={[
        'toc-link relative block rounded-lg border border-transparent bg-transparent text-muted-foreground transition-colors duration-base focus-visible-ring',
        TOC_LINK_SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="relative z-10 block truncate">{label}</span>
    </a>
  )
}