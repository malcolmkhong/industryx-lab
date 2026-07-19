import type { Metadata } from 'next'
import type { ComingSoonRoute } from '@/config/routes'
import { createPageMetadata } from './metadata'

export function createComingSoonPageMetadata(route: ComingSoonRoute): Metadata {
  return createPageMetadata({
    title: `${route.pageName} Experience — Coming Soon`,
    description: route.description,
    path: route.path,
    index: false,
  })
}
