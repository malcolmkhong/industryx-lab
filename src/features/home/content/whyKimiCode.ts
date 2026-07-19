import { externalLinks } from '@/config/site'

export type WhyKimiCodeIcon = 'agent' | 'media' | 'subagents' | 'extensions' | 'editors' | 'setup'

export interface WhyKimiCodeFeature {
  id: string
  icon: WhyKimiCodeIcon
  title: string
  description: string
}

export const whyKimiCodeContent = {
  label: 'WHY KIMI CODE',
  title: 'A coding agent that can move from request to verified change.',
  description:
    'Kimi Code does more than suggest the next line. It can inspect your project, edit files, run commands, search for context, and respond to the results—giving beginners a complete workflow they can review and learn from.',
  features: [
    {
      id: 'complete-tasks',
      icon: 'agent',
      title: 'Works through the whole task',
      description:
        'Kimi Code can read and edit files, run shell commands, search the project, and fetch web pages. It uses the result of each action to decide the next step, so you can review a complete workflow instead of isolated suggestions.',
    },
    {
      id: 'visual-context',
      icon: 'media',
      title: 'Understands screenshots and video',
      description:
        'Paste a UI screenshot, architecture diagram, or screen recording into the conversation. When the active model supports media, Kimi Code can use that visual context to understand a design or reproduce a bug.',
    },
    {
      id: 'focused-subagents',
      icon: 'subagents',
      title: 'Keeps complex work organized',
      description:
        'Built-in coder, explore, and plan subagents handle focused work in separate contexts. This keeps research, planning, and implementation organized without crowding the main conversation.',
    },
    {
      id: 'extensible-workflows',
      icon: 'extensions',
      title: 'Grows with your workflow',
      description:
        'Start simple, then add reusable skills, MCP servers, plugins, data sources, and lifecycle hooks when you need them. Kimi Code can also guide MCP setup through the /mcp-config command.',
    },
    {
      id: 'terminal-and-editors',
      icon: 'editors',
      title: 'Fits terminal and editor workflows',
      description:
        'Use Kimi Code in the terminal or connect supported editors such as Zed and JetBrains through ACP. Compatible third-party tools can also connect through OpenAI- or Anthropic-style APIs.',
    },
    {
      id: 'simple-setup',
      icon: 'setup',
      title: 'Simple to install and start',
      description:
        'Official scripts install the CLI without requiring you to set up Node.js manually. Open your project, run kimi, sign in with /login, and begin with the code already in front of you.',
    },
  ] satisfies WhyKimiCodeFeature[],
  sources: [
    {
      label: 'Kimi Code overview',
      href: externalLinks.docs,
    },
    {
      label: 'Media and interaction guide',
      href: externalLinks.interactionDocs,
    },
    {
      label: 'Official GitHub repository',
      href: externalLinks.github,
    },
  ],
} as const
