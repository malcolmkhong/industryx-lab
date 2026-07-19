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
      <span className="font-mono text-xs tracking-[0.25em] text-primary">{label}</span>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {sub ? <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{sub}</p> : null}
    </Reveal>
  )
}
