import type { AbilityName, AbilityScore } from './ability';
import type { SkillName } from './skill';
import type { EquipmentItem, Attack } from './equipment';
import type { DeathSaves, HitDice } from './combat';

export interface Character {
  id: string;
  name: string;
  playerName: string;

  speciesId: string;
  speciesName: string;
  speciesNameEn: string;

  classId: string;
  className: string;
  classNameEn: string;
  subclassName?: string;
  subclassNameEn?: string;

  backgroundId: string;
  backgroundName: string;
  backgroundNameEn: string;

  level: number;
  experiencePoints: number;
  proficiencyBonus: number;

  abilityScores: Record<AbilityName, AbilityScore>;

  skillProficiencies: SkillName[];
  skillExpertise: SkillName[];

  savingThrowProficiencies: AbilityName[];

  armorClass: number;
  initiative: number;
  speed: number;

  maxHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  hitDice: HitDice;
  deathSaves: DeathSaves;

  attacks: Attack[];
  equipment: EquipmentItem[];

  currency: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };

  features: Array<{
    name: string;
    nameEn: string;
    source: string;
    description: string;
  }>;

  proficiencies: {
    languages: string[];
    tools: string[];
    armor: string[];
    weapons: string[];
  };

  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  notes: string;

  spellcastingAbility?: AbilityName;
  spellSaveDC?: number;
  spellAttackBonus?: number;
  spellSlots?: number[];
  spellSlotsUsed?: number[];
  knownSpells?: string[];

  helpModeEnabled: boolean;
}
