import { externalLinks, siteConfig } from '@/config/site'
import { routePaths } from '@/config/routes'

export const dynamic = 'force-static'

export function GET() {
  const beginnerUrl = new URL(routePaths.beginner, siteConfig.url).toString()
  const text = `# ${siteConfig.name}

> An independent, beginner-friendly guide to learning Kimi Code through a practical Next.js and Supabase task-manager project.

Maintained by ${siteConfig.author.name} at ${siteConfig.organization.name}. This site is not affiliated with or endorsed by Moonshot AI.

## Priority pages

- [Home](${siteConfig.url}/): What Kimi Code is, verified product facts, installation commands, and learning paths.
- [Beginner project guide](${beginnerUrl}): Eight stages covering the starter kit, Supabase, Google sign-in, Row Level Security, task features, filters, and Vercel deployment.

## Official product sources

- [Kimi Code documentation](${externalLinks.docs})
- [Kimi Code official site](${externalLinks.kimiCode})
- [Kimi Code GitHub repository](${externalLinks.github})

## Editorial policy

Product claims link to official sources. Statistics include a review date. Core content is reviewed quarterly and whenever Kimi product behavior changes.
`

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
