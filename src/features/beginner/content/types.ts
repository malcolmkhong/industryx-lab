export type BeginnerReference = {
  label: string
  href: string
}

export type BeginnerStep = {
  title: string
  body: string
  code?: string
}

export type BeginnerProblem = {
  problem: string
  fix: string
}

export type BeginnerStage = {
  id: string
  stage: string
  title: string
  question: string
  goal: string
  answer: string
  duration: string
  prerequisites: string[]
  command?: { label: string; value: string }
  callout?: {
    label: string
    beforeLink: string
    linkLabel: string
    href: string
    afterLink: string
    description: string
  }
  prompt: string
  steps: BeginnerStep[]
  expected: string
  checks: string[]
  commonProblems: BeginnerProblem[]
  references: BeginnerReference[]
}

export type BeginnerPageContent = {
  metadata: {
    title: string
    description: string
    canonicalPath: string
    datePublished: string
    dateModified: string
    articleHeadline: string
    howToName: string
    breadcrumbs: Array<{ name: string; path?: string }>
  }
  breadcrumb: {
    home: string
    buildProject: string
    beginner: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    primaryAction: string
    secondaryAction: string
  }
  journey: {
    alt: string
    caption: string
  }
  progress: {
    ariaLabel: string
    completionAriaLabel: string
    eyebrow: string
    status: string
  }
  sections: {
    beforeYouStart: {
      id: string
      eyebrow: string
      title: string
      description: string
      installationGuide: string
      loginLabel: string
      loginBeforeCommand: string
      command: string
      loginBeforeAction: string
      action: string
      loginAfterAction: string
    }
    safeBuildLoop: {
      id: string
      ariaLabel: string
      eyebrow: string
      title: string
      description: string
    }
    glossary: {
      id: string
      eyebrow: string
      title: string
      description: string
    }
    completion: {
      title: string
      description: string
      allComplete: string
      stagesRemaining: string
    }
  }
  stageUi: {
    stage: string
    whatYouNeed: string
    prompt: string
    copy: string
    copyLabel: string
    copyPromptFor: string
    example: string
    followSteps: string
    expectedResult: string
    checkBeforeNextStage: string
    commonProblems: string
    show: string
    hide: string
    officialReferencesFor: string
    markComplete: string
    completed: string
    markStageComplete: string
  }
}
