import type { CSSProperties, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  priority?: boolean
}

export function Reveal({ children, delay = 0, className = '', priority = false }: RevealProps) {
  if (priority) {
    return <div className={className}>{children}</div>
  }

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <div
      className={`${className} reveal-on-scroll`}
      data-reveal="true"
      style={style}
    >
      {children}
    </div>
  )
}
