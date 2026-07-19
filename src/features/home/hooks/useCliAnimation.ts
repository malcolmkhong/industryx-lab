import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface CliAnimationOptions {
  lineCount: number
  finalTextLength: number
}

export function useCliAnimation({ lineCount, finalTextLength }: CliAnimationOptions) {
  const [visibleLineCount, setVisibleLineCount] = useState(1)
  const [finalCharacterCount, setFinalCharacterCount] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    let timer: number

    if (visibleLineCount < lineCount) {
      timer = window.setTimeout(
        () => setVisibleLineCount((currentCount) => currentCount + 1),
        650,
      )
    } else if (finalCharacterCount < finalTextLength) {
      timer = window.setTimeout(
        () =>
          setFinalCharacterCount((currentCount) =>
            prefersReducedMotion ? finalTextLength : currentCount + 1,
          ),
        prefersReducedMotion ? 250 : 24,
      )
    } else {
      timer = window.setTimeout(() => {
        setVisibleLineCount(1)
        setFinalCharacterCount(0)
      }, 4200)
    }

    return () => window.clearTimeout(timer)
  }, [finalCharacterCount, finalTextLength, lineCount, prefersReducedMotion, visibleLineCount])

  return { finalCharacterCount, visibleLineCount }
}
