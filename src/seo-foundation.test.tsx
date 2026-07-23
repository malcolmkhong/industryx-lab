import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { comingSoonRoutes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { beginnerPageContent, beginnerStages } from '@/features/beginner/content'
import { createBeginnerStructuredData } from '@/features/beginner/seo'
import { Stats } from '@/features/home/components/sections/Stats'
import { createHomeStructuredData } from '@/features/home/seo'
import { createComingSoonPageMetadata } from '@/lib/seo/comingSoon'

function graphTypes(value: unknown) {
  const graph = (value as { '@graph'?: Array<{ '@type'?: string }> })['@graph'] ?? []
  return graph.map((item) => item['@type'])
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length
}

describe('SEO, GEO, and AEO foundation', () => {
  it('uses the configured production origin as the canonical source of truth', () => {
    expect(siteConfig.url).toBe('https://industryx-lab.vercel.app')
  })

  it('keeps indexable metadata inside the framework limits', () => {
    expect(siteConfig.homeMetadata.title.length).toBeLessThanOrEqual(60)
    expect(siteConfig.homeMetadata.description.length).toBeLessThanOrEqual(155)
    expect(beginnerPageContent.metadata.title.length).toBeLessThanOrEqual(60)
    expect(beginnerPageContent.metadata.description.length).toBeLessThanOrEqual(155)
  })

  it('marks every unfinished route noindex and follow', () => {
    for (const route of comingSoonRoutes) {
      const metadata = createComingSoonPageMetadata(route)
      expect(metadata.robots).toMatchObject({ index: false, follow: true })
    }
  })

  it('renders the required site and page entities in one graph', () => {
    const homeTypes = graphTypes(createHomeStructuredData())
    const beginnerTypes = graphTypes(createBeginnerStructuredData())

    expect(homeTypes).toEqual(
      expect.arrayContaining(['Organization', 'Person', 'WebSite', 'WebPage', 'SoftwareApplication']),
    )
    expect(beginnerTypes).toEqual(
      expect.arrayContaining(['Organization', 'Person', 'WebSite', 'WebPage', 'Article', 'BreadcrumbList', 'HowTo']),
    )
  })

  it('uses self-contained 40 to 60 word answers after stage questions', () => {
    for (const stage of beginnerStages) {
      expect(wordCount(stage.answer), stage.title).toBeGreaterThanOrEqual(40)
      expect(wordCount(stage.answer), stage.title).toBeLessThanOrEqual(60)
    }
  })

  it('shows an official source and review date for every visible statistic', () => {
    render(<Stats />)

    const statistics = screen.getAllByTestId('verified-statistic')
    expect(statistics).toHaveLength(4)
    for (const statistic of statistics) {
      expect(statistic.querySelector('a[href^="https://www.kimi.com/code/docs/"]')).not.toBeNull()
      expect(statistic).toHaveTextContent(/2026/)
    }
  })
})
