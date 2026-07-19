import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { externalLinks } from '@/config/site'
import { Footer } from './Footer'

afterEach(cleanup)

describe('Footer', () => {
  it('credits IndustryX with a safe animated external link', () => {
    render(<Footer />)

    const industryXLink = screen.getByRole('link', { name: 'IndustryX' })

    expect(screen.getByText('Brought to you by')).toBeInTheDocument()
    expect(industryXLink).toHaveAttribute('href', externalLinks.industryX)
    expect(industryXLink).toHaveAttribute('target', '_blank')
    expect(industryXLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(industryXLink).toHaveClass('animate-industryx-glow')
  })

  it('uses the IndustryX Lab visual brand', () => {
    render(<Footer />)

    expect(screen.getByText('IndustryX Lab')).toBeInTheDocument()
  })
})
