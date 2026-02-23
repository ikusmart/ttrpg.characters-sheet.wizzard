import type { AbilityName } from './ability';
import type { SkillName } from './skill';

export interface Background {
  id: string;
  name: string;
  nameEn: string;
  abilityOptions: AbilityName[];
  skillProficiencies: SkillName[];
  toolProficiency: string;
  originFeat: string;
  originFeatEn: string;
}
