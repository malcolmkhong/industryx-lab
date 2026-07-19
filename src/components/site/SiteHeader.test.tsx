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
