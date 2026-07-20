import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MobileContentsBar } from './MobileContentsBar'

afterEach(cleanup)

const items = [
  { id: 'before', label: 'Before you start' },
  { id: 'stage-1', label: 'Clone the starter kit' },
  { id: 'stage-2', label: 'Set up Supabase' },
]

describe('MobileContentsBar', () => {
  it('renders a sticky details that is hidden on xl and up', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const details = container.querySelector('[data-mobile-contents]')
    expect(details).toHaveClass('xl:hidden')
  })

  it('shows the first section label in the visible bar so the current location is always known', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const label = container.querySelector('[data-mobile-contents-label]')
    expect(label).toHaveTextContent(items[0].label)
  })

  it('renders every section as a jump link inside the dropdown with the correct anchor', () => {
    const { container } = render(<MobileContentsBar items={items} />)

    for (const item of items) {
      const link = container.querySelector(`[data-toc-link="${item.id}"]`)
      expect(link).toHaveAttribute('href', `#${item.id}`)
    }
  })

  it('renders the dropdown menu directly in the flow (no full-screen sheet)', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const menu = container.querySelector('[role=menu]')
    expect(menu).toBeInTheDocument()
    expect(menu?.querySelector('nav')).toBeInTheDocument()
  })

  it('marks the first section as the active section in the overlay initially', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const firstLink = container.querySelector(`[data-toc-link="${items[0].id}"]`)
    expect(firstLink).toHaveAttribute('data-active', 'true')
  })

  it('uses the summary element as both trigger and dismiss affordance', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const summary = container.querySelector('[data-mobile-contents] > summary')
    expect(summary).toBeInTheDocument()
    expect(summary).toHaveAttribute('aria-label', 'Contents')
  })
})
