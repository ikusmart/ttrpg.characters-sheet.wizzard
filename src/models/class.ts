import type { AbilityName } from './ability';
import type { SkillName } from './skill';

export interface ClassFeature {
  name: string;
  nameEn: string;
  level: number;
  description: string;
}

export interface ClassDefinition {
  id: string;
  name: string;
  nameEn: string;
  hitDiceSides: 6 | 8 | 10 | 12;
  primaryAbility: AbilityName[];
  savingThrows: AbilityName[];
  skillChoices: SkillName[];
  skillChoiceCount: number;
  armorProficiencies: string[];
  weaponProficiencies: string[];
  features: ClassFeature[];
  complexity: 'simple' | 'moderate' | 'complex';
}
