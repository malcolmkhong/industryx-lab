import type { AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { TOC_LINK_SIZE_CLASSES, TOC_LINK_TOKENS } from './linkStyles'

export type MenuLinkSize = keyof typeof TOC_LINK_SIZE_CLASSES

export interface MenuLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> {
  href: string
  label: ReactNode
  size?: MenuLinkSize
  className?: string
}

/**
 * Route-bound nav entry. Renders via next/link for client-side navigation.
 * Shares the same visual contract as TocLink (gradient + glow + border on
 * hover), so the mobile menu and the in-page jump-to stay visually
 * consistent without duplicating utility strings.
 *
 * See styles/toc.css for the hover treatment.
 */
export function MenuLink({ href, label, size = 'sm', className = '', ...rest }: MenuLinkProps) {
  return (
    <Link
      href={href}
      style={TOC_LINK_TOKENS}
      className={[
        'toc-link relative block rounded-lg border border-transparent bg-transparent text-muted-foreground transition-colors duration-200 focus-visible-ring',
        TOC_LINK_SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="relative z-10 block truncate">{label}</span>
    </Link>
  )
}