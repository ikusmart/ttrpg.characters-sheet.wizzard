# D&D / VtM Character Sheet

A progressive web app for creating and managing tabletop RPG character sheets. Supports **Dungeons & Dragons 5e** and **Vampire: The Masquerade 5th Edition**.

## Features

- **Quiz-based character creation** — answer personality questions, get a recommended class/clan, then customize
- **Multi-step VtM wizard** — step-by-step character creation for Vampire: The Masquerade
- **Interactive character sheets** — edit abilities, skills, combat stats, spells, equipment
- **Contextual help system** — built-in help panels and guided tours for each sheet section
- **Offline support** — works as a PWA, all data stored in localStorage
- **Dark mode**

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · shadcn/ui · Radix UI · React Router

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/dnd.character.sheet/](http://localhost:5173/dnd.character.sheet/) in your browser.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Deployment

The app is configured for GitHub Pages deployment at the `/dnd.character.sheet/` subpath. Uses HashRouter for client-side routing compatibility with static hosting.
