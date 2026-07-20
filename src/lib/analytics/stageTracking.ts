/**
 * Persists Beginner page stage completion in localStorage and exposes a
 * single helper that decides whether toggling a stage should emit a
 * `stage_complete` event. The helper guarantees that reloading a page
 * with previously completed stages does not re-fire those events.
 */

export const STORAGE_KEY = 'industryx:beginner-stages'

function safeStorage(): Storage | null {
  try {
    // Probe both write and read; some browsers throw on one but not the
    // other (private mode, sandboxed iframes, disabled storage policies).
    const probeKey = '__industryx_probe__'
    window.localStorage.setItem(probeKey, '1')
    window.localStorage.getItem(probeKey)
    window.localStorage.removeItem(probeKey)
    return window.localStorage
  } catch {
    return null
  }
}

function readRaw(storage: Storage | null): string[] {
  if (!storage) return []
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((value): value is string => typeof value === 'string')
  } catch {
    return []
  }
}

export function loadCompletedStages(): Set<string> {
  return new Set(readRaw(safeStorage()))
}

export function markStageCompleted(stageId: string): void {
  const storage = safeStorage()
  if (!storage) return
  const current = readRaw(storage)
  if (current.includes(stageId)) return
  current.push(stageId)
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // Storage quota exceeded or policy-blocked. Fail closed: don't throw,
    // just skip persisting. The in-page UI still reflects the toggle.
  }
}

export function shouldFireStageComplete(
  stageId: string,
  previouslyCompleted: Set<string>,
): boolean {
  return !previouslyCompleted.has(stageId)
}
