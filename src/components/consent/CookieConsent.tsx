"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  getStoredConsent,
  hasDoNotTrack,
  storeConsent,
} from "@/lib/analytics/consent";

const STORAGE_KEY = "industryx:consent";

/**
 * Minimal cookie-consent banner for GA4 Consent Mode v2.
 *
 * - Default state denies analytics and ad storage until the user makes a choice.
 * - When DNT is set, the banner is suppressed and analytics stays denied.
 * - On Accept: grants analytics_storage and ad_storage.
 * - On Decline: explicitly stores denied (so the banner does not reappear).
 * - Storage updates are written to localStorage and pushed to gtag's consent
 *   command so any future GA loads pick up the current state.
 *
 * Visibility is read via `useSyncExternalStore` so the server snapshot is
 * always `false` (no banner) and the client snapshot only becomes `true` after
 * hydration completes. This avoids the React 19 hydration mismatch that the
 * original `useState(() => …)` initializer caused, and avoids the cascading
 * renders that a synchronous `setState` inside `useEffect` produces.
 */
export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribe,
    getClientVisibility,
    () => false,
  );

  const handleAccept = () => {
    const next = storeConsent({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    pushConsentUpdate(next);
    emitConsentChange();
  };

  const handleDecline = () => {
    const next = storeConsent({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    pushConsentUpdate(next);
    emitConsentChange();
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 p-4 rounded-2xl border shadow-2xl backdrop-blur z-banner border-white/10 bg-background/95 sm:inset-x-auto sm:left-1/2 sm:max-w-md sm:-translate-x-1/2"
    >
      <p className="text-sm leading-6 text-foreground">
        This site uses privacy-respecting analytics to understand which guides
        help the most. No personal data is collected. You can accept or decline.
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          variant="default"
          size="lg"
          className="rounded-lg tap-target"
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-lg tap-target"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

function readClientVisibility(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed &&
        typeof parsed === "object" &&
        "analytics_storage" in parsed
      ) {
        // User already made a decision — keep the banner hidden.
        return false;
      }
    }
  } catch {
    // Malformed storage; fall through and show the banner.
  }
  return !hasDoNotTrack();
}

function getClientVisibility(): boolean {
  return readClientVisibility();
}

function subscribe(listener: () => void): () => void {
  // React to localStorage writes performed elsewhere (e.g. Accept/Decline
  // buttons) and to cross-tab updates so the banner hides immediately.
  if (typeof window === "undefined") return () => {};
  window.addEventListener("industryx:consent-change", listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("industryx:consent-change", listener);
    window.removeEventListener("storage", listener);
  };
}

function emitConsentChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("industryx:consent-change"));
  }
}

function pushConsentUpdate(state: ReturnType<typeof getStoredConsent>): void {
  // Push the user's decision to gtag (when present) so any pre-existing GA
  // script picks up the new consent state without a reload.
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void })
    .gtag;
  gtag?.("consent", "update", state);
}
