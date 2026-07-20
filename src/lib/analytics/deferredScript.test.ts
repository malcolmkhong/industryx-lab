import { describe, expect, it } from 'vitest'
import { buildDeferredAnalyticsScript } from './deferredScript'
import { essentialEventNames } from './events'

describe('deferred analytics loader', () => {
  it('inlines the shared event allowlist and referral domain list', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    expect(script).toContain('"allowedEvents":[')
    expect(script).toContain('"referralDomains":[')
    expect(script).toContain('G-TEST123')
  })

  it('references every allowlisted event name in the allowlist gate', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    for (const name of essentialEventNames) {
      expect(script).toContain(`"${name}"`)
    }
  })

  it('rejects events outside the allowlist before calling gtag', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    // The allowlist gate must run before `window.gtag?.('event', ...)` so a
    // typo or future event name can't leak to GA.
    const gateIndex = script.indexOf('config.allowedEvents.includes(name)')
    const sendIndex = script.indexOf("window.gtag?.('event', name, parameters)")
    expect(gateIndex).toBeGreaterThan(-1)
    expect(sendIndex).toBeGreaterThan(gateIndex)
  })

  it('defers loader activation until first user interaction', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    expect(script).toMatch(/pointerdown[\s\S]*?activate[\s\S]*?once[\s\S]*?true/)
    expect(script).toMatch(/keydown[\s\S]*?activate[\s\S]*?once[\s\S]*?true/)
  })

  it('does not duplicate the destination sanitization helper', () => {
    // Regression net: the loader template used to inline a private `destination`
    // helper that duplicated `sanitizeDestination` from events.ts. Keep them
    // in lockstep by asserting only one sanitizer definition ships.
    const script = buildDeferredAnalyticsScript('G-TEST123')
    const helperMatches = script.match(/new URL\(value\)/g) ?? []
    expect(helperMatches.length).toBe(1)
  })

  it('warns in development when a link declares an event outside the allowlist', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123', { debug: true })
    // The dev-mode warning must be gated by a build-time-substituted flag so
    // production bundles don't ship any console.warn calls.
    expect(script).toContain('"debug":true')
    expect(script).toContain('console.warn')
    expect(script).toContain('data-analytics-event')
  })

  it('omits the console.warn calls in production builds', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123', { debug: false })
    expect(script).toContain('"debug":false')
    expect(script).not.toContain('console.warn')
  })

  it('initializes gtag consent state to denied until the user grants consent', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    expect(script).toContain('"consentState"')
    // The default state must be denied on every key.
    expect(script).toMatch(/"analytics_storage":"denied"/)
    expect(script).toMatch(/"ad_storage":"denied"/)
  })

  it('only configures gtag after consent is granted', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    // The `gtag('config', ...)` call must sit behind an analytics-allowed
    // check so the loader does not initialize GA4 against denied consent.
    const configIndex = script.indexOf("gtag('config'")
    const analyticsAllowedIndex = script.indexOf('analyticsAllowed')
    expect(analyticsAllowedIndex).toBeGreaterThan(-1)
    expect(configIndex).toBeGreaterThan(analyticsAllowedIndex)
  })

  it('supports a page_view helper that fires once per route', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    expect(script).toContain('page_view')
    expect(script).toContain('__industryxPageViewSent')
  })

  it('supports stage_complete, reading_milestone, and 404_view events', () => {
    const script = buildDeferredAnalyticsScript('G-TEST123')
    expect(script).toContain('stage_complete')
    expect(script).toContain('reading_milestone')
    expect(script).toContain('404_view')
  })
})
