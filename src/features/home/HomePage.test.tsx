import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

afterEach(cleanup)

describe('HomePage', () => {
  it('places the Kimi desktop explanation between statistics and features', () => {
    render(<HomePage />)

    const stats = screen.getByRole('heading', { name: 'Key Statistics' })
    const desktop = screen.getByRole('heading', {
      name: 'See how Kimi works through a coding task.',
    })
    const features = screen.getByRole('heading', {
      name: 'A coding agent that can move from request to verified change.',
    })

    expect(stats.compareDocumentPosition(desktop)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(desktop.compareDocumentPosition(features)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('explains what beginners can learn from the desktop workflow', () => {
    render(<HomePage />)

    expect(
      screen.getByText(/follow the request, watch each tool run, review the changes/i),
    ).toBeInTheDocument()
    expect(screen.getByText('Kimi — Desktop')).toBeInTheDocument()
  })
})
