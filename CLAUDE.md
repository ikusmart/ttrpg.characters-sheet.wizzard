# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite + HMR)
npm run build      # TypeScript check + production build (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

No test runner is configured.

## Tech Stack

React 19, TypeScript 5.9 (strict), Vite 7, Tailwind CSS 4, shadcn/ui (New York style) on Radix UI, React Router DOM 7, Lucide icons, Driver.js (guided tours). PWA via vite-plugin-pwa.

## Architecture

**Dual game system** — D&D 5e and Vampire: The Masquerade 5e share the same shell but have fully separate components, contexts, models, data, and pages. Prefixes: `vtm-*` for VtM, unprefixed for D&D.

### Routing (HashRouter)

- `/` — game selection
- `/dnd`, `/dnd/quiz`, `/dnd/results`, `/dnd/sheet/:id?`, `/dnd/characters`, `/dnd/rules`
- `/vtm`, `/vtm/quiz`, `/vtm/results`, `/vtm/sheet/:id?`, `/vtm/characters`, `/vtm/create`, `/vtm/rules`

Base path: `/dnd.character.sheet/` (subpath deployment on GitHub Pages).

### State Management

React Context + `useReducer`. Two independent contexts:
- `CharacterContext` + `characterReducer` — D&D characters
- `VtmCharacterContext` + `vtmCharacterReducer` — VtM characters

Auto-save to localStorage with 500ms debounce. Read-only mode disables dispatch (used for demo characters).

### Component Organization

```
src/components/
  ui/           — shadcn primitives (button, card, dialog, accordion, etc.)
  layout/       — AppHeader, PageContainer
  help/         — HelpProvider, HelpDrawer, GuidedTour, SectionWithHelp
  characters/   — D&D character cards
  sheet/        — D&D character sheet panels
  quiz/         — D&D quiz flow
  vtm-*/        — VtM equivalents (vtm-characters, vtm-sheet, vtm-quiz, vtm-create)
```

Pages live in `src/pages/`. Models (TypeScript interfaces) in `src/models/` (VtM-specific under `models/vtm/`). Business logic in `src/lib/`. Static game data in `src/data/`.

### Key Utilities

- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/characterStorage.ts` / `vtmCharacterStorage.ts` — localStorage CRUD
- `src/lib/characterCalculations.ts` — ability modifiers, proficiency bonus, spell save DC
- `src/lib/characterBuilder.ts` / `vtmCharacterBuilder.ts` — create character from quiz results

### Path Alias

`@/*` → `src/*` (configured in vite.config.ts and tsconfig.app.json).

### Help System

`HelpProvider` context wraps the app. `SectionWithHelp` adds contextual help icons to sheet sections. Help content lives in `src/data/help/dnd/` and `src/data/help/vtm/`. `GuidedTour` integrates Driver.js for step-by-step walkthroughs.

## Conventions

- UI language is Russian; class/species/clan names stay in English
- shadcn components added via `npx shadcn@latest add <component>` — config in `components.json`
- Tailwind CSS 4 uses the new Vite plugin (`@tailwindcss/vite`), not a config file
- Theme variables (colors, radii) are CSS custom properties in `src/index.css`
- Dark mode supported via `.dark` class on root element
