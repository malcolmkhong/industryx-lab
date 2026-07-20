import { cleanup, render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBuildLoop } from './useBuildLoop'

afterEach(cleanup)

type Item = { id: string }

const ITEMS: Item[] = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]

const AUTO_ADVANCE_MS = 1300
const RESUME_DELAY_MS = 900

interface HarnessProps {
  autoAdvanceMs?: number
  resumeDelayMs?: number
  items?: Item[]
}

function Harness({ autoAdvanceMs = AUTO_ADVANCE_MS, resumeDelayMs = RESUME_DELAY_MS, items = ITEMS }: HarnessProps) {
  const { activeId, rootRef, isPaused } = useBuildLoop<Item>({
    items,
    getId: (i) => i.id,
    autoAdvanceMs,
    resumeDelayMs,
    visibilityThreshold: 0,
  })
  return (
    <div
      ref={rootRef}
      data-testid="harness-root"
      data-active-id={activeId}
      data-paused={isPaused ? 'true' : 'false'}
    />
  )
}

const renderHarness = (props?: HarnessProps) => render(<Harness {...props} />)

const readActiveId = () => screen.getByTestId('harness-root').getAttribute('data-active-id')

const readPaused = () => screen.getByTestId('harness-root').getAttribute('data-paused') === 'true'

describe('useBuildLoop', () => {
  beforeEach(() => {
    // Default: motion allowed, tab visible.
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    // vitest's setup.ts installs a no-op IntersectionObserver stub. Replace it
    // with one that fires a fully-visible entry from its constructor so the
    // hook's `el` check passes and the loop is allowed to run.
    const originalCtor = (globalThis as { IntersectionObserver?: unknown })
      .IntersectionObserver as
      | (new (
          cb: IntersectionObserverCallback,
          opts?: IntersectionObserverInit,
        ) => unknown)
      | undefined
    if (originalCtor) {
      ;(globalThis as { IntersectionObserver: unknown }).IntersectionObserver =
        class {
          root = null
          rootMargin = ''
          thresholds: number[] = []
          constructor(
                      cb: IntersectionObserverCallback,
                      opts?: IntersectionObserverInit,
                    ) {
                      void opts
            cb(
              [
                {
                  isIntersecting: true,
                  intersectionRatio: 1,
                  target: document.body,
                  boundingClientRect: document.body.getBoundingClientRect(),
                  intersectionRect: document.body.getBoundingClientRect(),
                  rootBounds: null,
                  time: Date.now(),
                } as unknown as IntersectionObserverEntry,
              ],
              this as unknown as IntersectionObserver,
            )
          }
          observe() {}
          unobserve() {}
          disconnect() {}
          takeRecords() {
            return []
          }
        }
    }
  })

  it('starts with the first item active', () => {
    renderHarness()
    expect(readActiveId()).toBe('a')
    expect(readPaused()).toBe(false)
  })

  it('auto-advances after resume + advance delay', () => {
      vi.useFakeTimers()
      renderHarness()
      expect(readActiveId()).toBe('a')

      act(() => {
        vi.advanceTimersByTime(RESUME_DELAY_MS + AUTO_ADVANCE_MS * 2)
      })
      expect(readActiveId()).toBe('c')

      vi.useRealTimers()
    })

  it('wraps around to the first item after the last', () => {
    vi.useFakeTimers()
    renderHarness()
    expect(readActiveId()).toBe('a')

    act(() => {
      vi.advanceTimersByTime(RESUME_DELAY_MS + AUTO_ADVANCE_MS * 4)
    })
    expect(readActiveId()).toBe('a')

    vi.useRealTimers()
  })

  it('does not run when items has fewer than two entries', () => {
    vi.useFakeTimers()
    renderHarness({ items: [{ id: 'only' }] })
    expect(readActiveId()).toBe('only')
    expect(readPaused()).toBe(true)
    vi.useRealTimers()
  })

  it('does not run when prefers-reduced-motion is enabled', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('reduce'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    vi.useFakeTimers()
    renderHarness()
    expect(readActiveId()).toBe('a')
    expect(readPaused()).toBe(true)
    vi.useRealTimers()
  })
})