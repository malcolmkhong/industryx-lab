const { Launcher } = require('chrome-launcher')

const chromePath = process.env.CHROME_PATH || Launcher.getFirstInstallation()

module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        'http://localhost/',
        'http://localhost/build-project/beginner.html',
      ],
      numberOfRuns: 3,
      chromePath,
      puppeteerScript: 'scripts/lighthouse-setup.cjs',
      puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-gpu'],
      },
      settings: {
        maxWaitForLoad: 90000,
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
}
