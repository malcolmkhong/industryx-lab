// @vitest-environment node

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import robots from './robots'
import sitemap from './sitemap'
import { GET as getLlmsText } from './llms.txt/route'

const root = resolve(import.meta.dirname, '../..')

describe('crawler discovery entry points', () => {
  it('provides Next metadata routes for robots, sitemap, and llms.txt', () => {
    for (const file of ['src/app/robots.ts', 'src/app/sitemap.ts', 'src/app/llms.txt/route.ts']) {
      expect(existsSync(resolve(root, file)), file).toBe(true)
    }
  })

  it('allows live retrieval crawlers and documents the training-bot decision', () => {
    const rules = robots().rules
    const entries = Array.isArray(rules) ? rules : [rules]
    const allowedAgents = entries.flatMap((entry) => Array.isArray(entry.userAgent) ? entry.userAgent : [entry.userAgent])

    for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Claude-SearchBot', 'Claude-User', 'Googlebot', 'Bingbot']) {
      expect(allowedAgents).toContain(agent)
    }

    for (const agent of ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended']) {
      const policy = entries.find((entry) => entry.userAgent === agent)
      expect(policy?.disallow).toBe('/')
    }
  })

  it('lists only completed canonical pages in the sitemap', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://industryx-lab.vercel.app/',
      'https://industryx-lab.vercel.app/build-project/beginner',
    ])
  })

  it('publishes a useful plain-text manifest for answer engines', async () => {
    const response = getLlmsText()
    const text = await response.text()

    expect(response.headers.get('content-type')).toContain('text/plain')
    expect(text).toContain('# Kimi Beginner Guide Hub')
    expect(text).toContain('https://industryx-lab.vercel.app/build-project/beginner')
    expect(text).toContain('https://www.kimi.com/code/docs/en/')
    expect(text).toContain('Maintained by Malcolm at IndustryX')
  })
})
