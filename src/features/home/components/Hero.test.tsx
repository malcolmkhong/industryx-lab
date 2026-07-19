import { act, cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Hero } from './Hero'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
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

  it('progresses from setup commands to verified coding work', () => {
    vi.useFakeTimers()
    render(<Hero />)

    const terminal = screen.getByRole('region', { name: 'Kimi CLI live activity' })
    expect(within(terminal).queryByText(/Signed in to Kimi Code/)).not.toBeInTheDocument()

    for (let step = 0; step < 9; step += 1) {
      act(() => vi.advanceTimersByTime(650))
    }

    expect(within(terminal).getByText(/Signed in to Kimi Code/)).toBeInTheDocument()
    expect(within(terminal).getByText(/Build a responsive task dashboard/)).toBeInTheDocument()
    expect(within(terminal).getByText(/20 tests passed/)).toBeInTheDocument()
  })
})
