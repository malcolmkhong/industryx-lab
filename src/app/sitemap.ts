import type { MetadataRoute } from 'next'
import { routePaths } from '@/config/routes'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: siteConfig.editorial.dateModified,
      changeFrequency: 'monthly',
      priority: 1,
      images: [new URL(siteConfig.socialImage, siteConfig.url).toString()],
    },
    {
      url: new URL(routePaths.beginner, siteConfig.url).toString(),
      lastModified: siteConfig.editorial.dateModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [new URL(siteConfig.socialImage, siteConfig.url).toString()],
    },
  ]
}
