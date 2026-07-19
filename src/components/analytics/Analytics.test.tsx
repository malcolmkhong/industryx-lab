import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Analytics } from './Analytics'

vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-measurement-id={gaId} />
  ),
  sendGAEvent: vi.fn(),
}))

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}))

const originalMeasurementId = process.env.NEXT_PUBLIC_GA_ID

afterEach(() => {
  cleanup()
  if (originalMeasurementId === undefined) delete process.env.NEXT_PUBLIC_GA_ID
  else process.env.NEXT_PUBLIC_GA_ID = originalMeasurementId
})

describe('Analytics', () => {
  it('renders Vercel Analytics without requiring a GA4 ID', () => {
    delete process.env.NEXT_PUBLIC_GA_ID

    render(<Analytics />)

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument()
  })

  it('renders GA4 only when a non-blank ID is configured', () => {
    process.env.NEXT_PUBLIC_GA_ID = ' G-TEST123 '

    render(<Analytics />)

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    expect(screen.getByTestId('google-analytics')).toHaveAttribute(
      'data-measurement-id',
      'G-TEST123',
    )
  })
})
