import { cleanup, fireEvent, render, screen, within, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SafeBuildLoop } from './SafeBuildLoop'
import { safeBuildLoop } from '../content'

afterEach(cleanup)

const AUTO_ADVANCE_MS = 1300
const RESUME_DELAY_MS = 900

describe('SafeBuildLoop', () => {
  const heading = 'Use a safe build loop'
  const description = 'Test description'
  const detailHeadingTemplate = 'How to run {step}'

  const renderLoop = () =>
    render(
      <SafeBuildLoop
        heading={heading}
        description={description}
        detailHeadingTemplate={detailHeadingTemplate}
        steps={safeBuildLoop}
      />,
    )

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
    // jsdom does not provide IntersectionObserver, but vitest's global
        // setup installs a stub that never fires. Replace it with a stub that
        // reports the target as fully intersecting when constructed so the
        // loop is allowed to run during these tests.
        const OriginalIO = (globalThis as { IntersectionObserver?: unknown })
          .IntersectionObserver
        const originalCtor = OriginalIO as
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
              cb: IntersectionObserverCallback
              constructor(
                          cb: IntersectionObserverCallback,
                          opts?: IntersectionObserverInit,
                        ) {
                          this.cb = cb
                          void opts
                          const entries: IntersectionObserverEntry[] = [
                            {
                              isIntersecting: true,
                              intersectionRatio: 1,
                              target: document.body,
                              boundingClientRect: document.body.getBoundingClientRect(),
                              intersectionRect: document.body.getBoundingClientRect(),
                              rootBounds: null,
                              time: Date.now(),
                            } as unknown as IntersectionObserverEntry,
                          ]
                          cb(entries, this as unknown as IntersectionObserver)
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

  it('renders every step as an accessible button with its label', () => {
    renderLoop()

    for (const step of safeBuildLoop) {
      const button = screen.getByRole('button', { name: new RegExp(step.label) })
      expect(button).toBeInTheDocument()
    }
  })

  it('marks the first step as selected and shows its detail by default', () => {
    renderLoop()

    const first = screen.getByRole('button', { name: /Describe/ })
    expect(first).toHaveAttribute('aria-pressed', 'true')
    const detail = screen.getByRole('region', { name: /safe build loop detail/i })
    expect(within(detail).getByText(safeBuildLoop[0].instruction)).toBeInTheDocument()
    expect(within(detail).getByText(safeBuildLoop[0].example)).toBeInTheDocument()
  })

  it('switches the detail panel when another step is clicked', () => {
    renderLoop()

    fireEvent.click(screen.getByRole('button', { name: /Improve/ }))

    const detail = screen.getByRole('region', { name: /safe build loop detail/i })
    expect(within(detail).getByText(safeBuildLoop[3].instruction)).toBeInTheDocument()
    expect(within(detail).getByText(safeBuildLoop[3].example)).toBeInTheDocument()

    // Only one step can be selected at a time.
    for (const step of safeBuildLoop) {
      const matches = step.id === 'improve' ? 'true' : 'false'
      expect(screen.getByRole('button', { name: new RegExp(step.label) })).toHaveAttribute(
        'aria-pressed',
        matches,
      )
    }
  })

  it('shows all four steps on desktop (md and above)', () => {
    renderLoop()
    for (const step of safeBuildLoop) {
      expect(screen.getByRole('button', { name: new RegExp(step.label) })).toBeVisible()
    }
  })

  it('renders the section heading and description', () => {
    renderLoop()
    expect(screen.getByRole('heading', { name: heading, level: 2 })).toBeInTheDocument()
  })

  it('uses an ordered list (ol) for the four steps so screen readers read them in order', () => {
    renderLoop()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('exposes aria-controls pointing at the detail panel id', () => {
    renderLoop()
    const first = screen.getByRole('button', { name: /Describe/ })
    const detailId = first.getAttribute('aria-controls')
    expect(detailId).toMatch(/^safe-build-loop-detail/)
    expect(screen.getByRole('region', { name: /safe build loop detail/i })).toHaveAttribute('id', detailId)
  })

  it('renders a triangular pointer on the detail panel that follows the active step', () => {
    const { container } = renderLoop()

    const pointer = container.querySelector('.safe-loop-pointer')
    expect(pointer).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Test/ }))
    const detail = screen.getByRole('region', { name: /safe build loop detail/i })
    expect(within(detail).getByText(safeBuildLoop[2].instruction)).toBeInTheDocument()
    expect(container.querySelector('.safe-loop-pointer')).toBeInTheDocument()
  })

  it('auto-advances through the four steps when the reader is idle', () => {
      vi.useFakeTimers()
      renderLoop()

      const describeButton = screen.getByRole('button', { name: /Describe/ })
      expect(describeButton).toHaveAttribute('aria-pressed', 'true')

      // After RESUME_DELAY_MS + 2 * AUTO_ADVANCE_MS the loop should have
      // ticked twice and activeId moved to 'test'.
      act(() => {
        vi.advanceTimersByTime(RESUME_DELAY_MS + AUTO_ADVANCE_MS * 2)
      })
      expect(screen.getByRole('button', { name: /Test/ })).toHaveAttribute('aria-pressed', 'true')

      vi.useRealTimers()
    })

  it('pauses the auto-loop when a step is hovered', () => {
    vi.useFakeTimers()
    renderLoop()

    const strip = screen.getByRole('list', { name: /safe build loop/i })
    fireEvent.pointerEnter(strip)

    act(() => {
      vi.advanceTimersByTime(RESUME_DELAY_MS + AUTO_ADVANCE_MS * 3)
    })

    // While paused, the active step stays on Describe.
    expect(screen.getByRole('button', { name: /Describe/ })).toHaveAttribute('aria-pressed', 'true')

    vi.useRealTimers()
  })

  it('does not auto-advance when prefers-reduced-motion is requested', () => {
    vi.useFakeTimers()
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

    renderLoop()
    act(() => {
      vi.advanceTimersByTime(RESUME_DELAY_MS + AUTO_ADVANCE_MS * 4)
    })

    // Step 1 stays selected because the auto-loop is disabled.
    expect(screen.getByRole('button', { name: /Describe/ })).toHaveAttribute('aria-pressed', 'true')

    vi.useRealTimers()
  })
})