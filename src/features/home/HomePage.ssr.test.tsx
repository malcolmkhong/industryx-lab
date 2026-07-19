// @vitest-environment node

import { readFileSync } from 'node:fs'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage static rendering', () => {
  it('renders without browser globals', () => {
    expect(() => renderToString(<HomePage />)).not.toThrow()
  })

  it('keeps static page composition outside the client bundle', () => {
    const source = readFileSync(new URL('./HomePage.tsx', import.meta.url), 'utf8')

    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain("from 'react'")
  })

  it('keeps the desktop simulation and mobile actions server rendered', () => {
    const desktopSource = readFileSync(
      new URL('./components/KimiDesktop.tsx', import.meta.url),
      'utf8',
    )
    const mobileCtaSource = readFileSync(
      new URL('./components/MobileCta.tsx', import.meta.url),
      'utf8',
    )

    expect(desktopSource).toMatch(/^['"]use client['"]/)
    expect(desktopSource).toContain('useDesktopAnimation')
    expect(mobileCtaSource).not.toMatch(/^['"]use client['"]/)
    expect(mobileCtaSource).not.toContain('useEffect')
    expect(mobileCtaSource).not.toContain('useState')
  })
})
