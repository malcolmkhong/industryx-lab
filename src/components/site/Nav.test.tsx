import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { routePaths } from '@/config/routes'
import { Nav } from './Nav'

afterEach(cleanup)

describe('Nav', () => {
  it('keeps navigation out of the React client bundle', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/site/Nav.tsx'), 'utf8')

    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain("from 'react'")
    expect(source).not.toContain("from 'next/navigation'")
    expect(source).not.toContain("import('./MobileNavDrawer')")
  })

  it('renders every destination in the initial accessible markup', () => {
    render(<Nav />)

    expect(screen.getAllByRole('link', { name: 'HOME' })[0]).toHaveAttribute('href', routePaths.home)
    expect(screen.getAllByRole('link', { name: 'Beginner' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Intermediate' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Advanced' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Expert' }).length).toBeGreaterThan(0)

    expect(screen.queryByRole('link', { name: /invite/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument()
  })
})
