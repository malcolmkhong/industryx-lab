"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Watches Next.js client-side navigation and emits a GA4 `page_view` event
 * for every route change. The deferred analytics loader only calls
 * `trackPageView` once on first user interaction, so without this component
 * SPA navigations would never register as new page views.
 *
 * Safe to mount unconditionally: the underlying `window.trackPageView`
 * function is a no-op until the GA4 deferred loader activates (after the
 * first `pointerdown` or `keydown`). Once activated, the helper dedupes
 * by pathname via a module-scoped flag, so replaying the same path is safe.
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const tracker = (
      window as Window & {
        trackPageView?: (pathname: string, pageTitle: string) => void;
      }
    ).trackPageView;
    if (typeof tracker === "function") {
      tracker(pathname, document.title);
    }
  }, [pathname]);

  return null;
}
