'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface UseBuildLoopOptions<T> {
  items: readonly T[]
  getId: (item: T) => string
  autoAdvanceMs: number
  resumeDelayMs: number
  visibilityThreshold: number
}

export interface BuildLoopHoverProps {
  onPointerEnter: () => void
  onPointerLeave: () => void
}

export interface BuildLoopFocusProps {
  onFocusCapture: () => void
  onBlurCapture: (event: React.FocusEvent<HTMLElement>) => void
}

export interface UseBuildLoopResult<T> {
  activeId: string
  setActiveId: (id: string) => void
  activeIndex: number
  activeItem: T | undefined
  isPaused: boolean
  rootRef: React.RefObject<HTMLDivElement | null>
  rootFocusProps: BuildLoopFocusProps
  hoverProps: BuildLoopHoverProps
  pointerStyle: React.CSSProperties
}

/**
 * Drives an auto-advancing carousel of items with strict pause/resume rules.
 *
 * The loop only runs when ALL of the following hold:
 *   - the section is at least `visibilityThreshold` visible in the viewport
 *   - the browser tab is active
 *   - the user is not hovering, focusing, clicking, or touching any item
 *   - `prefers-reduced-motion: reduce` is not set
 *   - `items` contains at least two entries
 *
 * Otherwise the loop is paused. When the conditions clear again, the loop
 * resumes after `resumeDelayMs`. Manual `setActiveId` also pauses for the
 * same delay so a click does not freeze the carousel forever.
 *
 * The hook does not render anything. Callers wire the returned handlers to
 * the DOM and apply `pointerStyle` to a CSS-driven indicator (e.g. a triangle
 * that points at the active item).
 */
export function useBuildLoop<T>({
  items,
  getId,
  autoAdvanceMs,
  resumeDelayMs,
  visibilityThreshold,
}: UseBuildLoopOptions<T>): UseBuildLoopResult<T> {
  const [activeId, setActiveIdState] = useState<string>(() =>
    items.length > 0 ? getId(items[0] as T) : '',
  )
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isInView, setIsInView] = useState<boolean>(() => {
    if (typeof IntersectionObserver === 'undefined') return true
    return false
  })
  const [isTabActive, setIsTabActive] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true
    return document.visibilityState === 'visible'
  })
  const [isPointerInside, setIsPointerInside] = useState(false)
  const [isFocusInside, setIsFocusInside] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const canRun =
    isInView &&
    isTabActive &&
    !isPointerInside &&
    !isFocusInside &&
    !isManuallyPaused &&
    !reduceMotion &&
    items.length >= 2

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
      const el = rootRef.current
      if (!el || typeof IntersectionObserver === 'undefined') return
      const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInView(entry.isIntersecting)
        }
      },
      { threshold: [0, visibilityThreshold, 1] },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visibilityThreshold])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const update = () => setIsTabActive(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current)
        resumeTimer.current = null
      }
    }

    if (!canRun) return stop

    resumeTimer.current = setTimeout(() => {
          resumeTimer.current = null
          intervalRef.current = setInterval(() => {
            setActiveIdState((current) => {
              const list = itemsRef.current
              if (list.length < 2) return current
              const idx = list.findIndex((item) => getId(item) === current)
              if (idx === -1) return getId(list[0] as T)
              return getId(list[(idx + 1) % list.length] as T)
            })
          }, autoAdvanceMs)
        }, resumeDelayMs)

    return stop
  }, [canRun, items.length, autoAdvanceMs, resumeDelayMs, getId])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current)
    }
  }, [])

  const setActiveId = useCallback(
    (id: string) => {
      setActiveIdState(id)
      setIsManuallyPaused(true)
      if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current)
      manualPauseTimer.current = setTimeout(() => {
        manualPauseTimer.current = null
        setIsManuallyPaused(false)
      }, resumeDelayMs)
    },
    [resumeDelayMs],
  )

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => getId(item) === activeId),
  )
  const activeItem = items[activeIndex]

  const rootFocusProps = useMemo<BuildLoopFocusProps>(
    () => ({
      onFocusCapture: () => setIsFocusInside(true),
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusInside(false)
        }
      },
    }),
    [],
  )

  const hoverProps = useMemo<BuildLoopHoverProps>(
    () => ({
      onPointerEnter: () => setIsPointerInside(true),
      onPointerLeave: () => setIsPointerInside(false),
    }),
    [],
  )

  const pointerStyle = useMemo(
    () =>
      ({
        '--build-loop-pointer-index': String(activeIndex),
      }) as React.CSSProperties,
    [activeIndex],
  )

  return {
    activeId,
    setActiveId,
    activeIndex,
    activeItem,
    isPaused: !canRun,
    rootRef,
    rootFocusProps,
    hoverProps,
    pointerStyle,
  }
}