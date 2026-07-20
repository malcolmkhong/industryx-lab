'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { BeginnerSafeBuildStep } from '../content'

interface SafeBuildLoopProps {
  heading: string
  eyebrow?: string
  description?: string
  detailHeadingTemplate: string
  steps: BeginnerSafeBuildStep[]
}

const DETAIL_PANEL_ID = 'safe-build-loop-detail'

const AUTO_ADVANCE_MS = 1300
const RESUME_DELAY_MS = 900
const VISIBILITY_THRESHOLD = 0

export function SafeBuildLoop({
  heading,
  eyebrow,
  description,
  detailHeadingTemplate,
  steps,
}: SafeBuildLoopProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? '')
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

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId),
  )
  const active = steps[activeIndex] ?? steps[0]

  const rootRef = useRef<HTMLDivElement | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const stepsRef = useRef(steps)
    useEffect(() => {
      stepsRef.current = steps
    }, [steps])

  const canRun =
    isInView &&
    isTabActive &&
    !isPointerInside &&
    !isFocusInside &&
    !isManuallyPaused &&
    !reduceMotion &&
    steps.length >= 2

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
      { threshold: [0, VISIBILITY_THRESHOLD, 1] },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
          setActiveId((current) => {
            const list = stepsRef.current
            if (list.length < 2) return current
            const idx = list.findIndex((step) => step.id === current)
            if (idx === -1) return list[0]?.id ?? current
            return list[(idx + 1) % list.length]?.id ?? current
          })
        }, AUTO_ADVANCE_MS)
      }, RESUME_DELAY_MS)

      return stop
    }, [canRun, steps.length])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current)
    }
  }, [])

  const handleSelect = (stepId: string) => {
    setActiveId(stepId)
    setIsManuallyPaused(true)
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current)
    manualPauseTimer.current = setTimeout(() => {
      manualPauseTimer.current = null
      setIsManuallyPaused(false)
    }, RESUME_DELAY_MS)
  }

  const pointerStyle = useMemo(
    () =>
      ({
        '--safe-loop-pointer-index': String(activeIndex),
      }) as React.CSSProperties,
    [activeIndex],
  )

  return (
    <div
          ref={rootRef}
          className="space-y-6"
          onFocusCapture={() => setIsFocusInside(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsFocusInside(false)
            }
          }}
        >
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{heading}</h2>
      {description ? (
        <p className="max-w-3xl prose-body leading-7 text-muted-foreground">{description}</p>
      ) : null}

      <ol
              role="list"
              aria-label="Safe build loop"
              data-testid="build-loop"
              onPointerEnter={() => setIsPointerInside(true)}
              onPointerLeave={() => setIsPointerInside(false)}
              className="relative isolate grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-4"
            >
        {steps.map((step, index) => (
          <li key={step.id} className="relative">
            <SafeBuildStepButton
              step={step}
              number={index + 1}
              totalSteps={steps.length}
              isActive={step.id === activeId}
              detailHeading={detailHeadingTemplate.replace('{step}', step.label)}
              onSelect={handleSelect}
            />
            {index < steps.length - 1 ? <SafeLoopConnector /> : null}
          </li>
        ))}
      </ol>

      {active ? (
        <div
                  className="relative"
                  style={pointerStyle}
                  data-testid="build-detail-wrap"
                  onPointerEnter={() => setIsPointerInside(true)}
                  onPointerLeave={() => setIsPointerInside(false)}
                >
          <span
            aria-hidden="true"
            className="safe-loop-pointer pointer-events-none absolute left-0 top-0 -translate-y-1/2 motion-reduce:transition-none"
          >
            <svg viewBox="0 0 16 10" width="16" height="10" className="block drop-shadow-[0_2px_6px_hsl(var(--primary)/0.45)]">
              <polygon points="8,0 16,10 0,10" className="fill-primary" />
            </svg>
          </span>
          <div
            key={active.id}
            id={DETAIL_PANEL_ID}
            role="region"
            aria-live="polite"
            aria-label="Safe build loop detail"
            data-testid="build-detail"
            data-active-step={active.id}
            className="rounded-2xl border border-primary/30 bg-card/70 p-5 shadow-[0_18px_44px_-28px_hsl(var(--primary)/0.7)] sm:p-6"
          >
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">
              {detailHeadingTemplate.replace('{step}', active.label)}
            </p>
            <p className="mt-3 text-base leading-7 text-foreground">{active.instruction}</p>

            <div className="mt-5 rounded-lg border border-white/10 bg-background/60 p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {active.exampleHeading}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/90">{active.example}</p>
            </div>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground">Why this works:</span> {active.reasoning}
            </p>
          </div>
        </div>
      ) : null}

      {description ? <p className="sr-only">{description}</p> : null}
    </div>
  )
}

interface SafeBuildStepButtonProps {
  step: BeginnerSafeBuildStep
  number: number
  totalSteps: number
  isActive: boolean
  detailHeading: string
  onSelect: (stepId: string) => void
}

function SafeBuildStepButton({
  step,
  number,
  totalSteps,
  isActive,
  detailHeading,
  onSelect,
}: SafeBuildStepButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls={DETAIL_PANEL_ID}
      data-testid="build-step"
      data-step-id={step.id}
      data-active={isActive ? 'true' : 'false'}
      onClick={() => onSelect(step.id)}
      className={[
        'safe-loop-step tap-target min-h-11 touch-manipulation focus-visible-ring',
        'group relative flex w-full flex-col items-start gap-2 overflow-hidden rounded-xl border p-4 text-left',
        'transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out',
        'hover:-translate-y-1 hover:border-primary/45 hover:bg-primary/10 hover:text-foreground',
        'hover:shadow-[0_18px_40px_-22px_hsl(var(--primary)/0.75)]',
        isActive
          ? 'safe-loop-step--active border-primary/70 bg-primary/15 text-foreground shadow-[0_0_36px_-10px_hsl(var(--primary)/0.8)]'
          : 'border-white/10 bg-card/55 text-muted-foreground',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="safe-loop-sweep pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/10 to-primary/25 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:hidden"
      />
      <span
        aria-hidden="true"
        className={[
          'safe-loop-progress absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-primary/70 via-primary to-primary/70 transition-transform duration-500 ease-out motion-reduce:hidden',
          isActive ? 'scale-x-100' : 'scale-x-0',
        ].join(' ')}
      />
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={[
            'safe-loop-number relative grid h-9 w-9 place-items-center rounded-full border font-mono text-sm font-semibold transition-colors duration-200',
            isActive
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-primary/30 bg-primary/10 text-primary',
          ].join(' ')}
        >
          {number}
        </span>
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Step {number} of {totalSteps}
        </span>
      </span>
      <span className="block text-base font-semibold tracking-tight text-foreground">{step.label}</span>
      <span className="block text-sm leading-6 text-muted-foreground">{step.detail}</span>
      <span className="sr-only">{detailHeading}</span>
    </button>
  )
}

function SafeLoopConnector() {
  return (
    <span aria-hidden="true" className="safe-loop-connector pointer-events-none absolute left-full top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 lg:block" />
  )
}