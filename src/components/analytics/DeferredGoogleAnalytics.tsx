import { buildDeferredAnalyticsScript } from '@/lib/analytics/deferredScript'
import {
  getStoredConsent,
  initialConsentState,
} from '@/lib/analytics/consent'
import { isValidMeasurementId } from '@/lib/analytics/events'

interface DeferredGoogleAnalyticsProps {
  measurementId: string
}

/**
 * Renders the inline loader script that wires up GA4. The loader:
 * - Inlines consent mode v2 defaults (deny analytics + ads).
 * - Inlines the measurement ID and the configured debug flag.
 * - Stays inert until the first pointerdown or keydown, so it never
 *   blocks the page's Largest Contentful Paint.
 *
 * The measurement ID is validated against the GA4 format. If it is
 * malformed, the component renders nothing and (in development) logs a
 * warning so the misconfiguration is visible without breaking the build.
 */
export function DeferredGoogleAnalytics({ measurementId }: DeferredGoogleAnalyticsProps) {
  const debug = process.env.NODE_ENV !== 'production'
  const trimmed = measurementId.trim()
  if (!isValidMeasurementId(trimmed)) {
  if (debug) {
    console.warn(
      '[analytics] NEXT_PUBLIC_GA_ID is missing or malformed. Expected G-[A-Z0-9]{4,12}. Got:',
      JSON.stringify(measurementId),
      '— GA disabled.',
    )
  }
  return null
}
  // Use the stored consent if present so reloads after a stored decision
  // skip the loader's denied-default behavior on the first paint.
  const consentState =
    typeof window === 'undefined' ? initialConsentState() : getStoredConsent()
  return (
    <script
      id="google-analytics-loader"
      dangerouslySetInnerHTML={{
        __html: buildDeferredAnalyticsScript(trimmed, { debug, consentState }),
      }}
    />
  )
}
