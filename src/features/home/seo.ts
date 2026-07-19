import { siteConfig } from '@/config/site'
import {
  createSiteEntities,
  createSoftwareApplicationEntity,
  createWebPageEntity,
} from '@/lib/seo/schema'

export function createHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...createSiteEntities(),
      createWebPageEntity({
        path: '/',
        title: siteConfig.homeMetadata.title,
        description: siteConfig.homeMetadata.description,
      }),
      createSoftwareApplicationEntity(),
    ],
  }
}
