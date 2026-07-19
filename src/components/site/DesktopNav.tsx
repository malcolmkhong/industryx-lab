import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { navigationGroups, routePaths } from '@/config/routes'

export function DesktopNav() {
  return (
    <nav
      className="hidden items-center gap-1 justify-self-center text-sm text-muted-foreground md:flex"
      aria-label="Main navigation"
      data-desktop-navigation
    >
      <Link
        href={routePaths.home}
        data-nav-exact={routePaths.home}
        className="nav-main-link rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation"
      >
        HOME
      </Link>

      {navigationGroups.map((group) => (
        <div
          key={group.id}
          className="nav-dropdown-group relative"
          data-nav-prefix={group.pathPrefix}
        >
          <button
            id={`${group.id}-trigger`}
            type="button"
            aria-expanded="false"
            aria-controls={`${group.id}-menu`}
            aria-haspopup="menu"
            data-nav-trigger
            className="inline-flex items-center gap-1 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation"
          >
            {group.label}
            <ChevronDown className="nav-dropdown-chevron h-3.5 w-3.5 transition-transform" aria-hidden="true" />
          </button>

          <div className="nav-dropdown-menu absolute left-0 top-full w-52 pt-2">
            <div
              id={`${group.id}-menu`}
              role="menu"
              aria-labelledby={`${group.id}-trigger`}
              className="rounded-xl border border-white/10 bg-card/95 p-1.5 shadow-2xl shadow-black/35 backdrop-blur-xl"
            >
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible-ring"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}
