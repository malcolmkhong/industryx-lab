import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

afterEach(cleanup)

describe('HomePage', () => {
  it('defers below-the-fold rendering work', () => {
    const { container } = render(<HomePage />)

    const deferredContent = container.querySelector('.content-visibility-auto')
    const stats = screen.getByRole('heading', { name: 'Key Statistics' })
    const hero = screen.getByRole('heading', { name: /stop typing/i })

    expect(deferredContent).toContainElement(stats.closest('section'))
    expect(deferredContent).not.toContainElement(hero.closest('section'))
  })

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

  it('uses a connected mobile section rhythm while preserving larger breakpoints', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /stop typing/i }).closest('section')).toHaveClass('pt-24')
    expect(screen.getByRole('heading', { name: 'See how Kimi works through a coding task.' }).closest('section')).toHaveClass('py-16', 'sm:py-24')
    expect(screen.getByRole('heading', { name: 'A coding agent that can move from request to verified change.' }).closest('section')).toHaveClass('py-16', 'sm:py-24')
    expect(screen.getByRole('heading', { name: 'Zero to first commit in about a minute.' }).closest('section')).toHaveClass('py-16', 'sm:py-24')
  })

  it('uses a 20px mobile gutter and a 24px tablet gutter on every Home content wrapper', () => {
    const { container } = render(<HomePage />)

    const sectionIds = ['desktop', 'why', 'install', 'invite']

    for (const id of sectionIds) {
      const section = container.querySelector(`#${id}`)
      const contentWrapper = section?.querySelector('.max-w-6xl')
      expect(contentWrapper, id).toHaveClass('px-5', 'sm:px-6')
    }
  })

  it('reserves safe-area aware bottom space so the floating dock never covers the final CTA', () => {
    const { container } = render(<HomePage />)

    const inviteSection = container.querySelector('#invite')
    expect(inviteSection).toHaveClass('pb-safe-6')
  })
})
