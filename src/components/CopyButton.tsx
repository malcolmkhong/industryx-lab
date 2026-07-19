import { Check, Copy } from 'lucide-react'
import { useCopy } from '@/hooks/useCopy'

interface CopyButtonProps {
  text: string
  label?: string
  size?: 'sm' | 'lg'
  className?: string
}

export function CopyButton({ text, label = 'Copy', size = 'sm', className = '' }: CopyButtonProps) {
  const { copied, copy } = useCopy()

  const sizing =
    size === 'lg'
      ? 'h-12 px-6 text-sm gap-2.5 rounded-xl'
      : 'h-8 px-3 text-xs gap-1.5 rounded-lg'

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={label}
      className={`inline-flex shrink-0 items-center font-medium transition-all duration-200 focus-visible-ring touch-manipulation ${sizing} ${
        copied
          ? 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97]'
      } ${className}`}
    >
      {copied ? <Check className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" /> : <Copy className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}
