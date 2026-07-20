'use client'

import { useState } from 'react'
import { getStoredConsent, hasDoNotTrack, storeConsent } from '@/lib/analytics/consent'

const STORAGE_KEY = 'industryx:consent'

/**
 * Minimal cookie-consent banner for GA4 Consent Mode v2.
 *
 * - Default state denies analytics and ad storage until the user makes a choice.
 * - When DNT is set, the banner is suppressed and analytics stays denied.
 * - On Accept: grants analytics_storage and ad_storage.
 * - On Decline: explicitly stores denied (so the banner does not reappear).
 * - Storage updates are written to localStorage and pushed to gtag's consent
 *   command so any future GA loads pick up the current state.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState<boolean>(() => {
    // Initial visibility is decided lazily so we never render the banner
    // and then immediately remove it on users with a stored decision.
    if (typeof window === 'undefined') return false
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === 'object' && 'analytics_storage' in parsed) {
          return false
        }
      } catch {
        // Malformed storage; fall through.
      }
    }
    return !hasDoNotTrack()
    })

    const handleAccept = () => {
    const next = storeConsent({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
    pushConsentUpdate(next)
    setVisible(false)
  }

  const handleDecline = () => {
    const next = storeConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    pushConsentUpdate(next)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[80] rounded-2xl border border-white/10 bg-background/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:left-1/2 sm:max-w-md sm:-translate-x-1/2"
    >
      <p className="text-sm leading-6 text-foreground">
        This site uses privacy-respecting analytics to understand which guides help the
        most. No personal data is collected. You can accept or decline.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="tap-target inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible-ring"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="tap-target inline-flex h-11 items-center rounded-lg border border-white/10 bg-card/60 px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/35 focus-visible-ring"
        >
          Decline
        </button>
      </div>
    </div>
  )
}

function pushConsentUpdate(state: ReturnType<typeof getStoredConsent>): void {
  // Push the user's decision to gtag (when present) so any pre-existing GA
  // script picks up the new consent state without a reload.
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('consent', 'update', state)
}
