import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CookieConsent } from './CookieConsent'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('CookieConsent', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'doNotTrack', { value: null, configurable: true })
    Object.defineProperty(window, 'doNotTrack', { value: null, configurable: true })
    Object.defineProperty(navigator, 'msDoNotTrack', { value: null, configurable: true })
  })

  it('renders the consent banner on first visit', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decline/i })).toBeInTheDocument()
  })

  it('does not render when consent has already been granted', () => {
    window.localStorage.setItem(
      'industryx:consent',
      JSON.stringify({ analytics_storage: 'granted', ad_storage: 'granted' }),
    )
    render(<CookieConsent />)
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument()
  })

  it('does not render when consent has already been declined', () => {
    window.localStorage.setItem(
      'industryx:consent',
      JSON.stringify({ analytics_storage: 'denied', ad_storage: 'denied' }),
    )
    render(<CookieConsent />)
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument()
  })

  it('accept button grants consent and hides the banner', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument()
    const stored = JSON.parse(window.localStorage.getItem('industryx:consent') ?? '{}')
    expect(stored.analytics_storage).toBe('granted')
    expect(stored.ad_storage).toBe('granted')
  })

  it('decline button keeps analytics denied and hides the banner', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /decline/i }))
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument()
    const stored = JSON.parse(window.localStorage.getItem('industryx:consent') ?? '{}')
    expect(stored.analytics_storage).toBe('denied')
  })

  it('hides the banner when Do Not Track is set', () => {
    Object.defineProperty(navigator, 'doNotTrack', { value: '1', configurable: true })
    render(<CookieConsent />)
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument()
  })
})
