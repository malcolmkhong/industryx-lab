import { JsonLd } from '@/components/seo/JsonLd'
import type { ComingSoonRoute } from '@/config/routes'
import { ComingSoonPage } from '@/features/coming-soon/ComingSoonPage'
import { createComingSoonStructuredData } from '@/features/coming-soon/seo'

export function ComingSoonRouteView({ route }: { route: ComingSoonRoute }) {
  return (
    <>
      <JsonLd data={createComingSoonStructuredData(route)} />
      <ComingSoonPage route={route} />
    </>
  )
}
