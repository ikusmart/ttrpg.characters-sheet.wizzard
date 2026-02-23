import type { AbilityName } from './ability';

export const SKILL_NAMES = [
  'acrobatics', 'animalHandling', 'arcana', 'athletics',
  'deception', 'history', 'insight', 'intimidation',
  'investigation', 'medicine', 'nature', 'perception',
  'performance', 'persuasion', 'religion', 'sleightOfHand',
  'stealth', 'survival'
] as const;

export type SkillName = typeof SKILL_NAMES[number];

export interface SkillDefinition {
  id: SkillName;
  name: string;
  nameEn: string;
  ability: AbilityName;
}
