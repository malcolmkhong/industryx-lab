import { Reveal } from './Reveal'

interface SectionHeadingProps {
  label: string
  title: string
  sub?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ label, title, sub, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <Reveal className={`flex flex-col gap-4 ${alignClass}`}>
      <span className="font-mono text-xs tracking-eyebrow text-primary">{label}</span>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-display text-foreground sm:text-4xl md:text-display-lg">
        {title}
      </h2>
      {sub ? <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{sub}</p> : null}
    </Reveal>
  )
}
