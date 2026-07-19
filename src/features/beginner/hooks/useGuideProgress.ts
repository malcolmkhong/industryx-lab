import { useMemo, useState } from 'react'

export function useGuideProgress(totalStages: number) {
  const [completedStages, setCompletedStages] = useState<Set<string>>(() => new Set())
  const completedCount = completedStages.size
  const progress = useMemo(
    () => Math.round((completedCount / totalStages) * 100),
    [completedCount, totalStages],
  )

  function toggleStage(id: string) {
    setCompletedStages((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return { completedCount, completedStages, progress, toggleStage }
}
