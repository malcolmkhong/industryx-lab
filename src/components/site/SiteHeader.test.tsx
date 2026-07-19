import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'

afterEach(cleanup)

describe('SiteHeader', () => {
  it('renders as a server component without a scroll subscription', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/site/SiteHeader.tsx'), 'utf8')

    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain('useEffect')
    expect(source).not.toContain('useState')
  })

  it('uses a compact mobile header without constraining the brand to one grid column', () => {
    render(<SiteHeader />)

    const headerLayout = screen.getByRole('banner').firstElementChild
    const desktopNavigation = screen.getByRole('navigation', { name: 'Main navigation' })

    expect(headerLayout).toHaveClass('flex', 'md:grid', 'md:grid-cols-[1fr_auto_1fr]')
    expect(desktopNavigation).toHaveClass('justify-self-center')
    expect(screen.getByRole('link', { name: 'IndustryX Lab' })).toHaveClass('justify-self-start')
    expect(screen.getByText('IndustryX Lab')).toHaveClass('whitespace-nowrap')
  })

  it('keeps the viewport-fixed mobile drawer outside the animated header', () => {
    render(<SiteHeader />)

    const menuTrigger = screen.getByRole('button', { name: 'Open menu' })
    const mobileNavigation = menuTrigger.closest('details')

    expect(screen.getByRole('banner')).not.toContainElement(mobileNavigation)
    expect(menuTrigger).toHaveClass('group-open/mobile:invisible')
  })
})
