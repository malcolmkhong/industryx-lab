import { GoogleAnalytics } from '@next/third-parties/google'
import { isAnalyticsEnabled } from '@/lib/analytics/events'
import { AnalyticsEventTracker } from './AnalyticsEventTracker'

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  if (!isAnalyticsEnabled(measurementId)) return null

  return (
    <>
      <GoogleAnalytics gaId={measurementId!.trim()} />
      <AnalyticsEventTracker />
    </>
  )
}
