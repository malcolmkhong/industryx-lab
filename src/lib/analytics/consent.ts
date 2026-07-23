/**
 * Cookie consent state for GA4 Consent Mode v2.
 *
 * Default state denies analytics_storage and ad_storage. Until a user grants
 * consent (or DNT is set, in which case analytics stays denied), the GA4
 * loader must not run `gtag('config', ...)` and must not call `gtag('event', ...)`.
 *
 * Stored decisions expire after 395 days (the maximum duration allowed by the
 * ICO under the Data (Use and Access) Act 2025 for analytics cookies). After
 * expiry the banner shows again on the next visit.
 */

export type ConsentValue = 'granted' | 'denied'

export interface ConsentState {
  analytics_storage: ConsentValue
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
}

interface StoredConsent {
  state: ConsentState
  expiresAt: number
}

const STORAGE_KEY = 'industryx:consent'
const CONSENT_TTL_MS = 395 * 24 * 60 * 60 * 1000

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

export function isConsentExpired(stored: StoredConsent | null): boolean {
  if (!stored) return true
  return Date.now() >= stored.expiresAt
}

export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return initialConsentState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialConsentState()
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (!parsed || typeof parsed !== 'object') return initialConsentState()
    if (isConsentExpired(parsed as StoredConsent)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return initialConsentState()
    }
    const state = parsed.state
    if (!state || typeof state !== 'object') return initialConsentState()
    return {
      analytics_storage: state.analytics_storage === 'granted' ? 'granted' : 'denied',
      ad_storage: state.ad_storage === 'granted' ? 'granted' : 'denied',
      ad_user_data: state.ad_user_data === 'granted' ? 'granted' : 'denied',
      ad_personalization: state.ad_personalization === 'granted' ? 'granted' : 'denied',
    }
  } catch {
    return initialConsentState()
  }
}

export function storeConsent(partial: Partial<ConsentState>): ConsentState {
  const next: ConsentState = { ...getStoredConsent(), ...partial }
  const payload: StoredConsent = {
    state: next,
    expiresAt: Date.now() + CONSENT_TTL_MS,
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
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
