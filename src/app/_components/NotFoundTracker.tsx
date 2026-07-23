'use client'

import { useEffect } from 'react'

/**
 * Fires `404_view` once on mount. Lives in a tiny client component so the
 * not-found page can stay a server component for static export.
 */
export function NotFoundTracker() {
  useEffect(() => {
    window.track404View?.(window.location.pathname)
  }, [])
  return null
}