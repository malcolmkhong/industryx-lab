import { ComingSoonRouteView } from '@/app/_components/ComingSoonRouteView'
import { getComingSoonRoute, routePaths } from '@/config/routes'
import { createComingSoonPageMetadata } from '@/lib/seo/comingSoon'

const route = getComingSoonRoute(routePaths.intermediate)
export const metadata = createComingSoonPageMetadata(route)
export default function Page() { return <ComingSoonRouteView route={route} /> }
