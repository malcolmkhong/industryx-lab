import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MobileMenuDropdown } from './MobileMenuDropdown'

afterEach(cleanup)

describe('MobileMenuDropdown', () => {
  it('meets the 44px tap-target minimum on every group summary', () => {
    render(<MobileMenuDropdown />)

    const summaries = screen.getAllByText(/Build Project|Explore Agent|Agent Resources/)
    expect(summaries.length).toBeGreaterThan(0)
    summaries.forEach((summary) => {
      const button = summary.closest('summary')
      expect(button).not.toBeNull()
      expect(button?.className).toMatch(/min-h-11/)
    })
  })
})
