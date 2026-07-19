export const beginnerPrerequisites = [
  {
    title: 'Git',
    description: 'Git downloads the starter repository and records your changes.',
    command: 'git --version',
    href: 'https://git-scm.com/downloads',
  },
  {
    title: 'Node.js and npm',
    description: 'Node.js runs the Next.js development server. Install the current LTS release.',
    command: 'node --version && npm --version',
    href: 'https://nodejs.org/en/download',
  },
  {
    title: 'Kimi Code CLI',
    description: 'Kimi Code reads the project, proposes changes, edits files, and runs checks with your approval.',
    command: 'kimi --version',
    href: 'https://www.kimi.com/code/docs/en/kimi-code-cli/guides/getting-started.html',
  },
]

export const safeBuildLoop = [
  { label: 'Describe', detail: 'Ask for one clear outcome.' },
  { label: 'Review', detail: 'Read the plan before approving edits.' },
  { label: 'Test', detail: 'Run the app and check the result.' },
  { label: 'Improve', detail: 'Fix one problem, then repeat.' },
]


export const beginnerGlossary = [
  { term: 'Clone', definition: 'Create a local copy of a Git repository, including its files and version history.' },
  { term: 'Repository', definition: 'A project folder tracked by Git, often stored online on GitHub.' },
  { term: 'Terminal', definition: 'A text interface where you run commands such as git clone and npm run dev.' },
  { term: 'Local development server', definition: 'A private copy of the app running on your computer while you build and test it.' },
  { term: 'Environment variable', definition: 'A configuration value kept outside normal source files, such as a project URL or public API key.' },
  { term: 'Authentication', definition: 'The process that confirms who a user is, such as signing in with Google.' },
  { term: 'Row Level Security', definition: 'Database rules that decide which individual rows each signed-in user may read or change.' },
  { term: 'Migration', definition: 'A versioned SQL file that makes a repeatable change to the database structure.' },
  { term: 'Deploy', definition: 'Publish a tested version of the app to a hosting service so other people can open it.' },
]
