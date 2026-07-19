export const essentialEventNames = [
  'cta_click',
  'invitation_click',
  'outbound_link',
  'ai_referral',
] as const

export type EssentialEventName = (typeof essentialEventNames)[number]
export type AiReferralSource = 'chatgpt' | 'perplexity' | 'claude' | 'gemini' | 'copilot' | 'kimi'

export function isAnalyticsEnabled(measurementId?: string) {
  return Boolean(measurementId?.trim())
}

export function sanitizeDestination(destination: string) {
  try {
    const url = new URL(destination)
    return `${url.origin}${url.pathname}`
  } catch {
    return destination.split(/[?#]/, 1)[0]
  }
}

export function detectAiReferral(referrer: string): AiReferralSource | null {
  if (!referrer) return null

  try {
    const hostname = new URL(referrer).hostname.toLowerCase()
    const sources: Array<[string, AiReferralSource]> = [
      ['chatgpt.com', 'chatgpt'],
      ['perplexity.ai', 'perplexity'],
      ['claude.ai', 'claude'],
      ['gemini.google.com', 'gemini'],
      ['copilot.microsoft.com', 'copilot'],
      ['kimi.com', 'kimi'],
    ]

    return sources.find(([domain]) => hostname === domain || hostname.endsWith(`.${domain}`))?.[1] ?? null
  } catch {
    return null
  }
}
