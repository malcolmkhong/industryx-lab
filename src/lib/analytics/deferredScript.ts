import { aiReferralDomains, essentialEventNames } from "./events";
import { initialConsentState, type ConsentState } from "./consent";

export interface BuildDeferredAnalyticsScriptOptions {
  /** When true, inlines `console.warn` calls that surface dropped events. Off
   * in production to avoid any console noise reaching real visitors. */
  debug?: boolean;
  /** Consent Mode v2 state. Default denies every key. */
  consentState?: ConsentState;
}

export function buildDeferredAnalyticsScript(
  measurementId: string,
  options: BuildDeferredAnalyticsScriptOptions = {},
) {
  const debug = Boolean(options.debug);
  const consent = options.consentState ?? initialConsentState();
  const config = JSON.stringify({
    measurementId,
    allowedEvents: essentialEventNames,
    referralDomains: aiReferralDomains,
    debug,
    consentState: consent,
  });

  const sendWithDebug = String.raw`
const send = (name, parameters) => {
    if (!config.allowedEvents.includes(name)) {
      console.warn('[analytics] dropped event outside allowlist:', name, parameters)
      return
    }
    if (!analyticsAllowed) return
    window.gtag?.('event', name, parameters)
  }`;

  const sendWithoutDebug = String.raw`
const send = (name, parameters) => {
    if (!config.allowedEvents.includes(name)) return
    if (!analyticsAllowed) return
    window.gtag?.('event', name, parameters)
  }`;

  const trackClickWithDebug = String.raw`
    if (explicitEvent && !config.allowedEvents.includes(explicitEvent)) {
      console.warn(
        '[analytics] link uses unknown data-analytics-event:',
        explicitEvent,
        link,
      )
    }`;

  const trackClickWithoutDebug = "";

  const trackClickMissingLabelWithDebug = String.raw`
    if (!link.dataset.analyticsLabel) {
      console.warn(
        '[analytics] link has no data-analytics-label, dropping event:',
        link,
      )
      return
    }`;

  const trackClickMissingLabelWithoutDebug = String.raw`
    if (!link.dataset.analyticsLabel) return`;

  const send = debug ? sendWithDebug : sendWithoutDebug;
  const trackClickDebugBranch = debug
    ? trackClickWithDebug
    : trackClickWithoutDebug;
  const trackClickMissingLabelBranch = debug
    ? trackClickMissingLabelWithDebug
    : trackClickMissingLabelWithoutDebug;

  return String.raw`
(() => {
  if (window.__industryxGaInstalled) return
  window.__industryxGaInstalled = true
  const config = ${config}
  const analyticsAllowed = config.consentState.analytics_storage === 'granted'
  let activated = false
  let pageViewSent = false

  // Single sanitization helper. Behaviour mirrors sanitizeDestination in
  // src/lib/analytics/events.ts: only http(s) destinations expose a real
  // origin + pathname; everything else falls back to the raw string with
  // query/fragment stripped.
  const sanitize = (value) => {
    try {
      const url = new URL(value)
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.origin + url.pathname
      }
    } catch {}
    return String(value).split(/[?#]/, 1)[0]
  }

  ${send}

  const trackReferral = () => {
    if (!document.referrer) return
    try {
      const hostname = new URL(document.referrer).hostname.toLowerCase()
      const match = config.referralDomains.find(([domain]) =>
        hostname === domain || hostname.endsWith('.' + domain)
      )
      if (match) send('ai_referral', { source: match[1] })
    } catch {}
  }

  const trackClick = (event) => {
    if (!(event.target instanceof Element)) return
    const link = event.target.closest('a[href]')
    if (!(link instanceof HTMLAnchorElement)) return
    ${trackClickMissingLabelBranch}
    const explicitEvent = link.dataset.analyticsEvent
    ${trackClickDebugBranch}
    const parameters = {
      destination: sanitize(link.href),
      page_section: link.dataset.analyticsSection || undefined,
    }
    if (explicitEvent && config.allowedEvents.includes(explicitEvent)) {
      send(explicitEvent, {
        ...parameters,
        label: link.dataset.analyticsLabel || 'unlabelled',
      })
    } else if (link.origin !== window.location.origin) {
      send('outbound_link', parameters)
    }
  }

  // Page view tracking. Fires once per route change. Subsequent calls with
  // the same pathname are dropped, so Enhanced Measurement and our manual
  // page_view never double-count.
  window.trackPageView = (pathname, pageTitle) => {
    if (pageViewSent) return
    if (!pathname) return
    if (pathname === window.__industryxPageViewSent) return
    pageViewSent = true
    window.__industryxPageViewSent = pathname
    send('page_view', {
      page_path: pathname,
      page_title: typeof pageTitle === 'string' ? pageTitle : document.title,
    })
  }

  // Stage completion. Only call when the stage transitioned from
  // incomplete to complete; the caller is responsible for that gate.
  window.trackStageComplete = (stageId, pageSection) => {
    if (!stageId) return
    send('stage_complete', {
      stage_id: stageId,
      page_section: pageSection || undefined,
    })
  }

  // Reading milestone. percent in {25, 50, 75, 100}. Once per page view.
  window.trackReadingMilestone = (percent, pageSection) => {
    if (!analyticsAllowed) return
    if (![25, 50, 75, 100].includes(percent)) return
    send('reading_milestone', {
      percent,
      page_path: window.location.pathname,
      page_section: pageSection || undefined,
    })
  }

  // 404 view. Only the sanitized pathname is sent.
  window.track404View = (pathname) => {
    send('404_view', {
      page_path: sanitize(pathname || window.location.pathname),
    })
  }

  // Programmatic event helper for non-click interactions (copy buttons,
  // stage toggles, reading milestones). Routes through the same allowlist
  // gate and consent check as click-driven events.
  window.sendAnalyticsEvent = (name, parameters) => {
    if (typeof name !== 'string') return
    send(name, parameters || {})
  }

  const activate = () => {
    if (activated) return
    activated = true
    window.dataLayer ||= []
    window.gtag ||= (...args) => window.dataLayer.push(args)
    // Always initialize consent mode. Without this call GA4 cannot tell
    // that the user has not yet consented and may emit cookieless pings.
    //
    // Two-step consent default (Google Consent Mode v2 pattern):
    //   1) Global defaults are 'granted' so non-regulated visitors get
    //      analytics immediately. The banner still appears for everyone
    //      and a Decline click overrides this via a gtag consent update.
    //   2) Region-specific override applies 'denied' to EEA + UK + Switzerland
    //      only, satisfying GDPR + UK PECR requirements.
    //
    // Privacy parameters required for EEA + UK + Switzerland compliance:
    // - region: applies the override only to GDPR-regulated territories; visitors
    //   outside this list get the unblocked defaults and are tracked normally.
    // - wait_for_update: bounds how long the loader waits for an explicit choice
    //   before falling through to defaults. Keeps cookieless pings from buffering
    //   indefinitely while the banner is on screen.
    // - url_passthrough: forwards click identifiers through the URL so cookieless
    //   pings can be stitched back to a consent-granted session later. Required
    //   for Conversion Modeling to work.
    // - ads_data_redaction: strips ad click identifiers from outgoing hits while
    //   ad_user_data is denied. Reduces GDPR exposure for denied traffic.
    const EEA_UK_CH_REGIONS = [
      'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI',
      'FR', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV',
      'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'GB',
    ]
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      url_passthrough: true,
      ads_data_redaction: true,
      wait_for_update: 500,
    })
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      region: EEA_UK_CH_REGIONS,
    })
    // Stored Decline decisions always win. Apply on top of the region defaults.
    // After the update, recompute the effective allowed state — for new
    // visitors in non-EEA regions, the global default grants analytics even
    // though analyticsAllowed was captured as false at script start.
    window.gtag('consent', 'update', config.consentState)
    const effectiveAllowed =
      analyticsAllowed || config.consentState.analytics_storage === 'granted'
    window.gtag('js', new Date())
    if (effectiveAllowed) {
      window.gtag('config', config.measurementId, { send_page_view: false })
      window.trackPageView(window.location.pathname, document.title)
    }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.measurementId)
    document.head.appendChild(script)
    document.addEventListener('click', trackClick)
    trackReferral()
  }

  document.addEventListener('pointerdown', activate, { once: true, passive: true })
  document.addEventListener('keydown', activate, { once: true })
})()
`;
}
