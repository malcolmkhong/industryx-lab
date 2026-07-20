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
  {
    id: 'describe',
    label: 'Describe',
    detail: 'Ask for one clear, testable outcome.',
    instruction:
      'State the problem, the desired result, and the files or screens it touches. Avoid asking for many things at once.',
    exampleHeading: 'Try a prompt like',
    example:
      '"Add a button on the dashboard that lets a user sign out, then confirm the redirect goes to /login."',
    reasoning:
      'A single, observable outcome is easy for you to review and easy for Kimi to verify before editing.',
  },
  {
    id: 'review',
    label: 'Review',
    detail: 'Read the plan before approving any edits.',
    instruction:
      'Pause on the plan that Kimi proposes. Make sure each listed change matches the outcome you asked for. Reject the plan if it touches unrelated files or skips a step you wanted.',
    exampleHeading: 'What to look for',
    example:
      'A plan that lists the files it will create or edit, with a one-line reason per file. No silent refactors, no surprise deletions.',
    reasoning:
      'A short review catches costly mistakes before they happen and keeps the diff focused on the outcome you described.',
  },
  {
    id: 'test',
    label: 'Test',
    detail: 'Run the app and confirm the change actually works.',
    instruction:
      'Open the running app, follow the path you described, and verify the new behavior. Run the project checks (lint, type check, tests) so regressions surface now, not in production.',
    exampleHeading: 'Run the minimum checks',
    example:
      '`npm run check` covers typecheck, lint, tests, and a full production build. Watch the failing step, not just the final exit code.',
    reasoning:
      'A change that "looks right" can still break a check. Running the checks now means each loop is small and cheap to repair.',
  },
  {
    id: 'improve',
    label: 'Improve',
    detail: 'Fix one problem, then start the next loop.',
    instruction:
      'If a check failed or the result is off, describe the smallest correction needed and run another Describe -> Review -> Test loop. Do not stack unrelated fixes into the same prompt.',
    exampleHeading: 'Keep the fix small',
    example:
      '"The sign-out button works, but the logout redirect flashes the dashboard for a frame. Update the loader to skip the dashboard redirect."',
    reasoning:
      'Small, single-purpose loops keep diffs reviewable and let Kimi stay focused on one problem at a time.',
  },
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
