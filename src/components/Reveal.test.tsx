import { act } from 'react'
import { hydrateRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Reveal } from './Reveal'

let root: Root | undefined

afterEach(() => {
  if (root) {
    act(() => root?.unmount())
    root = undefined
  }
})

describe('Reveal hydration', () => {
  it('renders priority content visibly in static HTML', () => {
    const html = renderToString(
      <Reveal priority>
        Above-the-fold content
      </Reveal>,
    )

    expect(html).not.toContain('opacity-0')
    expect(html).not.toContain('translate-y-6')
    expect(html).toContain('Above-the-fold content')
  })

  it('keeps the first client markup equal to the static HTML', async () => {
    const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window')
    Object.defineProperty(globalThis, 'window', { configurable: true, value: undefined })
    const serverHtml = renderToString(
      <Reveal delay={80} className="example">
        Content
      </Reveal>,
    )
    Object.defineProperty(globalThis, 'window', windowDescriptor!)

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({
        matches: true,
        addEventListener() {},
        removeEventListener() {},
      }),
    })

    const container = document.createElement('div')
    container.innerHTML = serverHtml
    const hydrationErrors: unknown[] = []
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    await act(async () => {
      root = hydrateRoot(
        container,
        <Reveal delay={80} className="example">
          Content
        </Reveal>,
        { onRecoverableError: (error) => hydrationErrors.push(error) },
      )
    })

    expect(hydrationErrors).toEqual([])
    const hasHydrationMismatch = consoleError.mock.calls.some(
      ([message]) =>
        typeof message === 'string' &&
        message.includes('A tree hydrated but some attributes'),
    )
    expect(hasHydrationMismatch).toBe(false)
    consoleError.mockRestore()
  })
})
