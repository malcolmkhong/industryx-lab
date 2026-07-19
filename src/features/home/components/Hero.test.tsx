import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Hero } from './Hero'

afterEach(() => {
  cleanup()
})

describe('Hero', () => {
  it('shows a fixed-height Kimi CLI simulation instead of the desktop window', () => {
    render(<Hero />)

    const terminal = screen.getByRole('region', { name: 'Kimi CLI live activity' })

    expect(terminal).toHaveClass('h-[430px]', 'overflow-hidden')
    expect(within(terminal).getByText('Kimi CLI')).toBeInTheDocument()
    expect(within(terminal).getByText('Welcome to Kimi Code CLI!')).toBeInTheDocument()
    expect(screen.queryByText('Kimi — Desktop')).not.toBeInTheDocument()
  })

  it('keeps the complete CLI sequence in server HTML for CSS animation', () => {
    render(<Hero />)

    const terminal = screen.getByRole('region', { name: 'Kimi CLI live activity' })

    expect(within(terminal).getByText(/Signed in to Kimi Code/)).toBeInTheDocument()
    expect(within(terminal).getByText(/Build a responsive task dashboard/)).toBeInTheDocument()
    expect(within(terminal).getByText(/20 tests passed/)).toBeInTheDocument()

    const source = readFileSync(
      join(process.cwd(), 'src/features/home/components/CliAnimation.tsx'),
      'utf8',
    )
    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain('useCliAnimation')
  })
})
