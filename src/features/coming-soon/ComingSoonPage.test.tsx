import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { comingSoonRoutes } from '@/config/routes'
import { invitationLinks } from '@/config/site'
import { ComingSoonPage } from './ComingSoonPage'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('ComingSoonPage', () => {
  it('does not render a broken invitation link when its configured URL is unavailable', () => {
    const route = comingSoonRoutes[0]

    render(<ComingSoonPage route={route} invitationHref="" />)

    expect(screen.queryByText('Try Kimi with My Invitation Link')).not.toBeInTheDocument()
    expect(screen.getByText(/Kimi Viral Referral Program/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore Available Pages' })).toHaveAttribute('href', route.fallbackPath)
  })

  it('connects both workspace promotions to the configured invitation URL', () => {
    render(<ComingSoonPage route={comingSoonRoutes[0]} invitationHref={invitationLinks.subscribe} />)

    expect(screen.getByRole('link', { name: 'Upgrade Your Plan' })).toHaveAttribute('href', invitationLinks.subscribe)
    expect(screen.getByRole('link', { name: 'Invite to Earn' })).toHaveAttribute('href', invitationLinks.subscribe)
  })

  it('reuses the staged desktop animation for the agent response', () => {
    vi.useFakeTimers()

    render(<ComingSoonPage route={comingSoonRoutes[0]} />)

    expect(screen.getByRole('status')).toHaveTextContent('Thinking')

    act(() => vi.advanceTimersByTime(600))
    act(() => vi.advanceTimersByTime(900))
    act(() => vi.advanceTimersByTime(1200))
    expect(screen.getByRole('status')).toHaveTextContent('Generating text')

    act(() => vi.advanceTimersByTime(750))
    act(() => vi.advanceTimersByTime(750))
    act(() => vi.advanceTimersByTime(750))
    expect(screen.getByRole('status')).toHaveTextContent('Streaming response')

    for (let index = 0; index < 250; index += 1) {
      act(() => vi.advanceTimersByTime(16))
    }
    expect(screen.getByRole('status')).toHaveTextContent('Complete')

    act(() => vi.advanceTimersByTime(5200))
    expect(screen.getByRole('status')).toHaveTextContent('Thinking')
  })

  it('continues staged content updates when the browser requests reduced motion', () => {
    vi.useFakeTimers()
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    render(<ComingSoonPage route={comingSoonRoutes[0]} />)

    expect(screen.getByRole('status')).toHaveTextContent('Thinking')
    act(() => vi.advanceTimersByTime(600))
    act(() => vi.advanceTimersByTime(900))
    act(() => vi.advanceTimersByTime(1200))
    expect(screen.getByRole('status')).toHaveTextContent('Generating text')
  })

  it('reserves enough response space to prevent animation layout shifts', () => {
    render(<ComingSoonPage route={comingSoonRoutes[0]} />)

    expect(screen.getByRole('region', { name: 'Simulated agent response' })).toHaveClass(
      'h-[420px]',
      'sm:h-[340px]',
      'lg:h-[320px]',
      'overflow-hidden',
    )
  })

  it('keeps the simulated composer placeholder contained on narrow screens', () => {
    render(<ComingSoonPage route={comingSoonRoutes[0]} />)

    expect(screen.getByLabelText('Message input preview')).toHaveClass('truncate')
    expect(screen.getByLabelText('Simulated agent tools')).toHaveClass(
      'grid',
      'grid-cols-2',
      'sm:flex',
    )
  })

  it('lets the workspace preview flow naturally instead of forcing a full-viewport reservation', () => {
    render(<ComingSoonPage route={comingSoonRoutes[0]} />)

    const main = screen.getByRole('main')
    expect(main).not.toHaveClass('min-h-[calc(100vh-4rem)]')
  })
})
