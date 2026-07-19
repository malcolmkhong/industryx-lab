import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ReadingProgress } from './ReadingProgress'

afterEach(cleanup)

describe('ReadingProgress', () => {
  it('renders a fixed reading progress bar pinned to the top of the viewport', () => {
    const { container } = render(<ReadingProgress />)
    const bar = container.querySelector('[data-reading-progress]')
    expect(bar).toHaveClass('fixed', 'top-0', 'inset-x-0')
    expect(bar?.querySelector('[data-reading-progress-fill]')).toBeInTheDocument()
  })
})
