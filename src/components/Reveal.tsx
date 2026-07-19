import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  priority?: boolean
}

export function Reveal({ children, delay = 0, className = '', priority = false }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const prefersReducedMotion = usePrefersReducedMotion()

  if (priority || prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
