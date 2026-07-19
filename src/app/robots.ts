import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const liveRetrievalAgents = [
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'Perplexity-User',
    'Claude-SearchBot',
    'Claude-User',
    'Googlebot',
    'Google-Extended',
    'Bingbot',
  ]
  const trainingAgents = ['GPTBot', 'ClaudeBot', 'CCBot']

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...liveRetrievalAgents.map((userAgent) => ({ userAgent, allow: '/' })),
      ...trainingAgents.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
