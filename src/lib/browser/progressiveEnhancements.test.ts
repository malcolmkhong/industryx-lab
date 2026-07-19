import { afterEach, describe, expect, it } from 'vitest'
import { installProgressiveEnhancements } from './progressiveEnhancements'

afterEach(() => {
  document.body.innerHTML = ''
  delete (window as Window & { __industryxEnhancementsInstalled?: boolean })
    .__industryxEnhancementsInstalled
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
})
