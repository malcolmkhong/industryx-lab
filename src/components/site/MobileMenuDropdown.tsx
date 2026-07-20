import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { CSSProperties } from 'react'
import { navigationGroups, routePaths } from '@/config/routes'

const LINK_TOKENS = {
  '--toc-from': 'hsl(var(--toc-accent-from) / 0.18)',
  '--toc-to': 'hsl(var(--toc-accent-to) / 0.12)',
  '--toc-border': 'hsl(var(--toc-accent-from) / 0.45)',
  '--toc-shadow': '0 0 24px -6px hsl(var(--toc-glow) / 0.55)',
} as CSSProperties

export function MobileMenuDropdown() {
  return (
    <details className="mobile-navigation group/mobile md:hidden" data-mobile-navigation>
      <summary
        role="button"
        aria-label="Open menu"
        className="fixed right-3 top-2.5 z-[70] inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation group-open/mobile:invisible sm:right-5 [&::-webkit-details-marker]:hidden"
      >
        <Menu className="h-7 w-7" aria-hidden="true" />
      </summary>

      <div className="fixed inset-0 z-[60]">
        <button
          type="button"
          className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          aria-label="Close menu backdrop"
          data-mobile-navigation-close
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="mobile-navigation-sheet fixed right-3 top-16 max-h-[min(70vh,32rem)] w-[min(calc(100vw-1.5rem),20rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-background p-2 shadow-2xl shadow-black/40 [scrollbar-gutter:stable] sm:right-5"
          data-mobile-navigation-sheet
        >
          <div className="mb-2 flex items-center justify-between px-3 pt-1">
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              MENU
            </span>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation"
              aria-label="Close menu"
              data-mobile-navigation-close
              data-mobile-navigation-close-button
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav
            className="relative flex flex-col pl-6"
            aria-label="Mobile navigation links"
          >
            <span
              className="absolute bottom-1 left-[7px] top-1 w-px bg-white/10"
              aria-hidden="true"
            />

            <Link
                          href={routePaths.home}
                          style={LINK_TOKENS}
                          className="toc-link relative -ml-6 mb-1 block rounded-lg border border-transparent bg-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 focus-visible-ring"
                        >
                          <span className="relative z-10 block">HOME</span>
                        </Link>

                        {navigationGroups.map((group) => (
                          <details key={group.id} className="group/mobile-group -ml-6 border-t border-white/5 py-1">
                            <summary
                              style={LINK_TOKENS}
                              className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-transparent bg-transparent px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors duration-200 focus-visible-ring [&::-webkit-details-marker]:hidden"
                            >
                              <span className="relative z-10">{group.label}</span>
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open/mobile-group:rotate-180" aria-hidden="true" />
                            </summary>
                            <div className="relative space-y-0.5 pb-2 pl-3">
                              <span
                                className="absolute bottom-1 left-[7px] top-1 w-px bg-white/10"
                                aria-hidden="true"
                              />
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  style={LINK_TOKENS}
                                  className="toc-link relative block rounded-lg border border-transparent bg-transparent px-3 py-1.5 text-sm leading-snug text-muted-foreground transition-colors duration-200 focus-visible-ring"
                                >
                                  <span className="relative z-10 block truncate">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </details>
                        ))}
          </nav>
        </div>
      </div>
    </details>
  )
}