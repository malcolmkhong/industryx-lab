// @vitest-environment node

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
  scripts: Record<string, string>
}

describe('release quality gates', () => {
  it('provides schema and Lighthouse validation commands', () => {
    expect(packageJson.scripts['schema:check']).toBe('node scripts/validate-schema.mjs')
    expect(packageJson.scripts.lighthouse).toBe('lhci autorun')
    expect(packageJson.scripts.check).toContain('npm run schema:check')

    for (const file of [
      'scripts/validate-schema.mjs',
      'scripts/lighthouse-setup.cjs',
      'lighthouserc.cjs',
      '.github/workflows/quality.yml',
    ]) {
      expect(existsSync(resolve(root, file)), file).toBe(true)
    }
  })

  it('documents optional search and analytics environment variables', () => {
    const example = readFileSync(resolve(root, '.env.example'), 'utf8')

    expect(example).toContain('NEXT_PUBLIC_GA_ID=')
    expect(example).toContain('GOOGLE_SITE_VERIFICATION=')
    expect(example).toContain('BING_SITE_VERIFICATION=')
  })

  it('provides measurement and recurring maintenance records', () => {
    for (const file of [
      'docs/measurement.md',
      'docs/content-inventory.md',
      'docs/content-freshness-log.md',
    ]) {
      expect(existsSync(resolve(root, file)), file).toBe(true)
    }
  })
})
