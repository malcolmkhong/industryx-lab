/**
 * Cookie consent state for GA4 Consent Mode v2.
 *
 * Default state denies analytics_storage and ad_storage. Until a user grants
 * consent (or DNT is set, in which case analytics stays denied), the GA4
 * loader must not run `gtag('config', ...)` and must not call `gtag('event', ...)`.
 */

export type ConsentValue = 'granted' | 'denied'

export interface ConsentState {
  analytics_storage: ConsentValue
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
}

const STORAGE_KEY = 'industryx:consent'

export function consentStorageKey(): string {
  return STORAGE_KEY
}

export function initialConsentState(): ConsentState {
  return {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }
}

export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return initialConsentState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialConsentState()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return initialConsentState()
    return {
      analytics_storage: parsed.analytics_storage === 'granted' ? 'granted' : 'denied',
      ad_storage: parsed.ad_storage === 'granted' ? 'granted' : 'denied',
      ad_user_data: parsed.ad_user_data === 'granted' ? 'granted' : 'denied',
      ad_personalization: parsed.ad_personalization === 'granted' ? 'granted' : 'denied',
    }
  } catch {
    return initialConsentState()
  }
}

export function storeConsent(partial: Partial<ConsentState>): ConsentState {
  const next: ConsentState = { ...getStoredConsent(), ...partial }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable. Continue with in-memory state only.
    }
  }
  return next
}

export function isAnalyticsAllowed(state: ConsentState): boolean {
  return state.analytics_storage === 'granted'
}

/**
 * Detects any Do Not Track signal the browser exposes. We honor DNT by
 * keeping analytics denied regardless of the user's stored preference.
 */
export function readDntSignal(): string | null {
  if (typeof navigator === 'undefined') return null
  return (
    (navigator as Navigator & { doNotTrack?: string | null }).doNotTrack ??
    (typeof window !== 'undefined'
      ? (window as Window & { doNotTrack?: string | null }).doNotTrack
      : null) ??
    (navigator as Navigator & { msDoNotTrack?: string | null }).msDoNotTrack ??
    null
  )
}

export function hasDoNotTrack(): boolean {
  const signal = readDntSignal()
  return signal === '1' || signal === 'yes'
}
