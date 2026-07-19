import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { isAnalyticsEnabled } from '@/lib/analytics/events'
import { DeferredGoogleAnalytics } from './DeferredGoogleAnalytics'

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const isGa4Enabled = isAnalyticsEnabled(measurementId)

  return (
    <>
      <VercelAnalytics />
      {isGa4Enabled ? <DeferredGoogleAnalytics measurementId={measurementId!.trim()} /> : null}
    </>
  )
}
