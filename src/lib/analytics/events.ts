export const essentialEventNames = [
  'cta_click',
  'invitation_click',
  'outbound_link',
  'ai_referral',
  'stage_complete',
  'reading_milestone',
  '404_view',
  'page_view',
] as const

export type EssentialEventName = (typeof essentialEventNames)[number]
export type AiReferralSource = 'chatgpt' | 'perplexity' | 'claude' | 'gemini' | 'copilot' | 'kimi'

// `kimi.com` is intentionally NOT in the referral list. The footer outbound
// link points to https://www.kimi.com/code, so any visitor who follows it
// and comes back would self-refer. A reliable separate referral signal for
// Kimi has not been identified yet.
export const aiReferralDomains: ReadonlyArray<[string, AiReferralSource]> = [
  ['chatgpt.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'],
  ['claude.ai', 'claude'],
  ['gemini.google.com', 'gemini'],
  ['copilot.microsoft.com', 'copilot'],
]

/**
 * GA4 measurement IDs match the pattern G-XXXXXXXXXX (4-12 uppercase
 * alphanumerics). Use this at build/dev time to validate the configured
 * measurement ID and warn (or disable) when it is malformed. We do not
 * throw because the project contract is "missing = disabled, never
 * break the build".
 */
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,12}$/

export function isValidMeasurementId(measurementId?: string): boolean {
  if (!measurementId) return false
  return MEASUREMENT_ID_PATTERN.test(measurementId.trim())
}

export function isAnalyticsEnabled(measurementId?: string) {
  return Boolean(measurementId?.trim())
}

export function sanitizeDestination(destination: string) {
  try {
    const url = new URL(destination)
    // Only http(s) destinations expose a meaningful origin + pathname. Other
    // schemes (mailto:, tel:, javascript:, etc.) parsed by `new URL` produce
    // a synthetic "null" origin that, concatenated with pathname, can leak
    // personally identifiable data (an email address, phone number, etc.).
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return `${url.origin}${url.pathname}`
    }
  } catch {
    // Fall through to the relative-path fallback below.
  }
  return destination.split(/[?#]/, 1)[0]
}

export function detectAiReferral(referrer: string): AiReferralSource | null {
  if (!referrer) return null

  try {
    const hostname = new URL(referrer).hostname.toLowerCase()
    return aiReferralDomains.find(([domain]) => hostname === domain || hostname.endsWith(`.${domain}`))?.[1] ?? null
  } catch {
    return null
  }
}
