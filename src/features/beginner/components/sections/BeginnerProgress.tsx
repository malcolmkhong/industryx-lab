import { formatContent } from "../../utils/formatContent"

export function BeginnerProgress({
  ariaLabel,
  eyebrow,
  status,
  completionAriaLabel,
  totalStages,
}: {
  ariaLabel: string
  eyebrow: string
  status: string
  completionAriaLabel: string
  totalStages: number
}) {
  return (
    <section
      className="mb-10 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5 sm:p-6"
      aria-label={ariaLabel}
      data-guide-progress
      data-total-stages={totalStages}
      data-status-template={status}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-eyebrow text-primary">
            {eyebrow}
          </p>
          <p
            className="mt-2 text-sm text-foreground"
            data-guide-progress-status
          >
            {formatContent(status, {
              completed: 0,
              total: totalStages,
            })}
          </p>
        </div>
        <span
          className="font-mono text-lg font-semibold text-foreground"
          data-guide-progress-percent
        >
          0%
        </span>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={completionAriaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        data-guide-progressbar
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-slower"
          style={{ width: "0%" }}
          data-guide-progress-fill
        />
      </div>
    </section>
  )
}