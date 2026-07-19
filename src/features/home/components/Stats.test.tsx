import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Stats } from './Stats'

afterEach(cleanup)

describe('Stats', () => {
  it('uses a 20px mobile gutter and a 24px tablet gutter on every stat cell', () => {
    render(<Stats />)

    const firstCell = screen.getAllByTestId('verified-statistic')[0].parentElement
    expect(firstCell).toHaveClass('px-5', 'sm:px-6')
  })
})
