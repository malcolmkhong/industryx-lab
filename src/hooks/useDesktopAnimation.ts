import { useEffect, useState } from 'react'

type DesktopAnimationOptions = {
  stepCount: number
  finalTextLength: number
}

export function useDesktopAnimation({ stepCount, finalTextLength }: DesktopAnimationOptions) {
  const typingStage = 3 + stepCount
  const [stage, setStage] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    let timer: number
    if (stage === 0) {
      timer = window.setTimeout(() => setStage(1), 600)
    } else if (stage === 1) {
      timer = window.setTimeout(() => setStage(2), 900)
    } else if (stage === 2) {
      timer = window.setTimeout(() => setStage(3), 1200)
    } else if (stage < typingStage) {
      timer = window.setTimeout(() => setStage((currentStage) => currentStage + 1), 750)
    } else if (chars < finalTextLength) {
      timer = window.setTimeout(() => setChars((currentChars) => currentChars + 1), 16)
    } else {
      timer = window.setTimeout(() => {
        setStage(0)
        setChars(0)
      }, 5200)
    }

    return () => window.clearTimeout(timer)
  }, [chars, finalTextLength, stage, typingStage])

  return { stage, chars, typingStage }
}
