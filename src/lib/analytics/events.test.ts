// @vitest-environment node

import { describe, expect, it } from 'vitest'
import {
  detectAiReferral,
  essentialEventNames,
  isAnalyticsEnabled,
  sanitizeDestination,
} from './events'

describe('privacy-limited analytics events', () => {
  it('permits only the four approved event names', () => {
    expect([...essentialEventNames]).toEqual([
      'cta_click',
      'invitation_click',
      'outbound_link',
      'ai_referral',
    ])
  })

  it('keeps analytics disabled when the measurement ID is missing or blank', () => {
    expect(isAnalyticsEnabled()).toBe(false)
    expect(isAnalyticsEnabled('')).toBe(false)
    expect(isAnalyticsEnabled('   ')).toBe(false)
    expect(isAnalyticsEnabled('G-ABC123')).toBe(true)
  })

  it('removes query strings and fragments from tracked destinations', () => {
    expect(sanitizeDestination('https://example.com/path?token=secret#section')).toBe(
      'https://example.com/path',
    )
  })

  it('classifies known AI referrals without storing the full referrer URL', () => {
    expect(detectAiReferral('https://chatgpt.com/c/secret-conversation')).toBe('chatgpt')
    expect(detectAiReferral('https://www.perplexity.ai/search?q=private')).toBe('perplexity')
    expect(detectAiReferral('https://claude.ai/chat/private')).toBe('claude')
    expect(detectAiReferral('https://example.com/article')).toBeNull()
  })
})
