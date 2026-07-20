/**
 * Decides which `reading_milestone` events to emit for a given scroll
 * percentage. Each milestone (25 / 50 / 75 / 100) fires at most once per
 * page view. The caller is responsible for holding the "already fired"
 * Set across scroll events and resetting it on a route change.
 */

export const MILESTONES = [25, 50, 75, 100] as const
export type Milestone = (typeof MILESTONES)[number]

export function consumeMilestonesForPercent(
  percent: number,
  alreadyFired: Set<number>,
): Milestone[] {
  const clamped = Math.max(0, Math.min(100, percent))
  const fired: Milestone[] = []
  for (const milestone of MILESTONES) {
    if (clamped >= milestone && !alreadyFired.has(milestone)) {
      fired.push(milestone)
      alreadyFired.add(milestone)
    }
  }
  return fired
}
