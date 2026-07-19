import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { isAnalyticsEnabled } from '@/lib/analytics/events'
import { AnalyticsEventTracker } from './AnalyticsEventTracker'

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const isGa4Enabled = isAnalyticsEnabled(measurementId)

  return (
    <>
      <VercelAnalytics />
      {isGa4Enabled ? (
        <>
          <GoogleAnalytics gaId={measurementId!.trim()} />
          <AnalyticsEventTracker />
        </>
      ) : null}
    </>
  )
}
