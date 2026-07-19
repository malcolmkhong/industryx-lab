import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export type PageMetadataInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  index?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  index = true,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString()
  const image = new URL(siteConfig.socialImage, siteConfig.url).toString()

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.organization.name,
    alternates: { canonical },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 2048, height: 1062, alt: 'IndustryX Lab Kimi beginner guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
