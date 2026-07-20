export const siteConfig = {
  url: 'https://industryx-lab.vercel.app',
  name: 'Kimi Beginner Guide Hub',
  brandName: 'IndustryX Lab',
  productName: 'Kimi Code',
  locale: 'en_MY',
  socialImage: '/moon-banner.webp',
  organization: {
    name: 'IndustryX',
    url: 'https://industryx-lab.vercel.app',
  },
  author: {
    name: 'Malcolm',
    url: 'https://github.com/malcolmkhong',
    role: 'Independent builder and maintainer of IndustryX Lab',
    bio: 'Malcolm builds and documents practical AI-assisted development workflows through IndustryX Lab.',
  },
  editorial: {
    datePublished: '2026-07-19',
    dateModified: '2026-07-19',
    reviewCadence: 'Reviewed quarterly and whenever referenced product details change.',
  },
  homeMetadata: {
    title: 'Kimi Code Beginner Guide — Learn by Building',
    description: 'Learn Kimi Code and vibe coding through clear beginner guides, practical workflows, and a complete task-manager project built with Next.js and Supabase.',
    canonicalPath: '/',
  },
  disclaimer: 'An independent page made by a happy Kimi Code user. Not affiliated with, sponsored, or endorsed by Moonshot AI. Product names and marks belong to their respective owners.',
  copyright: '© 2026 · Built with conviction (and a little help from Kimi Code itself).',
  footerCredit: {
    prefix: 'Brought to you by',
    name: 'IndustryX',
  },
} as const

export const externalLinks = {
  kimiCode: 'https://www.kimi.com/code',
  github: 'https://github.com/MoonshotAI/kimi-code',
  docs: 'https://www.kimi.com/code/docs/en/',
  interactionDocs: 'https://www.kimi.com/code/docs/en/kimi-code-cli/guides/interaction',
  industryX: 'https://github.com/malcolmkhong',
} as const

export const invitationLinks = {
  subscribe: 'https://www.kimi.com/activities/viral-referral/share?scenario=subscribe&from=share_poster&invitation_code=NC7UZF',
  redeem: 'https://www.kimi.com/activities/viral-referral/share?scenario=invite&from=share_poster&invitation_code=NC7UZF',
} as const

export const installCommands = [
  {
    id: 'unix',
    label: 'macOS / Linux',
    command: 'curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash',
  },
  {
    id: 'brew',
    label: 'Homebrew',
    command: 'brew install kimi-code',
  },
  {
    id: 'windows',
    label: 'Windows (PowerShell)',
    command: 'irm https://code.kimi.com/kimi-code/install.ps1 | iex',
  },
] as const
