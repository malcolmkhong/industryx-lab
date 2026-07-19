import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MobileCta } from './MobileCta'

afterEach(cleanup)

describe('MobileCta', () => {
  it('groups the invitation and back-to-top actions into one compact mobile dock', () => {
    const { container } = render(<MobileCta />)
    const dock = container.querySelector('[data-mobile-scroll-actions]')

    expect(dock).toHaveAttribute('data-visible', 'false')
    expect(dock).toContainElement(screen.getByRole('link', { name: 'Get invite code' }))
    expect(dock).toContainElement(screen.getByRole('link', { name: 'Back to top' }))
  })

  it('positions the dock and its inner padding with the iOS safe-area inset', () => {
    const { container } = render(<MobileCta />)
    const dock = container.querySelector('[data-mobile-scroll-actions]')

    expect(dock).toHaveClass('bottom-safe-3')
    expect(dock).toHaveClass('pb-safe-2')
  })

  it('reserves the safe area without falling back to a legacy bottom-3 utility', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/features/home/components/MobileCta.tsx'),
      'utf8',
    )

    expect(source).not.toMatch(/\bbottom-3\b/)
  })
})
