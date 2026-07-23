import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigationGroups, routePaths } from "@/config/routes";

export function DesktopNav() {
  const groups = navigationGroups;
  const lastIndex = groups.length - 1;

  return (
    <nav
      className="hidden gap-1 justify-self-center items-center text-sm text-muted-foreground md:flex"
      aria-label="Main navigation"
      data-desktop-navigation
    >
      <Link
        href={routePaths.home}
        data-nav-exact={routePaths.home}
        className="px-3 py-2 rounded-lg border border-transparent transition-colors nav-main-link hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation"
      >
        HOME
      </Link>

      {groups.map((group, index) => {
        // Anchor the rightmost popover to its right edge so the menu does not
        // overflow the header container on narrow desktop viewports. Inner
        // groups keep the default left-anchored positioning.
        const menuPositionClass = index === lastIndex ? "right-0" : "left-0";
        return (
          <div
            key={group.id}
            className="relative nav-dropdown-group z-nav"
            data-nav-prefix={group.pathPrefix}
          >
            <button
              id={`${group.id}-trigger`}
              type="button"
              aria-controls={`${group.id}-menu`}
              aria-haspopup="menu"
              data-nav-trigger
              className="inline-flex gap-1 items-center px-3 py-2 rounded-lg border border-transparent transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation"
            >
              {group.label}
              <ChevronDown
                className="w-4 h-4 transition-transform nav-dropdown-chevron"
                aria-hidden="true"
              />
            </button>

            <div
              className={`absolute top-full w-52 nav-dropdown-menu z-nav ${menuPositionClass}`}
            >
              <div
                id={`${group.id}-menu`}
                role="menu"
                aria-labelledby={`${group.id}-trigger`}
                className="rounded-xl border border-white/10 bg-background p-1.5 shadow-2xl shadow-black/35 backdrop-blur-xl"
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
        );
      })}
    </nav>
  );
}
