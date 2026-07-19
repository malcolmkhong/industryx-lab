import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { BeginnerPage } from '@/features/beginner/BeginnerPage'
import { beginnerPageContent } from '@/features/beginner/content'
import { createBeginnerStructuredData } from '@/features/beginner/seo'
import { createPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createPageMetadata({
  title: beginnerPageContent.metadata.title,
  description: beginnerPageContent.metadata.description,
  path: beginnerPageContent.metadata.canonicalPath,
  type: 'article',
})

export default function BeginnerRoute() {
  return (
    <>
      <JsonLd data={createBeginnerStructuredData()} />
      <BeginnerPage />
    </>
  )
}
