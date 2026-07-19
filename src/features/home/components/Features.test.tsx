import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Features } from './Features'

afterEach(cleanup)

describe('Features', () => {
  it('keeps every feature card compact on mobile while preserving desktop padding', () => {
    render(<Features />)

    const cards = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.parentElement)

    expect(cards.length).toBeGreaterThan(0)
    for (const card of cards) {
      expect(card).toHaveClass('p-4', 'sm:p-7', 'gap-3', 'sm:gap-4')
    }
  })
})
