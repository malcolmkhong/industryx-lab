import type { ComingSoonRoute } from '@/config/routes'
import { createSiteEntities, createWebPageEntity } from '@/lib/seo/schema'
import { comingSoonContent } from './content'

export function createComingSoonStructuredData(route: ComingSoonRoute) {
  const title = `${route.pageName} ${comingSoonContent.headingSuffix}`
  const description = `${comingSoonContent.supportingDescription} ${route.description}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...createSiteEntities(),
      createWebPageEntity({ path: route.path, title, description }),
    ],
  }
}
