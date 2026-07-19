import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navigationGroups, routePaths } from '@/config/routes'

export function MobileNav() {
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
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          aria-label="Close menu backdrop"
          data-mobile-navigation-close
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="absolute inset-y-0 right-0 h-dvh w-full max-w-sm overflow-y-auto border-l border-white/10 bg-background p-5 sm:max-w-md sm:p-6"
        >
          <div className="flex h-full flex-col">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold tracking-widest">MENU</span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation"
                aria-label="Close menu"
                data-mobile-navigation-close
                data-mobile-navigation-close-button
              >
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col" aria-label="Mobile navigation links">
              <Link
                href={routePaths.home}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 focus-visible-ring"
              >
                HOME
              </Link>

              {navigationGroups.map((group, index) => (
                <details key={group.id} className="group border-t border-white/5 py-1" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-primary/10 focus-visible-ring [&::-webkit-details-marker]:hidden">
                    {group.label}
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="space-y-1 pb-2 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible-ring"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </details>
  )
}
