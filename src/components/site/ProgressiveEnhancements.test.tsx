import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('ProgressiveEnhancements', () => {
  it('installs DOM behavior after hydration instead of injecting an inline script', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/components/site/ProgressiveEnhancements.tsx'),
      'utf8',
    )

    expect(source).toMatch(/^['"]use client['"]/)
    expect(source).toContain('useEffect')
    expect(source).not.toContain('dangerouslySetInnerHTML')
  })
})
