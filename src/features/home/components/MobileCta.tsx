import { ArrowUp } from 'lucide-react'
import { invitationLinks } from '@/config/site'

export function MobileCta() {
  return (
    <>
      <div className="mobile-scroll-action fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-background/90 p-3 backdrop-blur-xl md:hidden">
        <a
          href={invitationLinks.subscribe}
          data-analytics-event="invitation_click"
          data-analytics-label="mobile-sticky-invitation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring"
        >
          Get invite code
        </a>
      </div>

      <a
        href="#top"
        className="mobile-scroll-action fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring md:bottom-8"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </a>
    </>
  )
}
