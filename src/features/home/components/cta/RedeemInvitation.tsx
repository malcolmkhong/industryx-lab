import { ArrowUpRight } from 'lucide-react'
import { invitationLinks } from '@/config/site'
import { Button } from '@/components/ui/button'

export function RedeemInvitation() {
  return (
    <Button variant="neon" asChild>
      <a
        href={invitationLinks.redeem}
        data-analytics-event="invitation_click"
        data-analytics-label="home-redeem-invitation"
        data-analytics-section="home-cta"
        target="_blank"
        rel="noopener noreferrer"
        title="Opens Kimi's official referral portal"
        className="inline-flex gap-2 items-center px-5 h-11 text-sm font-medium rounded-xl bg-primary"
      >
        Redeem invitation
        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </Button>
  )
}