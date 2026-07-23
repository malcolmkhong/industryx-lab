import { ArrowUpRight } from 'lucide-react'
import { invitationLinks } from '@/config/site'
import { Button } from '@/components/ui/button'

export function ActivateInvitation() {
  return (
    <Button variant="neon" asChild>
      <a
        href={invitationLinks.subscribe}
        data-analytics-event="invitation_click"
        data-analytics-label="home-activate-invitation"
        data-analytics-section="home-cta"
        target="_blank"
        rel="noopener noreferrer"
        title="Opens Kimi's official referral portal"
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium"
      >
        Activate invitation
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </Button>
  )
}