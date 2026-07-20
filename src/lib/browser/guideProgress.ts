/**
 * Drives the Beginner's stage checkboxes: persistence, completion event
 * firing, and reading-progress milestones. All callers run after hydration
 * via installProgressiveEnhancements; nothing in here touches React state.
 */

import {
  loadCompletedStages,
  markStageCompleted,
  shouldFireStageComplete,
} from '@/lib/analytics/stageTracking'
import { consumeMilestonesForPercent } from '@/lib/analytics/readingMilestones'

export function restoreGuideStageState(): void {
  const completed = loadCompletedStages()
  document.querySelectorAll<HTMLInputElement>('[data-guide-stage]').forEach((checkbox) => {
    if (completed.has(checkbox.dataset.guideStage || '')) {
      checkbox.checked = true
      const label = checkbox.closest('[data-stage-complete]')
      if (label instanceof HTMLElement) label.dataset.stageComplete = 'true'
    }
  })
}

export function updateGuideProgress(changedCheckbox?: HTMLInputElement): void {
  const progress = document.querySelector('[data-guide-progress]')
  if (progress instanceof HTMLElement) {
    const checkboxes = Array.from(
      document.querySelectorAll<HTMLInputElement>('[data-guide-stage]'),
    )
    const completed = checkboxes.filter((item) => item.checked).length
    const total = Number(progress.dataset.totalStages || checkboxes.length)
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0
    const status = progress.querySelector('[data-guide-progress-status]')
    const percentLabel = progress.querySelector('[data-guide-progress-percent]')
    const progressbar = progress.querySelector('[data-guide-progressbar]')
    const fill = progress.querySelector('[data-guide-progress-fill]')
    const completion = document.querySelector('[data-guide-completion]')

    if (status) {
      status.textContent = (progress.dataset.statusTemplate || '')
        .replace('{completed}', String(completed))
        .replace('{total}', String(total))
    }
    if (percentLabel) percentLabel.textContent = percent + '%'
    if (progressbar) progressbar.setAttribute('aria-valuenow', String(percent))
    if (fill instanceof HTMLElement) fill.style.width = percent + '%'
    if (completion instanceof HTMLElement) {
      completion.textContent = completed === total
        ? completion.dataset.allComplete || ''
        : (completion.dataset.remainingTemplate || '').replace('{remaining}', String(total - completed))
    }
    checkboxes.forEach((checkbox) => {
      const label = checkbox.closest('[data-stage-complete]')
      if (label instanceof HTMLElement) label.dataset.stageComplete = String(checkbox.checked)
    })
  }

  // Fire the stage_complete event exactly once per incomplete -> complete
  // transition. Skips restoration events on page load.
  if (changedCheckbox && changedCheckbox.checked) {
    const stageId = changedCheckbox.dataset.guideStage || ''
    const previouslyCompleted = loadCompletedStages()
    if (shouldFireStageComplete(stageId, previouslyCompleted)) {
      markStageCompleted(stageId)
      window.trackStageComplete?.(stageId, 'beginner-stage')
    }
  }
}

const firedMilestones = new Set<25 | 50 | 75 | 100>()

export function updateReadingProgress(): void {
  const bar = document.querySelector('[data-reading-progress]')
  if (!(bar instanceof HTMLElement)) return
  const main = bar.closest('main')
  if (!main) return
  const rect = main.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  const scrolled = Math.max(0, -rect.top)
  const percent = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
  const fill = bar.querySelector<HTMLElement>('[data-reading-progress-fill]')
  if (fill) fill.style.width = `${percent}%`
  // Emit reading milestone events at 25 / 50 / 75 / 100, once each per
  // page view. Fired milestones persist in a module-scoped Set so they
  // reset only when the page is reloaded.
  const milestones = consumeMilestonesForPercent(percent, firedMilestones)
  for (const milestone of milestones) {
    window.trackReadingMilestone?.(milestone, 'main')
  }
}
