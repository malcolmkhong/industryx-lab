import { aiReferralDomains, essentialEventNames } from './events'

export function buildDeferredAnalyticsScript(measurementId: string) {
  const config = JSON.stringify({
    measurementId,
    allowedEvents: essentialEventNames,
    referralDomains: aiReferralDomains,
  })

  return String.raw`
(() => {
  if (window.__industryxGaInstalled) return
  window.__industryxGaInstalled = true
  const config = ${config}
  let activated = false

  const destination = (value) => {
    try {
      const url = new URL(value)
      return url.origin + url.pathname
    } catch {
      return String(value).split(/[?#]/, 1)[0]
    }
  }

  const send = (name, parameters) => {
    if (config.allowedEvents.includes(name)) window.gtag?.('event', name, parameters)
  }

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
    const explicitEvent = link.dataset.analyticsEvent
    const parameters = { destination: destination(link.href) }
    if (explicitEvent && config.allowedEvents.includes(explicitEvent)) {
      send(explicitEvent, {
        ...parameters,
        label: link.dataset.analyticsLabel || 'unlabelled',
      })
    } else if (link.origin !== window.location.origin) {
      send('outbound_link', parameters)
    }
  }

  const activate = () => {
    if (activated) return
    activated = true
    window.dataLayer ||= []
    window.gtag ||= (...args) => window.dataLayer.push(args)
    window.gtag('js', new Date())
    window.gtag('config', config.measurementId)
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
`
}
