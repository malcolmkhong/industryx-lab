import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { externalLinks } from '@/config/site'
import { Features } from './Features'

afterEach(cleanup)

describe('Features', () => {
  it('explains the current Kimi Code workflow in beginner-friendly language', () => {
    render(<Features />)

    expect(
      screen.getByRole('heading', {
        name: 'A coding agent that can move from request to verified change.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Works through the whole task' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Understands screenshots and video' })).toBeInTheDocument()
    expect(screen.queryByText(/Frontend Code Arena/i)).not.toBeInTheDocument()
  })

  it('links current capability claims to official Kimi sources', () => {
    render(<Features />)

    expect(screen.getByRole('link', { name: 'Kimi Code overview' })).toHaveAttribute(
      'href',
      externalLinks.docs,
    )
    expect(screen.getByRole('link', { name: 'Media and interaction guide' })).toHaveAttribute(
      'href',
      externalLinks.interactionDocs,
    )
    expect(screen.getByRole('link', { name: 'Official GitHub repository' })).toHaveAttribute(
      'href',
      externalLinks.github,
    )
  })
})
