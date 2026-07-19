import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { HomePage } from '@/features/home/HomePage'
import { createHomeStructuredData } from '@/features/home/seo'
import { createPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.homeMetadata.title,
  description: siteConfig.homeMetadata.description,
  path: siteConfig.homeMetadata.canonicalPath,
})

export default function HomeRoute() {
  return (
    <>
      <JsonLd data={createHomeStructuredData()} />
      <HomePage />
    </>
  )
}
