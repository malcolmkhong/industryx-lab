import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
  label?: string
  accessibleLabel?: string
  /** Optional analytics label emitted as `cta_click` after a successful copy. */
  analyticsLabel?: string
  size?: 'sm' | 'lg'
  variant?: 'solid' | 'ghost'
  className?: string
}

export function CopyButton({
  text,
  label = 'Copy',
  accessibleLabel,
  analyticsLabel,
  size = 'sm',
  variant = 'solid',
  className = '',
}: CopyButtonProps) {
  const sizing =
    size === 'lg'
      ? 'h-12 px-6 text-sm gap-2.5 rounded-xl'
      : 'h-8 px-3 text-xs gap-1.5 rounded-lg'
  const iconClassName = size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'
  const tone =
    variant === 'ghost'
      ? 'bg-transparent text-muted-foreground hover:text-foreground'
      : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97]'

  return (
    <button
      type="button"
      aria-label={accessibleLabel ?? label}
      data-copy-trigger
      data-copy-text={text}
      data-analytics-event={analyticsLabel ? 'cta_click' : undefined}
      data-analytics-label={analyticsLabel}
      className={`copy-button inline-flex shrink-0 items-center font-medium transition-all duration-200 focus-visible-ring touch-manipulation ${tone} ${sizing} ${className}`}
    >
      <span className="copy-button-default inline-flex items-center gap-[inherit]">
        <Copy className={iconClassName} aria-hidden="true" />
        {label}
      </span>
      <span className="copy-button-success hidden items-center gap-[inherit]" aria-hidden="true">
        <Check className={iconClassName} aria-hidden="true" />
        Copied!
      </span>
    </button>
  )
}
