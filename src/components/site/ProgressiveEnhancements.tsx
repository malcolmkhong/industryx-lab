'use client'

import { useEffect } from 'react'
import { installProgressiveEnhancements } from '@/lib/browser/progressiveEnhancements'

export function ProgressiveEnhancements() {
  useEffect(() => {
    installProgressiveEnhancements()
  }, [])

  return null
}
