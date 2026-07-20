import { afterEach, describe, expect, it } from 'vitest'
import { installProgressiveEnhancements } from './progressiveEnhancements'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('progressive enhancements', () => {
  it('handles navigation and guide progress without React hydration', () => {
    window.history.replaceState({}, '', '/build-project/beginner')
    document.body.innerHTML = `
      <a data-nav-exact="/" href="/">Home</a>
      <div data-nav-prefix="/build-project">
        <button data-nav-trigger aria-expanded="false">Build Project</button>
        <a role="menuitem" href="/build-project/beginner">Beginner</a>
      </div>
      <section data-guide-progress data-total-stages="2" data-status-template="{completed} of {total} stages complete">
        <span data-guide-progress-status></span>
        <span data-guide-progress-percent></span>
        <div data-guide-progressbar aria-valuenow="0"><span data-guide-progress-fill></span></div>
      </section>
      <label data-stage-complete="false"><input type="checkbox" data-guide-stage="one"></label>
      <label data-stage-complete="false"><input type="checkbox" data-guide-stage="two"></label>
      <p data-guide-completion data-all-complete="All complete" data-remaining-template="{remaining} remaining"></p>
    `

    installProgressiveEnhancements()

    const group = document.querySelector<HTMLElement>('[data-nav-prefix]')
    const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')
    expect(group?.dataset.active).toBe('true')
    trigger?.click()
    expect(group?.dataset.open).toBe('true')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const firstStage = document.querySelector<HTMLInputElement>('[data-guide-stage]')
    if (!firstStage) throw new Error('Stage checkbox missing')
    firstStage.click()
    expect(document.querySelector('[data-guide-progress-status]')).toHaveTextContent(
      '1 of 2 stages complete',
    )
    expect(document.querySelector('[data-guide-progress-percent]')).toHaveTextContent('50%')
    expect(firstStage.closest('[data-stage-complete]')).toHaveAttribute('data-stage-complete', 'true')
  })

  it('reveals mobile page actions only after meaningful scrolling', () => {
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 700 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true })
    document.body.innerHTML = '<div data-mobile-scroll-actions data-visible="false"></div>'

    installProgressiveEnhancements()

    const actions = document.querySelector('[data-mobile-scroll-actions]')
    expect(actions).toHaveAttribute('data-visible', 'false')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 701, writable: true })
    window.dispatchEvent(new Event('scroll'))
    expect(actions).toHaveAttribute('data-visible', 'true')
  })

  it('syncs the mobile contents bar label to the currently active heading', () => {
    document.body.innerHTML = `
      <a data-toc-link="alpha" href="#alpha">Alpha</a>
      <a data-toc-link="beta" href="#beta">Beta</a>
      <h2 id="alpha">Alpha heading</h2>
      <h2 id="beta">Beta heading</h2>
      <details data-mobile-contents>
        <summary><span data-mobile-contents-label>init</span></summary>
      </details>
    `

    installProgressiveEnhancements()

    const label = document.querySelector('[data-mobile-contents-label]')
    expect(label?.textContent).toBe('Beta')
  })

  it('closes the mobile contents overlay on Escape', () => {
    document.body.innerHTML = `
      <details data-mobile-contents open>
        <summary>x</summary>
      </details>
    `

    installProgressiveEnhancements()

    const details = document.querySelector('[data-mobile-contents]') as HTMLDetailsElement
    expect(details.open).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(details.open).toBe(false)
  })

  it('closes the mobile contents overlay when a link inside it is clicked', () => {
    document.body.innerHTML = `
      <details data-mobile-contents open>
        <summary>x</summary>
        <a href="#alpha">Alpha</a>
      </details>
    `

    installProgressiveEnhancements()

    const details = document.querySelector('[data-mobile-contents]') as HTMLDetailsElement
    const link = details.querySelector('a') as HTMLAnchorElement
    link.click()
    expect(details.open).toBe(false)
  })

  it('reflects hover and focus state in aria-expanded', () => {
    document.body.innerHTML = `
      <div data-nav-prefix="/build-project" data-open="false">
        <button data-nav-trigger aria-expanded="false">Build Project</button>
        <a role="menuitem" href="/build-project/beginner">Beginner</a>
        <a role="menuitem" href="/build-project/intermediate">Intermediate</a>
      </div>
    `

    installProgressiveEnhancements()

    const group = document.querySelector<HTMLElement>('[data-nav-prefix]')
    const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')
    if (!group || !trigger) throw new Error('Group or trigger missing')

    // Simulate the CSS-driven hover open by toggling data-open on pointerenter.
    group.dispatchEvent(new Event('pointerenter', { bubbles: true }))
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    expect(group.dataset.open).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    group.dispatchEvent(new Event('pointerleave', { bubbles: true }))
    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    expect(group.dataset.open).toBe('false')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('keeps aria-expanded true while focus stays inside the dropdown group', () => {
    document.body.innerHTML = `
      <div data-nav-prefix="/build-project" data-open="false">
        <button data-nav-trigger aria-expanded="false">Build Project</button>
        <a role="menuitem" href="/build-project/beginner">Beginner</a>
      </div>
    `

    installProgressiveEnhancements()

    const group = document.querySelector<HTMLElement>('[data-nav-prefix]')
    const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')
    if (!group || !trigger) throw new Error('Group or trigger missing')

    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Move focus between siblings inside the same group — must not close.
    const nextItem = group.querySelector<HTMLElement>('[role="menuitem"]')
    if (!nextItem) throw new Error('Menu item missing')
    nextItem.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Leaving the group closes.
    nextItem.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    // Allow the focusout setTimeout(0) check to run.
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
        resolve()
      }, 10)
    })
  })

  it('moves keyboard focus between menu items with ArrowUp and ArrowDown', () => {
    document.body.innerHTML = `
      <div data-nav-prefix="/build-project">
        <button data-nav-trigger aria-expanded="false">Build Project</button>
        <a role="menuitem" href="/build-project/beginner">Beginner</a>
        <a role="menuitem" href="/build-project/intermediate">Intermediate</a>
        <a role="menuitem" href="/build-project/advanced">Advanced</a>
      </div>
    `

    installProgressiveEnhancements()

    const group = document.querySelector<HTMLElement>('[data-nav-prefix]')
    const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')
    const items = group?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')
    if (!group || !trigger || !items || items.length !== 3) throw new Error('Markup missing')

    trigger.focus()
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[0])

    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[1])

    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[0])

    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[items.length - 1])

    items[items.length - 1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[0])

    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(items[items.length - 1])
  })

  it('returns focus to the trigger when Escape closes an open dropdown', () => {
    document.body.innerHTML = `
      <div data-nav-prefix="/build-project" data-open="true">
        <button data-nav-trigger aria-expanded="true">Build Project</button>
        <a role="menuitem" href="/build-project/beginner">Beginner</a>
      </div>
    `

    installProgressiveEnhancements()

    const group = document.querySelector<HTMLElement>('[data-nav-prefix]')
    const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')
    const firstItem = group?.querySelector<HTMLAnchorElement>('[role="menuitem"]')
    if (!group || !trigger || !firstItem) throw new Error('Markup missing')

    firstItem.focus()
    expect(document.activeElement).toBe(firstItem)

    firstItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    // The close is deferred to the next tick so the focusin on the trigger
    // doesn't re-open the menu we just told to close.
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        expect(group.dataset.open).toBe('false')
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
        expect(document.activeElement).toBe(trigger)
        resolve()
      }, 10)
    })
  })

  it('fills the reading progress bar as the user scrolls through the main element', () => {
    const main = document.createElement('main')
    let rectTop = 0
    main.getBoundingClientRect = () => ({
      top: rectTop,
      bottom: rectTop + 2000,
      height: 2000,
      left: 0,
      right: 0,
      width: 390,
      x: 0,
      y: rectTop,
      toJSON: () => ({}),
    })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })

    main.innerHTML =
      '<div data-reading-progress><div data-reading-progress-fill style="width:0%"></div></div>'
    document.body.innerHTML = ''
    document.body.appendChild(main)

    installProgressiveEnhancements()

    rectTop = -600
    window.dispatchEvent(new Event('scroll'))

    const fill = main.querySelector<HTMLElement>('[data-reading-progress-fill]')
    expect(fill?.style.width).toBe('50%')
  })
})
