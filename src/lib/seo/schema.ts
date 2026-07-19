import { externalLinks, siteConfig } from '@/config/site'

const ids = {
  organization: `${siteConfig.url}/#organization`,
  author: `${siteConfig.url}/#malcolm`,
  website: `${siteConfig.url}/#website`,
}

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}

export function createSiteEntities() {
  return [
    {
      '@type': 'Organization',
      '@id': ids.organization,
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
      founder: { '@id': ids.author },
    },
    {
      '@type': 'Person',
      '@id': ids.author,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      jobTitle: siteConfig.author.role,
      worksFor: { '@id': ids.organization },
    },
    {
      '@type': 'WebSite',
      '@id': ids.website,
      name: siteConfig.name,
      description: siteConfig.homeMetadata.description,
      url: siteConfig.url,
      publisher: { '@id': ids.organization },
      inLanguage: 'en',
    },
  ]
}

export function createWebPageEntity(options: {
  path: string
  title: string
  description: string
  type?: string | string[]
}) {
  const url = absoluteUrl(options.path)
  return {
    '@type': options.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: options.title,
    description: options.description,
    isPartOf: { '@id': ids.website },
    about: { '@id': `${siteConfig.url}/#kimi-code` },
    author: { '@id': ids.author },
    publisher: { '@id': ids.organization },
    inLanguage: 'en',
  }
}

export function createSoftwareApplicationEntity() {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}/#kimi-code`,
    name: siteConfig.productName,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS, Linux',
    url: externalLinks.kimiCode,
    author: {
      '@type': 'Organization',
      name: 'Moonshot AI',
      url: 'https://www.moonshot.ai/',
    },
  }
}

export const schemaIds = ids
