import { ArrowUp } from "lucide-react";
import { invitationLinks } from "@/config/site";
import { Button } from "@/components/ui/button";

export function MobileCta() {
  return (
    <div
      className="flex fixed inset-x-3 z-40 gap-2 items-center px-2 pt-2 rounded-2xl border shadow-2xl backdrop-blur-xl mobile-scroll-actions bottom-safe-3 border-white/10 bg-background/90 pb-safe-2 shadow-black/35 md:hidden"
      data-mobile-scroll-actions
      data-visible="false"
    >
      <Button variant="default" asChild>
        <a
          href={invitationLinks.subscribe}
          data-analytics-event="invitation_click"
          data-analytics-label="home-invitation"
          data-analytics-section="mobile-cta"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 min-w-0 flex-1 justify-center gap-2 rounded-xl px-4 active:scale-[0.97]"
        >
          Get invite code
        </a>
      </Button>
      <Button variant="outline" size="icon-lg" asChild>
        <a
          href="#top"
          className="h-11 w-11 shrink-0 grid place-items-center rounded-xl active:scale-[0.97]"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}
