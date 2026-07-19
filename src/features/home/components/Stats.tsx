import { Reveal } from '@/components/Reveal'

const STATS = [
  {
    value: '1M',
    label: 'maximum Kimi K3 context window',
    source: 'https://www.kimi.com/code/docs/en/kimi-code/models.html',
  },
  {
    value: '6×',
    label: 'K2.7 Code HighSpeed output speed',
    source: 'https://www.kimi.com/code/docs/en/kimi-code/models.html',
  },
  {
    value: '2.8T',
    label: 'parameters in the Kimi K3 architecture',
    source: 'https://www.kimi.com/code/docs/en/kimi-code/whats-new.html',
  },
  {
    value: '3',
    label: 'supported Kimi Code model IDs',
    source: 'https://www.kimi.com/code/docs/en/',
  },
]

export function Stats() {
  return (
    <section className="border-y border-white/5 bg-card/30" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="flex flex-col items-center gap-2 px-6 py-10 text-center">
            <dl data-testid="verified-statistic" className="flex flex-col items-center gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl" aria-label={stat.value}>
                {stat.value}
              </dd>
              <dd className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stat.label}
              </dd>
              <dd className="text-[11px] leading-relaxed text-muted-foreground/70">
                <a
                  href={stat.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 underline-offset-4 hover:text-primary focus-visible-ring"
                >
                  Official Kimi documentation
                </a>{' '}
                · reviewed <time dateTime="2026-07-19">2026</time>
              </dd>
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
