import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SiteHeader } from './SiteHeader'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

afterEach(cleanup)

describe('SiteHeader', () => {
  it('centers navigation between the brand and mobile control columns', () => {
    render(<SiteHeader />)

    const headerLayout = screen.getByRole('banner').firstElementChild
    const desktopNavigation = screen.getByRole('navigation', { name: 'Main navigation' })

    expect(headerLayout).toHaveClass('grid', 'grid-cols-[1fr_auto_1fr]')
    expect(desktopNavigation).toHaveClass('justify-self-center')
    expect(screen.getByRole('link', { name: 'IndustryX Lab' })).toHaveClass('justify-self-start')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveClass('justify-self-end')
  })
})
