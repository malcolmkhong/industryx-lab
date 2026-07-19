import { buildDeferredAnalyticsScript } from '@/lib/analytics/deferredScript'

interface DeferredGoogleAnalyticsProps {
  measurementId: string
}

export function DeferredGoogleAnalytics({ measurementId }: DeferredGoogleAnalyticsProps) {
  return (
    <script
      id="google-analytics-loader"
      dangerouslySetInnerHTML={{ __html: buildDeferredAnalyticsScript(measurementId) }}
    />
  )
}
