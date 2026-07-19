import { beginnerPageContent, beginnerStages } from './content'
import {
  absoluteUrl,
  createSiteEntities,
  createSoftwareApplicationEntity,
  createWebPageEntity,
  schemaIds,
} from '@/lib/seo/schema'

export function createBeginnerStructuredData() {
  const canonicalUrl = absoluteUrl(beginnerPageContent.metadata.canonicalPath)
  const { description } = beginnerPageContent.metadata

  return {
      '@context': 'https://schema.org',
      '@graph': [
        ...createSiteEntities(),
        createWebPageEntity({
          path: beginnerPageContent.metadata.canonicalPath,
          title: beginnerPageContent.metadata.title,
          description,
          type: 'WebPage',
        }),
        createSoftwareApplicationEntity(),
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          headline: beginnerPageContent.metadata.articleHeadline,
          description,
          mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
          author: { '@id': schemaIds.author },
          publisher: { '@id': schemaIds.organization },
          datePublished: beginnerPageContent.metadata.datePublished,
          dateModified: beginnerPageContent.metadata.dateModified,
          inLanguage: 'en',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: beginnerPageContent.metadata.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.path ? { item: absoluteUrl(item.path) } : {}),
          })),
        },
        {
          '@type': 'HowTo',
          name: beginnerPageContent.metadata.howToName,
          description,
          step: beginnerStages.map((stage) => ({
            '@type': 'HowToStep',
            name: stage.title,
            text: `${stage.goal} ${stage.answer}`,
            url: `${canonicalUrl}#${stage.id}`,
          })),
        },
      ],
  }
}
