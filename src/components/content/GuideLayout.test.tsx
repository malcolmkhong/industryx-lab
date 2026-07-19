import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { GuideLayout } from './GuideLayout'

afterEach(cleanup)

describe('GuideLayout', () => {
  it('allows long guide content to shrink to the mobile viewport', () => {
    render(
      <GuideLayout contents={[{ id: 'setup', label: 'Setup' }]}>
        <article>Guide content</article>
      </GuideLayout>,
    )

    expect(screen.getByText('Guide content').parentElement).toHaveClass('min-w-0')
  })

  it('frames the guide with a mobile contents bar and a desktop sticky sidebar', () => {
    render(
      <GuideLayout contents={[{ id: 'setup', label: 'Setup' }]}>
        <article>Guide content</article>
      </GuideLayout>,
    )

    expect(document.querySelector('[data-mobile-contents]')).toHaveClass('xl:hidden')
    const desktopNav = screen.getByRole('navigation', { name: 'Jump to' })
    expect(desktopNav.closest('aside')).toHaveClass('sticky', 'top-24', 'hidden', 'xl:block')
  })
})
