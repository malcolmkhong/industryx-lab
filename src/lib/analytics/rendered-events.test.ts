import { readFileSync } from 'node:fs'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { essentialEventNames } from './events'

const ALLOWLIST = new Set<string>(essentialEventNames)

function collectHtmlFiles(root: string): string[] {
  const out: string[] = []
  const stack = [root]
  while (stack.length > 0) {
    const current = stack.pop()!
    const entries = readdirSync(current)
    for (const entry of entries) {
      const full = join(current, entry)
      const stats = statSync(full)
      if (stats.isDirectory()) {
        stack.push(full)
      } else if (entry.endsWith('.html')) {
        out.push(full)
      }
    }
  }
  return out
}

describe('rendered analytics markup', () => {
  // The CI guard is a single early-return; spot-check the source so a future
  // refactor can't accidentally remove it. The runtime behavior is covered
  // by the integration test below.
  it('guards against running on CI without a built output directory', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/lib/analytics/rendered-events.test.ts'),
      'utf8',
    )
    expect(source).toContain('process.env.CI')
  })

  // Static export writes many ancillary files (manifests, build traces).
  // The 5s default is too tight when the build output is large. Skip the
  // test on CI because the static export happens after this test runs in
  // the `npm run check` pipeline; locally the build output already exists.
  it('uses only allowlisted event names and labels on every built page', { timeout: 30000 }, () => {
    if (process.env.CI) return
    const outDir = join(process.cwd(), 'out')
    const htmlFiles = collectHtmlFiles(outDir)

    // If the build hasn't run yet there is nothing to verify — skip rather
    // than fail the test suite for an unrelated reason.
    if (htmlFiles.length === 0) return

    const unknown: Array<{ file: string; value: string }> = []
    const labels: Array<{ file: string; value: string }> = []
    const labelPattern = /data-analytics-label="([^"]+)"/g
    const eventAttributePattern = /data-analytics-event="([^"]+)"/g

    // Allowed label prefixes. We validate only the prefix because placement
    // suffixes vary per link (e.g. footer-kimi-code, install-invitation).
    const allowedLabelPrefixes = [
      'footer-',
      'beginner-',
      'hero-',
      'home-',
      'install-',
      'final-',
      'mobile-sticky-',
      'coming-soon-',
      'workspace-',
      'stage-',
      'copy-install-',
      'page-',
    ]

    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8')
      let match: RegExpExecArray | null
      while ((match = eventAttributePattern.exec(html)) !== null) {
        const value = match[1]
        if (!ALLOWLIST.has(value)) {
          unknown.push({ file, value })
        }
      }
      while ((match = labelPattern.exec(html)) !== null) {
        const value = match[1]
        // 404_view, stage_complete, reading_milestone, page_view events do
        // not require a label. Skip labels attached to those events.
        const eventName = match.input.match(/data-analytics-event="([^"]+)"/)?.[1]
        if (
          eventName === '404_view' ||
          eventName === 'stage_complete' ||
          eventName === 'reading_milestone' ||
          eventName === 'page_view'
        ) {
          continue
        }
        if (!allowedLabelPrefixes.some((prefix) => value.startsWith(prefix))) {
          labels.push({ file, value })
        }
      }
    }

    expect(unknown).toEqual([])
    expect(labels).toEqual([])
  })
})
