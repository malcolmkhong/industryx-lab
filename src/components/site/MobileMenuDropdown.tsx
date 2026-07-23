import { ChevronDown, Menu, X } from "lucide-react";
import { MenuLink } from "@/components/ui/MenuLink";
import { navigationGroups, routePaths } from "@/config/routes";

export function MobileMenuDropdown() {
  return (
    <details
      className="mobile-navigation group/mobile md:hidden"
      data-mobile-navigation
    >
      <summary
        role="button"
        aria-label="Open menu"
        className="fixed right-3 top-2.5 z-floating inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation group-open/mobile:invisible sm:right-5 [&::-webkit-details-marker]:hidden"
      >
        <Menu className="w-7 h-7" aria-hidden="true" />
      </summary>

      <div className="fixed inset-0 z-nav">
        <button
          type="button"
          className="absolute inset-0 backdrop-blur-sm bg-black/55"
          aria-label="Close menu backdrop"
          data-mobile-navigation-close
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="mobile-navigation-sheet fixed right-3 top-16 max-h-[min(70dvh,32rem)] w-[min(calc(100dvw-1.5rem),20rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-background p-2 shadow-2xl shadow-black/40 [scrollbar-gutter:stable] sm:right-5"
          data-mobile-navigation-sheet
        >
          <div className="flex justify-between items-center px-3 pt-1 mb-1">
            <span className="flex items-center gap-2 font-mono text-mockup-2xs font-semibold tracking-eyebrow text-muted-foreground">
              MENU
            </span>
            <button
              type="button"
              className="inline-flex justify-center items-center w-8 h-8 rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation"
              aria-label="Close menu"
              data-mobile-navigation-close
              data-mobile-navigation-close-button
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <nav
            className="flex flex-col flex-1"
            aria-label="Mobile navigation links"
          >
            <MenuLink
              href={routePaths.home}
              label="HOME"
              size="md"
              className="mb-0.5 font-semibold !text-foreground"
            />

            {navigationGroups.map((group) => (
              <details key={group.id} className="group/mobile-group py-0.5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg border border-transparent bg-transparent px-3 py-2 text-left text-sm font-semibold text-foreground transition-colors duration-base focus-visible-ring touch-manipulation [&::-webkit-details-marker]:hidden">
                  <span>{group.label}</span>
                  <ChevronDown
                    className="w-4 h-4 transition-transform shrink-0 text-muted-foreground group-open/mobile-group:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="space-y-0.5 pb-1 pl-3">
                  {group.items.map((item) => (
                    <MenuLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                    />
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </div>
      </div>
    </details>
  );
}
