# Vampire: The Masquerade 5th Edition — Character Sheet for Beginners

## Problem Statement

Vampire: The Masquerade 5th Edition (V5) has a complex character creation system that overwhelms new players. Existing tools (official PDF, World of Darkness apps) offer no onboarding, no explanations of the Hunger/Humanity mechanics, and no guidance for clan selection. We build a web alternative focused on **teaching and accessibility**: a quiz recommends a clan, generates a ready-to-play character template, and the interactive character sheet explains every field.

## Reference Implementation

This project is modeled after the D&D Character Sheet app (`dnd.character.sheet`). The architecture, tech stack, iteration plan, and component patterns are reused 1:1 — only the game data, models, and domain logic change.

---

## Tech Stack (identical to D&D project)

| Layer | Technology |
|-------|-----------|
| Build | Vite |
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Routing | React Router v7 (HashRouter for GitHub Pages) |
| Storage | localStorage + JSON export/import |
| Hosting | GitHub Pages, no backend |
| Language | Russian UI, VtM terms bilingual: "Сила (Strength)" |

### Key patterns from the reference project
- `@/` path alias → `src/`
- shadcn/ui components: Card, Badge, Tooltip, Separator, Button, Progress, AlertDialog
- Bilingual term system: `BilingualTerm { ru, en }` with `formatTerm()` helper
- Dark/light theme via `.dark` class on `<html>`
- Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop

---

## V5 Game System Overview

### Core Mechanics (differences from D&D)

| Concept | D&D 5e | VtM V5 |
|---------|--------|--------|
| Dice | d20 + modifier | Dice pool (Attribute + Skill) d10s; successes on 6+ |
| Classes | 12 classes | 13 clans (+ Caitiff, Thin-Blood) |
| Races | Species | Not applicable (all were human) |
| Level | 1-20 | Blood Potency 0-10 + Experience |
| HP | Hit Points | Health (Superficial / Aggravated damage tracks) |
| Spells | Spell slots | Disciplines (clan powers), Rituals |
| Resources | Spell slots, Ki, etc. | Hunger (1-5 dice in pool), Willpower |
| Alignment | Law/Chaos, Good/Evil | Humanity (0-10), Convictions, Touchstones |
| Background | Background feat | Predator Type + Advantages/Flaws |

### Attributes (9, grouped into 3 categories)

**Physical:**
- Strength (Сила)
- Dexterity (Ловкость)
- Stamina (Выносливость)

**Social:**
- Charisma (Харизма)
- Manipulation (Манипуляция)
- Composure (Самообладание)

**Mental:**
- Intelligence (Интеллект)
- Wits (Смекалка)
- Resolve (Решительность)

Each attribute rated 1-5 (dots). Starting characters distribute points: 1 at 4, 3 at 3, 4 at 2, 1 at 1 (or 3/2/1 in category groups).

### Skills (27, grouped into 3 categories)

**Physical (10):**
Athletics, Brawl, Craft, Drive, Firearms, Larceny, Melee, Performance, Stealth, Survival

**Social (8):**
Animal Ken, Etiquette, Insight, Intimidation, Leadership, Persuasion, Streetwise, Subterfuge

**Mental (9):**
Academics, Awareness, Finance, Investigation, Medicine, Occult, Politics, Science, Technology

Each skill rated 0-5 (dots). Starting: distribute points from Skill distribution (Jack of All Trades / Balanced / Specialist).

### Clans (13 + 2 special)

| Clan | Nickname | Disciplines | Bane | Compulsion |
|------|----------|-------------|------|------------|
| Brujah | Rebels | Celerity, Potence, Presence | Violent rage on Bestial Failure | Rebellion |
| Gangrel | Animals | Animalism, Fortitude, Protean | Gain animal features | Feral Impulse |
| Malkavian | Lunatics | Auspex, Dominate, Obfuscate | Mental instability | Delusion |
| Nosferatu | Sewer Rats | Animalism, Obfuscate, Potence | Repulsive appearance | Cryptophilia |
| Toreador | Degenerates | Auspex, Celerity, Presence | Aesthetic fixation | Obsession |
| Tremere | Warlocks | Auspex, Blood Sorcery, Dominate | Must drink from same vessel twice | Perfectionism |
| Ventrue | Blue Bloods | Dominate, Fortitude, Presence | Restricted feeding | Arrogance |
| Lasombra | Keepers | Dominate, Oblivion, Potence | Distorted reflection | Ruthlessness |
| Tzimisce | Dragons | Animalism, Dominate, Protean | Territorial sleep | Covetousness |
| Hecata | Family | Auspex, Fortitude, Oblivion | Painful Kiss | Morbidity |
| Ravnos | Daredevils | Animalism, Obfuscate, Presence | Destructive compulsion | Tempting Fate |
| Salubri | Cyclops | Auspex, Dominate, Fortitude | Third eye bleeds | Affective Empathy |
| Ministry | Serpents | Obfuscate, Presence, Protean | Sensitivity to light | Transgression |
| Caitiff | Clanless | Any 2 (choose) | Outcast, distrusted | None (clan-specific) |
| Thin-Blood | Duskborn | Thin-Blood Alchemy | Weak blood, sunlight vulnerability | None |

### Disciplines (key powers)

| Discipline | Description |
|-----------|-------------|
| Animalism | Control animals and the Beast |
| Auspex | Heightened senses, aura perception |
| Blood Sorcery | Rituals, blood manipulation |
| Celerity | Superhuman speed |
| Dominate | Mental control, memory manipulation |
| Fortitude | Supernatural toughness |
| Obfuscate | Invisibility, disguise |
| Oblivion | Shadow manipulation, necromancy |
| Potence | Superhuman strength |
| Presence | Awe, Dread Gaze, emotional manipulation |
| Protean | Shapeshifting |

Each discipline has 5 levels. Starting characters get 2 dots distributed among clan disciplines.

### Predator Types (7)

| Type | Description | Bonus |
|------|-------------|-------|
| Alleycat | Violent mugger/thief | +1 Celerity or Potence, Criminal Contacts |
| Bagger | Steals from blood banks | +1 Blood Sorcery or Obfuscate, Iron Gullet |
| Cleaver | Feeds from family/mortals they live with | +1 Animalism or Dominate, Dark Secret |
| Consensualist | Only willing victims | +1 Auspex or Fortitude, Prey Exclusion |
| Farmer | Feeds on animals | +1 Animalism or Protean, Vegan flaw |
| Osiris | Cult leader, feeds from followers | +1 Blood Sorcery or Presence, Fame |
| Sandman | Feeds from sleeping victims | +1 Auspex or Obfuscate, Unseen |
| Scene Queen | Feeds in nightlife/social settings | +1 Celerity or Presence, Fame/Influence |
| Siren | Seduces victims | +1 Fortitude or Presence, Beautiful |

### Hunger (1-5)

- Replaces spell slots / resources
- Hunger dice replace regular dice in pools
- Hunger 0: satiated (impossible for most vampires)
- Hunger 1-4: functional but dangerous
- Hunger 5: on the edge of frenzy
- Bestial Failure: skull on Hunger die + overall failure → Beast takes over
- Messy Critical: skull on Hunger die + overall critical → violent success

### Humanity (0-10)

- Moral compass of the vampire
- Starts at 7 for most characters
- Stains → Remorse rolls → potential Humanity loss
- At 0: character becomes a mindless monster (Wight)
- Convictions (1-3): personal rules that protect from Humanity loss
- Touchstones (1-3): mortal connections that ground the vampire

### Health & Willpower

**Health Track:**
- Total = Stamina + 3
- Two damage types: Superficial (halved, round down) and Aggravated
- Track filled with `/` (superficial) and `X` (aggravated)
- All boxes filled with aggravated = torpor/Final Death

**Willpower Track:**
- Total = Composure + Resolve
- Spend to re-roll up to 3 regular dice
- Superficial/Aggravated damage like Health

### Blood Potency (0-10)

Starting characters: Blood Potency 1 (or 0 for Thin-Bloods). Affects:
- Surge bonus (add to dice pool)
- Power bonus (discipline effectiveness)
- Feeding penalty (higher potency = pickier)
- Mend amount (heal per Rouse Check)
- Bane severity

---

## Desired Result

### User Flow (mirrors D&D project)

```
LandingPage "/"
  → QuizPage "/quiz" (6 scenario questions, no VtM jargon)
    → ResultsPage "/results" (recommended clan + predator type + %)
      → "Create this character" → CharacterSheet "/sheet/:id"

/characters → list of saved characters + demo → click → /sheet/:id
/sheet → demo character (Brujah neonate)
```

### Roadmap (6 iterations, mirrors D&D project)

| # | Iteration | Visible Result |
|---|-----------|----------------|
| **1** | Static Character Sheet | Full sheet with demo Brujah, responsive layout, dark/light theme |
| 2 | Onboarding Quiz | 6 questions → clan recommendation with % match |
| 3 | Templates + Storage | Create character from template, save to localStorage, character list |
| 4 | Editing + Auto-calculations | Editable fields, dice pools recalculate, Hunger/Willpower trackers |
| 5 | Help System + Export/Import | Tooltips explaining every field, JSON export/import |
| 6 | Expert Mode + Polish | Custom creation from scratch, print layout, PWA |

---

## Iteration 1: Static Character Sheet

### Models

#### `src/models/attribute.ts`
```typescript
export type AttributeCategory = 'physical' | 'social' | 'mental';

export type AttributeName =
  | 'strength' | 'dexterity' | 'stamina'           // Physical
  | 'charisma' | 'manipulation' | 'composure'       // Social
  | 'intelligence' | 'wits' | 'resolve';            // Mental

export interface Attribute {
  name: AttributeName;
  category: AttributeCategory;
  value: number; // 1-5 dots
}
```

#### `src/models/skill.ts`
```typescript
export type SkillCategory = 'physical' | 'social' | 'mental';

export type SkillName =
  // Physical
  | 'athletics' | 'brawl' | 'craft' | 'drive' | 'firearms'
  | 'larceny' | 'melee' | 'performance' | 'stealth' | 'survival'
  // Social
  | 'animalKen' | 'etiquette' | 'insight' | 'intimidation'
  | 'leadership' | 'persuasion' | 'streetwise' | 'subterfuge'
  // Mental
  | 'academics' | 'awareness' | 'finance' | 'investigation'
  | 'medicine' | 'occult' | 'politics' | 'science' | 'technology';

export interface SkillDefinition {
  id: SkillName;
  name: string;      // Russian
  nameEn: string;    // English
  category: SkillCategory;
  specialties?: string[]; // e.g. "Brawl: Kindred" or "Academics: History"
}
```

#### `src/models/discipline.ts`
```typescript
export type DisciplineName =
  | 'animalism' | 'auspex' | 'bloodSorcery' | 'celerity'
  | 'dominate' | 'fortitude' | 'obfuscate' | 'oblivion'
  | 'potence' | 'presence' | 'protean' | 'thinBloodAlchemy';

export interface DisciplinePower {
  id: string;
  name: string;
  nameEn: string;
  level: number;          // 1-5
  discipline: DisciplineName;
  prerequisite?: string;  // id of required power
  rpiCost: string;        // "Free" | "One Rouse Check" | etc.
  dicePool?: string;      // e.g. "Charisma + Intimidation"
  duration: string;
  description: string;
}

export interface DisciplineInfo {
  id: DisciplineName;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
}
```

#### `src/models/clan.ts`
```typescript
import type { DisciplineName } from './discipline';

export type ClanId =
  | 'brujah' | 'gangrel' | 'malkavian' | 'nosferatu'
  | 'toreador' | 'tremere' | 'ventrue' | 'lasombra'
  | 'tzimisce' | 'hecata' | 'ravnos' | 'salubri'
  | 'ministry' | 'caitiff' | 'thinBlood';

export interface ClanDefinition {
  id: ClanId;
  name: string;
  nameEn: string;
  nickname: string;
  nicknameEn: string;
  disciplines: DisciplineName[];
  bane: string;
  baneEn: string;
  compulsion: string;
  compulsionEn: string;
  description: string;
  icon: string;
  complexity: 'simple' | 'moderate' | 'complex';
}
```

#### `src/models/predatorType.ts`
```typescript
import type { DisciplineName } from './discipline';

export type PredatorTypeId =
  | 'alleycat' | 'bagger' | 'cleaver' | 'consensualist'
  | 'farmer' | 'osiris' | 'sandman' | 'sceneQueen' | 'siren';

export interface PredatorType {
  id: PredatorTypeId;
  name: string;
  nameEn: string;
  description: string;
  disciplineOptions: DisciplineName[];  // pick 1
  specialtySkill: string;
  merit: string;
  flaw: string;
  hungerReduction: number; // typically 0 or 1
}
```

#### `src/models/character.ts`
```typescript
import type { AttributeName, Attribute } from './attribute';
import type { SkillName } from './skill';
import type { ClanId } from './clan';
import type { PredatorTypeId } from './predatorType';
import type { DisciplineName, DisciplinePower } from './discipline';

export interface DamageTrack {
  max: number;
  superficial: number;
  aggravated: number;
}

export interface Character {
  id: string;
  name: string;
  playerName: string;
  concept: string;          // character concept (1-2 words)
  chronicle: string;        // campaign name
  sire: string;             // who embraced them
  ambition: string;         // long-term goal
  desire: string;           // short-term goal
  generation: number;       // 10-16 typically

  clanId: ClanId;
  clanName: string;
  clanNameEn: string;

  predatorTypeId: PredatorTypeId;
  predatorTypeName: string;
  predatorTypeNameEn: string;

  // Attributes (9, dots 1-5)
  attributes: Record<AttributeName, Attribute>;

  // Skills (27, dots 0-5)
  skills: Record<SkillName, number>;
  skillSpecialties: Record<SkillName, string[]>; // specialties per skill

  // Disciplines
  disciplines: Record<DisciplineName, number>;     // dots per discipline
  knownPowers: DisciplinePower[];                   // specific powers chosen

  // Trackers
  health: DamageTrack;       // max = Stamina + 3
  willpower: DamageTrack;    // max = Composure + Resolve
  hunger: number;            // 1-5
  humanity: number;          // 0-10

  // Humanity details
  convictions: string[];     // 1-3 moral convictions
  touchstones: string[];     // 1-3 mortal connections

  // Blood
  bloodPotency: number;      // 0-10 (starting: 1)

  // Advantages / Flaws
  merits: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  flaws: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  backgrounds: Array<{ name: string; nameEn: string; dots: number; description: string }>;

  // Clan specifics
  bane: string;
  compulsion: string;

  // Experience
  totalExperience: number;
  spentExperience: number;

  // Personality
  appearance: string;
  personalityTraits: string;
  backstory: string;
  notes: string;

  helpModeEnabled: boolean;
}
```

### Sheet Panels (maps from D&D panels)

| D&D Panel | VtM Panel | Content |
|-----------|-----------|---------|
| SheetHeader | SheetHeader | Name, Concept, Clan, Generation, Chronicle, Sire, Ambition/Desire |
| AbilityScoresPanel | AttributesPanel | 3×3 grid: Physical/Social/Mental attributes, dots 1-5 |
| SkillsPanel | SkillsPanel | 3 columns by category, dots 0-5, specialties |
| CombatStatsPanel | CombatTrackers | Health track, Willpower track (superficial/aggravated boxes) |
| HitPointsTracker | HungerTracker | Hunger 1-5 dice visual, Blood Potency, Blood Surge info |
| DeathSavesTracker | HumanityTracker | Humanity 0-10 dots, Stains track, Convictions, Touchstones |
| AttacksPanel | DisciplinesPanel | Known discipline powers, dice pools, rouse costs |
| EquipmentPanel | BackgroundsPanel | Backgrounds (Allies, Resources, Contacts, Haven, etc.) |
| FeaturesPanel | MeritsFlawsPanel | Merits and Flaws with dot ratings |
| ProficienciesPanel | ClanPanel | Clan bane, compulsion, discipline list |
| PersonalityPanel | PersonalityPanel | Appearance, personality traits |
| NotesPanel | NotesPanel | Backstory, notes |

### Data Files

| File | Content |
|------|---------|
| `data/attributes.ts` | 9 attributes with categories and bilingual names |
| `data/skills.ts` | 27 skills with categories and bilingual names |
| `data/clanDefinitions.ts` | 15 clans with disciplines, banes, compulsions |
| `data/predatorTypes.ts` | 9 predator types with bonuses |
| `data/disciplineDefinitions.ts` | 12 disciplines with info |
| `data/disciplinePowers.ts` | Level 1-2 powers for each discipline |
| `data/demoCharacter.ts` | Pre-built Brujah neonate |

### Demo Character: Brujah Neonate

- **Name:** Виктор Кровавый (Viktor the Bloodied)
- **Concept:** Революционер поневоле
- **Clan:** Brujah
- **Generation:** 13th
- **Predator Type:** Alleycat
- **Blood Potency:** 1
- **Humanity:** 7
- **Hunger:** 1

**Attributes:** STR 3, DEX 2, STA 3, CHA 2, MAN 2, COM 2, INT 2, WIT 3, RES 2
**Top Skills:** Brawl 3, Intimidation 2, Athletics 2, Streetwise 2, Awareness 1
**Disciplines:** Celerity 1, Potence 1

---

## Iteration 2: Onboarding Quiz

### Quiz Design (6 questions, no VtM jargon)

| # | Question Theme | Tests for |
|---|---------------|-----------|
| Q1 | "At a party you..." | Social style → Toreador/Ventrue/Ministry vs Nosferatu/Gangrel |
| Q2 | "Faced with conflict you..." | Violence vs manipulation vs hiding → Brujah/Gangrel vs Ventrue/Tremere vs Malkavian |
| Q3 | "Power means..." | Physical / political / knowledge / supernatural → Brujah/Gangrel vs Ventrue/Lasombra vs Tremere/Hecata |
| Q4 | "Your greatest fear is..." | Losing control / being alone / being exposed / losing yourself → Humanity alignment |
| Q5 | "You feed by..." | Predator type alignment → maps to clan affinities |
| Q6 | "Your ideal is..." | Rebel / artist / scholar / predator / leader → Brujah/Toreador/Tremere/Gangrel/Ventrue |

### Scoring

Each answer gives 1-3 points to multiple clans. Same algorithm as D&D project:
1. Accumulate weights per ClanId
2. Calculate max possible per clan
3. Percentage = score / maxPossible × 100
4. Sort by score desc, complexity asc for ties
5. Top 1 = primary, next 2 = alternatives
6. Suggest predator type based on primary clan alignment

### Results Page

- **PrimaryClanCard**: clan icon, bilingual name, %, description, disciplines, bane, complexity stars
- **AlternativeClanCards**: 2 runner-ups
- **PredatorTypeSuggestion**: recommended predator type for the clan
- **ResultsActions**: "Retry" / "Create character" / "View demo"

---

## Iteration 3: Templates + Storage

### Character Builder

`buildCharacterFromTemplate(clanId, predatorTypeId) → Character`

1. Clan → disciplines (2 dots among clan disciplines)
2. Predator type → +1 discipline dot, merit, flaw
3. Attributes: distribute based on clan archetype (Physical/Social/Mental priority)
4. Skills: distribute based on clan + predator type
5. Health = Stamina + 3
6. Willpower = Composure + Resolve
7. Blood Potency = 1
8. Humanity = 7
9. Hunger = 1
10. Generation = 13
11. Name + personality from `characterNames.ts`
12. Default convictions and touchstones

### Storage

Same `localStorage` CRUD as D&D project:
- `listCharacters()`, `loadCharacter(id)`, `saveCharacter(character)`, `deleteCharacter(id)`
- Key: `vtm-characters`

### CharactersPage

Same pattern: demo card + saved characters list + delete confirmation dialog.

---

## Iteration 4: Editing + Auto-calculations

### Editable Fields
- All attributes (dot selector 1-5)
- All skills (dot selector 0-5)
- Discipline dots
- Hunger (1-5 buttons)
- Health/Willpower damage (click to cycle: empty → `/` → `X`)
- Humanity (dot selector 0-10)
- Text fields (name, concept, backstory, etc.)

### Auto-calculations
- Health max = Stamina + 3
- Willpower max = Composure + Resolve
- Dice pool display: "Attribute + Skill = N dice" on hover
- Blood Surge value from Blood Potency table
- Power Bonus from Blood Potency table

---

## Iteration 5: Help System + Export/Import

### Tooltips
Every field gets an explanatory tooltip in Russian:
- Attributes: what they do, example dice pools
- Skills: when to use, example situations
- Hunger: consequences of each level
- Humanity: what happens at each level
- Disciplines: how Rouse Checks work
- Health/Willpower: damage types explained
- Clan bane: when it triggers
- Blood Potency: feeding restrictions

### Export/Import
- JSON export (download file)
- JSON import (upload + validate)
- Print-friendly CSS layout

---

## Iteration 6: Expert Mode + Polish

### Full Custom Creation
- Step-by-step character creation wizard
- Attribute point distribution (7/5/3 across categories)
- Skill point distribution (various schemes)
- Free discipline dot selection
- Merit/Flaw selection with dot budget
- Background selection with dot budget

### Polish
- PWA (offline support)
- Animations on Hunger/Humanity changes
- Dice roller (optional, basic)
- Responsive refinements

---

## File Structure (target)

```
src/
├── models/
│   ├── attribute.ts
│   ├── skill.ts
│   ├── discipline.ts
│   ├── clan.ts
│   ├── predatorType.ts
│   ├── character.ts
│   └── quiz.ts
├── data/
│   ├── attributes.ts
│   ├── skills.ts
│   ├── clanDefinitions.ts
│   ├── predatorTypes.ts
│   ├── disciplineDefinitions.ts
│   ├── disciplinePowers.ts
│   ├── characterNames.ts
│   ├── demoCharacter.ts
│   ├── quizQuestions.ts
│   ├── quizClans.ts
│   └── bloodPotencyTable.ts
├── lib/
│   ├── utils.ts
│   ├── quizScoring.ts
│   ├── characterStorage.ts
│   └── characterBuilder.ts
├── i18n/
│   └── terms.ts
├── components/
│   ├── ui/              (shadcn: card, badge, tooltip, separator, button, progress, alert-dialog)
│   ├── layout/          (AppHeader, PageContainer)
│   ├── sheet/
│   │   ├── CharacterSheet.tsx
│   │   ├── SheetHeader.tsx
│   │   ├── AttributesPanel.tsx
│   │   ├── SkillsPanel.tsx
│   │   ├── DisciplinesPanel.tsx
│   │   ├── CombatTrackers.tsx     (Health + Willpower)
│   │   ├── HungerTracker.tsx
│   │   ├── HumanityTracker.tsx
│   │   ├── ClanPanel.tsx
│   │   ├── BackgroundsPanel.tsx
│   │   ├── MeritsFlawsPanel.tsx
│   │   ├── PersonalityPanel.tsx
│   │   └── NotesPanel.tsx
│   ├── quiz/
│   │   ├── QuizProgress.tsx
│   │   ├── QuizAnswerCard.tsx
│   │   ├── QuizStep.tsx
│   │   ├── PrimaryClanCard.tsx
│   │   ├── AlternativeClanCard.tsx
│   │   ├── PredatorTypeSuggestion.tsx
│   │   └── ResultsActions.tsx
│   └── characters/
│       ├── CharacterCard.tsx
│       └── EmptyCharacterList.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── QuizPage.tsx
│   ├── ResultsPage.tsx
│   ├── SheetPage.tsx
│   └── CharactersPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Mapping: D&D project → VtM project

| D&D concept | VtM equivalent | Notes |
|-------------|---------------|-------|
| AbilityName (6) | AttributeName (9) | 3 categories instead of flat list |
| AbilityScore.baseValue | Attribute.value | Dots 1-5 instead of 3-20 |
| SkillName (18) | SkillName (27) | 3 categories, dots 0-5 |
| ClassId (12) | ClanId (15) | 13 clans + Caitiff + Thin-Blood |
| SpeciesId (10) | PredatorTypeId (9) | Predator type replaces species |
| ClassDefinition | ClanDefinition | Disciplines instead of hit dice/armor |
| Species | PredatorType | Feeding style instead of racial traits |
| Background | (merged into PredatorType) | VtM backgrounds are Advantages |
| Spell | DisciplinePower | Rouse Checks instead of spell slots |
| HP / Hit Dice | Health (superficial/aggravated) | Two damage types |
| Death Saves | (none) | VtM uses Torpor instead |
| AC / Initiative | (none) | VtM uses dice pools, not AC |
| Equipment | (minimal) | VtM is not equipment-focused |
| Saving Throws | (none) | VtM uses Attribute + Skill pools |
| proficiencyBonus | (none) | VtM has no proficiency concept |
| level | Blood Potency | Affects feeding and power |
| alignment | Humanity | 0-10 scale with Convictions |
| Spellcasting | Discipline use + Hunger | Rouse Checks raise Hunger |

## Acceptance Criteria

### Iteration 1 (Static Sheet)
- [ ] `npm run build` — zero errors
- [ ] Demo Brujah character displays correctly
- [ ] All 9 attributes shown as dots (1-5) in 3×3 grid
- [ ] All 27 skills shown as dots (0-5) in 3 columns
- [ ] Health track shows correct boxes (Stamina + 3)
- [ ] Willpower track shows correct boxes (Composure + Resolve)
- [ ] Hunger displayed as 1-5 dice icons
- [ ] Humanity displayed as 0-10 dots
- [ ] Disciplines shown with power names and descriptions
- [ ] Clan bane and compulsion displayed
- [ ] Dark/light theme works
- [ ] Responsive: mobile 1-col, tablet 2-col, desktop 3-col

### Iteration 2 (Quiz)
- [ ] 6 scenario questions, no VtM jargon
- [ ] Progress bar and step counter
- [ ] Results: primary clan + 2 alternatives + predator type
- [ ] Percentage match displayed
- [ ] "Retry" and "View demo" buttons work

### Iteration 3 (Templates + Storage)
- [ ] "Create character" builds from template
- [ ] Character persists in localStorage
- [ ] Characters list page shows all saved + demo
- [ ] Delete with confirmation dialog
- [ ] Generated character has correct attributes, skills, disciplines

### Iteration 4 (Editing)
- [ ] All dots clickable to change values
- [ ] Hunger 1-5 buttons
- [ ] Health/Willpower damage cycling
- [ ] Auto-recalculation on attribute changes
- [ ] Changes persist on save

### Iteration 5 (Help + Export)
- [ ] Every field has a Russian tooltip
- [ ] JSON export downloads valid file
- [ ] JSON import restores character
- [ ] Print-friendly layout

### Iteration 6 (Expert)
- [ ] Full custom creation wizard
- [ ] Point distribution validation
- [ ] PWA works offline
