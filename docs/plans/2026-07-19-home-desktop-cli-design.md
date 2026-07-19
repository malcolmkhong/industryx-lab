# Home Desktop and CLI Animation Design

## Goal

Replace the desktop mockup in the hero with a live CLI simulation, then present the existing Kimi desktop mockup in a dedicated explanatory section between the statistics and feature sections.

## Hero CLI

The hero keeps its current copy, actions, grid, colors, and responsive behavior. Its right column renders a dark terminal window inspired by the supplied reference without copying proprietary assets. The simulation uses macOS-style window controls, a centered `Kimi CLI` title, a blue Kimi welcome panel, monospaced command output, and reserved vertical space.

The animation repeats this practical beginner workflow: start Kimi in a project, authenticate, submit a coding request, inspect files, edit code, run tests, and report completion. The simulation advances through staged lines rather than changing container dimensions. Reduced-motion users receive the same content with minimal transitions.

## Desktop section

A new `Desktop` section appears after `Stats` and before `Features`. It contains a beginner-focused heading, a short explanation of visible agent work, three concise learning points, and the existing `KimiDesktop` animation. Content lives in the Home feature content directory while components focus on rendering.

## Architecture

- `HomePage` owns section order only.
- `Hero` composes hero copy and `CliAnimation`.
- `Desktop` composes explanatory content and the existing `KimiDesktop`.
- Home content modules own visitor-facing CLI and desktop text.
- A focused animation hook owns staged timing and cleanup.

## Acceptance criteria

- Page order is `Hero`, `Stats`, `Desktop`, `Features`.
- `KimiDesktop` is rendered only by `Desktop`.
- The CLI loops through setup and coding activity without layout shift.
- Both experiences remain responsive and respect reduced-motion preferences.

