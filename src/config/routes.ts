export const routePaths = {
  home: '/',
  beginner: '/build-project/beginner',
  intermediate: '/build-project/intermediate',
  advanced: '/build-project/advanced',
  expert: '/build-project/expert',
  kimi: '/explore-agent/kimi',
  minimax: '/explore-agent/minimax',
  codex: '/explore-agent/codex',
  skills: '/github/skills',
  mcp: '/github/mcp',
} as const

export type NavigationGroupId = 'build-project' | 'explore-agent' | 'github'

export type NavigationGroup = {
  id: NavigationGroupId
  label: string
  pathPrefix: string
  items: Array<{ label: string; href: string }>
}

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'build-project',
    label: 'Build Project',
    pathPrefix: '/build-project',
    items: [
      { label: 'Beginner', href: routePaths.beginner },
      { label: 'Intermediate', href: routePaths.intermediate },
      { label: 'Advanced', href: routePaths.advanced },
      { label: 'Expert', href: routePaths.expert },
    ],
  },
  {
    id: 'explore-agent',
    label: 'Explore Agent',
    pathPrefix: '/explore-agent',
    items: [
      { label: 'Kimi', href: routePaths.kimi },
      { label: 'MiniMax', href: routePaths.minimax },
      { label: 'Codex', href: routePaths.codex },
    ],
  },
  {
    id: 'github',
    label: 'Agent Resources',
    pathPrefix: '/github',
    items: [
      { label: 'Skills', href: routePaths.skills },
      { label: 'MCP', href: routePaths.mcp },
    ],
  },
]

export type ComingSoonRoute = {
  path: string
  pageName: string
  description: string
  expectedFeatures: string[]
  fallbackPath: string
}

export const completedNavigationLinks = [
  { label: 'Home', href: routePaths.home },
  { label: 'Build Project', href: routePaths.beginner },
] as const

export const comingSoonRoutes: ComingSoonRoute[] = [
  {
    path: routePaths.intermediate,
    pageName: 'Intermediate',
    description: 'A guided path for building larger features with clearer plans, reusable patterns, and dependable tests.',
    expectedFeatures: ['Structured feature planning', 'Reusable application patterns', 'Production-minded testing'],
    fallbackPath: routePaths.beginner,
  },
  {
    path: routePaths.advanced,
    pageName: 'Advanced',
    description: 'Advanced workflows for architecture decisions, integrations, performance, and secure delivery.',
    expectedFeatures: ['Architecture walkthroughs', 'Integration playbooks', 'Performance and security checks'],
    fallbackPath: routePaths.beginner,
  },
  {
    path: routePaths.expert,
    pageName: 'Expert',
    description: 'Expert-level material for complex systems, agent orchestration, and reliable engineering operations.',
    expectedFeatures: ['Complex system design', 'Agent workflow orchestration', 'Operational readiness'],
    fallbackPath: routePaths.beginner,
  },
  {
    path: routePaths.kimi,
    pageName: 'Kimi',
    description: 'A focused exploration of Kimi workflows, capabilities, configuration, and practical next steps.',
    expectedFeatures: ['Workflow examples', 'Configuration guidance', 'Practical learning paths'],
    fallbackPath: routePaths.home,
  },
  {
    path: routePaths.minimax,
    pageName: 'MiniMax',
    description: 'A beginner-friendly overview of MiniMax agent workflows and where they may fit into a coding toolkit.',
    expectedFeatures: ['Agent overview', 'Workflow examples', 'Tool comparison notes'],
    fallbackPath: routePaths.home,
  },
  {
    path: routePaths.codex,
    pageName: 'Codex',
    description: 'A practical introduction to Codex workflows, safe collaboration patterns, and project use cases.',
    expectedFeatures: ['Workflow introduction', 'Safe collaboration patterns', 'Project use cases'],
    fallbackPath: routePaths.home,
  },
  {
    path: routePaths.skills,
    pageName: 'Skills',
    description: 'A curated guide to reusable agent skills, installation choices, and safe project-level usage.',
    expectedFeatures: ['Skill discovery', 'Installation guidance', 'Usage examples'],
    fallbackPath: routePaths.home,
  },
  {
    path: routePaths.mcp,
    pageName: 'MCP',
    description: 'A clear introduction to MCP connections, configuration boundaries, and useful integrations.',
    expectedFeatures: ['MCP fundamentals', 'Configuration examples', 'Integration safety'],
    fallbackPath: routePaths.home,
  },
]

export function getComingSoonRoute(path: string) {
  const route = comingSoonRoutes.find((item) => item.path === path)
  if (!route) throw new Error(`Missing Coming Soon route configuration for ${path}`)
  return route
}
