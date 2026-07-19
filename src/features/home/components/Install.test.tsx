import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Install } from './Install'

afterEach(cleanup)

describe('Install', () => {
  it('keeps long commands intact inside a horizontally scrollable mobile row', () => {
    const { container } = render(<Install />)
    const command = container.querySelector('code')

    expect(command).toHaveClass('overflow-x-auto', 'whitespace-nowrap')
    expect(command).not.toHaveClass('break-all')
  })
})
