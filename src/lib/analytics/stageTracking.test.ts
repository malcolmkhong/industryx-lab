import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  loadCompletedStages,
  markStageCompleted,
  shouldFireStageComplete,
  STORAGE_KEY,
} from './stageTracking'

describe('stage tracking persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns an empty set when nothing has been persisted', () => {
    expect(loadCompletedStages()).toEqual(new Set())
  })

  it('persists a stage id when marked complete', () => {
    markStageCompleted('stage-1')
    expect(loadCompletedStages()).toEqual(new Set(['stage-1']))
  })

  it('survives a re-read by reading from the same localStorage key', () => {
    markStageCompleted('stage-2')
    // Simulate a fresh page load by re-reading from storage directly.
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    expect(loadCompletedStages()).toEqual(new Set(['stage-2']))
  })

  it('ignores malformed stored payloads', () => {
    localStorage.setItem(STORAGE_KEY, 'not-an-array')
    expect(loadCompletedStages()).toEqual(new Set())
  })

  it('ignores non-string entries inside the stored array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['stage-1', 42, null]))
    expect(loadCompletedStages()).toEqual(new Set(['stage-1']))
  })

  it('shouldFireStageComplete returns true only on incomplete → complete transition', () => {
    expect(shouldFireStageComplete('stage-1', new Set())).toBe(true)
    expect(shouldFireStageComplete('stage-1', new Set(['stage-1']))).toBe(false)
  })
})

describe('stage tracking isolation', () => {
  it('does not throw when localStorage is unavailable', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage disabled')
    })
    try {
      expect(loadCompletedStages()).toEqual(new Set())
      expect(() => markStageCompleted('stage-1')).not.toThrow()
    } finally {
      spy.mockRestore()
    }
  })
})
