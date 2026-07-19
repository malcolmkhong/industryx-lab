import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Analytics } from './Analytics'

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}))

const originalMeasurementId = process.env.NEXT_PUBLIC_GA_ID

afterEach(() => {
  cleanup()
  document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((script) => script.remove())
  delete (window as Window & { __industryxGaInstalled?: boolean }).__industryxGaInstalled
  delete (window as Window & { dataLayer?: unknown[] }).dataLayer
  delete (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  if (originalMeasurementId === undefined) delete process.env.NEXT_PUBLIC_GA_ID
  else process.env.NEXT_PUBLIC_GA_ID = originalMeasurementId
})

describe('Analytics', () => {
  it('keeps optional GA tracking outside the React client bundle', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/components/analytics/DeferredGoogleAnalytics.tsx'),
      'utf8',
    )

    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain('useEffect')
    expect(source).not.toContain('useState')
  })

  it('renders Vercel Analytics without requiring a GA4 ID', () => {
    delete process.env.NEXT_PUBLIC_GA_ID

    render(<Analytics />)

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    expect(document.querySelector('#google-analytics-loader')).not.toBeInTheDocument()
  })

  it('loads GA4 lazily after the first user interaction', async () => {
    process.env.NEXT_PUBLIC_GA_ID = ' G-TEST123 '

    render(<Analytics />)

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    const loader = document.querySelector('#google-analytics-loader')
    expect(loader).toBeInTheDocument()
    expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeInTheDocument()

    window.eval(loader?.textContent ?? '')

    fireEvent.pointerDown(document.body)

    const script = document.querySelector<HTMLScriptElement>('script[src*="googletagmanager.com"]')
    expect(script?.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123')
    expect(script?.async).toBe(true)
  })
})
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
