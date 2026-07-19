'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import {
  detectAiReferral,
  essentialEventNames,
  sanitizeDestination,
  type EssentialEventName,
} from '@/lib/analytics/events'

function isEssentialEventName(value?: string): value is EssentialEventName {
  return essentialEventNames.includes(value as EssentialEventName)
}

export function AnalyticsEventTracker() {
  useEffect(() => {
    const source = detectAiReferral(document.referrer)
    if (source) sendGAEvent({ event: 'ai_referral', source })

    const trackClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      const explicitEvent = link.dataset.analyticsEvent
      const destination = sanitizeDestination(link.href)
      const isExternal = link.origin !== window.location.origin

      if (isEssentialEventName(explicitEvent)) {
        sendGAEvent({
          event: explicitEvent,
          label: link.dataset.analyticsLabel ?? 'unlabelled',
          destination,
        })
      } else if (isExternal) {
        sendGAEvent({ event: 'outbound_link', destination })
      }
    }

    document.addEventListener('click', trackClick)
    return () => document.removeEventListener('click', trackClick)
  }, [])

  return null
}
