import type { GameSystem, HelpSection } from '@/models/help';

// D&D help sections
import { abilityScoresHelp } from './dnd/abilityScoresHelp';
import { skillsHelp } from './dnd/skillsHelp';
import { savingThrowsHelp } from './dnd/savingThrowsHelp';
import { combatHelp } from './dnd/combatHelp';
import { hitPointsHelp } from './dnd/hitPointsHelp';
import { deathSavesHelp } from './dnd/deathSavesHelp';
import { attacksHelp } from './dnd/attacksHelp';
import { equipmentHelp } from './dnd/equipmentHelp';
import { featuresHelp } from './dnd/featuresHelp';
import { proficienciesHelp } from './dnd/proficienciesHelp';
import { personalityHelp } from './dnd/personalityHelp';
import { notesHelp } from './dnd/notesHelp';

// VtM help sections
import { vtmAttributesHelp } from './vtm/attributesHelp';
import { vtmSkillsHelp } from './vtm/skillsHelp';
import { vtmHealthWillpowerHelp } from './vtm/healthWillpowerHelp';
import { vtmHungerHelp } from './vtm/hungerHelp';
import { vtmHumanityHelp } from './vtm/humanityHelp';
import { vtmDisciplinesHelp } from './vtm/disciplinesHelp';
import { vtmClanHelp } from './vtm/clanHelp';
import { vtmBackgroundsHelp } from './vtm/backgroundsHelp';
import { vtmMeritsFlawsHelp } from './vtm/meritsFlawsHelp';
import { vtmPersonalityHelp } from './vtm/personalityHelp';
import { vtmNotesHelp } from './vtm/notesHelp';

const dndSections: Record<string, HelpSection> = {
  abilityScores: abilityScoresHelp,
  skills: skillsHelp,
  savingThrows: savingThrowsHelp,
  combatStats: combatHelp,
  hitPoints: hitPointsHelp,
  deathSaves: deathSavesHelp,
  attacks: attacksHelp,
  equipment: equipmentHelp,
  features: featuresHelp,
  proficiencies: proficienciesHelp,
  personality: personalityHelp,
  notes: notesHelp,
};

const vtmSections: Record<string, HelpSection> = {
  attributes: vtmAttributesHelp,
  skills: vtmSkillsHelp,
  healthWillpower: vtmHealthWillpowerHelp,
  hunger: vtmHungerHelp,
  humanity: vtmHumanityHelp,
  disciplines: vtmDisciplinesHelp,
  clan: vtmClanHelp,
  backgrounds: vtmBackgroundsHelp,
  meritsFlaws: vtmMeritsFlawsHelp,
  personality: vtmPersonalityHelp,
  notes: vtmNotesHelp,
};

const registry: Record<GameSystem, Record<string, HelpSection>> = {
  dnd: dndSections,
  vtm: vtmSections,
};

export function getHelpSection(gameSystem: GameSystem, sectionId: string): HelpSection | null {
  return registry[gameSystem]?.[sectionId] ?? null;
}

export function getAllHelpSections(gameSystem: GameSystem): HelpSection[] {
  return Object.values(registry[gameSystem] ?? {});
}
