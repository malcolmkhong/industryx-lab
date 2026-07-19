// @vitest-environment node

import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const assets = resolve(import.meta.dirname, '../../assets')

describe('Beginner journey image', () => {
  it('uses a smaller WebP asset and removes the obsolete PNG', () => {
    const webp = resolve(assets, 'beginner-build-journey.webp')
    const png = resolve(assets, 'beginner-build-journey.png')

    expect(existsSync(webp)).toBe(true)
    expect(statSync(webp).size).toBeLessThan(500_000)
    expect(existsSync(png)).toBe(false)
  })
})
