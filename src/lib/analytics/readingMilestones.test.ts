import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  consumeMilestonesForPercent,
  MILESTONES,
} from './readingMilestones'

describe('reading milestones', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the four canonical milestones in ascending order', () => {
    expect(MILESTONES).toEqual([25, 50, 75, 100])
  })

  it('emits 25 the first time the reader crosses 25%', () => {
    expect(consumeMilestonesForPercent(24, new Set())).toEqual([])
    expect(consumeMilestonesForPercent(25, new Set())).toEqual([25])
  })

  it('emits every milestone between the previous mark and the new percent', () => {
    expect(consumeMilestonesForPercent(60, new Set())).toEqual([25, 50])
  })

  it('does not emit a milestone that has already fired this page view', () => {
    expect(consumeMilestonesForPercent(80, new Set([25, 50]))).toEqual([75])
    expect(consumeMilestonesForPercent(80, new Set([25, 50, 75]))).toEqual([])
  })

  it('does not emit duplicate milestones when the user scrolls back and forth', () => {
    expect(consumeMilestonesForPercent(80, new Set())).toEqual([25, 50, 75])
    expect(consumeMilestonesForPercent(20, new Set([25, 50, 75]))).toEqual([])
    expect(consumeMilestonesForPercent(80, new Set([25, 50, 75]))).toEqual([])
    expect(consumeMilestonesForPercent(100, new Set([25, 50, 75]))).toEqual([100])
  })

  it('caps the percent to 100 so overshoot does not produce phantom milestones', () => {
    expect(consumeMilestonesForPercent(150, new Set())).toEqual([25, 50, 75, 100])
  })
})
