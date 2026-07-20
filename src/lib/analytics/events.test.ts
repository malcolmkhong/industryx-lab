// @vitest-environment node

import { describe, expect, it } from 'vitest'
import {
  detectAiReferral,
  essentialEventNames,
  isAnalyticsEnabled,
  isValidMeasurementId,
  sanitizeDestination,
} from './events'

describe('privacy-limited analytics events', () => {
  it('permits only the approved event names', () => {
    expect([...essentialEventNames]).toEqual([
      'cta_click',
      'invitation_click',
      'outbound_link',
      'ai_referral',
      'stage_complete',
      'reading_milestone',
      '404_view',
      'page_view',
    ])
  })

  it('keeps analytics disabled when the measurement ID is missing or blank', () => {
    expect(isAnalyticsEnabled()).toBe(false)
    expect(isAnalyticsEnabled('')).toBe(false)
    expect(isAnalyticsEnabled('   ')).toBe(false)
    expect(isAnalyticsEnabled('G-ABC123')).toBe(true)
  })

  it('does not classify kimi.com as an AI referral source', () => {
    expect(detectAiReferral('https://www.kimi.com/code')).toBeNull()
    expect(detectAiReferral('https://kimi.com/some-path')).toBeNull()
  })

  it('validates measurement IDs against the GA4 format', () => {
    expect(isValidMeasurementId('G-ABC123')).toBe(true)
    expect(isValidMeasurementId('G-3MQ61NYNRN')).toBe(true)
    expect(isValidMeasurementId('  G-ABC123  ')).toBe(true)
    expect(isValidMeasurementId('foo')).toBe(false)
    expect(isValidMeasurementId('G-')).toBe(false)
    expect(isValidMeasurementId('G-abc')).toBe(false)
    expect(isValidMeasurementId('UA-12345-1')).toBe(false)
    expect(isValidMeasurementId('')).toBe(false)
  })

  it('removes query strings and fragments from tracked destinations', () => {
    expect(sanitizeDestination('https://example.com/path?token=secret#section')).toBe(
      'https://example.com/path',
    )
  })

  it('handles relative URLs, malformed input, and non-http schemes', () => {
    // Relative paths can't be parsed by `new URL` and fall back to stripping
    // query/fragment from the raw string.
    expect(sanitizeDestination('/build-project/beginner?ref=email#install')).toBe(
      '/build-project/beginner',
    )
    expect(sanitizeDestination('build-project/beginner')).toBe('build-project/beginner')
    // Non-http schemes also fail `new URL` (in jsdom without a base), so the
    // fallback path is what strips the `?` and `#`.
    expect(sanitizeDestination('mailto:hello@example.com?subject=hi')).toBe('mailto:hello@example.com')
    // Pure garbage falls back to the raw string.
    expect(sanitizeDestination('not a url')).toBe('not a url')
  })

  it('classifies known AI referrals without storing the full referrer URL', () => {
    expect(detectAiReferral('https://chatgpt.com/c/secret-conversation')).toBe('chatgpt')
    expect(detectAiReferral('https://www.perplexity.ai/search?q=private')).toBe('perplexity')
    expect(detectAiReferral('https://claude.ai/chat/private')).toBe('claude')
    expect(detectAiReferral('https://example.com/article')).toBeNull()
  })
})
