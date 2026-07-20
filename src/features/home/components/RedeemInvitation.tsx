import { ArrowUpRight } from 'lucide-react'
import { invitationLinks } from '@/config/site'

/**
 * CTA anchor that opens Kimi's referral portal in a new tab. Wraps the
 * invite link in a continuously circulating conic-gradient border with a
 * soft neon glow. Use this when the destination is the waitlist / invite
 * redemption flow.
 */
export function RedeemInvitation() {
  return (
    <a
      href={invitationLinks.redeem}
      data-analytics-event="invitation_click"
      data-analytics-label="home-redeem-invitation"
      data-analytics-section="home-cta"
      target="_blank"
      rel="noopener noreferrer"
      title="Opens Kimi's official referral portal"
      className="neon-button tap-target inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium focus-visible-ring touch-manipulation"
    >
      Redeem invitation
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}