// @vitest-environment node

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../../..')

describe('analytics boundaries', () => {
  it('provides isolated analytics configuration, events, and rendering', () => {
    for (const file of [
      'src/lib/analytics/events.ts',
      'src/lib/analytics/deferredScript.ts',
      'src/components/analytics/Analytics.tsx',
      'src/components/analytics/DeferredGoogleAnalytics.tsx',
    ]) {
      expect(existsSync(resolve(root, file)), file).toBe(true)
    }
  })
})
