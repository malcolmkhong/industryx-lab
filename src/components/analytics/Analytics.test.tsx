import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Analytics } from './Analytics'

vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-measurement-id={gaId} />
  ),
  sendGAEvent: vi.fn(),
}))

const originalMeasurementId = process.env.NEXT_PUBLIC_GA_ID

afterEach(() => {
  if (originalMeasurementId === undefined) delete process.env.NEXT_PUBLIC_GA_ID
  else process.env.NEXT_PUBLIC_GA_ID = originalMeasurementId
})

describe('Analytics', () => {
  it('renders no analytics integration without a configured GA4 ID', () => {
    delete process.env.NEXT_PUBLIC_GA_ID

    const { container } = render(<Analytics />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders GA4 only when a non-blank ID is configured', () => {
    process.env.NEXT_PUBLIC_GA_ID = ' G-TEST123 '

    render(<Analytics />)

    expect(screen.getByTestId('google-analytics')).toHaveAttribute(
      'data-measurement-id',
      'G-TEST123',
    )
  })
})
