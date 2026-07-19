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

  it('renders every section as a jump link inside the overlay with the correct anchor', () => {
    const { container } = render(<MobileContentsBar items={items} />)

    for (const item of items) {
      const link = container.querySelector(`[data-toc-link="${item.id}"]`)
      expect(link).toHaveAttribute('href', `#${item.id}`)
    }
  })

  it('marks the first section as the active section in the overlay initially', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const firstLink = container.querySelector(`[data-toc-link="${items[0].id}"]`)
    expect(firstLink).toHaveAttribute('data-active', 'true')
  })

  it('includes a close affordance inside the overlay', () => {
    const { container } = render(<MobileContentsBar items={items} />)
    const close = container.querySelector('[data-mobile-contents-close]')
    expect(close).toBeInTheDocument()
  })
})
