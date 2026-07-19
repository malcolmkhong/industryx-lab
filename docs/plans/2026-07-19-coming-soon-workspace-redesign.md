# Coming Soon Workspace Redesign

## Goal

Adapt the user-provided dark AI desktop reference into the reusable Coming Soon preview without copying Kimi branding, proprietary assets, or exact product chrome.

## Visual direction

- Use a slim, compact navigation rail on tablet and a full navigation sidebar on desktop.
- Keep the main work area spacious, quiet, and low contrast.
- Place the upgrade action in the workspace toolbar and the invitation action near the bottom of the sidebar.
- Use the existing project colors, typography, Lucide icon dependency, page shell, and referral configuration.
- Hide the sidebar on mobile so the response simulation and composer remain primary.

## Interaction model

- Decorative workspace controls remain disabled.
- `Upgrade Your Plan` and `Invite to Earn` are real links and reuse `invitationLinks.subscribe` through the page prop.
- The assistant response reuses the Home desktop's timer-driven sequence: reveal request, think, complete staged work, type the final response character by character, pause, then restart.
- The shared animation hook keeps the Home and Coming Soon timing behavior synchronized.
- Reduced-motion users still receive the staged content updates, while global CSS removes spins, bouncing, and movement transitions.

## Component boundaries

- `SimulatedAiDesktop.tsx`: application frame and responsive layout.
- `WorkspaceSidebar.tsx`: navigation, history, account preview, and invitation action.
- `StreamingAssistantResponse.tsx`: generation phases and streamed response content.
- `WorkspaceComposer.tsx`: decorative message composer and tool chips.
- `src/hooks/useDesktopAnimation.ts`: shared staged reveal and character-typing sequence.
- `content.ts`: shared visitor-facing labels and simulation copy.
- `coming-soon.css`: page entrance, status pulse, and ambient movement.

## Verification

- Test both promotional links against the configured invitation URL.
- Test the presence of all four simulation phases.
- Run TypeScript, lint, all tests, and the production build.
- Compare a browser-rendered desktop capture against the reference when an in-app browser is available.
