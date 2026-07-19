export type CliLineTone = 'command' | 'muted' | 'success'

export interface CliActivityLine {
  id: string
  prompt?: string
  text: string
  tone: CliLineTone
}

export const cliAnimationContent = {
  title: 'Kimi CLI',
  welcomeTitle: 'Welcome to Kimi Code CLI!',
  welcomeHelp: 'Send /help for help information.',
  model: 'Model: K2.7 Code',
  activityLabel: 'Kimi CLI live activity',
  lines: [
    {
      id: 'start',
      prompt: 'moonshot@KimiCode 🚀',
      text: 'kimi',
      tone: 'command',
    },
    {
      id: 'login-command',
      prompt: 'moonshot@KimiCode 🚀',
      text: '/login',
      tone: 'command',
    },
    {
      id: 'login-result',
      text: '✓ Signed in to Kimi Code',
      tone: 'success',
    },
    {
      id: 'task',
      prompt: 'moonshot@KimiCode 🚀',
      text: 'Build a responsive task dashboard and verify it.',
      tone: 'command',
    },
    {
      id: 'thinking',
      text: '• Thinking — reviewing the project structure',
      tone: 'muted',
    },
    {
      id: 'reading',
      text: '• Read 18 files in src and components',
      tone: 'muted',
    },
    {
      id: 'editing',
      text: '✓ Updated the dashboard layout and filters',
      tone: 'success',
    },
    {
      id: 'testing',
      text: '✓ npm test — 20 tests passed',
      tone: 'success',
    },
  ] satisfies CliActivityLine[],
  finalText: 'Done — the responsive dashboard is complete and every check passes.',
  caption: 'A simulated Kimi Code session, from setup to a verified change.',
} as const
