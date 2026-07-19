import { ArrowUp } from 'lucide-react'
import { invitationLinks } from '@/config/site'

export function MobileCta() {
  return (
    <div
      className="mobile-scroll-actions fixed inset-x-3 bottom-safe-3 z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-background/90 px-2 pt-2 pb-safe-2 shadow-2xl shadow-black/35 backdrop-blur-xl md:hidden"
      data-mobile-scroll-actions
      data-visible="false"
    >
      <a
        href={invitationLinks.subscribe}
        data-analytics-event="invitation_click"
        data-analytics-label="mobile-sticky-invitation"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring"
      >
        Get invite code
      </a>
      <a
        href="#top"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-card text-foreground transition-all hover:border-primary/35 hover:bg-primary/10 active:scale-[0.97] focus-visible-ring"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  )
}
