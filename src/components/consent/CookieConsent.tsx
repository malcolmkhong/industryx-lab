"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
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
 * - Stored decisions expire after 395 days; after expiry the banner shows again.
 * - Re-opening the banner (via the "Manage cookies" footer link) re-runs the
 *   same flow so users can revoke a previous decision.
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
    clearGaCookies();
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
    clearGaCookies();
    emitConsentChange();
  };

  const handleRevoke = () => {
    // Wipe the stored decision entirely so the banner shows as if the user
    // never decided. Storage will be re-written on the next Accept/Decline.
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Storage unavailable; banner re-shows via the state listener.
      }
    }
    pushConsentUpdate({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    clearGaCookies();
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
        This site uses {siteConfig.privacy.vendors.join(" and ")} to understand
        which guides help the most. Data is retained for{" "}
        {siteConfig.privacy.retentionDays} days. You can{" "}
        <button
          type="button"
          className="font-medium rounded text-primary underline-offset-4 hover:underline focus-visible-ring"
          onClick={handleRevoke}
        >
          revoke consent
        </button>{" "}
        at any time.{" "}
        <Link
          href={siteConfig.privacy.policyPath}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Privacy policy
        </Link>
        .
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
        "state" in parsed &&
        "expiresAt" in parsed
      ) {
        if (typeof parsed.expiresAt === "number" && Date.now() >= parsed.expiresAt) {
          // Expired — show the banner again and let the next click overwrite storage.
          return !hasDoNotTrack();
        }
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

function clearGaCookies(): void {
  // Remove the GA4 client identifier and session cookie so the next session
  // starts clean. Other domains set by GA4 (e.g. on ads.google.com) are not
  // reachable from this origin and are cleaned up by GA's own signal expiry.
  if (typeof document === "undefined") return;
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const paths = ["/"];
  const hosts = [window.location.hostname, `.${window.location.hostname}`];
  for (const name of ["_ga", "_ga_*"]) {
    for (const host of hosts) {
      for (const path of paths) {
        document.cookie = `${name}=; expires=${expires}; path=${path}; domain=${host}`;
      }
    }
  }
}
