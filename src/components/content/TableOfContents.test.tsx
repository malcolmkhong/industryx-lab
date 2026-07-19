import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TableOfContents } from './TableOfContents'

afterEach(cleanup)

const items = [
  { id: 'setup', label: 'Setup' },
  { id: 'install', label: 'Install the CLI' },
  { id: 'verify', label: 'Verify it works' },
]

describe('TableOfContents', () => {
  it('renders a sticky desktop sidebar navigation that stays hidden below xl', () => {
    render(<TableOfContents items={items} />)

    const nav = screen.getByRole('navigation', { name: 'Jump to' })
    const aside = nav.closest('aside')
    expect(aside).toHaveClass('sticky', 'top-24', 'hidden', 'xl:block')
  })

  it('lists every section as a jump link with the correct anchor and marks the first as active', () => {
    render(<TableOfContents items={items} />)

    for (const item of items) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', `#${item.id}`)
    }
    expect(screen.getByRole('link', { name: items[0].label })).toHaveAttribute('aria-current', 'location')
  })
})
