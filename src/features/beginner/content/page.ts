import type { BeginnerPageContent } from './types'
import { routePaths } from '@/config/routes'
import { safeBuildLoop } from './support'

export const beginnerPageContent: BeginnerPageContent = {
  metadata: {
    title: 'Build a Task Manager with Kimi Code, Next.js and Supabase',
    description: 'Build a secure task manager in eight beginner-friendly stages using Kimi Code, Next.js, Supabase, Google sign-in, and Vercel.',
    canonicalPath: routePaths.beginner,
    datePublished: '2026-07-19',
    dateModified: '2026-07-19',
    articleHeadline: 'Build a task manager with Kimi Code',
    howToName: 'Build a task manager with Kimi Code, Next.js, and Supabase',
    breadcrumbs: [
      { name: 'Home', path: routePaths.home },
      { name: 'Build Project' },
      { name: 'Beginner', path: routePaths.beginner },
    ],
  },
  breadcrumb: {
    home: 'HOME',
    buildProject: 'BUILD PROJECT',
    beginner: 'BEGINNER',
  },
  hero: {
    eyebrow: 'FIRST PROJECT GUIDE',
    title: 'Build a task manager with Kimi Code',
    description: 'Follow eight beginner-friendly stages to turn a working Next.js and Supabase starter into a secure task manager, then deploy it to Vercel. You will review and test every Kimi Code change before moving on.',
    primaryAction: 'Check what you need',
    secondaryAction: 'Start Stage 1',
  },
  journey: {
    alt: 'Journey from starter kit to deployed app',
    caption: 'Your path: clone the starter, run it locally, connect secure data, build the task experience, and deploy a tested app.',
  },
  progress: {
    ariaLabel: 'Guide progress',
    completionAriaLabel: 'Guide completion',
    eyebrow: 'YOUR PROGRESS',
    status: '{completed} of {total} stages complete',
  },
  sections: {
    beforeYouStart: {
      id: 'before-you-start',
      eyebrow: 'PRE-FLIGHT CHECK',
      title: 'Before you start',
      description: 'Run each version command in a new terminal. If a command is missing, use its installation link and reopen the terminal before continuing.',
      installationGuide: 'Installation guide',
      loginLabel: 'First Kimi login:',
      loginBeforeCommand: 'run',
      command: 'kimi',
      loginBeforeAction: 'enter',
      action: '/login',
      loginAfterAction: 'complete the browser authorization, then return to the terminal.',
    },
    safeBuildLoop: {
      id: 'safe-build-loop',
      ariaLabel: 'Safe build loop',
      eyebrow: 'HOW TO WORK WITH KIMI CODE',
      title: 'Use a safe build loop',
      description:
        'Every stage follows the same four-step loop. Click a step to read what to do, what to write, and why it works. Repeat the loop until the result matches your expectation.',
      steps: safeBuildLoop,
      detailHeading: 'How to run this step',
      detailHeadingTemplate: 'How to run {step}',
    },
    glossary: {
      id: 'beginner-glossary',
      eyebrow: 'PLAIN-LANGUAGE REFERENCE',
      title: 'Beginner glossary',
      description: 'Use these short definitions whenever a guide, dashboard, or Kimi Code response uses an unfamiliar term.',
    },
    completion: {
      title: 'Your project is complete when the checks pass',
      description: "A green deployment is only one check. Your app must also protect each user's data, preserve changes after refresh, explain failures, and work with keyboard and mobile input.",
      allComplete: 'All eight learning stages marked complete.',
      stagesRemaining: '{remaining} learning stages remaining.',
    },
  },
  stageUi: {
    stage: 'STAGE',
    whatYouNeed: 'WHAT YOU NEED',
    prompt: 'PROMPT',
    copy: 'Copy',
    copyLabel: 'Copy {label}',
    copyPromptFor: 'Copy prompt for {stage}',
    example: 'EXAMPLE',
    followSteps: 'FOLLOW THESE STEPS',
    expectedResult: 'EXPECTED RESULT',
    checkBeforeNextStage: 'CHECK BEFORE NEXT STAGE',
    commonProblems: 'Common problems and fixes',
    show: 'Show',
    hide: 'Hide',
    officialReferencesFor: 'Official references for {stage}',
    markComplete: 'Mark complete',
    completed: 'Completed',
    markStageComplete: 'Mark {stage} complete',
  },
}
