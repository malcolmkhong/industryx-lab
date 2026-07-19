import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDesktopAnimation } from './useDesktopAnimation'

afterEach(() => {
  vi.useRealTimers()
})

describe('useDesktopAnimation', () => {
  it('does not start until its section approaches the viewport', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ active }) =>
        useDesktopAnimation({
          active,
          stepCount: 3,
          finalTextLength: 20,
        }),
      { initialProps: { active: false } },
    )

    act(() => vi.advanceTimersByTime(2_000))
    expect(result.current.stage).toBe(0)

    rerender({ active: true })
    act(() => vi.advanceTimersByTime(600))
    expect(result.current.stage).toBe(1)
  })
})
